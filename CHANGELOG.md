# 🎨 Pixel Art Pro — Выход Version 2.0

> Глубокий разбор того, что изменилось под капотом

---

## 📁 Архитектура: монолит → разделённый код

| | Версия 1 | Версия 2 |
|---|---|---|
| Структура | **1 файл** `1.html` — 3 448 строк (HTML + CSS + JS в одном) | **Разделено**: `index.html` (782 стр) + `app.js` (2 879 стр) + `style.css` (1 864 стр) |
| Размер JS-логики | ~1 900 строк инлайн-скрипта | 2 879 строк отдельного модуля |
| CSS | ~1 300 строк инлайн-стилей | 1 864 строки отдельного файла |
| Шрифт | системный (`-apple-system, Roboto`) | **Google Fonts: Outfit** (300–800) — подключён через preconnect |

**V1** — это буквально один гигантский HTML-файл на ~105 КБ. Всё смешано в кучу. Поддерживать и расширять такой код крайне сложно.

**V2** — чистое разделение ответственности. Браузер кэширует `app.js` и `style.css` независимо, повторные загрузки страницы ускоряются за счёт кэша.

---

## 🎨 Canvas: кардинальный рефакторинг рендеринга

### V1 — рендер через offscreen canvas с fillRect по пикселям

```js
// V1: offscreen canvas с cellSize-масштабом (один пиксель = cellSize×cellSize пикселей на canvas)
canvas.width = width * cellSize;   // например 16 * 20 = 320px физически
canvas.height = height * cellSize;
offscreenCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
ctx.drawImage(offscreenCanvas, 0, 0);
```

**Проблема**: canvas хранится в физических пикселях (увеличенный). При 500×500 холсте с cellSize=3 → физический canvas 1500×1500 px. Много памяти, медленный `drawImage`.

**Dirty pixels** хранились как строки: `dirtyPixels.add('${x},${y}')` → при итерации нужен `split(',').map(Number)` — медленно.

### V2 — рендер через ImageData напрямую в 1px на пиксель

```js
// V2: canvas 1:1 с пикселями, CSS-масштабирование через style.width/height
canvas.width = width;      // например 16 — ровно столько пикселей
canvas.height = height;
canvas.style.width  = (width * cellSize) + 'px';   // масштаб только CSS
canvas.style.height = (height * cellSize) + 'px';

// Рендер через putImageData — самый быстрый метод
const imgData = ctx.createImageData(width, height);
data[idx]   = rgb.r;
data[idx+1] = rgb.g;
data[idx+2] = rgb.b;
data[idx+3] = 255;
ctx.putImageData(cachedImgData, 0, 0);
```

**Грязные пиксели** теперь `Uint32Array` с числовым индексом `y*width+x` — в 5–10 раз быстрее Set из строк.

**Кэш ImageData**: объект `cachedImgData` переиспользуется между рендерами (`data.fill(0)` вместо создания нового).

**ctx.getContext('2d')** — в V2 без `{ alpha: false }` на главном canvas (т.е. поддержка прозрачности), тогда как в V1 использовался `{ alpha: false }` — ограничение.

---

## 🚀 Оптимизации производительности

### 1. Flood Fill: лимит вырос в 200 раз

| | V1 | V2 |
|---|---|---|
| `MAX_FLOOD_FILL_PIXELS` | **50 000** пикселей | **10 000 000** пикселей |

V1 обрывал заливку уже на 50к пикселях — это 224×224 холст. Для крупных полотен заливка просто не работала нормально. В V2 лимит поднят до 10 млн.

Также изменена структура стека BFS:

```js
// V1: массив пар [[cx, cy], ...]  → каждый pop() достаёт объект
stack.push([cx + 1, cy], [cx - 1, cy], ...);
const [cx, cy] = stack.pop();

// V2: плоский массив [x, y, x, y, ...]  → вдвое меньше аллокаций
stack.push(cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1);
const cy = stack.pop();
const cx = stack.pop();
```

Плоский массив быстрее: меньше аллокаций объектов, лучше cache locality.

**Умный выбор рендера после заливки:**
```js
if (pixelsFilled > (width * height) / 2) {
  dirtyPixels.clear();
  render();       // полный перерендер если > 50% холста
} else {
  scheduleRender(); // иначе только dirty pixels
}
```

### 2. Undo/Redo: `JSON.parse(JSON.stringify(...))` → `clonePixels()`

```js
// V1: через JSON (медленно, аллокация + парсинг)
history.push(JSON.parse(JSON.stringify(pixels)));

// V2: нативное клонирование массивов через slice
function clonePixels(pxls) {
  const newPxls = new Array(h);
  for (let i = 0; i < h; i++) newPxls[i] = pxls[i].slice(0);
  return newPxls;
}
history.push(clonePixels(pixels));
```

`Array.prototype.slice()` на порядок быстрее `JSON.parse(JSON.stringify(...))` для массивов примитивов.

### 3. Адаптивный лимит истории

```js
// Оба — умно ограничивают историю по размеру холста:
if (totalPixels > 500000) maxHistory = 2;
else if (totalPixels > 100000) maxHistory = 3;
else if (totalPixels > 50000) maxHistory = 4;
else maxHistory = MAX_UNDO_SIZE; // V1: 20 шагов, V2: 50 шагов (!)
```

**V2 увеличил базовый лимит истории с 20 до 50 шагов** для небольших холстов.

### 4. Сохранение в localStorage через `requestIdleCallback`

```js
// V1: синхронная запись (блокирует UI)
localStorage.setItem('pap_v10', JSON.stringify({ w: width, h: height, p: pixels }));

// V2: откладывает в idle-время браузера (не блокирует)
const saveFn = () => localStorage.setItem('pap_v10', ...);
if (window.requestIdleCallback) window.requestIdleCallback(saveFn);
else setTimeout(saveFn, 0);
```

### 5. Unicode Glyph Save — тоже через `requestIdleCallback`

```js
// V1: синхронно
localStorage.setItem('unicode_glyphs_v3', JSON.stringify(unicodeGlyphs));

// V2: асинхронно в idle
if (window.requestIdleCallback) window.requestIdleCallback(saveFn);
```

### 6. HEX→RGB кэш

```js
// V2: кэш конвертации цветов, размером до 1000 записей
const hexColorCache = new Map();
function getCachedRgb(hex) {
  let rgb = hexColorCache.get(hex);
  if (!rgb) {
    rgb = { r: parseInt(hex.slice(1,3), 16), ... };
    if (hexColorCache.size > 1000) hexColorCache.clear();
    hexColorCache.set(hex, rgb);
  }
  return rgb;
}
```

В V1 каждый пиксель при рендере вычислял RGB заново через `parseInt`. В V2 — один раз, потом из кэша.

---

## 🆕 Новые функции

### 1. Глобальная заливка (G)
```js
// V2: новый инструмент — заменяет все пиксели целевого цвета на всём холсте
function globalFill(x, y) { /* заменяет ВСЕ вхождения цвета */ }
```
В V1 этого инструмента не было совсем. Горячая клавиша `G`.

### 2. Новый холст — модальное окно с предустановленными размерами

```
V1: prompt()/confirm() — нативные диалоги браузера, выглядят ужасно
V2: полноценное модальное окно с кастомными кнопками размеров:
    8×8, 16×16, 32×32, 64×64, 128×128 и произвольный размер
```

### 3. `showCustomConfirm()` — замена всех `confirm()/prompt()`

В V2 появилась функция `showCustomConfirm()` — промис-обёртка над кастомным модальным окном. Поддерживает заголовок, сообщение, текстовый ввод. Все системные вызовы `confirm()` заменены на неё.

### 4. Кастомные палитры с управлением порядком

```
V1: только 6 стандартных палитр, нельзя создать свою
V2: + кастомные палитры с UUID
    + кнопки "переместить вверх/вниз"
    + удаление палитры
    + добавление текущего цвета в палитру
    + удаление цвета долгим нажатием (touch)
    + порядок сохраняется в localStorage
```

### 5. Desktop-режим (адаптивный layout)

```js
// V2: при ширине >= 1024px переключается в desktop-режим
function relocatePanels(isDesktop) { /* перемещает панель настроек */ }
```

В V1 приложение было исключительно мобильным. В V2 на ПК боковая панель фиксирована, drawer не нужен.

### 6. Переключение языка на лету

```js
// V1: язык определяется ОДИН РАЗ при загрузке, нельзя сменить
const currentLang = userLang.startsWith('ru') ? 'ru' : 'en'; // const!

// V2: let + localStorage + кнопки в UI
let currentLang = localStorage.getItem('pap_lang') || ...;
window.setLanguage = function(lang) {
  currentLang = lang;
  localStorage.setItem('pap_lang', lang);
  updateTranslations(); // обновляет весь UI
};
```

### 7. Переключение сетки холста (вкл/выкл)

```
V1: сетка всегда отображается при определённом зуме
V2: + кнопки "Вкл/Выкл" для сетки, состояние в localStorage
```

### 8. Фон холста (тёмный / светлый / серый)

V2 добавил три варианта фона холста с сохранением в localStorage.

### 9. Улучшенная сетка через CSS `gridOverlay`

```
V1: сетка рисовалась прямо на canvas через strokeRect — это
    замедляло каждый render() и вызывало мерцание при зуме

V2: отдельный div#gridOverlay поверх canvas, рендерится
    через CSS background-image (SVG-паттерн или linear-gradient)
    → нет нагрузки на canvas, нет мерцания
```

### 10. Мышиное панорирование и Ctrl+перемещение

```js
// V2: Space + ПКМ/ЛКМ или Ctrl+drag для панорирования
if (isSpacePressed || (ev.pointerType === 'mouse' && ev.button !== 0)) {
  isPanning = true; ...
}
if (ev.ctrlKey) { panX += ev.movementX; ... }
```

В V1 панорирование было только жестом двух пальцев.

### 11. Alt+Click для пипетки

```js
// V2: Alt+клик вызывает пипетку без переключения инструмента
if (ev.altKey) { /* pick color */ }
```

### 12. Горячие клавиши расширены

| Клавиша | V1 | V2 |
|---|---|---|
| A / P | — | Карандаш |
| S / E | — | Ластик |
| F | — | Заливка |
| **G** | — | **Глобальная заливка** (новое) |
| D / I | — | Пипетка |
| L | — | Линия |
| R | — | Прямоугольник |
| C | — | Круг |
| M | — | Выделение |
| Ctrl+Z | ✓ | ✓ |
| Ctrl+Y | ✓ | ✓ |

### 13. Drag drawer только через PointerEvents (не touch)

```js
// V1: dragHandle через touchstart/touchmove/touchend
dragHandle.addEventListener('touchstart', ...);
document.addEventListener('touchmove', ...);

// V2: через pointerdown/pointermove + setPointerCapture
dragHandle.addEventListener('pointerdown', ...);
dragHandle.setPointerCapture(e.pointerId);
```

`PointerEvents` унифицированы для мыши, тача и стилуса. В V1 перетаскивание drawer не работало мышью на ПК.

### 14. Click threshold для Unicode Grid

```js
// V1: 200ms порог клика
const CLICK_THRESHOLD = 200;

// V2: 500ms порог — значительно удобнее на мобильных
const CLICK_THRESHOLD = 500;
```

### 15. Аналитика: дневные визиты

```js
// V2: дополнительно записывает визиты по дням
const today = new Date().toISOString().split('T')[0];
const dailyRef = ref(db, 'stats/daily_visits/' + today);
await runTransaction(dailyRef, (current) => (current || 0) + 1);
```

В V1 считались только total_visits. В V2 добавлена ежедневная статистика.

### 16. Frappe Charts (библиотека графиков)

```html
<!-- V2: подключена библиотека для визуализации статистики -->
<script src="https://cdn.jsdelivr.net/npm/frappe-charts@1.6.2/..."></script>
```

В V1 статистика отображалась как простые числа в таблице. В V2 — с графиками.

---

## 🔧 Исправленные баги

### Bag 1: Shape Preview без мерцания (V1 → V2)

```js
// V1: при рисовании фигур — полный JSON.parse(JSON.stringify(pixels))
// на каждое движение мыши → тормоза на больших холстах
tempCanvas = JSON.parse(JSON.stringify(pixels));
pixels = JSON.parse(JSON.stringify(tempCanvas)); // restore

// V2: массив previousShapePixels только для изменённых пикселей
for (let i = previousShapePixels.length - 1; i >= 0; i--) {
  const p = previousShapePixels[i];
  pixels[p.y][p.x] = p.color; // восстанавливаем только затронутые
}
```

### Bug 2: Zoom с 0.005 вместо 0.1

```js
// V1: минимальный зум 0.1x (нельзя уменьшить сильнее)
scale = Math.max(0.1, ...);

// V2: минимальный зум 0.005x — можно "отъехать" намного дальше
scale = Math.max(0.005, ...);
```

### Bug 3: Zoom формула исправлена

```js
// V1: неверная формула (использовала containerRect вместо панорирования)
const beforeX = (mouseX - containerRect.left) / oldScale;
panX += (afterX - beforeX) * scale;

// V2: правильная формула через unscaled coordinates
const unscaledX = (mouseX - panX) / oldScale;
panX = mouseX - unscaledX * scale;
```

### Bug 4: loadStorage валидация данных

```js
// V1: не проверяет d.p (может упасть с undefined)
if (d) { width = d.w; height = d.h; pixels = d.p; }

// V2: строгая проверка
if (d && d.p && Array.isArray(d.p) && d.p.length > 0) { ... }
```

### Bug 5: Grid overlay — адаптивный к фону

```js
// V2: цвет линий сетки меняется в зависимости от фона холста
let colorStr = '255, 255, 255'; // для тёмного
if (currentCanvasBg === 'light') colorStr = '0, 0, 0'; // для светлого
```

---

## 📊 Сравнение ключевых чисел

| Параметр | V1 | V2 | Изменение |
|---|---|---|---|
| Размер HTML | 105 610 байт | 40 048 байт | **−62%** |
| Flood fill лимит | 50 000 px | 10 000 000 px | **×200** |
| Max Undo шагов | 20 | 50 | **×2.5** |
| Unicode Undo шагов | 10 | 30 | **×3** |
| Min zoom | 0.1x | 0.005x | **×20 дальше** |
| Click threshold | 200ms | 500ms | **+150%** |
| Языки | ru/en (фиксировано) | ru/en (переключается) | ✅ |
| Desktop поддержка | ❌ | ✅ | ✅ |
| Кастомные палитры | ❌ | ✅ | ✅ |
| Глобальная заливка | ❌ | ✅ | ✅ |
| Дневная статистика | ❌ | ✅ | ✅ |
| Alt+Click пипетка | ❌ | ✅ | ✅ |
| Frappe Charts | ❌ | ✅ | ✅ |

---

## 💡 Итого

Версия 2 — это не просто патч. Это **практически полная переработка** кодовой базы:

- **Архитектура**: монолит → разделённые файлы
- **Производительность рендера**: canvas с масштабированием через CSS + `putImageData` вместо `fillRect` в цикле
- **Скорость**: плоские массивы вместо объектов, `slice()` вместо JSON, `requestIdleCallback` для I/O
- **UX**: desktop layout, смена языка, кастомные палитры, больше горячих клавиш
- **Баги**: исправлены формула зума, shape preview, валидация сохранений

> Версия 1 — это MVP. Версия 2 — это продукт.

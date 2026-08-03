const MAX_UNDO_SIZE = 50;
const MAX_FLOOD_FILL_PIXELS = 10000000;
const BATCH_RENDER_SIZE = 100;

const userLang = navigator.language || navigator.userLanguage;
let currentLang = localStorage.getItem('pap_lang') || (userLang.startsWith('ru') ? 'ru' : 'en');

window.setLanguage = function (lang) {
  currentLang = lang;
  localStorage.setItem('pap_lang', lang);
  updateTranslations();

  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('lang' + lang.toUpperCase() + 'Btn');
  if (activeBtn) activeBtn.classList.add('active');
};

const translations = {
  ru: {
    appTitle: 'Pixel Art Pro',
    pencil: 'Карандаш (A)',
    eraser: 'Ластик (S)',
    bucket: 'Заливка (F)',
    bucketGlobal: 'Глобальная заливка (G)',
    eyedropper: 'Пипетка (D)',
    line: 'Линия',
    rectangle: 'Прямоугольник',
    circle: 'Круг',
    spray: 'Спрей',
    select: 'Выделение',
    mirror: 'Зеркало',
    undo: 'Отмена',
    redo: 'Вернуть',
    save: 'Сохранить PNG',
    openImage: 'Открыть фото',
    unicodeGrid: 'Сетка Юникода',
    newCanvas: 'Новый холст',
    centerView: 'Центрировать',
    hslEditor: 'HSL Редактор',
    brushSquare: 'Кисть квадрат',
    brushCircle: 'Кисть круг',
    brushDiamond: 'Кисть ромб',
    canvasBgLabel: 'Фон холста',
    bgDark: 'Темный',
    bgLight: 'Светлый',
    bgGray: 'Серый',
    totalVisits: 'Всего посещений',
    usageStats: 'Статистика использования',
    settings: 'Настройки',
    mirrorTitle: 'Отзеркаливание',
    mirrorH: 'Горизонтально',
    mirrorV: 'Вертикально',
    mirrorOff: 'Выключено',
    back: 'Назад',
    gridSizeTitle: 'Выберите размер сетки',
    cancel: 'Отмена',
    importTitle: 'Импорт изображения',
    importFit: 'Изменить размер изображения под холст',
    importResize: 'Изменить холст под изображение',
    editCell: 'Редактировать',
    copyCell: 'Копировать символ',
    hslTitle: 'Редактор цвета (HSL)',
    hue: 'Оттенок (H)',
    saturation: 'Насыщенность (S)',
    lightness: 'Светлота (L)',
    apply: 'Применить',
    brushSize: 'Размер кисти',
    brushShape: 'Форма кисти',
    opacity: 'Прозрачность кисти',
    blend: 'Сила смешивания',
    blendDesc: 'Регулирует прозрачность накладываемого цвета при рисовании и заливке',
    brightness: 'Яркость',
    colorEditor: 'Редактор цвета',
    currentColor: 'Текущий цвет',
    hexCode: 'HEX код цвета',
    center: 'Центрировать вид',
    squareBrush: 'Квадратная кисть',
    circleBrush: 'Круглая кисть',
    diamondBrush: 'Ромбовидная кисть',
    confirmClear: 'Очистить холст?',
    imageLoaded: 'Изображение загружено',
    saved: 'Сохранено',
    cancelled: 'Отменено',
    returned: 'Возвращено',
    undoAction: 'Отменено',
    viewCentered: 'Вид центрирован',
    mirrorOffToast: 'Зеркало выкл',
    mirrorHToast: 'Зеркало: горизонтально',
    mirrorVToast: 'Зеркало: вертикально',
    colorCopied: 'Цвет скопирован',
    floodFillLimit: 'Заливка ограничена',
    error: 'Ошибка',
    unicodeSaved: 'Сохранено в Сетку Юникода',
    editing: 'Редактирование',
    copied: 'Скопировано',
    confirmImport: 'Импортировать изображение в сетку?',
    languageLabel: 'Язык',
    toolsTitle: 'Инструменты',
    colorTitle: 'Цвет',
    brushSizeSectionTitle: 'Размер кисти',
    brushShapeSectionTitle: 'Форма кисти',
    effectsSectionTitle: 'Эффекты',
    newCanvas: 'Новый холст',
    openImage: 'Открыть фото',
    createCanvasTitle: 'Создать новый холст',
    customSize: 'Свой размер',
    create: 'Создать',
    basic: 'Базовые',
    grayscale: 'Оттенки серого',
    material: 'Материал',
    pastel: 'Пастельные',
    warm: 'Тёплые',
    cool: 'Холодные',
    cellNotSelected: 'Ячейка не выбрана',
    noDataToSave: 'Нет данных для сохранения',
    gridSaved: 'Сетка сохранена',
    unsupportedFormat: 'Неподдерживаемый формат',
    saveUnicode: 'Сохранить в Юникод',
    unicodeHeaderTitle: 'Сетка символов Unicode',
    paletteTitle: 'Палитра',
    addPaletteBtnText: '+ Палитра',
    addColorToPalette: 'Добавить текущий цвет',
    deletePalette: 'Удалить палитру',
    emptyPalette: 'Пустая палитра. Нажмите +, чтобы добавить цвет',
    confirmDeletePalette: 'Удалить палитру?',
    confirmDeleteColor: 'Удалить цвет?',
    enterPaletteName: 'Введите название новой палитры:',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    gridToggleLabel: 'Сетка холста',
    gridOn: 'Вкл',
    gridOff: 'Выкл'
  },
  en: {
    appTitle: 'Pixel Art Pro',
    pencil: 'Pencil (A)',
    eraser: 'Eraser (S)',
    bucket: 'Fill (F)',
    bucketGlobal: 'Global Fill (G)',
    eyedropper: 'Picker (D)',
    line: 'Line',
    rectangle: 'Rectangle',
    circle: 'Circle',
    spray: 'Spray',
    select: 'Select',
    mirror: 'Mirror',
    undo: 'Undo',
    redo: 'Redo',
    save: 'Save PNG',
    openImage: 'Open Image',
    unicodeGrid: 'Unicode Grid',
    newCanvas: 'New Canvas',
    centerView: 'Center View',
    hslEditor: 'HSL Editor',
    brushSquare: 'Square Brush',
    brushCircle: 'Circle Brush',
    brushDiamond: 'Diamond Brush',
    canvasBgLabel: 'Canvas Background',
    bgDark: 'Dark',
    bgLight: 'Light',
    bgGray: 'Gray',
    totalVisits: 'Total Visits',
    usageStats: 'Usage Statistics',
    settings: 'Settings',
    mirrorTitle: 'Mirroring',
    mirrorH: 'Horizontal',
    mirrorV: 'Vertical',
    mirrorOff: 'Off',
    back: 'Back',
    gridSizeTitle: 'Select Grid Size',
    cancel: 'Cancel',
    importTitle: 'Image Import',
    importFit: 'Fit image to canvas',
    importResize: 'Resize canvas to image',
    editCell: 'Edit',
    copyCell: 'Copy Symbol',
    hslTitle: 'Color Editor (HSL)',
    hue: 'Hue (H)',
    saturation: 'Saturation (S)',
    lightness: 'Lightness (L)',
    apply: 'Apply',
    brushSize: 'Brush Size',
    brushShape: 'Brush Shape',
    opacity: 'Brush Opacity',
    blend: 'Blend Strength',
    blendDesc: 'Adjusts color blending intensity when drawing and filling',
    brightness: 'Brightness',
    colorEditor: 'Color Editor',
    currentColor: 'Current Color',
    hexCode: 'HEX Color Code',
    center: 'Center View',
    squareBrush: 'Square Brush',
    circleBrush: 'Circle Brush',
    diamondBrush: 'Diamond Brush',
    confirmClear: 'Clear canvas?',
    imageLoaded: 'Image loaded',
    saved: 'Saved',
    cancelled: 'Cancelled',
    returned: 'Redone',
    undoAction: 'Undone',
    viewCentered: 'View centered',
    mirrorOffToast: 'Mirror off',
    mirrorHToast: 'Mirror: horizontal',
    mirrorVToast: 'Mirror: vertical',
    colorCopied: 'Color copied',
    floodFillLimit: 'Fill limit reached',
    error: 'Error',
    unicodeSaved: 'Saved to Unicode Grid',
    editing: 'Editing',
    copied: 'Copied',
    confirmImport: 'Import image to grid?',
    languageLabel: 'Language',
    toolsTitle: 'Tools',
    colorTitle: 'Color',
    brushSizeSectionTitle: 'Brush Size',
    brushShapeSectionTitle: 'Brush Shape',
    effectsSectionTitle: 'Effects',
    newCanvas: 'New Canvas',
    openImage: 'Open Image',
    createCanvasTitle: 'Create New Canvas',
    customSize: 'Custom Size',
    create: 'Create',
    basic: 'Basic',
    grayscale: 'Grayscale',
    material: 'Material',
    pastel: 'Pastel',
    warm: 'Warm',
    cool: 'Cool',
    cellNotSelected: 'No cell selected',
    noDataToSave: 'No data to save',
    gridSaved: 'Grid saved',
    unsupportedFormat: 'Unsupported format',
    saveUnicode: 'Save Unicode',
    unicodeHeaderTitle: 'Unicode Glyph Grid',
    paletteTitle: 'Palette',
    addPaletteBtnText: '+ Palette',
    addColorToPalette: 'Add current color',
    deletePalette: 'Delete palette',
    emptyPalette: 'Empty palette. Click + to add color',
    confirmDeletePalette: 'Delete palette?',
    confirmDeleteColor: 'Delete color?',
    enterPaletteName: 'Enter new palette name:',
    moveUp: 'Move up',
    moveDown: 'Move down',
    gridToggleLabel: 'Canvas Grid',
    gridOn: 'On',
    gridOff: 'Off'
  }
};

function t(key) {
  return translations[currentLang][key] || key;
}

let width = 16, height = 16, cellSize = 20;
let pixels = [];
let currentColor = '#000000';
let currentRgb = { r: 0, g: 0, b: 0 };
let brushOpacity = 1.0;
let cachedImgData = null;

function clonePixels(pxls) {
  const h = pxls.length;
  const newPxls = new Array(h);
  for (let i = 0; i < h; i++) newPxls[i] = pxls[i].slice(0);
  return newPxls;
}
let blendStrength = 1.0;
let currentTool = 'pencil';
let currentHSL = { h: 0, s: 100, l: 50 };
let brushSize = 1;
let brushType = 'square';
let mirrorMode = 'off';
let gridEnabled = true;
let shapeStartX = -1, shapeStartY = -1;
let isDrawingShape = false;
let previousShapePixels = [];
let tempCanvas = null;
let scale = 1, panX = 0, panY = 0;
let isDrawing = false, isGesture = false;
let isPanning = false, panStartX = 0, panStartY = 0, isSpacePressed = false;
let startPinchDist = 0, startScale = 1, startPanX = 0, startPanY = 0, startClientX = 0, startClientY = 0;
let history = [], historyStep = -1;
let offscreenCanvas, offscreenCtx;
let dirtyPixels = new Set();
let renderScheduled = false;
let strokeMask = null;
let currentStrokeId = 0;
let saveStateTimeout = null;
let lastGridScale = 1;
let zoomIndicatorTimeout = null;
let unicodeGlyphs = {};
let isEditingUnicode = false;
let unicodeCellToEdit = null;
let selectedUnicodeCell = null;
let unicodeCanvas, unicodeCtx;
let unicodeGridSize = 256;
let unicodeGridCells = 16;
let unicodeCellSize = 16;
let unicodeScale = 1, unicodePanX = 0, unicodePanY = 0;
let unicodeHistory = [], unicodeHistoryStep = -1;
let unicodeIsDragging = false;
let unicodeHasMoved = false;
let unicodeLastX = 0, unicodeLastY = 0;
let unicodeStartPinchDist = 0;
let unicodeStartScale = 1;
let unicodeStartPanX = 0, unicodeStartPanY = 0;
let unicodePinchCenterX = 0, unicodePinchCenterY = 0;
let unicodeLastTouchMidX = 0, unicodeLastTouchMidY = 0;
let evCache = [];
let prevDiff = -1;
let unicodeEvCache = [];
let unicodePrevDiff = -1;
let drawDelayTimer = null;
let canDraw = false;
let pointerDownTime = 0;
const DRAW_DELAY = 150;
const CLICK_THRESHOLD = 500;
const MOVE_THRESHOLD = 10;
let unicodePointerDownTime = 0;
let unicodeStartX = 0;
let unicodeStartY = 0;
let unicodeTotalMovement = 0;
let cellModalLocked = false;
let pendingImageFile = null;
let pendingImageElement = null;

const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('canvasContainer');
const workspace = document.getElementById('workspace');
const drawer = document.getElementById('drawer');
const dragHandle = document.getElementById('dragHandle');
const colorBox = document.getElementById('colorBox');
const hexInput = document.getElementById('hexInput');
const brightSlider = document.getElementById('brightnessSlider');
const opacitySlider = document.getElementById('opacitySlider');
const blendSlider = document.getElementById('blendSlider');
const brushSizeSlider = document.getElementById('brushSizeSlider');
const zoomIndicator = document.getElementById('zoomIndicator');
const saveUnicodeBtn = document.getElementById('saveUnicodeBtn');
const COLLAPSED_HEIGHT = 200;
let PARTIAL_HEIGHT = window.innerHeight * 0.6;
let FULL_HEIGHT = window.innerHeight * 0.95;
let currentDrawerState = 'collapsed';

function init() {
  createBackgroundParticles();
  loadStorage();
  loadUnicodeGlyphs();
  setupCanvas();
  setupEvents();
  setupDrawer();
  setupUnicodeGrid();
  render();
  handleResize();
  resetView();
  updateUI(currentColor);
  setupTooltips();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  updateTranslations();

  const savedBg = localStorage.getItem('pap_canvas_bg') || 'dark';
  window.setCanvasBackground(savedBg, false);

  // Set active language button state on load
  const activeLangBtn = document.getElementById('lang' + currentLang.toUpperCase() + 'Btn');
  if (activeLangBtn) activeLangBtn.classList.add('active');

  const savedGrid = localStorage.getItem('pap_grid_enabled') !== 'false';
  window.setGridEnabled(savedGrid, false);
}

let currentCanvasBg = 'dark';
window.setCanvasBackground = function (theme, save = true) {
  currentCanvasBg = theme;
  const target = document.getElementById('pixelCanvas');
  if (target) {
    target.classList.remove('bg-dark', 'bg-light', 'bg-gray');
    target.classList.add('bg-' + theme);
  }
  const unicodeTarget = document.getElementById('unicodeGridContainer');
  if (unicodeTarget) {
    unicodeTarget.classList.remove('bg-dark', 'bg-light', 'bg-gray');
    unicodeTarget.classList.add('bg-' + theme);
  }

  ['bgDarkBtn', 'bgLightBtn', 'bgGrayBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('bg' + theme.charAt(0).toUpperCase() + theme.slice(1) + 'Btn');
  if (activeBtn) activeBtn.classList.add('active');

  if (save) {
    localStorage.setItem('pap_canvas_bg', theme);
  }
  if (typeof render === 'function') {
    render();
  }
};

window.setGridEnabled = function (enabled, save = true) {
  gridEnabled = enabled;
  const onBtn = document.getElementById('gridOnBtn');
  const offBtn = document.getElementById('gridOffBtn');
  if (onBtn) onBtn.classList.toggle('active', enabled);
  if (offBtn) offBtn.classList.toggle('active', !enabled);

  if (save) {
    localStorage.setItem('pap_grid_enabled', enabled ? 'true' : 'false');
  }

  const gridOverlay = document.getElementById('gridOverlay');
  if (!enabled && gridOverlay) {
    gridOverlay.style.opacity = '0';
  } else if (typeof drawGrid === 'function') {
    drawGrid();
  }

  if (typeof isEditingUnicode !== 'undefined' && isEditingUnicode && typeof renderUnicodeGrid === 'function') {
    renderUnicodeGrid();
  }
};

function updateTranslations() {
  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };

  setText('settingsTitle', 'settings');
  setText('openImageText', 'openImage');
  setText('saveText', 'save');
  setText('topSaveText', 'save');
  setText('topNewCanvasText', 'newCanvas');
  setText('topOpenImageText', 'openImage');
  setText('topUnicodeGridText', 'unicodeGrid');
  setText('unicodeDownloadText', 'save');
  setText('mirrorTitle', 'mirrorTitle');
  setText('mirrorHText', 'mirrorH');
  setText('mirrorVText', 'mirrorV');
  setText('mirrorOffText', 'mirrorOff');
  setText('mirrorBackText', 'back');
  setText('unicodeSizeTitle', 'gridSizeTitle');
  setText('unicodeCancelText', 'cancel');
  setText('newCanvasTitle', 'createCanvasTitle');
  setText('customSizeTitle', 'customSize');
  setText('createCustomBtnText', 'create');
  setText('newCanvasCancelText', 'cancel');
  setText('importTitle', 'importTitle');
  setText('importFitText', 'importFit');
  setText('importResizeText', 'importResize');
  setText('importCancelText', 'cancel');
  setText('editCellText', 'editCell');
  setText('copyCellText', 'copyCell');
  setText('cellBackText', 'back');
  setText('unicodeCloseText', 'cancel');
  setText('unicodeImportText', 'openImage');
  setText('unicodeDownloadText', 'save');
  setText('hslTitle', 'hslTitle');
  setText('hslHText', 'hue');
  setText('hslSText', 'saturation');
  setText('hslLText', 'lightness');
  setText('hslCancelText', 'cancel');
  setText('hslApplyText', 'apply');
  setText('brushSizeText', 'brushSize');
  setText('brushShapeText', 'brushShape');
  setText('opacityText', 'opacity');
  setText('blendText', 'blend');
  setText('blendDescText', 'blendDesc');
  setText('brightnessText', 'brightness');
  setText('canvasBgLabel', 'canvasBgLabel');
  setText('bgDarkText', 'bgDark');
  setText('bgLightText', 'bgLight');
  setText('bgGrayText', 'bgGray');

  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = t('languageLabel') || (currentLang === 'ru' ? 'Язык' : 'Language');

  setText('gridToggleLabel', 'gridToggleLabel');
  setText('gridOnText', 'gridOn');
  setText('gridOffText', 'gridOff');

  setText('toolsTitle', 'toolsTitle');
  setText('colorTitle', 'colorTitle');
  setText('brushSizeSectionTitle', 'brushSizeSectionTitle');
  setText('brushShapeSectionTitle', 'brushShapeSectionTitle');
  setText('effectsSectionTitle', 'effectsSectionTitle');

  document.querySelectorAll('[data-tooltip]').forEach(el => {
    const key = el.getAttribute('data-tooltip-key');
    if (key && translations[currentLang][key]) {
      el.setAttribute('data-tooltip', translations[currentLang][key]);
    }
  });

  setText('topSaveUnicodeText', 'saveUnicode');
  setText('mobileUnicodeGridText', 'unicodeGrid');
  setText('paletteTitle', 'paletteTitle');
  setText('unicodeHeaderTitle', 'unicodeHeaderTitle');
  setText('addPaletteBtnText', 'addPaletteBtnText');
  generateBigPalette();
}

function createBackgroundParticles() {
  const bg = document.querySelector('.bg-animation');
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    p.style.animationDelay = Math.random() * 5 + 's';
    bg.appendChild(p);
  }
}

function setupCanvas() {
  const totalPixels = width * height;
  if (totalPixels > 250000) cellSize = 3;
  else if (totalPixels > 100000) cellSize = 5;
  else if (totalPixels > 50000) cellSize = 8;
  else if (totalPixels > 10000) cellSize = 10;
  else if (width > 200 || height > 200) cellSize = 10;
  else if (width > 100 || height > 100) cellSize = 15;
  else cellSize = 20;

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = (width * cellSize) + 'px';
  canvas.style.height = (height * cellSize) + 'px';
  ctx.imageSmoothingEnabled = false;
  
  let gridOverlay = document.getElementById('gridOverlay');
  if (!gridOverlay) {
    gridOverlay = document.createElement('div');
    gridOverlay.id = 'gridOverlay';
    gridOverlay.style.position = 'absolute';
    gridOverlay.style.pointerEvents = 'none';
    gridOverlay.style.zIndex = '2';
    canvas.parentNode.appendChild(gridOverlay);
  }
  gridOverlay.style.width = (width * cellSize) + 'px';
  gridOverlay.style.height = (height * cellSize) + 'px';
  gridOverlay.style.top = canvas.offsetTop + 'px';
  gridOverlay.style.left = canvas.offsetLeft + 'px';
  gridOverlay.style.backgroundSize = `${cellSize}px ${cellSize}px`;

  if (!strokeMask || strokeMask.length !== width * height) {
    strokeMask = new Uint32Array(width * height);
  }
}

function getGridVisibleScale() {
  const totalPixels = width * height;
  if (totalPixels <= 1024) return 1.0;
  if (totalPixels > 500000) return 8.0;
  if (totalPixels > 250000) return 6.0;
  if (totalPixels > 100000) return 5.0;
  if (totalPixels > 50000) return 4.0;
  if (totalPixels > 10000) return 3.5;
  return 3.0;
}

function setupDrawer() {
  let startY = 0;
  let startH = COLLAPSED_HEIGHT;
  let isDragging = false;
  let velocity = 0;
  let lastY = 0;
  let lastTime = 0;

  dragHandle.addEventListener('pointerdown', (e) => {
    if (window.innerWidth >= 1024) return;
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
    startH = drawer.clientHeight;
    lastY = startY;
    lastTime = Date.now();
    velocity = 0;
    drawer.style.transition = 'none';
    try {
      dragHandle.setPointerCapture(e.pointerId);
    } catch (err) { }
  });

  document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const y = e.clientY;
    const delta = startY - y;
    let newH = startH + delta;
    if (newH < COLLAPSED_HEIGHT) newH = COLLAPSED_HEIGHT + (newH - COLLAPSED_HEIGHT) * 0.2;
    if (newH > FULL_HEIGHT) newH = FULL_HEIGHT + (newH - FULL_HEIGHT) * 0.1;
    drawer.style.height = newH + 'px';

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) velocity = (lastY - y) / dt * 15;
    lastY = y;
    lastTime = now;
    updateDrawerContent(newH);
  });

  const onDrawerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    try {
      dragHandle.releasePointerCapture(e.pointerId);
    } catch (err) { }
    const currentH = drawer.clientHeight;
    let targetH;
    const projectedH = currentH + velocity * 20;

    if (currentDrawerState === 'collapsed') {
      if (projectedH > COLLAPSED_HEIGHT + 50 || velocity > 2) {
        targetH = FULL_HEIGHT;
      } else {
        targetH = COLLAPSED_HEIGHT;
      }
    } else {
      if (velocity < -2 || projectedH < FULL_HEIGHT - 50) {
        targetH = COLLAPSED_HEIGHT;
      } else {
        targetH = FULL_HEIGHT;
      }
    }

    const duration = Math.min(0.6, Math.max(0.3, Math.abs(targetH - currentH) / 1000));
    drawer.style.transition = `height ${duration}s cubic-bezier(0.25, 0.8, 0.25, 1)`;
    drawer.style.height = targetH + 'px';

    setTimeout(() => {
      currentDrawerState = targetH === FULL_HEIGHT ? 'full' : 'collapsed';
      if (currentDrawerState === 'full') {
        drawer.classList.add('full-open');
        drawer.classList.add('open');
      } else {
        drawer.classList.remove('full-open');
        drawer.classList.remove('open');
      }
      updateDrawerContent(targetH);
    }, duration * 1000);
  };

  document.addEventListener('pointerup', onDrawerUp);
  document.addEventListener('pointercancel', onDrawerUp);
}

function relocatePanels(isDesktop) {
  const settingsContent = document.getElementById('menuSettingsContent');
  const desktopPlaceholder = document.getElementById('desktopSettingsPlaceholder');
  const modalContent = document.querySelector('#menuModal .modal-content');

  if (!settingsContent || !desktopPlaceholder || !modalContent) return;

  if (isDesktop) {
    if (settingsContent.parentElement !== desktopPlaceholder) {
      desktopPlaceholder.appendChild(settingsContent);
    }
  } else {
    if (settingsContent.parentElement !== modalContent) {
      modalContent.appendChild(settingsContent);
    }
  }
}

function updateDrawerHeights() {
  PARTIAL_HEIGHT = window.innerHeight * 0.6;
  FULL_HEIGHT = window.innerHeight * 0.95;
}

function handleResize() {
  const isDesktop = window.innerWidth >= 1024;
  updateDrawerHeights();
  relocatePanels(isDesktop);

  if (isDesktop) {
    drawer.style.height = '';
    drawer.style.transition = '';
    const expanded = document.querySelector('.drawer-expanded-content');
    if (expanded) expanded.style.opacity = '';
  } else {
    const targetH = currentDrawerState === 'full' ? FULL_HEIGHT : COLLAPSED_HEIGHT;
    drawer.style.height = targetH + 'px';
    updateDrawerContent(targetH);
  }
}

function updateDrawerContent(height) {
  const progress = Math.max(0, Math.min(1, (height - COLLAPSED_HEIGHT) / (FULL_HEIGHT - COLLAPSED_HEIGHT)));
  document.querySelector('.drawer-expanded-content').style.opacity = progress > 0.2 ? 1 : progress * 5;
}

function setupEvents() {
  workspace.addEventListener('pointerdown', onPointerDown);
  workspace.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  workspace.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('resize', handleResize);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  hexInput.addEventListener('change', e => {
    let v = e.target.value;
    if (!v.startsWith('#')) v = '#' + v;
    if (/^#[0-9A-F]{6}$/i.test(v)) setColor(v, true);
  });

  brightSlider.addEventListener('input', e => {
    const l = e.target.value;
    document.getElementById('brightVal').innerText = l + '%';
    const [h, s] = hexToHsl(currentColor);
    setColor(hslToHex(h, s, l), true, false);
  });

  opacitySlider.addEventListener('input', e => {
    brushOpacity = e.target.value / 100;
    document.getElementById('opacityVal').innerText = e.target.value + '%';
    colorBox.style.opacity = 0.3 + (brushOpacity * 0.7);
  });

  blendSlider.addEventListener('input', e => {
    blendStrength = e.target.value / 100;
    document.getElementById('blendVal').innerText = e.target.value + '%';
  });

  brushSizeSlider.addEventListener('input', e => {
    brushSize = parseInt(e.target.value);
    document.getElementById('brushSizeVal').innerText = brushSize + 'px';
  });

  ['hsl-h', 'hsl-s', 'hsl-l'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateHSLPreview);
  });
}

function onKeyDown(e) {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    return;
  }

  if (e.code === 'Space') {
    if (!isSpacePressed) {
      isSpacePressed = true;
      workspace.style.cursor = 'grab';
    }
    e.preventDefault();
    return;
  }

  if (e.key === 'Control') {
    workspace.style.cursor = 'grab';
  }

  if (e.ctrlKey || e.metaKey) {
    if (e.code === 'KeyZ') {
      e.preventDefault();
      undo();
      trackButtonUsage('undo');
    } else if (e.code === 'KeyY') {
      e.preventDefault();
      redo();
      trackButtonUsage('redo');
    }
    return;
  }

  const code = e.code;
  switch (code) {
    case 'KeyA':
    case 'KeyP':
      setTool('pencil');
      trackButtonUsage('pencil');
      break;
    case 'KeyS':
    case 'KeyE':
      setTool('eraser');
      trackButtonUsage('eraser');
      break;
    case 'KeyF':
      setTool('bucket');
      trackButtonUsage('bucket');
      break;
    case 'KeyG':
      setTool('bucket_global');
      trackButtonUsage('bucket_global');
      break;
    case 'KeyD':
    case 'KeyI':
      setTool('eyedropper');
      trackButtonUsage('eyedropper');
      break;
    case 'KeyL':
      setTool('line');
      trackButtonUsage('line');
      break;
    case 'KeyR':
      setTool('rectangle');
      trackButtonUsage('rectangle');
      break;
    case 'KeyC':
      setTool('circle');
      trackButtonUsage('circle');
      break;
    case 'KeyS':
      setTool('spray');
      trackButtonUsage('spray');
      break;
    case 'KeyM':
      setTool('select');
      trackButtonUsage('select');
      break;
  }
}

function onKeyUp(e) {
  if (e.code === 'Space') {
    isSpacePressed = false;
    workspace.style.cursor = '';
  }
  if (e.key === 'Control') {
    workspace.style.cursor = '';
  }
}

function onPointerDown(ev) {
  if (isSpacePressed || (ev.pointerType === 'mouse' && ev.button !== 0)) {
    ev.preventDefault();
    isPanning = true;
    panStartX = ev.clientX - panX;
    panStartY = ev.clientY - panY;
    try {
      workspace.setPointerCapture(ev.pointerId);
    } catch (err) { }
    workspace.style.cursor = 'grabbing';
    return;
  }

  if (ev.altKey) {
    ev.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((ev.clientX - rect.left) / (rect.width / width));
    const y = Math.floor((ev.clientY - rect.top) / (rect.height / height));
    if (x >= 0 && x < width && y >= 0 && y < height) {
      const c = pixels[y][x];
      if (c) {
        setColor(c);
        showToast(t('colorCopied') + ': ' + c);
      }
    }
    return;
  }

  evCache.push(ev);

  if (evCache.length === 1) {
    currentStrokeId++;
    if (!strokeMask || strokeMask.length !== width * height) {
      strokeMask = new Uint32Array(width * height);
    }
    pointerDownTime = Date.now();
    canDraw = false;
    isDrawing = false;
    isGesture = false;
    window.lastDrawX = -1;
    window.lastDrawY = -1;

    clearTimeout(drawDelayTimer);
    const delay = ev.pointerType === 'mouse' ? 0 : DRAW_DELAY;
    if (delay === 0) {
      canDraw = true;
      isDrawing = true;
      processDraw(ev.clientX, ev.clientY, false);
    } else {
      drawDelayTimer = setTimeout(() => {
        if (evCache.length === 1) {
          canDraw = true;
          isDrawing = true;
          const firstEv = evCache[0];
          processDraw(firstEv.clientX, firstEv.clientY, false);
        }
      }, delay);
    }

  } else if (evCache.length === 2) {
    clearTimeout(drawDelayTimer);
    canDraw = false;
    isDrawing = false;
    isGesture = true;

    const touch1 = evCache[0];
    const touch2 = evCache[1];
    startPinchDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    startScale = scale;
    const rect = workspace.getBoundingClientRect();
    startClientX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
    startClientY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
    startPanX = panX;
    startPanY = panY;
  }
}

function onPointerMove(ev) {
  if (ev.ctrlKey) {
    panX += ev.movementX;
    panY += ev.movementY;
    updateTransform();
    return;
  }

  if (isPanning) {
    panX = ev.clientX - panStartX;
    panY = ev.clientY - panStartY;
    updateTransform();
    return;
  }

  const index = evCache.findIndex(cachedEv => cachedEv.pointerId === ev.pointerId);
  if (index !== -1) evCache[index] = ev;

  if (evCache.length === 2 && isGesture) {
    const touch1 = evCache[0];
    const touch2 = evCache[1];
    const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    const newScale = Math.max(0.005, Math.min(startScale * (dist / startPinchDist), 20));

    const rect = workspace.getBoundingClientRect();
    const cx = (touch1.clientX + touch2.clientX) / 2 - rect.left;
    const cy = (touch1.clientY + touch2.clientY) / 2 - rect.top;

    const worldX = (startClientX - startPanX) / startScale;
    const worldY = (startClientY - startPanY) / startScale;

    scale = newScale;
    panX = cx - worldX * scale;
    panY = cy - worldY * scale;

    updateTransform();
  } else if (evCache.length === 1 && canDraw && isDrawing) {
    processDraw(ev.clientX, ev.clientY, true);
  }
}

function onPointerUp(ev) {
  if (isPanning) {
    isPanning = false;
    try {
      workspace.releasePointerCapture(ev.pointerId);
    } catch (err) { }
    workspace.style.cursor = isSpacePressed ? 'grab' : '';
    return;
  }

  const index = evCache.findIndex(cachedEv => cachedEv.pointerId === ev.pointerId);
  if (index !== -1) evCache.splice(index, 1);

  clearTimeout(drawDelayTimer);

  if (evCache.length < 2) {
    isGesture = false;
    prevDiff = -1;
  }

  if (evCache.length === 0) {
    if (isDrawing && canDraw) {
      if (['line', 'rectangle', 'circle'].includes(currentTool) && shapeStartX !== -1) {
        shapeStartX = -1;
        shapeStartY = -1;
        isDrawingShape = false;
        previousShapePixels = [];
        tempCanvas = null;
      }
      if (isEditingUnicode) saveUnicodeState();
      else saveState();
      dirtyPixels.clear();
    }
    canDraw = false;
    isDrawing = false;
  }
}

function setupUnicodeGrid() {
  unicodeCanvas = document.getElementById('unicodeGridCanvas');
  unicodeCtx = unicodeCanvas.getContext('2d');
  const container = document.getElementById('unicodeGridContainer');
  if (!container) return;

  container.style.cursor = 'grab';
  if (unicodeCanvas) unicodeCanvas.style.cursor = '';

  container.addEventListener('pointerdown', unicodePointerDown);
  container.addEventListener('pointermove', unicodePointerMove);
  container.addEventListener('pointerup', unicodePointerUp);
  container.addEventListener('pointercancel', unicodePointerUp);
  container.addEventListener('pointerout', unicodePointerUp);
  container.addEventListener('pointerleave', unicodePointerUp);
  container.addEventListener('wheel', unicodeWheel, { passive: false });
}

function unicodePointerDown(ev) {
  ev.preventDefault();

  unicodeEvCache.push(ev);

  if (unicodeEvCache.length === 1) {
    unicodePointerDownTime = Date.now();
    unicodeIsDragging = true;
    unicodeHasMoved = false;
    unicodeLastX = ev.clientX;
    unicodeLastY = ev.clientY;
    unicodeStartX = ev.clientX;
    unicodeStartY = ev.clientY;
    unicodeTotalMovement = 0;
  } else if (unicodeEvCache.length === 2) {
    unicodeIsDragging = false;
    unicodeHasMoved = true;

    const touch1 = unicodeEvCache[0];
    const touch2 = unicodeEvCache[1];
    unicodeStartPinchDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    unicodeStartScale = unicodeScale;
    const rect = document.getElementById('unicodeGridContainer').getBoundingClientRect();
    unicodeLastTouchMidX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
    unicodeLastTouchMidY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
    unicodeStartPanX = unicodePanX;
    unicodeStartPanY = unicodePanY;
  }
}

function unicodePointerMove(ev) {
  ev.preventDefault();

  const index = unicodeEvCache.findIndex(cachedEv => cachedEv.pointerId === ev.pointerId);
  if (index !== -1) unicodeEvCache[index] = ev;

  if (unicodeEvCache.length === 2) {
    const touch1 = unicodeEvCache[0];
    const touch2 = unicodeEvCache[1];
    const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    const newScale = Math.max(0.5, Math.min(unicodeStartScale * (dist / unicodeStartPinchDist), 5));

    const rect = document.getElementById('unicodeGridContainer').getBoundingClientRect();
    const midX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
    const midY = (touch1.clientY + touch2.clientY) / 2 - rect.top;

    const worldX = (unicodeLastTouchMidX - unicodeStartPanX) / unicodeStartScale;
    const worldY = (unicodeLastTouchMidY - unicodeStartPanY) / unicodeStartScale;

    unicodeScale = newScale;
    unicodePanX = midX - worldX * unicodeScale;
    unicodePanY = midY - worldY * unicodeScale;

    updateUnicodeTransform();
    unicodeHasMoved = true;
  } else if (unicodeEvCache.length === 1 && unicodeIsDragging) {
    const dx = ev.clientX - unicodeLastX;
    const dy = ev.clientY - unicodeLastY;

    unicodeTotalMovement += Math.abs(dx) + Math.abs(dy);

    if (unicodeTotalMovement > MOVE_THRESHOLD) {
      unicodeHasMoved = true;
      const container = document.getElementById('unicodeGridContainer');
      if (container) container.style.cursor = 'grabbing';
      if (unicodeCanvas) unicodeCanvas.style.cursor = 'grabbing';
    }

    unicodePanX += dx;
    unicodePanY += dy;
    unicodeLastX = ev.clientX;
    unicodeLastY = ev.clientY;
    updateUnicodeTransform();
  }
}

function unicodePointerUp(ev) {
  ev.preventDefault();

  const index = unicodeEvCache.findIndex(cachedEv => cachedEv.pointerId === ev.pointerId);
  if (index !== -1) unicodeEvCache.splice(index, 1);

  if (unicodeEvCache.length === 0) {
    const clickDuration = Date.now() - unicodePointerDownTime;
    const totalMove = Math.hypot(ev.clientX - unicodeStartX, ev.clientY - unicodeStartY);

    const isClick = clickDuration < CLICK_THRESHOLD &&
      totalMove < MOVE_THRESHOLD &&
      !unicodeHasMoved;

    if (isClick) {
      const rect = unicodeCanvas.getBoundingClientRect();

      const clickX = ev.clientX - rect.left;
      const clickY = ev.clientY - rect.top;

      const displayWidth = rect.width;
      const displayHeight = rect.height;

      const canvasX = (clickX / displayWidth) * unicodeGridSize;
      const canvasY = (clickY / displayHeight) * unicodeGridSize;

      const x = Math.floor(canvasX / unicodeCellSize);
      const y = Math.floor(canvasY / unicodeCellSize);

      if (x >= 0 && x < unicodeGridCells && y >= 0 && y < unicodeGridCells) {
        selectedUnicodeCell = { x, y };
        setTimeout(() => {
          showCellActionModal(x, y);
        }, 50);
      }
    }

    unicodeIsDragging = false;
    unicodeHasMoved = false;
    unicodeTotalMovement = 0;
    const container = document.getElementById('unicodeGridContainer');
    if (container) container.style.cursor = 'grab';
    if (unicodeCanvas) unicodeCanvas.style.cursor = '';
  } else if (unicodeEvCache.length === 1) {
    unicodeLastX = unicodeEvCache[0].clientX;
    unicodeLastY = unicodeEvCache[0].clientY;
    const rect = document.getElementById('unicodeGridContainer').getBoundingClientRect();
    unicodeLastTouchMidX = unicodeEvCache[0].clientX - rect.left;
    unicodeLastTouchMidY = unicodeEvCache[0].clientY - rect.top;
    unicodeStartPanX = unicodePanX;
    unicodeStartPanY = unicodePanY;
    unicodeIsDragging = true;
  }
}

function unicodeWheel(ev) {
  ev.preventDefault();
  const container = document.getElementById('unicodeGridContainer');
  if (!container || !unicodeCanvas) return;
  const rect = container.getBoundingClientRect();
  const mouseX = ev.clientX - rect.left;
  const mouseY = ev.clientY - rect.top;

  const unscaledX = (mouseX - unicodePanX) / unicodeScale;
  const unscaledY = (mouseY - unicodePanY) / unicodeScale;

  const delta = -Math.sign(ev.deltaY) * 0.15;
  const newScale = Math.max(0.2, Math.min(unicodeScale * (1 + delta), 10));

  unicodeScale = newScale;
  unicodePanX = mouseX - unscaledX * unicodeScale;
  unicodePanY = mouseY - unscaledY * unicodeScale;

  updateUnicodeTransform();
}

function updateUnicodeTransform() {
  unicodeCanvas.style.transform = `translate(${unicodePanX}px, ${unicodePanY}px) scale(${unicodeScale})`;
}

function openUnicodeSizeSelector() {
  document.getElementById('unicodeSizeModal').classList.add('open');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeUnicodeSizeModal() {
  document.getElementById('unicodeSizeModal').classList.remove('open');
}

function openUnicodeWithSize(size) {
  closeUnicodeSizeModal();
  if (document.getElementById('menuModal').classList.contains('open')) {
    toggleMenu();
  }
  unicodeGridSize = size;
  unicodeGridCells = size === 256 ? 16 : 32;
  unicodeCellSize = size === 256 ? 16 : 32;
  openUnicodeModal();
}

function resetUnicodeView() {
  const container = document.getElementById('unicodeGridContainer');
  const rect = container.getBoundingClientRect();
  const minDim = Math.min(rect.width, rect.height);
  unicodeScale = (minDim - 40) / unicodeGridSize;
  unicodePanX = (rect.width - unicodeGridSize * unicodeScale) / 2;
  unicodePanY = (rect.height - unicodeGridSize * unicodeScale) / 2;
  updateUnicodeTransform();
  if (container) container.style.cursor = 'grab';
  if (unicodeCanvas) unicodeCanvas.style.cursor = '';
}

function showCellActionModal(cellX, cellY) {
  if (cellModalLocked) return;
  cellModalLocked = true;

  const prefix = unicodeGridSize === 256 ? 'E0' : 'E1';
  const rowHex = cellY.toString(16).toUpperCase().padStart(2, '0');
  const colHex = cellX.toString(16).toUpperCase().padStart(2, '0');
  const code = `${prefix}${rowHex}${colHex}`;
  document.getElementById('cellTitle').textContent = `Ячейка ${code}`;
  document.getElementById('cellCoords').textContent = `Координаты: ${cellX}, ${cellY} (${unicodeGridCells}x${unicodeGridCells})`;
  document.getElementById('cellActionModal').classList.add('open');
  if (typeof lucide !== 'undefined') lucide.createIcons();

  setTimeout(() => {
    cellModalLocked = false;
  }, 300);
}

function closeCellActionModal() {
  document.getElementById('cellActionModal').classList.remove('open');
  cellModalLocked = false;
}

function editSelectedCell() {
  if (!selectedUnicodeCell) {
    showToast(t('cellNotSelected'));
    return;
  }

  const prefix = unicodeGridSize === 256 ? 'e0' : 'e1';
  const key = `${prefix}_${selectedUnicodeCell.x}_${selectedUnicodeCell.y}`;
  unicodeCellToEdit = {
    ...selectedUnicodeCell,
    key: key,
    gridSize: unicodeGridSize
  };

  const cellPixelSize = unicodeGridSize === 256 ? 16 : 32;

  if (unicodeGlyphs[key] && Array.isArray(unicodeGlyphs[key])) {
    pixels = clonePixels(unicodeGlyphs[key]);
    width = pixels[0] ? pixels[0].length : cellPixelSize;
    height = pixels.length;

    if (width !== cellPixelSize || height !== cellPixelSize) {
      const newPixels = Array(cellPixelSize).fill().map(() => Array(cellPixelSize).fill(null));
      for (let y = 0; y < Math.min(height, cellPixelSize); y++) {
        for (let x = 0; x < Math.min(width, cellPixelSize); x++) {
          if (pixels[y] && pixels[y][x]) {
            newPixels[y][x] = pixels[y][x];
          }
        }
      }
      pixels = newPixels;
      width = cellPixelSize;
      height = cellPixelSize;
    }
  } else {
    width = cellPixelSize;
    height = cellPixelSize;
    pixels = Array(height).fill().map(() => Array(width).fill(null));
  }

  isEditingUnicode = true;
  unicodeHistory = [];
  unicodeHistoryStep = -1;
  saveUnicodeState();

  setupCanvas();
  render();
  resetView();
  closeCellActionModal();
  closeUnicodeModal();
  saveUnicodeBtn.classList.add('visible');

  const code = unicodeGridSize === 256 ?
    `E0${selectedUnicodeCell.y.toString(16).toUpperCase().padStart(2, '0')}${selectedUnicodeCell.x.toString(16).toUpperCase().padStart(2, '0')}` :
    `E1${selectedUnicodeCell.y.toString(16).toUpperCase().padStart(2, '0')}${selectedUnicodeCell.x.toString(16).toUpperCase().padStart(2, '0')}`;

  showToast(`${t('editing')} ${code} (${width}x${height})`);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function copySelectedCellSymbol() {
  if (!selectedUnicodeCell) return;
  const baseCode = unicodeGridSize === 256 ? 0xE000 : 0xE100;
  const code = baseCode + (selectedUnicodeCell.y * unicodeGridCells + selectedUnicodeCell.x);
  const char = String.fromCodePoint(code);
  navigator.clipboard.writeText(char).then(() => {
    showToast(`${t('copied')}: ${char}`);
    closeCellActionModal();
  });
}

function renderUnicodeGrid() {
  unicodeCanvas.width = unicodeGridSize;
  unicodeCanvas.height = unicodeGridSize;

  const imgData = unicodeCtx.createImageData(unicodeGridSize, unicodeGridSize);
  const data = imgData.data;
  data.fill(0);

  const prefix = unicodeGridSize === 256 ? 'e0' : 'e1';

  for (let row = 0; row < unicodeGridCells; row++) {
    for (let col = 0; col < unicodeGridCells; col++) {
      const key = `${prefix}_${col}_${row}`;
      if (unicodeGlyphs[key]) {
        const glyphData = unicodeGlyphs[key];
        const startX = col * unicodeCellSize;
        const startY = row * unicodeCellSize;

        if (Array.isArray(glyphData)) {
          for (let y = 0; y < glyphData.length && y < unicodeCellSize; y++) {
            if (Array.isArray(glyphData[y])) {
              for (let x = 0; x < glyphData[y].length && x < unicodeCellSize; x++) {
                const color = glyphData[y][x];
                if (color) {
                  const rgb = getCachedRgb(color);
                  const idx = ((startY + y) * unicodeGridSize + (startX + x)) * 4;
                  data[idx] = rgb.r;
                  data[idx + 1] = rgb.g;
                  data[idx + 2] = rgb.b;
                  data[idx + 3] = 255;
                }
              }
            }
          }
        }
      }
    }
  }

  unicodeCtx.putImageData(imgData, 0, 0);

  if (gridEnabled) {
    const isLightBg = (typeof currentCanvasBg !== 'undefined' && currentCanvasBg === 'light');
    unicodeCtx.strokeStyle = isLightBg ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.4)';
    unicodeCtx.lineWidth = 2;
    unicodeCtx.beginPath();
    for (let i = 0; i <= unicodeGridCells; i++) {
      const pos = i * unicodeCellSize;
      unicodeCtx.moveTo(pos, 0);
      unicodeCtx.lineTo(pos, unicodeGridSize);
      unicodeCtx.moveTo(0, pos);
      unicodeCtx.lineTo(unicodeGridSize, pos);
    }
    unicodeCtx.stroke();

    if (unicodeScale >= 0.8) {
      unicodeCtx.strokeStyle = isLightBg ? 'rgba(0, 0, 0, 0.18)' : 'rgba(255, 255, 255, 0.1)';
      unicodeCtx.lineWidth = 0.5;
      unicodeCtx.beginPath();
      for (let i = 1; i < unicodeGridSize; i++) {
        if (i % unicodeCellSize !== 0) {
          unicodeCtx.moveTo(i, 0);
          unicodeCtx.lineTo(i, unicodeGridSize);
          unicodeCtx.moveTo(0, i);
          unicodeCtx.lineTo(unicodeGridSize, i);
        }
      }
      unicodeCtx.stroke();
    }
  }
}

function saveUnicodeCell() {
  if (!isEditingUnicode || !unicodeCellToEdit) {
    showToast(t('noDataToSave'));
    return;
  }

  const key = unicodeCellToEdit.key;
  unicodeGlyphs[key] = clonePixels(pixels);
  saveUnicodeGlyphs();

  isEditingUnicode = false;
  unicodeCellToEdit = null;
  saveUnicodeBtn.classList.remove('visible');

  showToast(t('unicodeSaved'));

  setTimeout(() => {
    openUnicodeModal();
    setTimeout(() => {
      renderUnicodeGrid();
    }, 100);
  }, 100);
}

function loadUnicodeGlyphs() {
  try {
    const saved = localStorage.getItem('unicode_glyphs_v3');
    if (saved) {
      const loaded = JSON.parse(saved);
      if (typeof loaded === 'object' && loaded !== null) {
        unicodeGlyphs = loaded;
      }
    }
  } catch (e) {
    unicodeGlyphs = {};
  }
}

function saveUnicodeGlyphs() {
  const saveFn = () => {
    try {
      localStorage.setItem('unicode_glyphs_v3', JSON.stringify(unicodeGlyphs));
    } catch (e) {
      showToast(t('error'));
    }
  };
  if (window.requestIdleCallback) window.requestIdleCallback(saveFn);
  else setTimeout(saveFn, 0);
}

function openUnicodeModal() {
  const unicodeTarget = document.getElementById('unicodeGridContainer');
  if (unicodeTarget && typeof currentCanvasBg !== 'undefined') {
    unicodeTarget.classList.remove('bg-dark', 'bg-light', 'bg-gray');
    unicodeTarget.classList.add('bg-' + currentCanvasBg);
  }
  document.getElementById('unicodeModal').classList.add('open');
  document.getElementById('unicodeHeaderTitle').textContent = `Unicode Grid (${unicodeGridCells}x${unicodeGridCells})`;
  setTimeout(() => {
    resetUnicodeView();
    renderUnicodeGrid();
  }, 100);
}

function closeUnicodeModal() {
  document.getElementById('unicodeModal').classList.remove('open');
}

function downloadUnicodeGlyph() {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = unicodeGridSize;
  exportCanvas.height = unicodeGridSize;
  const exportCtx = exportCanvas.getContext('2d', { alpha: true });
  exportCtx.imageSmoothingEnabled = false;
  exportCtx.clearRect(0, 0, unicodeGridSize, unicodeGridSize);

  const imgData = exportCtx.createImageData(unicodeGridSize, unicodeGridSize);
  const data = imgData.data;

  // Fill transparent initially
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
  }

  const prefix = unicodeGridSize === 256 ? 'e0' : 'e1';

  for (let row = 0; row < unicodeGridCells; row++) {
    for (let col = 0; col < unicodeGridCells; col++) {
      const key = `${prefix}_${col}_${row}`;
      if (unicodeGlyphs[key]) {
        const glyphData = unicodeGlyphs[key];
        const startX = col * unicodeCellSize;
        const startY = row * unicodeCellSize;
        if (Array.isArray(glyphData)) {
          for (let y = 0; y < glyphData.length && y < unicodeCellSize; y++) {
            if (Array.isArray(glyphData[y])) {
              for (let x = 0; x < glyphData[y].length && x < unicodeCellSize; x++) {
                const color = glyphData[y][x];
                if (color) {
                  const rgb = getCachedRgb(color);
                  const idx = ((startY + y) * unicodeGridSize + (startX + x)) * 4;
                  data[idx] = rgb.r;
                  data[idx + 1] = rgb.g;
                  data[idx + 2] = rgb.b;
                  data[idx + 3] = 255;
                }
              }
            }
          }
        }
      }
    }
  }

  exportCtx.putImageData(imgData, 0, 0);

  const a = document.createElement('a');
  a.download = `glyph_${unicodeGridSize === 256 ? 'E0' : 'E1'}_${unicodeGridSize}x${unicodeGridSize}.png`;
  a.href = exportCanvas.toDataURL();
  a.click();
  showToast(t('gridSaved'));
}

async function requestUnicodeImport() {
  const ok = await showCustomConfirm({
    title: t('importTitle') || 'Импорт',
    message: t('confirmImport')
  });
  if (ok) {
    document.getElementById('unicodeImportInput').click();
  }
}

function handleUnicodeImageImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      processImageToUnicodeGrid(img);
      event.target.value = '';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function processImageToUnicodeGrid(img) {
  const targetSize = unicodeGridSize;
  const cellsPerRow = unicodeGridCells;
  const cellPixelSize = unicodeCellSize;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = targetSize;
  tempCanvas.height = targetSize;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.imageSmoothingEnabled = false;
  tempCtx.clearRect(0, 0, targetSize, targetSize);
  const scale = Math.min(targetSize / img.width, targetSize / img.height);
  const drawW = Math.max(1, Math.round(img.width * scale));
  const drawH = Math.max(1, Math.round(img.height * scale));
  const offsetX = Math.round((targetSize - drawW) / 2);
  const offsetY = Math.round((targetSize - drawH) / 2);
  tempCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

  const imageData = tempCtx.getImageData(0, 0, targetSize, targetSize);
  const data = imageData.data;

  const prefix = unicodeGridSize === 256 ? 'e0' : 'e1';

  for (let row = 0; row < cellsPerRow; row++) {
    for (let col = 0; col < cellsPerRow; col++) {
      const cellPixels = [];
      const startX = col * cellPixelSize;
      const startY = row * cellPixelSize;

      for (let y = 0; y < cellPixelSize; y++) {
        const rowPixels = [];
        for (let x = 0; x < cellPixelSize; x++) {
          const imgX = startX + x;
          const imgY = startY + y;
          const idx = (imgY * targetSize + imgX) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a > 0) {
            rowPixels.push(rgbToHex(r, g, b));
          } else {
            rowPixels.push(null);
          }
        }
        cellPixels.push(rowPixels);
      }

      const key = `${prefix}_${col}_${row}`;
      unicodeGlyphs[key] = cellPixels;
    }
  }

  saveUnicodeGlyphs();
  renderUnicodeGrid();
  showToast(t('imageLoaded'));
}

function setBrushType(type) {
  brushType = type;
  document.querySelectorAll('.brush-type-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

function applyBrushPixels(centerX, centerY) {
  const radius = Math.floor(brushSize / 2);
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      let shouldDraw = false;
      if (brushType === 'square') shouldDraw = true;
      else if (brushType === 'circle') {
        const dist = Math.sqrt(dx * dx + dy * dy);
        shouldDraw = dist <= radius;
      } else if (brushType === 'diamond') {
        shouldDraw = Math.abs(dx) + Math.abs(dy) <= radius;
      }
      if (shouldDraw) {
        drawPixelDirect(x, y);
        applyMirror(x, y);
      }
    }
  }
}

function openImageImportSelector() {
  document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    showToast(t('unsupportedFormat'));
    return;
  }

  pendingImageFile = file;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      pendingImageElement = img;
      document.getElementById('importModal').classList.add('open');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function closeImportModal() {
  document.getElementById('importModal').classList.remove('open');
  pendingImageFile = null;
  pendingImageElement = null;
}

function processImageImport(mode) {
  if (!pendingImageElement) return;

  const img = pendingImageElement;

  if (mode === 'fit') {
    loadImageToCanvas(img, width, height);
    showToast(t('imageLoaded'));
    closeImportModal();
    if (document.getElementById('menuModal').classList.contains('open')) {
      toggleMenu();
    }
    if (isEditingUnicode) saveUnicodeState();
    else saveStateImmediate();
  } else if (mode === 'resize') {
    const MAX_DIM = 4000;
    const MAX_PIXELS = 4000000;
    let newWidth = img.width;
    let newHeight = img.height;
    if (newWidth > MAX_DIM || newHeight > MAX_DIM || (newWidth * newHeight) > MAX_PIXELS) {
      const scaleDim = Math.min(MAX_DIM / newWidth, MAX_DIM / newHeight);
      const scalePix = Math.sqrt(MAX_PIXELS / (newWidth * newHeight));
      const s = Math.min(scaleDim, scalePix, 1);
      newWidth = Math.max(1, Math.round(newWidth * s));
      newHeight = Math.max(1, Math.round(newHeight * s));
    }
    width = newWidth;
    height = newHeight;
    const customSizeInputEl = document.getElementById('customSizeInput');
    if (customSizeInputEl) customSizeInputEl.value = `${width}x${height}`;
    setupCanvas();
    pixels = Array(height).fill().map(() => Array(width).fill(null));
    loadImageToCanvas(img, width, height);
    showToast(t('imageLoaded'));
    closeImportModal();
    if (document.getElementById('menuModal').classList.contains('open')) {
      toggleMenu();
    }
    if (isEditingUnicode) saveUnicodeState();
    else saveStateImmediate();
  }
}

function loadImageToCanvas(img, targetWidth, targetHeight) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = targetWidth;
  tempCanvas.height = targetHeight;
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  tempCtx.imageSmoothingEnabled = false;
  tempCtx.drawImage(img, 0, 0, targetWidth, targetHeight);
  const imageData = tempCtx.getImageData(0, 0, targetWidth, targetHeight);
  const data = imageData.data;
  const stride = imageData.width;
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const i = (y * stride + x) * 4;
      if (data[i + 3] > 0) pixels[y][x] = rgbToHex(data[i], data[i + 1], data[i + 2]);
      else pixels[y][x] = null;
    }
  }
  render();
  resetView();
}

function openHSLModal() {
  const [h, s, l] = hexToHsl(currentColor);
  currentHSL = { h, s, l };
  document.getElementById('hsl-h').value = h;
  document.getElementById('hsl-s').value = s;
  document.getElementById('hsl-l').value = l;
  updateHSLPreview();
  document.getElementById('hslModal').classList.add('open');
}

function closeHSLModal() {
  document.getElementById('hslModal').classList.remove('open');
}

function applyHSLColor() {
  const h = parseInt(document.getElementById('hsl-h').value);
  const s = parseInt(document.getElementById('hsl-s').value);
  const l = parseInt(document.getElementById('hsl-l').value);
  const newColor = hslToHex(h, s, l);
  setColor(newColor, true, true);
  closeHSLModal();
  showToast(t('colorCopied'));
}

function updateHSLPreview() {
  const h = document.getElementById('hsl-h').value;
  const s = document.getElementById('hsl-s').value;
  const l = document.getElementById('hsl-l').value;
  document.getElementById('hslPreview').style.background = `hsl(${h}, ${s}%, ${l}%)`;
  document.getElementById('hsl-s').style.color = `hsl(${h}, 100%, 50%)`;
  document.getElementById('hsl-l').style.color = `hsl(${h}, ${s}%, 50%)`;
  document.getElementById('hsl-h-val').innerText = h + '°';
  document.getElementById('hsl-s-val').innerText = s + '%';
  document.getElementById('hsl-l-val').innerText = l + '%';
}

function setColor(hex, updateInputs = true, updateSlider = true) {
  currentColor = hex.toUpperCase();
  currentRgb = hexToRgb(currentColor);
  colorBox.style.backgroundColor = currentColor;
  hexInput.value = currentColor;
  if (updateSlider) {
    const [h, s, l] = hexToHsl(currentColor);
    brightSlider.value = l;
    document.getElementById('brightVal').innerText = l + '%';
  }
}

function blendColors(bgHex, alpha) {
  if (alpha >= 1 || !bgHex) return currentColor;
  const bg = hexToRgb(bgHex);
  const r = Math.round(alpha * currentRgb.r + (1 - alpha) * bg.r);
  const g = Math.round(alpha * currentRgb.g + (1 - alpha) * bg.g);
  const b = Math.round(alpha * currentRgb.b + (1 - alpha) * bg.b);
  return rgbToHex(r, g, b);
}

function openMirrorModal() {
  document.getElementById('mirrorModal').classList.add('open');
  updateMirrorUI();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeMirrorModal() {
  document.getElementById('mirrorModal').classList.remove('open');
}

function setMirrorMode(mode) {
  mirrorMode = mode;
  updateMirrorUI();
  closeMirrorModal();
  const btn = document.getElementById('mirrorBtn');
  if (mode === 'off') {
    btn.classList.remove('active');
    showToast(t('mirrorOffToast'));
  } else {
    btn.classList.add('active');
    showToast(mode === 'horizontal' ? t('mirrorHToast') : t('mirrorVToast'));
  }
}

function updateMirrorUI() {
  document.getElementById('mirrorHBtn').classList.toggle('active', mirrorMode === 'horizontal');
  document.getElementById('mirrorVBtn').classList.toggle('active', mirrorMode === 'vertical');
  document.getElementById('mirrorOffBtn').classList.toggle('active', mirrorMode === 'off');
}

function processDraw(cx, cy, isDrag) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((cx - rect.left) / (rect.width / width));
  const y = Math.floor((cy - rect.top) / (rect.height / height));
  if (x < 0 || x >= width || y < 0 || y >= height) return;

  if (currentTool === 'bucket' && !isDrag) {
    floodFill(x, y);
    isDrawing = false;
    canDraw = false;
    return;
  }
  if (currentTool === 'bucket_global' && !isDrag) {
    globalFill(x, y);
    isDrawing = false;
    canDraw = false;
    return;
  }
  if (currentTool === 'eyedropper' && !isDrag) {
    const c = pixels[y][x];
    if (c) {
      setColor(c);
      setTool('pencil');
      showToast(t('colorCopied') + ': ' + c);
    }
    return;
  }
  if (['line', 'rectangle', 'circle'].includes(currentTool)) {
    if (!isDrag) {
      shapeStartX = x;
      shapeStartY = y;
      previousShapePixels = [];
    } else if (shapeStartX !== -1) {
      for (let i = previousShapePixels.length - 1; i >= 0; i--) {
        const p = previousShapePixels[i];
        pixels[p.y][p.x] = p.color;
        dirtyPixels.add(p.y * width + p.x);
      }
      previousShapePixels = [];
      isDrawingShape = true;
      drawShape(shapeStartX, shapeStartY, x, y);
      isDrawingShape = false;
      scheduleRender();
    }
    return;
  }
  if (currentTool === 'spray') {
    drawSpray(x, y);
    return;
  }

  if (isDrag && window.lastDrawX !== -1) {
    const steps = Math.max(Math.abs(x - window.lastDrawX), Math.abs(y - window.lastDrawY));
    if (steps > 1) {
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const ix = Math.round(window.lastDrawX + (x - window.lastDrawX) * t);
        const iy = Math.round(window.lastDrawY + (y - window.lastDrawY) * t);
        applyBrushPixels(ix, iy);
      }
    } else {
      applyBrushPixels(x, y);
    }
  } else {
    applyBrushPixels(x, y);
  }
  window.lastDrawX = x;
  window.lastDrawY = y;
}

function applyMirror(px, py) {
  if (mirrorMode === 'horizontal') {
    const mirrorX = width - 1 - px;
    if (mirrorX >= 0 && mirrorX < width) drawPixelDirect(mirrorX, py);
  } else if (mirrorMode === 'vertical') {
    const mirrorY = height - 1 - py;
    if (mirrorY >= 0 && mirrorY < height) drawPixelDirect(px, mirrorY);
  }
}

function drawShape(x1, y1, x2, y2) {
  if (currentTool === 'line') drawLine(x1, y1, x2, y2);
  else if (currentTool === 'rectangle') drawRectangle(x1, y1, x2, y2);
  else if (currentTool === 'circle') drawCircle(x1, y1, x2, y2);
}

function drawLine(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  let x = x1, y = y1;
  while (true) {
    drawPixelDirect(x, y);
    applyMirror(x, y);
    if (x === x2 && y === y2) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
  }
}

function drawRectangle(x1, y1, x2, y2) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  for (let x = minX; x <= maxX; x++) {
    drawPixelDirect(x, minY);
    drawPixelDirect(x, maxY);
    applyMirror(x, minY);
    applyMirror(x, maxY);
  }
  for (let y = minY; y <= maxY; y++) {
    drawPixelDirect(minX, y);
    drawPixelDirect(maxX, y);
    applyMirror(minX, y);
    applyMirror(maxX, y);
  }
}

function drawCircle(x1, y1, x2, y2) {
  const cx = x1, cy = y1;
  const radius = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
  let x = radius, y = 0, err = 0;
  while (x >= y) {
    drawPixelDirect(cx + x, cy + y);
    drawPixelDirect(cx + y, cy + x);
    drawPixelDirect(cx - y, cy + x);
    drawPixelDirect(cx - x, cy + y);
    drawPixelDirect(cx - x, cy - y);
    drawPixelDirect(cx - y, cy - x);
    drawPixelDirect(cx + y, cy - x);
    drawPixelDirect(cx + x, cy - y);
    applyMirror(cx + x, cy + y);
    applyMirror(cx + y, cy + x);
    applyMirror(cx - y, cy + x);
    applyMirror(cx - x, cy + y);
    applyMirror(cx - x, cy - y);
    applyMirror(cx - y, cy - x);
    applyMirror(cx + y, cy - x);
    applyMirror(cx + x, cy - y);
    if (err <= 0) { y += 1; err += 2 * y + 1; }
    if (err > 0) { x -= 1; err -= 2 * x + 1; }
  }
}

function drawSpray(cx, cy) {
  const radius = brushSize * 2;
  const density = brushSize * 3;
  for (let i = 0; i < density; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const x = Math.round(cx + Math.cos(angle) * dist);
    const y = Math.round(cy + Math.sin(angle) * dist);
    if (x >= 0 && x < width && y >= 0 && y < height) {
      drawPixelDirect(x, y);
      applyMirror(x, y);
    }
  }
}

function drawPixelDirect(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;

  let newColor;
  if (currentTool === 'eraser') newColor = null;
  else {
    const oldColor = pixels[y][x];
    const finalAlpha = brushOpacity * blendStrength;
    newColor = blendColors(oldColor, finalAlpha);
  }
  if (pixels[y][x] !== newColor) {
    if (isDrawingShape) {
      previousShapePixels.push({ x, y, color: pixels[y][x] });
    }
    pixels[y][x] = newColor;
    dirtyPixels.add(y * width + x);
    scheduleRender();
  }
}

function scheduleRender() {
  if (renderScheduled) return;
  renderScheduled = true;
  requestAnimationFrame(() => {
    try {
      renderDirtyPixels();
    } finally {
      renderScheduled = false;
    }
  });
}

function renderDirtyPixels() {
  if (dirtyPixels.size === 0) return;
  
  for (const idx of dirtyPixels) {
    const x = idx % width;
    const y = Math.floor(idx / width);
    if (!pixels || !pixels[y]) continue;

    const color = pixels[y][x];
    if (color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    } else {
      ctx.clearRect(x, y, 1, 1);
    }
  }
  dirtyPixels.clear();
}

function drawGrid() {
  const gridOverlay = document.getElementById('gridOverlay');
  if (!gridOverlay) return;

  gridOverlay.style.width = (width * cellSize) + 'px';
  gridOverlay.style.height = (height * cellSize) + 'px';
  gridOverlay.style.top = canvas.offsetTop + 'px';
  gridOverlay.style.left = canvas.offsetLeft + 'px';

  if (!gridEnabled) {
    gridOverlay.style.opacity = 0;
    return;
  }

  const GRID_VISIBLE_SCALE = getGridVisibleScale();
  const GRID_FADE_RANGE = 0.5;
  if (scale < GRID_VISIBLE_SCALE - GRID_FADE_RANGE) {
    gridOverlay.style.opacity = 0;
    return;
  }
  
  let gridOpacity = 0;
  if (scale >= GRID_VISIBLE_SCALE) gridOpacity = 0.55;
  else {
    const progress = (scale - (GRID_VISIBLE_SCALE - GRID_FADE_RANGE)) / GRID_FADE_RANGE;
    gridOpacity = progress * 0.55;
  }
  if (scale > GRID_VISIBLE_SCALE + 2) gridOpacity = Math.min(0.85, 0.55 + (scale - GRID_VISIBLE_SCALE - 2) * 0.05);

  let mult = 1.1;
  if (currentCanvasBg === 'light') mult = 1.5;
  if (currentCanvasBg === 'gray') mult = 1.6;
  gridOverlay.style.opacity = Math.min(1, gridOpacity * mult);
  
  let colorStr = '255, 255, 255';
  if (currentCanvasBg === 'light') colorStr = '0, 0, 0';
  else if (currentCanvasBg === 'gray') colorStr = '255, 255, 255';
  
  if (width <= 64 && height <= 64) {
    gridOverlay.style.backgroundSize = `${cellSize}px ${cellSize}px`;
    gridOverlay.style.backgroundImage = `
      linear-gradient(to right, rgba(${colorStr}, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(${colorStr}, 0.5) 1px, transparent 1px)
    `;
  } else {
    const lineThickness = 0.4;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cellSize}" height="${cellSize}"><line x1="0" y1="0" x2="0" y2="${cellSize}" stroke="rgba(${colorStr}, 0.5)" stroke-width="${lineThickness}" /><line x1="0" y1="0" x2="${cellSize}" y2="0" stroke="rgba(${colorStr}, 0.5)" stroke-width="${lineThickness}" /></svg>`;
    gridOverlay.style.backgroundSize = `${cellSize}px ${cellSize}px`;
    gridOverlay.style.backgroundImage = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }
}

let customPalettes = [];
try {
  customPalettes = JSON.parse(localStorage.getItem('pap_custom_palettes')) || [];
} catch (e) {
  customPalettes = [];
}
let modifiedCustom = false;
customPalettes.forEach((p, idx) => {
  if (!p.id) {
    p.id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9) + idx;
    modifiedCustom = true;
  }
});
if (modifiedCustom) localStorage.setItem('pap_custom_palettes', JSON.stringify(customPalettes));

let paletteOrder = [];
try {
  paletteOrder = JSON.parse(localStorage.getItem('pap_palette_order')) || [];
} catch (e) {
  paletteOrder = [];
}

function generateBigPalette() {
  const palDiv = document.getElementById('bigPalette');
  if (!palDiv) return;
  palDiv.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const stdPalettesData = {
    'std_basic': { name: t('basic') || 'Basic', colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'] },
    'std_grayscale': { name: t('grayscale') || 'Grayscale', colors: ['#FFFFFF', '#E0E0E0', '#C0C0C0', '#A0A0A0', '#808080', '#606060', '#404040', '#202020', '#000000'] },
    'std_material': { name: t('material') || 'Material', colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'] },
    'std_pastel': { name: t('pastel') || 'Pastel', colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E6B3FF', '#FFB3E6', '#B3FFFF'] },
    'std_warm': { name: t('warm') || 'Warm', colors: ['#FF6B6B', '#FF8E53', '#FE6B8B', '#FF8E53', '#C44569', '#F8B500', '#FF6348', '#FF9F43'] },
    'std_cool': { name: t('cool') || 'Cool', colors: ['#4834D4', '#686DE0', '#30336B', '#22A6B3', '#0984E3', '#6C5CE7', '#74B9FF', '#A29BFE'] }
  };

  const currentIds = [...Object.keys(stdPalettesData), ...customPalettes.map(p => p.id)];

  paletteOrder = paletteOrder.filter(id => currentIds.includes(id));

  currentIds.forEach(id => {
    if (!paletteOrder.includes(id)) {
      paletteOrder.push(id);
    }
  });

  localStorage.setItem('pap_palette_order', JSON.stringify(paletteOrder));

  paletteOrder.forEach((id, pIdx) => {
    const isCustom = id.startsWith('custom_');
    let palette;
    let customPaletteIndex = -1;
    if (isCustom) {
      customPaletteIndex = customPalettes.findIndex(p => p.id === id);
      palette = customPalettes[customPaletteIndex];
    } else {
      palette = stdPalettesData[id];
    }

    if (!palette) return;

    const group = document.createElement('div');
    group.className = 'palette-group ' + (isCustom ? 'custom-palette-group' : 'standard-palette-group');

    const titleContainer = document.createElement('div');
    titleContainer.className = 'palette-section-title';
    titleContainer.style.display = 'flex';
    titleContainer.style.justifyContent = 'space-between';
    titleContainer.style.alignItems = 'center';
    titleContainer.style.marginTop = '12px';

    const titleText = document.createElement('span');
    titleText.textContent = palette.name;
    titleContainer.appendChild(titleText);

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';

    const moveUpBtn = document.createElement('button');
    moveUpBtn.className = 'add-palette-btn';
    moveUpBtn.style.padding = '6px 10px';
    moveUpBtn.innerHTML = '<i data-lucide="chevron-up" style="width:16px;height:16px"></i>';
    moveUpBtn.title = t('moveUp') || 'Переместить вверх';
    if (pIdx === 0) {
      moveUpBtn.style.opacity = '0.3';
      moveUpBtn.style.cursor = 'not-allowed';
    } else {
      moveUpBtn.onclick = (e) => {
        e.stopPropagation();
        movePaletteUp(pIdx);
      };
    }
    actions.appendChild(moveUpBtn);

    const moveDownBtn = document.createElement('button');
    moveDownBtn.className = 'add-palette-btn';
    moveDownBtn.style.padding = '6px 10px';
    moveDownBtn.innerHTML = '<i data-lucide="chevron-down" style="width:16px;height:16px"></i>';
    moveDownBtn.title = t('moveDown') || 'Переместить вниз';
    if (pIdx === paletteOrder.length - 1) {
      moveDownBtn.style.opacity = '0.3';
      moveDownBtn.style.cursor = 'not-allowed';
    } else {
      moveDownBtn.onclick = (e) => {
        e.stopPropagation();
        movePaletteDown(pIdx);
      };
    }
    actions.appendChild(moveDownBtn);

    if (isCustom) {
      const addColorBtn = document.createElement('button');
      addColorBtn.className = 'add-palette-btn';
      addColorBtn.style.padding = '6px 10px';
      addColorBtn.innerHTML = '<i data-lucide="plus" style="width:16px;height:16px"></i>';
      addColorBtn.title = t('addColorToPalette') || 'Добавить текущий цвет';
      addColorBtn.onclick = (e) => {
        e.stopPropagation();
        addColorToCustomPalette(customPaletteIndex);
      };
      actions.appendChild(addColorBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'add-palette-btn';
      deleteBtn.style.background = 'rgba(230,57,70,0.2)';
      deleteBtn.style.color = '#e63946';
      deleteBtn.style.padding = '6px 10px';
      deleteBtn.innerHTML = '<i data-lucide="x" style="width:16px;height:16px"></i>';
      deleteBtn.title = t('deletePalette') || 'Удалить палитру';
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteCustomPalette(customPaletteIndex);
      };
      actions.appendChild(deleteBtn);
    }

    titleContainer.appendChild(actions);
    group.appendChild(titleContainer);

    const grid = document.createElement('div');
    grid.className = 'palette-colors-grid';
    if (isCustom) {
      grid.id = `palette-grid-custom-${customPaletteIndex}`;
    }

    group.appendChild(grid);
    fragment.appendChild(group);

    populatePaletteGrid(grid, palette, isCustom, customPaletteIndex);
  });

  palDiv.appendChild(fragment);

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

window.updateCustomPaletteGrid = function (customPaletteIndex) {
  const grid = document.getElementById(`palette-grid-custom-${customPaletteIndex}`);
  if (grid) {
    populatePaletteGrid(grid, customPalettes[customPaletteIndex], true, customPaletteIndex);
  }
};

window.populatePaletteGrid = function (grid, palette, isCustom, customPaletteIndex) {
  grid.innerHTML = '';
  if (isCustom && palette.colors.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.gridColumn = '1 / -1';
    emptyMsg.style.fontSize = '11px';
    emptyMsg.style.color = '#666';
    emptyMsg.style.padding = '4px 0';
    emptyMsg.textContent = t('emptyPalette') || 'Пустая палитра. Нажмите +, чтобы добавить цвет';
    grid.appendChild(emptyMsg);
  } else {
    palette.colors.forEach((c, cIdx) => {
      const btn = document.createElement('div');
      btn.className = 'palette-cell';
      btn.style.backgroundColor = c;
      if (isCustom) {
        btn.title = c + ' (Двойной клик для удаления)';
        btn.ondblclick = () => removeColorFromCustomPalette(customPaletteIndex, cIdx);

        let pressTimer;
        btn.addEventListener('touchstart', () => {
          pressTimer = setTimeout(async () => {
            const ok = await showCustomConfirm({
              title: t('confirmDeleteColor') || 'Удалить цвет?',
              message: `${t('confirmDeleteColor') || 'Удалить цвет?'} ${c}`
            });
            if (ok) {
              removeColorFromCustomPalette(customPaletteIndex, cIdx);
            }
          }, 800);
        }, { passive: true });
        btn.addEventListener('touchend', () => clearTimeout(pressTimer));
        btn.addEventListener('touchmove', () => clearTimeout(pressTimer));
      }
      btn.onclick = () => {
        setColor(c);
      };
      grid.appendChild(btn);
    });
  }
};

window.addNewCustomPalette = async function () {
  const name = await showCustomConfirm({
    title: t('addPaletteBtnText') || 'Новая палитра',
    message: t('enterPaletteName') || 'Введите название новой палитры:',
    showInput: true,
    inputPlaceholder: t('paletteTitle') || 'Палитра'
  });
  if (!name || !name.trim()) return;
  customPalettes.push({ id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9), name: name.trim(), colors: [] });
  saveCustomPalettes();
  generateBigPalette();
};

window.deleteCustomPalette = async function (index) {
  const ok = await showCustomConfirm({
    title: t('deletePalette') || 'Удалить палитру',
    message: t('confirmDeletePalette') || 'Удалить палитру?'
  });
  if (ok) {
    customPalettes.splice(index, 1);
    saveCustomPalettes();
    generateBigPalette();
  }
};

window.movePaletteUp = function (index) {
  if (index <= 0) return;
  const temp = paletteOrder[index - 1];
  paletteOrder[index - 1] = paletteOrder[index];
  paletteOrder[index] = temp;
  localStorage.setItem('pap_palette_order', JSON.stringify(paletteOrder));
  generateBigPalette();
};

window.movePaletteDown = function (index) {
  if (index >= paletteOrder.length - 1) return;
  const temp = paletteOrder[index + 1];
  paletteOrder[index + 1] = paletteOrder[index];
  paletteOrder[index] = temp;
  localStorage.setItem('pap_palette_order', JSON.stringify(paletteOrder));
  generateBigPalette();
};

window.addColorToCustomPalette = function (index) {
  if (!customPalettes[index].colors.includes(currentColor)) {
    customPalettes[index].colors.push(currentColor);
    saveCustomPalettes();
    updateCustomPaletteGrid(index);
  }
};

window.removeColorFromCustomPalette = function (pIdx, cIdx) {
  customPalettes[pIdx].colors.splice(cIdx, 1);
  saveCustomPalettes();
  updateCustomPaletteGrid(pIdx);
};

function saveCustomPalettes() {
  localStorage.setItem('pap_custom_palettes', JSON.stringify(customPalettes));
}

function setTool(t) {
  currentTool = t;
  document.querySelectorAll('.tool-btn').forEach(b => {
    if (b.id !== 'mirrorBtn') {
      b.classList.remove('active');
    }
  });
  const btns = document.querySelectorAll('.tool-btn');
  btns.forEach(b => {
    const oc = b.getAttribute('onclick');
    if (b.id !== 'mirrorBtn' && oc && oc.includes(`'${t}'`)) {
      b.classList.add('active');
    }
  });
  const mirrorBtn = document.getElementById('mirrorBtn');
  if (mirrorBtn) {
    mirrorBtn.classList.toggle('active', mirrorMode !== 'off');
  }
}

function updateUI(c) {
  setColor(c);
}

function showZoomIndicator() {
  zoomIndicator.textContent = scale.toFixed(1) + 'x';
  zoomIndicator.classList.add('visible');
  clearTimeout(zoomIndicatorTimeout);
  zoomIndicatorTimeout = setTimeout(() => zoomIndicator.classList.remove('visible'), 1000);
}

function onWheel(e) {
  e.preventDefault();
  let deltaY = e.deltaY;
  if (e.deltaMode === 1) deltaY *= 33;
  else if (e.deltaMode === 2) deltaY *= 100;
  
  // Two-finger scroll usually fires without ctrlKey, pinch fires with ctrlKey.
  // The user explicitly requested zoom on swipe, so we'll zoom for all wheel events.
  const zoomSpeed = 0.001;
  const oldScale = scale;
  scale = Math.max(0.005, Math.min(scale * Math.exp(-deltaY * zoomSpeed), 20));
  
  // Get mouse coordinates relative to the workspace
  const rect = workspace.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // Calculate unscaled coordinates under the cursor BEFORE zoom
  const unscaledX = (mouseX - panX) / oldScale;
  const unscaledY = (mouseY - panY) / oldScale;
  
  // Adjust pan so the unscaled coordinates remain exactly under the cursor AFTER zoom
  panX = mouseX - unscaledX * scale;
  panY = mouseY - unscaledY * scale;
  
  updateTransform();
}

function updateTransform() {
  container.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  scheduleGridRedraw();
  showZoomIndicator();
}

let gridRedrawScheduled = false;
function scheduleGridRedraw() {
  if (gridRedrawScheduled) return;
  gridRedrawScheduled = true;
  requestAnimationFrame(() => {
    try {
      drawGrid();
    } finally {
      gridRedrawScheduled = false;
    }
  });
}

function resetView() {
  const r = workspace.getBoundingClientRect();
  scale = Math.max(0.005, Math.min((r.width - 40) / (width * cellSize), (r.height - 200) / (height * cellSize)));
  panX = (r.width - width * cellSize * scale) / 2;
  panY = (r.height - height * cellSize * scale) / 2 - 50;
  updateTransform();
  showToast(t('viewCentered'));
}

const hexColorCache = new Map();
function getCachedRgb(hex) {
  let rgb = hexColorCache.get(hex);
  if (!rgb) {
    rgb = {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    };
    if (hexColorCache.size > 1000) hexColorCache.clear();
    hexColorCache.set(hex, rgb);
  }
  return rgb;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hexToHsl(H) {
  let r = 0, g = 0, b = 0;
  if (4 == H.length) {
    r = "0x" + H[1] + H[1], g = "0x" + H[2] + H[2], b = "0x" + H[3] + H[3];
  } else {
    if (7 != H.length) return [0, 0, 0];
    r = "0x" + H[1] + H[2], g = "0x" + H[3] + H[4], b = "0x" + H[5] + H[6];
  }
  r /= 255, g /= 255, b /= 255;
  let c = Math.min(r, g, b), e = Math.max(r, g, b), a = e - c, l = 0, s = 0, u = 0;
  u = 0 == a ? 0 : e == r ? (g - b) / a % 6 : e == g ? (b - r) / a + 2 : (r - g) / a + 4;
  u = Math.round(60 * u);
  u < 0 && (u += 360);
  l = (e + c) / 2;
  s = 0 == a ? 0 : a / (1 - Math.abs(2 * l - 1));
  return [u, +(100 * s).toFixed(1), +(100 * l).toFixed(1)];
}

function hslToHex(r, g, b) {
  g /= 100, b /= 100;
  let c = (1 - Math.abs(2 * b - 1)) * g, e = c * (1 - Math.abs(r / 60 % 2 - 1)), a = b - c / 2, l = 0, s = 0, u = 0;
  0 <= r && r < 60 ? (l = c, s = e, u = 0) : 60 <= r && r < 120 ? (l = e, s = c, u = 0) : 120 <= r && r < 180 ? (l = 0, s = c, u = e) : 180 <= r && r < 240 ? (l = 0, s = e, u = c) : 240 <= r && r < 300 ? (l = e, s = 0, u = c) : 300 <= r && r < 360 && (l = c, s = 0, u = e);
  l = Math.round(255 * (l + a)).toString(16);
  s = Math.round(255 * (s + a)).toString(16);
  u = Math.round(255 * (u + a)).toString(16);
  1 == l.length && (l = "0" + l);
  1 == s.length && (s = "0" + s);
  1 == u.length && (u = "0" + u);
  return "#" + l + s + u;
}

function floodFill(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const targetColor = pixels[y][x];
  const effectiveAlpha = brushOpacity * blendStrength;
  const fillColor = blendColors(targetColor, effectiveAlpha);
  if (targetColor === fillColor) return;

  const visited = new Uint8Array(width * height);
  const stack = [x, y];
  let pixelsFilled = 0;
  const maxPixels = MAX_FLOOD_FILL_PIXELS;
  while (stack.length > 0 && pixelsFilled < maxPixels) {
    const cy = stack.pop();
    const cx = stack.pop();
    const idx = cy * width + cx;
    if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
    if (visited[idx] || pixels[cy][cx] !== targetColor) continue;
    visited[idx] = 1;
    pixels[cy][cx] = fillColor;
    dirtyPixels.add(cy * width + cx);
    pixelsFilled++;
    stack.push(cx + 1, cy, cx - 1, cy, cx, cy + 1, cx, cy - 1);
  }
  if (pixelsFilled >= maxPixels) showToast(t('floodFillLimit'));

  if (pixelsFilled > 0) {
    if (pixelsFilled > (width * height) / 2) {
      dirtyPixels.clear();
      render();
    } else {
      scheduleRender();
    }
    if (isEditingUnicode) saveUnicodeState();
    else saveState();
  }
}

function globalFill(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const targetColor = pixels[y][x];
  const effectiveAlpha = brushOpacity * blendStrength;
  const fillColor = blendColors(targetColor, effectiveAlpha);
  if (targetColor === fillColor) return;

  let changed = 0;
  for (let cy = 0; cy < height; cy++) {
    for (let cx = 0; cx < width; cx++) {
      if (pixels[cy][cx] === targetColor) {
        pixels[cy][cx] = fillColor;
        dirtyPixels.add(cy * width + cx);
        changed++;
      }
    }
  }
  if (changed > 0) {
    if (changed > (width * height) / 2) {
      dirtyPixels.clear();
      render();
    } else {
      scheduleRender();
    }
    if (isEditingUnicode) saveUnicodeState();
    else saveState();
  }
}

function render() {
  dirtyPixels.clear();
  if (!cachedImgData || cachedImgData.width !== width || cachedImgData.height !== height) {
    cachedImgData = ctx.createImageData(width, height);
  } else {
    cachedImgData.data.fill(0);
  }
  const data = cachedImgData.data;
  const stride = cachedImgData.width;

  for (let y = 0; y < height; y++) {
    if (!pixels || !pixels[y]) continue;
    for (let x = 0; x < width; x++) {
      const c = pixels[y][x];
      if (c) {
        const rgb = getCachedRgb(c);
        const idx = (y * stride + x) * 4;
        data[idx] = rgb.r;
        data[idx + 1] = rgb.g;
        data[idx + 2] = rgb.b;
        data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(cachedImgData, 0, 0);
  drawGrid();
}

function toggleMenu() {
  document.getElementById('menuModal').classList.toggle('open');
  const customSizeInputEl = document.getElementById('customSizeInput');
  if (customSizeInputEl) customSizeInputEl.value = `${width}x${height}`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function showToast(m) {
  const t = document.getElementById('toast');
  t.innerText = m;
  t.style.opacity = 1;
  setTimeout(() => t.style.opacity = 0, 2000);
}

function saveState() {
  history = history.slice(0, historyStep + 1);
  const totalPixels = width * height;
  let maxHistory;
  if (totalPixels > 500000) maxHistory = 2;
  else if (totalPixels > 100000) maxHistory = 3;
  else if (totalPixels > 50000) maxHistory = 4;
  else maxHistory = MAX_UNDO_SIZE;
  history.push(clonePixels(pixels));
  if (history.length > maxHistory) history.shift();
  else historyStep++;

  if (totalPixels < 100000 && !isEditingUnicode) {
    clearTimeout(saveStateTimeout);
    saveStateTimeout = setTimeout(() => {
      const saveFn = () => {
        try {
          localStorage.setItem('pap_v10', JSON.stringify({ w: width, h: height, p: pixels }));
        } catch (e) { }
      };
      if (window.requestIdleCallback) window.requestIdleCallback(saveFn);
      else setTimeout(saveFn, 0);
    }, 500);
  }
}

function saveStateImmediate() {
  history = history.slice(0, historyStep + 1);
  const totalPixels = width * height;
  let maxHistory;
  if (totalPixels > 500000) maxHistory = 2;
  else if (totalPixels > 100000) maxHistory = 3;
  else if (totalPixels > 50000) maxHistory = 4;
  else maxHistory = MAX_UNDO_SIZE;
  history.push(clonePixels(pixels));
  if (history.length > maxHistory) history.shift();
  else historyStep++;

  if (totalPixels < 100000 && !isEditingUnicode) {
    clearTimeout(saveStateTimeout);
    const saveFn = () => {
      try {
        localStorage.setItem('pap_v10', JSON.stringify({ w: width, h: height, p: pixels }));
      } catch (e) { }
    };
    if (window.requestIdleCallback) window.requestIdleCallback(saveFn);
    else setTimeout(saveFn, 0);
  }
}

function saveUnicodeState() {
  unicodeHistory = unicodeHistory.slice(0, unicodeHistoryStep + 1);
  unicodeHistory.push(clonePixels(pixels));
  if (unicodeHistory.length > 30) unicodeHistory.shift();
  else unicodeHistoryStep++;
}

function undo() {
  if (isEditingUnicode) {
    if (unicodeHistoryStep > 0) {
      unicodeHistoryStep--;
      pixels = clonePixels(unicodeHistory[unicodeHistoryStep]);
      render();
      showToast(t('undoAction') + ' (Unicode)');
    }
  } else {
    if (historyStep > 0) {
      historyStep--;
      pixels = clonePixels(history[historyStep]);
      render();
      showToast(t('undoAction'));
    }
  }
}

function redo() {
  if (isEditingUnicode) {
    if (unicodeHistoryStep < unicodeHistory.length - 1) {
      unicodeHistoryStep++;
      pixels = clonePixels(unicodeHistory[unicodeHistoryStep]);
      render();
      showToast(t('returned') + ' (Unicode)');
    }
  } else {
    if (historyStep < history.length - 1) {
      historyStep++;
      pixels = clonePixels(history[historyStep]);
      render();
      showToast(t('returned'));
    }
  }
}

function loadStorage() {
  try {
    const d = JSON.parse(localStorage.getItem('pap_v10'));
    if (d && d.p && Array.isArray(d.p) && d.p.length > 0) {
      width = d.w;
      height = d.h;
      pixels = d.p;
      saveStateImmediate();
    } else {
      pixels = Array(height).fill().map(() => Array(width).fill(null));
      saveStateImmediate();
    }
  } catch {
    pixels = Array(height).fill().map(() => Array(width).fill(null));
    saveStateImmediate();
  }
}

function openNewCanvasModal() {
  document.getElementById('newCanvasModal').classList.add('open');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeNewCanvasModal() {
  document.getElementById('newCanvasModal').classList.remove('open');
}

async function createNewCanvasWithSize(w, h) {
  closeNewCanvasModal();
  const ok = await showCustomConfirm({
    title: t('newCanvas') || 'Новый холст',
    message: t('confirmClear')
  });
  if (!ok) return;
  width = Math.max(1, Math.min(4000, Math.round(w)));
  height = Math.max(1, Math.min(4000, Math.round(h)));
  const customSizeInputEl = document.getElementById('customSizeInput');
  if (customSizeInputEl) customSizeInputEl.value = `${width}x${height}`;
  setupCanvas();
  pixels = Array(height).fill().map(() => Array(width).fill(null));
  render();
  resetView();
  if (isEditingUnicode) saveUnicodeState();
  else saveStateImmediate();
}

function createCustomCanvas() {
  const wEl = document.getElementById('newCanvasWidth');
  const hEl = document.getElementById('newCanvasHeight');
  let w = wEl ? parseInt(wEl.value) : 32;
  let h = hEl ? parseInt(hEl.value) : 32;
  if (!w || w < 1) w = 32;
  if (!h || h < 1) h = 32;
  
  closeNewCanvasModal();
  createNewCanvasWithSize(w, h);
}

function openNewCanvasModal() {
  const modal = document.getElementById('newCanvasModal');
  if (modal) {
    const wEl = document.getElementById('newCanvasWidth');
    const hEl = document.getElementById('newCanvasHeight');
    if (wEl) wEl.value = width;
    if (hEl) hEl.value = height;
    modal.classList.add('open');
  }
}

window.fillCustomCanvasSize = function (w, h) {
  const customSizeInputEl = document.getElementById('customSizeInput');
  if (customSizeInputEl) customSizeInputEl.value = `${w}x${h}`;
};

function createNewCanvas() {
  openNewCanvasModal();
}

function saveImage() {
  if (isEditingUnicode) {
    saveUnicodeCell();
    return;
  }
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const x = c.getContext('2d', { alpha: true });
  x.imageSmoothingEnabled = false;
  const imgData = x.createImageData(width, height);
  const data = imgData.data;
  const stride = imgData.width;
  for (let y = 0; y < height; y++) {
    if (!pixels || !pixels[y]) continue;
    for (let i = 0; i < width; i++) {
      const col = pixels[y][i];
      if (col) {
        const rgb = getCachedRgb(col);
        const idx = (y * stride + i) * 4;
        data[idx] = rgb.r;
        data[idx + 1] = rgb.g;
        data[idx + 2] = rgb.b;
        data[idx + 3] = 255;
      }
    }
  }
  x.putImageData(imgData, 0, 0);
  const a = document.createElement('a');
  a.download = 'pixel-art.png';
  a.href = c.toDataURL();
  a.click();
  showToast(t('saved'));
}

function setupTooltips() {
  const tooltip = document.getElementById('tooltip');
  let longPressTimer;
  let currentElement;

  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('touchstart', (e) => {
      currentElement = el;
      longPressTimer = setTimeout(() => {
        const text = el.getAttribute('data-tooltip');
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        const rect = el.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
      }, 500);
    }, { passive: true });

    el.addEventListener('touchend', () => {
      clearTimeout(longPressTimer);
      tooltip.classList.remove('visible');
    });

    el.addEventListener('touchmove', () => {
      clearTimeout(longPressTimer);
      tooltip.classList.remove('visible');
    });

    el.addEventListener('mouseenter', (e) => {
      const text = el.getAttribute('data-tooltip');
      tooltip.textContent = text;
      tooltip.classList.add('visible');
      const rect = el.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });

    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

window.showCustomConfirm = function (options = {}) {
  return new Promise((resolve) => {
    const modal = document.getElementById('customConfirmModal');
    const titleEl = document.getElementById('customConfirmTitle');
    const msgEl = document.getElementById('customConfirmMessage');
    const inputContainer = document.getElementById('customConfirmInputContainer');
    const inputEl = document.getElementById('customConfirmInput');
    const cancelBtn = document.getElementById('customConfirmCancelBtn');
    const okBtn = document.getElementById('customConfirmOkBtn');

    if (!modal || !titleEl || !msgEl || !inputContainer || !inputEl || !cancelBtn || !okBtn) {
      resolve(null);
      return;
    }

    titleEl.textContent = options.title || t('confirm') || 'Подтверждение';
    msgEl.textContent = options.message || '';

    if (options.showInput) {
      inputContainer.style.display = 'block';
      inputEl.value = options.inputValue || '';
      inputEl.placeholder = options.inputPlaceholder || '';
      setTimeout(() => inputEl.focus(), 100);
    } else {
      inputContainer.style.display = 'none';
    }

    cancelBtn.textContent = options.cancelText || t('cancel') || 'Отмена';
    okBtn.textContent = options.okText || 'OK';
    cancelBtn.style.display = options.isAlert ? 'none' : 'block';

    modal.classList.add('open');

    const cleanUp = () => {
      modal.classList.remove('open');
      okBtn.onclick = null;
      cancelBtn.onclick = null;
      inputEl.onkeydown = null;
    };

    okBtn.onclick = () => {
      const val = options.showInput ? inputEl.value : true;
      cleanUp();
      resolve(val);
    };

    cancelBtn.onclick = () => {
      cleanUp();
      resolve(null);
    };

    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        okBtn.click();
      } else if (e.key === 'Escape') {
        cancelBtn.click();
      }
    };
  });
};

window.closeCustomConfirm = function () {
  const cancelBtn = document.getElementById('customConfirmCancelBtn');
  if (cancelBtn) cancelBtn.click();
};

init();
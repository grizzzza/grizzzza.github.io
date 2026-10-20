// ==========================================
// СК «АРСЕНАЛ» // ATHLETIC & SPORTS COMPLEX — APP.JS
// (Unique Left Sidebar Header, Solid Framed Layout & Hero Slider)
// ==========================================

let currentSlide = 0;
let slideInterval = null;
let currentExercise = 'squat';
let currentDay = 'Пн';
let currentCategory = 'all';
let currentZoneTitle = 'Олимпийский бассейн 25 метров';

const EXERCISES_DATA = {
  squat: {
    badge: 'ПРИСЕДАНИЯ СО ШТАНГОЙ',
    title: 'Приседания со штангой',
    desc: 'Базовое движение для развития силы ног, ягодиц и укрепления мышц спины.',
    calFactor: 0.52,
    tags: ['Квадрицепсы', 'Ягодичные', 'Разгибатели спины']
  },
  deadlift: {
    badge: 'СТАНОВАЯ ТЯГА',
    title: 'Становая тяга',
    desc: 'Фундаментальное упражнение для всей задней мышечной цепи и хвата.',
    calFactor: 0.65,
    tags: ['Широчайшие', 'Бицепс бедра', 'Трапеции']
  },
  bench: {
    badge: 'ЖИМ ШТАНГИ ЛЕЖА',
    title: 'Жим штанги лежа',
    desc: 'Классическое упражнение для развития грудных мышц, дельт и трицепса.',
    calFactor: 0.40,
    tags: ['Большая грудная', 'Трицепс', 'Передняя дельта']
  },
  kettlebell: {
    badge: 'МАХИ ЧУГУННОЙ ГИРЕЙ',
    title: 'Махи чугунной гирей',
    desc: 'Взрывное движение для разгона выносливости, координации и силы бедер.',
    calFactor: 0.58,
    tags: ['Ягодичные', 'Пресс & Кор', 'Дельтовидные']
  }
};

const ZONES_DATA = {
  pool: {
    title: 'Олимпийский бассейн 25 метров',
    badge: 'АКВА-ЗОНА &middot; ФЛАГМАН',
    img: 'assets/pool-zone.jpg',
    specs: ['25 метров', '4 дорожки', 't° = +27°C', 'Озонирование', 'UV-стерилизация'],
    desc: '4 плавательные дорожки длиной 25 метров с озоновой системой очистки воды без резкого запаха хлора. Температура воды поддерживается на уровне +27°C. Включает зоны для аквафитнеса, гидромассажные чаши, финскую сауну и турецкий хаммам.'
  },
  gym: {
    title: 'Тренажерный зал & Линейка Technogym',
    badge: 'ТРЕНАЖЕРНЫЙ ЗАЛ',
    img: 'assets/cardio-zone.jpg',
    specs: ['1 500 м²', 'Technogym Artis', 'Гребные Concept2', 'Климат-контроль'],
    desc: 'Просторный зал площадью 1500 м² с премиальными тренажерами Technogym и гребными эргометрами Concept2. Выделенные зоны для кардио-выносливости, блочных тренажеров и функционального тренинга.'
  },
  barbell: {
    title: 'Силовые помосты Eleiko',
    badge: 'СИЛОВЫЕ ПОМОСТЫ',
    img: 'assets/barbell-zone.jpg',
    specs: ['14 силовых рам', 'Грифы Eleiko 20/15 кг', 'Калиброванные блины', 'Амортизирующие помосты'],
    desc: '14 профессиональных силовых рам Eleiko Prestera, олимпийские грифы 20кг/15кг, калиброванные диски и амортизирующее покрытие помостов для безопасного выполнения тяжелоатлетических упражнений.'
  },
  kettlebell: {
    title: 'Гиревой ареал & Кроссфит',
    badge: 'ГИРИ & CROSS',
    img: 'assets/kettlebell-zone.jpg',
    specs: ['120+ чугунных гирь (8–48 кг)', 'Кроссфит-рама', 'Плио-тумбы', 'Канаты и медболы'],
    desc: 'Более 120 соревновательных чугунных гирь от 8 до 48 кг со строгой весовой калибровкой, функциональная кроссфит-рама, плио-тумбы, канаты и медболы.'
  },
  combat: {
    title: 'Бойцовский ринг Fairtex & Единоборства',
    badge: 'БОКС & РИНГ',
    img: 'assets/combat-zone.jpg',
    specs: ['Ринг Fairtex 6x6м', 'Снарядные мешки', 'Борцовское татами', 'Тренеры МС'],
    desc: 'Оборудованный боксерский ринг, тяжелые снарядные мешки Fairtex, профессиональное татами, секции бокса, кикбоксинга и классической борьбы.'
  },
  games: {
    title: 'Многофункциональный игровой зал',
    badge: 'ИГРОВОЙ ПАРКЕТ',
    img: 'assets/sports-hall.jpg',
    specs: ['Дубовый паркет 600 м²', 'Мини-футбол', 'Баскетбол', 'Волейбол'],
    desc: 'Игровая площадка европейского уровня со специальным амортизирующим паркетом для мини-футбола, баскетбола, волейбола и настольного тенниса.'
  },
  spa: {
    title: 'SPA-комплекс и термальные сауны',
    badge: 'SPA & ХАММАМ',
    img: 'assets/spa-zone.jpg',
    specs: ['Финская сауна (t° = +90°C)', 'Мраморный хаммам (t° = +45°C)', 'Ледяная купель', 'Зона релакса'],
    desc: 'Финская сухая сауна соляного типа (90°C), турецкий мраморный хаммам (45°C), контрастная ледяная купель, джакузи и отдельный кабинет спортивного массажа.'
  },
  kids: {
    title: 'Детский фитнес & Плавание',
    badge: 'ДЕТСКИЙ СПОРТ',
    img: 'assets/kids-zone.jpg',
    specs: ['Секции от 4 лет', 'Малый бассейн', 'ОФП и гимнастика', 'Сертифицированные тренеры'],
    desc: 'Групповые и индивидуальные программы обучения плаванию детей с 4 лет, детская гимнастика, общая физическая подготовка и спортивные секции.'
  }
};

const SCHEDULE = {
  'Пн': [
    { time: '08:30 — 10:00', title: 'Олимпийский присед & Кор', coach: 'Петрова Анастасия', zone: 'Тренажерный зал' },
    { time: '12:00 — 13:15', title: 'Плавание: Техника кроля', coach: 'Венера Асадова', zone: 'Бассейн 25м' },
    { time: '19:00 — 20:30', title: 'Гиревой комплекс WOD', coach: 'Дмитрий Иванов', zone: 'Гиревой ареал' }
  ],
  'Вт': [
    { time: '09:00 — 10:30', title: 'Становая тяга & Спина', coach: 'Завьялков Артур', zone: 'Тренажерный зал' },
    { time: '14:00 — 15:00', title: 'Аква-аэробика', coach: 'Венера Асадова', zone: 'Бассейн 25м' },
    { time: '18:00 — 19:30', title: 'Кроссфит выносливость', coach: 'Дмитрий Иванов', zone: 'Гиревой ареал' }
  ],
  'Ср': [
    { time: '08:30 — 10:00', title: 'Жим лежа & Плечи', coach: 'Петрова Анастасия', zone: 'Тренажерный зал' },
    { time: '11:00 — 12:30', title: 'Детская секция плавания', coach: 'Венера Асадова', zone: 'Бассейн 25м' },
    { time: '19:00 — 20:15', title: 'Восстановление & Стретчинг', coach: 'Дежурный тренер', zone: 'СПА-комплекс' }
  ],
  'Чт': [
    { time: '10:00 — 11:30', title: 'Махи гирями & Плиометрика', coach: 'Дмитрий Иванов', zone: 'Гиревой ареал' },
    { time: '16:00 — 17:30', title: 'Свободное плавание (дорожки)', coach: 'Венера Асадова', zone: 'Бассейн 25м' },
    { time: '18:30 — 20:00', title: 'Присед тяжелая сессия', coach: 'Завьялков Артур', zone: 'Тренажерный зал' }
  ],
  'Пт': [
    { time: '09:00 — 10:30', title: 'Full Body Силовой сет', coach: 'Петрова Анастасия', zone: 'Тренажерный зал' },
    { time: '17:30 — 19:00', title: 'Плавание: Баттерфляй', coach: 'Венера Асадова', zone: 'Бассейн 25м' },
    { time: '19:00 — 20:30', title: 'Пятничный гиревой сет', coach: 'Дмитрий Иванов', zone: 'Гиревой ареал' }
  ],
  'Сб': [
    { time: '10:00 — 11:30', title: 'Субботний Cross-Power', coach: 'Дмитрий Иванов', zone: 'Гиревой ареал' },
    { time: '12:00 — 13:30', title: 'Аква-тонус и сауна', coach: 'Венера Асадова', zone: 'Бассейн & СПА' }
  ],
  'Вс': [
    { time: '11:00 — 12:30', title: 'Релакс-плавание & Хаммам', coach: 'Венера Асадова', zone: 'Бассейн & СПА' },
    { time: '16:00 — 17:30', title: 'ОФП для детей и подростков', coach: 'Завьялков Артур', zone: 'Детская зона' }
  ]
};

// ==========================================
// HERO SLIDER LOGIC WITH TOUCH SWIPE SUPPORT
// ==========================================
function startSlideTimer() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function goToSlide(index) {
  currentSlide = (index + 3) % 3;
  const track = document.getElementById('heroTrack');
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  updateDots();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function updateDots() {
  const dots = document.querySelectorAll('.hero-dot');
  dots.forEach((dot, idx) => {
    if (idx === currentSlide) {
      dot.className = 'hero-dot w-2.5 h-2.5 rounded-full bg-inno-green cursor-pointer transition-all scale-125';
    } else {
      dot.className = 'hero-dot w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-white cursor-pointer transition-all';
    }
  });
}

// Touch swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

function initTouchSlider() {
  const heroSlider = document.getElementById('heroTrack');
  if (!heroSlider) return;
  const heroContainer = heroSlider.parentElement;
  if (!heroContainer) return;

  heroContainer.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
    }
  }, { passive: true });

  heroContainer.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchEndX = e.changedTouches[0].clientX;
      handleHeroSwipe();
    }
  }, { passive: true });
}

function handleHeroSwipe() {
  const threshold = 40;
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    startSlideTimer(); // reset auto rotation
  }
}

// ==========================================
// EXERCISE SIMULATOR
// ==========================================
function setExercise(key) {
  currentExercise = key;
  document.querySelectorAll('.ex-btn').forEach((btn) => {
    btn.className = 'ex-btn p-3 rounded-xl bg-inno-grayBg border-2 border-slate-200 text-slate-700 font-display font-bold text-xs text-center hover:border-inno-purple transition-colors';
  });
  const activeBtn = document.getElementById(`exBtn-${key}`);
  if (activeBtn) {
    activeBtn.className = 'ex-btn active p-3 rounded-xl bg-inno-green text-white border-2 border-inno-green font-display font-bold text-xs text-center transition-colors';
  }
  updateSimulator();
}

function updateSimulator() {
  const slider = document.getElementById('weightSlider');
  if (!slider) return;
  const weight = parseInt(slider.value, 10);
  const data = EXERCISES_DATA[currentExercise];
  if (!data) return;

  const weightVal = document.getElementById('weightValue');
  const simBadge = document.getElementById('simBadge');
  const simTitle = document.getElementById('simTitle');
  const simDesc = document.getElementById('simDesc');
  const simCal = document.getElementById('simCalories');
  const simTon = document.getElementById('simTonnage');

  if (weightVal) weightVal.innerText = `${weight} кг`;
  if (simBadge) simBadge.innerText = data.badge;
  if (simTitle) simTitle.innerText = data.title;
  if (simDesc) simDesc.innerText = data.desc;

  const calories = Math.round(weight * data.calFactor * 10);
  const tonnage = weight * 5 * 10;

  if (simCal) simCal.innerText = `${calories} ккал`;
  if (simTon) simTon.innerText = `${tonnage} кг`;

  const tagsContainer = document.getElementById('simTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = data.tags.map(t => `<span class="px-2.5 py-1 rounded-md bg-white border-2 border-slate-200 text-xs text-slate-700 font-bold">${t}</span>`).join('');
  }
}

// ==========================================
// SCHEDULE & FREEZE CALCULATOR
// ==========================================
function setDay(dayKey, e) {
  currentDay = dayKey;
  document.querySelectorAll('.day-btn').forEach((btn) => {
    btn.className = 'day-btn shrink-0 px-3.5 py-2 rounded-xl font-display text-xs font-bold bg-white border-2 border-slate-200 text-slate-600 hover:text-inno-purple hover:border-inno-purple transition-colors';
  });
  
  const target = (e && e.currentTarget) || (window.event && window.event.currentTarget) || (window.event && window.event.target);
  if (target && target.classList) {
    target.className = 'day-btn active shrink-0 px-3.5 py-2 rounded-xl font-display text-xs font-bold bg-inno-purple text-white border-2 border-inno-purple transition-colors';
  }
  renderSchedule();
}

function renderSchedule() {
  const container = document.getElementById('scheduleList');
  if (!container) return;
  const items = SCHEDULE[currentDay] || [];

  container.innerHTML = items.map(item => `
    <div class="p-4 rounded-2xl bg-inno-grayBg border-2 border-slate-200 hover:border-inno-purple transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <span class="px-3 py-1.5 rounded-lg bg-inno-purple text-white font-display font-bold text-xs border border-inno-purple shrink-0">${item.time}</span>
        <div>
          <h4 class="font-display font-bold text-inno-purple text-sm">${item.title}</h4>
          <p class="text-xs text-slate-500">Тренер: <strong class="text-slate-700">${item.coach}</strong> &middot; Зона: <span class="text-inno-green font-bold">${item.zone}</span></p>
        </div>
      </div>
      <button onclick="openBookingModal('Запись на секцию: ${item.title}')" class="px-4 py-2 bg-white hover:bg-inno-purple hover:text-white border-2 border-slate-200 text-slate-700 text-xs font-display font-bold rounded-xl transition-colors shrink-0 text-center">
        Записаться →
      </button>
    </div>
  `).join('');
}

function calcFreezeDays() {
  const startEl = document.getElementById('freezeStartDate');
  const endEl = document.getElementById('freezeEndDate');
  const output = document.getElementById('freezeDaysOutput');
  if (!startEl || !endEl || !output) return;

  const startVal = startEl.value;
  const endVal = endEl.value;

  if (startVal && endVal) {
    const d1 = new Date(startVal);
    const d2 = new Date(endVal);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      output.innerText = `${diffDays} дней`;
    } else {
      output.innerText = 'Некорректная дата';
    }
  }
}

function handleFreezeSubmit(e) {
  e.preventDefault();
  showToast('Заявка на заморозку карты успешно отправлена!');
  e.target.reset();
  const output = document.getElementById('freezeDaysOutput');
  if (output) output.innerText = '0 дней';
}

// ==========================================
// MOBILE SIDEBAR & NAVIGATION
// ==========================================
function toggleLeftSidebar() {
  const sidebar = document.getElementById('leftSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  const isClosed = sidebar.classList.contains('-translate-x-full');
  if (isClosed) {
    sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-y-hidden', 'lg:overflow-y-auto');
  } else {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden', 'lg:overflow-y-auto');
  }
}

function closeSidebarMobile() {
  const sidebar = document.getElementById('leftSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.add('-translate-x-full');
  if (backdrop) backdrop.classList.add('hidden');
  document.body.classList.remove('overflow-y-hidden', 'lg:overflow-y-auto');
}

// ==========================================
// FITNESS ZONES FILTERING & MODAL
// ==========================================
function filterZones(category) {
  currentCategory = category;
  document.querySelectorAll('.zone-filter-btn').forEach(btn => {
    btn.className = 'zone-filter-btn shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-display uppercase font-bold bg-white border-2 border-slate-200 text-slate-600 hover:text-inno-purple hover:border-inno-purple transition-colors';
  });

  const evt = window.event;
  if (evt && evt.currentTarget) {
    evt.currentTarget.className = 'zone-filter-btn active shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-display uppercase font-bold bg-inno-purple text-white border-2 border-inno-purple transition-colors';
  }

  const cards = document.querySelectorAll('.zone-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function openZoneModal(key) {
  const data = ZONES_DATA[key];
  if (!data) return;
  currentZoneTitle = data.title;

  const badgeEl = document.getElementById('zoneBadge');
  const titleEl = document.getElementById('zoneModalTitle');
  const imgEl = document.getElementById('zoneModalImg');
  const descEl = document.getElementById('zoneModalDesc');
  const specsEl = document.getElementById('zoneModalSpecs');

  if (badgeEl) badgeEl.innerHTML = data.badge;
  if (titleEl) titleEl.innerText = data.title;
  if (imgEl) imgEl.src = data.img;
  if (descEl) descEl.innerText = data.desc;
  if (specsEl && data.specs) {
    specsEl.innerHTML = data.specs.map(s => `
      <span class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold">
        ${s}
      </span>
    `).join('');
  }

  const modal = document.getElementById('zoneModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }
}

function closeZoneModal() {
  const modal = document.getElementById('zoneModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-y-hidden');
  }
}

// ==========================================
// UNIFIED BOOKING MODAL
// ==========================================
function openBookingModal(title = 'Оформить клубную карту') {
  const modal = document.getElementById('bookingModal');
  const titleEl = document.getElementById('bookingModalTitle');
  if (titleEl) titleEl.innerText = title;

  const serviceSelect = document.getElementById('bookingService');
  if (serviceSelect && title) {
    let matched = false;
    for (let i = 0; i < serviceSelect.options.length; i++) {
      const opt = serviceSelect.options[i];
      if (title.toLowerCase().includes(opt.value.toLowerCase()) || 
          opt.value.toLowerCase().includes(title.toLowerCase()) ||
          opt.text.toLowerCase().includes(title.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched && title !== 'Оформить клубную карту') {
      const customOpt = new Option(title, title, true, true);
      serviceSelect.add(customOpt);
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-y-hidden');
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  closeBookingModal();
  showToast('Спасибо! Заявка принята, администратор свяжется с вами в течение 5 минут.');
  e.target.reset();
}

// ==========================================
// RULES MODAL & POPULATION
// ==========================================
function openRulesModal() {
  const container = document.getElementById('rulesContent');
  if (container) {
    container.innerHTML = `
      <div class="p-3 bg-inno-grayBg border-2 border-slate-200 rounded-xl mb-3">
        <p class="font-bold text-slate-800 text-xs">Адрес: г. Казань, ул. Спартаковская, 6 | Тел: +7 (937) 296-86-85</p>
        <p class="text-[11px] text-slate-500">Часы работы: Понедельник — Воскресенье: 07:00 – 23:00</p>
      </div>

      <p class="font-bold text-inno-purple text-sm mb-1">1. Общие положения и режим работы:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600 mb-3">
        <li>Вход на территорию комплекса осуществляется строго по клубной карте или QR-коду гостевого визита.</li>
        <li>Верхняя одежда и уличная обувь сдаются в гардероб. Обязательна сменная чистая спортивная обувь.</li>
        <li>На территории запрещено находиться в состоянии опьянения и проносить стеклянную посуду.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">2. Посещение озонового бассейна 25м:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600 mb-3">
        <li>Перед спуском в чашу бассейна обязателен тщательный прием душа без купального костюма.</li>
        <li>Наличие плавательного костюма (плавки/купальник) и плавательной шапочки строго обязательно.</li>
        <li>Дети до 14 лет допускаются на воду только в сопровождении инструктора или законных представителей.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">3. Тренажерный зал и силовые помосты Eleiko:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600 mb-3">
        <li>Занятия разрешены только в закрытой спортивной обуви (кроссовки/штангетки).</li>
        <li>После выполнения упражнения спортсмен обязан вернуть снаряды (блины, гири, гантели) на стойки.</li>
        <li>При работе с предельными весами обязательна страховка замками и помощь инструктора или партнера.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">4. SPA-комплекс и термальные сауны:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600">
        <li>Посещение сауны и хаммама разрешено при наличии индивидуального банного полотенца.</li>
        <li>Запрещено выливать воду с аромамаслами на открытые нагревательные элементы сауны.</li>
      </ul>
    `;
  }
  const modal = document.getElementById('rulesModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-y-hidden');
  }
}

function closeRulesModal() {
  const modal = document.getElementById('rulesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-y-hidden');
  }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(msg) {
  const oldToast = document.getElementById('appToast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.id = 'appToast';
  toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-inno-purple text-white text-xs font-display font-bold border-2 border-inno-purple shadow-xl transition-all';
  toast.innerText = msg;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
}

// ==========================================
// BACKDROP CLICKS TO CLOSE MODALS
// ==========================================
window.addEventListener('click', (e) => {
  const bookingModal = document.getElementById('bookingModal');
  const zoneModal = document.getElementById('zoneModal');
  const rulesModal = document.getElementById('rulesModal');

  if (e.target === bookingModal) closeBookingModal();
  if (e.target === zoneModal) closeZoneModal();
  if (e.target === rulesModal) closeRulesModal();
});

// Escape key to close any open modal or mobile sidebar
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeZoneModal();
    closeRulesModal();
    closeSidebarMobile();
  }
});

// ==========================================
// INITIALIZATION ON DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  startSlideTimer();
  initTouchSlider();
  renderSchedule();
  updateSimulator();
});

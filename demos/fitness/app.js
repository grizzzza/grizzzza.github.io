// ==========================================
// СК «АВАНГАРД» // ATHLETIC & SPORTS COMPLEX — APP.JS
// (Unique Left Sidebar Header, Solid Framed Layout & Hero Slider)
// ==========================================

let currentSlide = 0;
let slideInterval = null;
let currentExercise = 'squat';
let currentDay = 'Пн';
let currentCategory = 'all';

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
    title: 'Бассейн 25 метров',
    badge: 'АКВА-ЗОНА',
    img: 'assets/pool-zone.jpg',
    desc: '4 плавательные дорожки длиной 25 метров с озоновой системой очистки воды без резкого запаха хлора. Температура воды поддерживается на уровне +27°C. Включает зоны для аквафитнеса, гидромассажные чаши, финскую сауну и турецкий хаммам.'
  },
  gym: {
    title: 'Тренажерный и кардио зал',
    badge: 'ТРЕНАЖЕРНЫЙ ЗАЛ',
    img: 'assets/cardio-zone.jpg',
    desc: 'Просторный зал площадью 1500 м² с премиальными тренажерами Technogym и гребными эргометрами Concept2. Выделенные зоны для кардио-выносливости, блочных тренажеров и функционального тренинга.'
  },
  barbell: {
    title: 'Силовые помосты & Штанги',
    badge: 'СИЛОВЫЕ ПОМОСТЫ',
    img: 'assets/barbell-zone.jpg',
    desc: '14 профессиональных силовых рам, олимпийские грифы Eleiko, калиброванные блины и резиновое покрытие помостов для безопасного выполнения тяжелоатлетических упражнений.'
  },
  kettlebell: {
    title: 'Гиревой ареал & Кроссфит',
    badge: 'ГИРИ & КРОССФИТ',
    img: 'assets/kettlebell-zone.jpg',
    desc: 'Более 120 соревновательных чугунных гирь от 8 до 48 кг со строгой весовой калибровкой, функциональная кроссфит-рама, плио-тумбы, канаты и медболы.'
  },
  combat: {
    title: 'Зал единоборств & Бокс',
    badge: 'ЕДИНОБОРСТВА',
    img: 'assets/combat-zone.jpg',
    desc: 'Оборудованный боксерский ринг, тяжелые снарядные мешки, профессиональное татами, секции бокса, кикбоксинга и классической борьбы.'
  },
  games: {
    title: 'Многофункциональный игровой зал',
    badge: 'ИГРОВОЙ ЗАЛ',
    img: 'assets/sports-hall.jpg',
    desc: 'Игровая площадка европейского уровня со специальным амортизирующим паркетом для мини-футбола, баскетбола, волейбола и настольного тенниса.'
  },
  spa: {
    title: 'Банный комплекс & СПА',
    badge: 'СПА & САУНЫ',
    img: 'assets/spa-zone.jpg',
    desc: 'Финская сауна из натуральной липы, турецкий хаммам, контрастная ледяная купель, джакузи и отдельный кабинет спортивного массажа.'
  },
  kids: {
    title: 'Детский фитнес & Плавание',
    badge: 'ДЕТСКИЙ СПОРТ',
    img: 'assets/kids-zone.jpg',
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
// HERO SLIDER LOGIC
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

  document.getElementById('weightValue').innerText = `${weight} кг`;
  document.getElementById('simBadge').innerText = data.badge;
  document.getElementById('simTitle').innerText = data.title;
  document.getElementById('simDesc').innerText = data.desc;

  const calories = Math.round(weight * data.calFactor * 10);
  const tonnage = weight * 5 * 10;

  document.getElementById('simCalories').innerText = `${calories} ккал`;
  document.getElementById('simTonnage').innerText = `${tonnage} кг`;

  const tagsContainer = document.getElementById('simTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = data.tags.map(t => `<span class="px-2.5 py-1 rounded-md bg-white border-2 border-slate-200 text-xs text-slate-700 font-bold">${t}</span>`).join('');
  }
}

// ==========================================
// SCHEDULE & FREEZE CALCULATOR
// ==========================================
function setDay(dayKey) {
  currentDay = dayKey;
  document.querySelectorAll('.day-btn').forEach((btn) => {
    btn.className = 'day-btn px-3.5 py-2 rounded-xl font-display text-xs font-bold bg-white border-2 border-slate-200 text-slate-600 hover:text-inno-purple hover:border-inno-purple transition-colors';
  });
  if (event && event.target) {
    event.target.className = 'day-btn active px-3.5 py-2 rounded-xl font-display text-xs font-bold bg-inno-purple text-white border-2 border-inno-purple transition-colors';
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
        <span class="px-3 py-1.5 rounded-lg bg-inno-purple text-white font-display font-bold text-xs border border-inno-purple">${item.time}</span>
        <div>
          <h4 class="font-display font-bold text-inno-purple text-sm">${item.title}</h4>
          <p class="text-xs text-slate-500">Тренер: <strong class="text-slate-700">${item.coach}</strong> &middot; Зона: <span class="text-inno-green font-bold">${item.zone}</span></p>
        </div>
      </div>
      <button onclick="openBookingModal('Запись на секцию: ${item.title}')" class="px-4 py-2 bg-white hover:bg-inno-purple hover:text-white border-2 border-slate-200 text-slate-700 text-xs font-display font-bold rounded-xl transition-colors shrink-0">
        Записаться →
      </button>
    </div>
  `).join('');
}

function calcFreezeDays() {
  const startVal = document.getElementById('freezeStartDate').value;
  const endVal = document.getElementById('freezeEndDate').value;
  const output = document.getElementById('freezeDaysOutput');

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
  showToast('Заявка на заморозку успешно отправлена!');
  e.target.reset();
  document.getElementById('freezeDaysOutput').innerText = '0 дней';
}

// ==========================================
// SIDEBAR & MODALS
// ==========================================
function toggleLeftSidebar() {
  const sidebar = document.getElementById('leftSidebar');
  if (sidebar) sidebar.classList.toggle('-translate-x-full');
}

function closeSidebarMobile() {
  if (window.innerWidth < 1024) {
    const sidebar = document.getElementById('leftSidebar');
    if (sidebar) sidebar.classList.add('-translate-x-full');
  }
}

function filterZones(category) {
  document.querySelectorAll('.zone-filter-btn').forEach(btn => {
    btn.className = 'zone-filter-btn px-4 py-2 rounded-xl text-xs font-display uppercase font-bold bg-white border-2 border-slate-200 text-slate-600 hover:text-inno-purple hover:border-inno-purple transition-colors';
  });
  if (event && event.target) {
    event.target.className = 'zone-filter-btn active px-4 py-2 rounded-xl text-xs font-display uppercase font-bold bg-inno-purple text-white border-2 border-inno-purple transition-colors';
  }

  const cards = document.querySelectorAll('.zone-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function openZoneModal(key) {
  const data = ZONES_DATA[key];
  if (!data) return;

  document.getElementById('zoneBadge').innerText = data.badge;
  document.getElementById('zoneModalTitle').innerText = data.title;
  document.getElementById('zoneModalImg').src = data.img;
  document.getElementById('zoneModalDesc').innerText = data.desc;
  document.getElementById('zoneModal').classList.remove('hidden');
}

function closeZoneModal() {
  document.getElementById('zoneModal').classList.add('hidden');
}

function openBookingModal(title = 'Оформить клубную карту') {
  document.getElementById('bookingModalTitle').innerText = title;
  document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.add('hidden');
}

function handleBookingSubmit(e) {
  e.preventDefault();
  closeBookingModal();
  showToast('Спасибо! Наш менеджер свяжется с вами в течение 5 минут.');
  e.target.reset();
}

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
        <li>Вход на территорию тренировочных зон осуществляется строго по Клубной карте или QR-коду приложения.</li>
        <li>Верхняя одежда и уличная обувь сдаются в гардероб на 1 этаже. Обязательна сменная спортивная обувь.</li>
        <li>На территории запрещено находится в состоянии алкогольного опьянения и проносить стеклянную тару.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">2. Посещение озонового бассейна 25м:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600 mb-3">
        <li>Перед входом в чашу бассейна обязателен прием душа с мылом без купального костюма.</li>
        <li>Наличие плавательного костюма (плавки/купальник) и плавательной шапочки строго обязательно.</li>
        <li>Дети до 14 лет допускаются в бассейн только в сопровождении взрослых или тренера.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">3. Тренажерный зал и силовые помосты:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600 mb-3">
        <li>Занятия разрешены только в закрытой спортивной обуви (кроссовки/штангетки).</li>
        <li>После выполнения упражнения Посетитель обязан вернуть снаряды (блины, гири, гантели) на штатные места.</li>
        <li>При работе с предельными весами обязательна страховка замками и помощь партнера или инструктора.</li>
      </ul>

      <p class="font-bold text-inno-purple text-sm mb-1">4. Банный комплекс и СПА:</p>
      <ul class="list-disc list-inside space-y-1 text-slate-600">
        <li>Посещение сауны и хаммама разрешено при наличии индивидуального полотенца.</li>
        <li>Запрещено лить воду с маслами на электрические нагревательные элементы сауны.</li>
      </ul>
    `;
  }
  document.getElementById('rulesModal').classList.remove('hidden');
}

function closeRulesModal() {
  document.getElementById('rulesModal').classList.add('hidden');
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(msg) {
  const oldToast = document.getElementById('appToast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.id = 'appToast';
  toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-inno-purple text-white text-xs font-display font-bold border-2 border-inno-purple shadow-lg transition-all';
  toast.innerText = msg;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ==========================================
// INITIALIZATION ON DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  startSlideTimer();
  renderSchedule();
  updateSimulator();
});


// Enhanced Time Slot Selector for Trial Booking Modal
function selectTimeSlot(btnElement, slotTime) {
    const parent = btnElement.parentElement;
    const buttons = parent.querySelectorAll('button');
    buttons.forEach(b => {
        b.classList.remove('bg-inno-purple', 'text-white', 'border-inno-purple');
        b.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-300');
    });
    btnElement.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-300');
    btnElement.classList.add('bg-inno-purple', 'text-white', 'border-inno-purple');
    
    const hiddenTimeInput = document.getElementById('selectedTimeSlot');
    if (hiddenTimeInput) {
        hiddenTimeInput.value = slotTime;
    }
}

// Updated openBookingModal to support optional course/pass prefilling
const originalOpenBookingModal = window.openBookingModal;
window.openBookingModal = function(courseOrPassName) {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    if (courseOrPassName) {
        const passSelect = document.getElementById('bookingPassType') || document.getElementById('modalPassSelect');
        if (passSelect) {
            // If option exists, select it or add custom label
            let found = false;
            for (let i = 0; i < passSelect.options.length; i++) {
                if (passSelect.options[i].text.includes(courseOrPassName) || passSelect.options[i].value.includes(courseOrPassName)) {
                    passSelect.selectedIndex = i;
                    found = true;
                    break;
                }
            }
            if (!found && passSelect.options.length > 0) {
                const opt = new Option(courseOrPassName, courseOrPassName, true, true);
                passSelect.add(opt);
            }
        }
    }
};

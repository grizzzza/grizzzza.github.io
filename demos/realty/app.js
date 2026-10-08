// Apex Realty — 3D Luxury Villa Gallery

const VILLAS_COLLECTION = [
  {
    id: 'pinewood-manor',
    title: 'Резиденция «Pinewood Manor»',
    location: 'Новая Рига &middot; 24 км от МКАД',
    category: 'novariga',
    price: '245 000 000 ₽',
    area: '740 м²',
    plot: '32 сотки',
    bedrooms: '5 ensuite',
    pool: '15м с подогревом',
    badge: 'Новая Рига &middot; Сосновый массив',
    status: 'Готова к заселению',
    photos: [
      { url: 'assets/hero-villa.jpg', caption: 'Главный фасад &middot; Сумеречная иллюминация' },
      { url: 'assets/interior-1.jpg', caption: 'Гостиная &middot; Второй свет 6.5м и камин Focus' },
      { url: 'assets/interior-2.jpg', caption: 'Кухня &middot; Остров из травертина и зона шефа' },
      { url: 'assets/pool-1.jpg', caption: 'Открытый подогреваемый бассейн 15 метров' },
      { url: 'assets/night-1.jpg', caption: 'Ландшафтный парк &middot; Архитектурная подсветка' }
    ],
    bullets: [
      'Панорамное остекление Schüco в пол',
      'Второй свет 6.5м &middot; Камин Focus',
      'СПА-блок с турецким хаммамом'
    ]
  },
  {
    id: 'horizon-glass',
    title: 'Вилла «Horizon Glass»',
    location: 'Рублево-Успенское &middot; 18 км от МКАД',
    category: 'rublevka',
    price: '390 000 000 ₽',
    area: '920 м²',
    plot: '45 соток',
    bedrooms: '6 ensuite',
    pool: '20м крытый SPA',
    badge: 'Рублевка &middot; Эксклюзив',
    status: 'Дизайнерская отделка',
    photos: [
      { url: 'assets/villa-2.jpg', caption: 'Архитектура &middot; Монолитный бетон и термоясень' },
      { url: 'assets/interior-3.jpg', caption: 'Мастер-сьют с панорамной террасой' },
      { url: 'assets/interior-4.jpg', caption: 'Каминный зал &middot; Натуральный мрамор' },
      { url: 'assets/pool-1.jpg', caption: 'Крытый круглогодичный бассейн 20м' },
      { url: 'assets/villa-7.jpg', caption: 'Консольная открытая терраса над садом' }
    ],
    bullets: [
      'Крытый бассейн 20м и сауна',
      'Винотека на 1000 бутылок с климатом',
      'Кинозал Dolby Atmos &middot; Лифт Kone'
    ]
  },
  {
    id: 'nordic-cliff',
    title: 'Chalet «Nordic Cliff»',
    location: 'Завидово &middot; 1-я береговая линия р. Волга',
    category: 'water',
    price: '185 000 000 ₽',
    area: '580 м²',
    plot: '28 соток',
    bedrooms: '4 спальни',
    pool: 'Собственный пирс',
    badge: 'Завидово &middot; Большая Волга',
    status: 'Прямой выход к воде',
    photos: [
      { url: 'assets/villa-3.jpg', caption: 'Вид на Волгу &middot; Частный причал для яхт' },
      { url: 'assets/interior-1.jpg', caption: 'Панорамная гостиная с видом на воду' },
      { url: 'assets/interior-2.jpg', caption: 'Столовая зона из массива алтайского кедра' },
      { url: 'assets/villa-8.jpg', caption: 'Приватная парковая территория у реки' },
      { url: 'assets/night-1.jpg', caption: 'Вечерний вид на акваторию с пирса' }
    ],
    bullets: [
      'Собственный причал для яхт (глубина 3.5м)',
      'Вид на воду 180° &middot; Баня из кедра',
      'Вертолетная площадка в поселке'
    ]
  },
  {
    id: 'forest-peak',
    title: 'Резиденция «Forest Peak»',
    location: 'Миллениум Парк &middot; Новая Рига, 21 км',
    category: 'novariga',
    price: '290 000 000 ₽',
    area: '810 м²',
    plot: '36 соток',
    bedrooms: '5 ensuite',
    pool: 'Инфинити-бассейн',
    badge: 'Миллениум Парк &middot; Парковая зона',
    status: 'Новый объект',
    photos: [
      { url: 'assets/villa-4.jpg', caption: 'Каскадная архитектура &middot; Вид на водный канал' },
      { url: 'assets/interior-3.jpg', caption: 'Просторная лаунж-зона с потолками 4.4м' },
      { url: 'assets/pool-1.jpg', caption: 'Инфинити-бассейн на террасе первого уровня' },
      { url: 'assets/interior-4.jpg', caption: 'Мастер-блок &middot; Гардеробные Poliform' },
      { url: 'assets/night-1.jpg', caption: 'Эксплуатируемая кровля 180 м² на закате' }
    ],
    bullets: [
      'Инфинити-бассейн с переливом',
      'Каскадные террасы и выход к парку',
      'Гараж на 4 авто с зарядкой для электрокаров'
    ]
  },
  {
    id: 'stone-wood',
    title: 'Вилла «Stone & Wood»',
    location: 'Николино &middot; Рублево-Успенское, 23 км',
    category: 'rublevka',
    price: '220 000 000 ₽',
    area: '650 м²',
    plot: '30 соток',
    bedrooms: '4 спальни',
    pool: 'Чайный павильон',
    badge: 'Николино &middot; Зрелый парк',
    status: 'Эксклюзивное предложение',
    photos: [
      { url: 'assets/villa-5.jpg', caption: 'Фасад из дикого камня и сибирской лиственницы' },
      { url: 'assets/interior-2.jpg', caption: 'Уютная каминная с библиотекой' },
      { url: 'assets/interior-1.jpg', caption: 'Столовая с выходом на крытую террасу-барбекю' },
      { url: 'assets/villa-7.jpg', caption: 'Зрелый ландшафтный парк с вековыми липами' },
      { url: 'assets/night-1.jpg', caption: 'Ночная подсветка вековых деревьев' }
    ],
    bullets: [
      'Зрелый ландшафтный сад 30 соток',
      'Отапливаемая беседка-барбекю 80 м²',
      'Кабинет с дровяным камином и библиотекой'
    ]
  },
  {
    id: 'aqua-vista',
    title: 'Резиденция «Aqua Vista»',
    location: 'Пестовское водохранилище &middot; 1-я линия',
    category: 'water',
    price: '340 000 000 ₽',
    area: '880 м²',
    plot: '50 соток',
    bedrooms: '6 ensuite',
    pool: 'Двойной бассейн IN/OUT',
    badge: 'Пестово &middot; Первая линия воды',
    status: 'Закрытая продажа',
    photos: [
      { url: 'assets/villa-6.jpg', caption: 'Прибрежная вилла &middot; Выход к яхтенной марине' },
      { url: 'assets/pool-1.jpg', caption: 'Двойной бассейн с выплывом на открытую террасу' },
      { url: 'assets/interior-3.jpg', caption: 'Панорамный мастер-сьют 120 м² с видом на воду' },
      { url: 'assets/interior-4.jpg', caption: 'SPA-зона &middot; Хаммам и соляная сауна' },
      { url: 'assets/night-1.jpg', caption: 'Вечерняя панорама водохранилища' }
    ],
    bullets: [
      'Прямой выход к большой воде и стоянке катеров',
      'Двойной бассейн с выплывом на улицу',
      'Мастер-сьют 120 м² с приватной видовой террасой'
    ]
  }
];

let currentIndex = 0;
let currentModalVilla = null;
let currentModalPhotoIndex = 0;

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails();
  updateFeaturedCard(0);
  renderGrid(VILLAS_COLLECTION);
  init3DParallax();

  // Set default booking date
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    dateInput.value = tm.toISOString().split('T')[0];
  }
});

// Render Thumbnails Bar under Hero
function renderThumbnails() {
  const bar = document.getElementById('thumbsBar');
  if (!bar) return;

  bar.innerHTML = VILLAS_COLLECTION.map((villa, idx) => `
    <button onclick="updateFeaturedCard(${idx})" class="thumb-btn text-left p-2 rounded-xl bg-apex-surface/80 border ${idx === 0 ? 'border-apex-gold bg-apex-card' : 'border-apex-border'} hover:border-apex-gold transition-all duration-300 group overflow-hidden">
      <div class="h-16 rounded-lg overflow-hidden mb-2 relative">
        <img src="${villa.photos[0].url}" alt="${villa.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <span class="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/80 px-1.5 py-0.5 rounded backdrop-blur-sm">0${idx + 1}</span>
      </div>
      <div class="text-[11px] font-bold text-white truncate group-hover:text-apex-gold transition-colors">${villa.title.replace('Резиденция ', '').replace('Вилла ', '')}</div>
      <div class="text-[10px] text-apex-gold font-semibold">${villa.price}</div>
    </button>
  `).join('');
}

// Update Active Featured Card
function updateFeaturedCard(index) {
  currentIndex = index;
  const villa = VILLAS_COLLECTION[index];
  if (!villa) return;

  // Update Ambient Background with smooth crossfade
  const bg = document.getElementById('ambientBg');
  if (bg) {
    bg.style.backgroundImage = `url('${villa.photos[0].url}')`;
  }

  // Update Counter
  const counter = document.getElementById('carouselCounter');
  if (counter) counter.innerText = `${index + 1} из ${VILLAS_COLLECTION.length}`;

  // Update Thumbnail Borders
  document.querySelectorAll('.thumb-btn').forEach((btn, i) => {
    if (i === index) {
      btn.classList.remove('border-apex-border');
      btn.classList.add('border-apex-gold', 'bg-apex-card');
    } else {
      btn.classList.remove('border-apex-gold', 'bg-apex-card');
      btn.classList.add('border-apex-border');
    }
  });

  // Smoothly update details
  const img = document.getElementById('featuredImg');
  if (img) {
    img.style.opacity = '0.4';
    setTimeout(() => {
      img.src = villa.photos[0].url;
      img.style.opacity = '1';
    }, 150);
  }

  document.getElementById('featuredBadge').innerHTML = villa.badge;
  document.getElementById('featuredStatus').innerText = villa.status;
  document.getElementById('featuredLocation').innerHTML = villa.location;
  document.getElementById('featuredTitle').innerText = villa.title;
  document.getElementById('featuredPrice').innerText = villa.price;
  document.getElementById('featuredArea').innerText = villa.area;
  document.getElementById('featuredPlot').innerText = villa.plot;
  document.getElementById('featuredBedrooms').innerText = villa.bedrooms;
  document.getElementById('featuredPool').innerText = villa.pool;

  const bulletsContainer = document.getElementById('featuredBullets');
  if (bulletsContainer) {
    bulletsContainer.innerHTML = villa.bullets.map(b => `
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-apex-gold"></span>
        <span>${b}</span>
      </div>
    `).join('');
  }
}

// Render Architectural Grid with 3D Tilt
function renderGrid(villas) {
  const grid = document.getElementById('villasGrid');
  if (!grid) return;

  grid.innerHTML = villas.map(villa => `
    <div class="card-3d rounded-3xl bg-apex-surface/90 border border-apex-border hover:border-apex-borderGold overflow-hidden flex flex-col justify-between group shadow-xl relative cursor-pointer" onclick="openGalleryById('${villa.id}')">
      <div class="card-glare"></div>

      <!-- Image Area -->
      <div class="relative h-64 overflow-hidden border-b border-apex-border">
        <img src="${villa.photos[0].url}" alt="${villa.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        
        <span class="absolute top-3 left-3 px-3 py-1 rounded bg-apex-dark/90 text-apex-gold text-[10px] font-bold uppercase tracking-wider border border-apex-borderGold backdrop-blur-md">
          ${villa.badge.split('&middot;')[0]}
        </span>

        <div class="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-apex-dark/90 border border-apex-border backdrop-blur-md">
          <span class="font-syne font-black text-white text-base">${villa.price}</span>
        </div>

        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-apex-border">
          5 фото
        </div>
      </div>

      <!-- Details -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-[11px] font-semibold text-slate-400 mb-1">
            ${villa.location}
          </div>
          
          <h3 class="font-syne font-bold text-xl text-white group-hover:text-apex-gold transition-colors mb-4">
            ${villa.title}
          </h3>

          <div class="grid grid-cols-3 gap-2 py-3 border-y border-apex-border mb-4 text-center">
            <div>
              <span class="block font-syne font-black text-sm text-white">${villa.area}</span>
              <span class="text-[9px] text-slate-400 uppercase font-semibold">Площадь</span>
            </div>
            <div>
              <span class="block font-syne font-black text-sm text-apex-gold">${villa.plot}</span>
              <span class="text-[9px] text-slate-400 uppercase font-semibold">Участок</span>
            </div>
            <div>
              <span class="block font-syne font-black text-sm text-white">${villa.bedrooms.split(' ')[0]} сп</span>
              <span class="text-[9px] text-slate-400 uppercase font-semibold">Спален</span>
            </div>
          </div>

          <div class="space-y-1 text-xs text-slate-400 mb-5">
            ${villa.bullets.slice(0, 2).map(b => `<div class="truncate">&bull; ${b}</div>`).join('')}
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2" onclick="event.stopPropagation()">
          <button onclick="openBookingModal('Просмотр: ${villa.title}')" class="flex-1 py-2.5 rounded-xl bg-apex-gold hover:bg-apex-goldLight text-slate-950 font-syne font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-md">
            Записаться на показ
          </button>
          <button onclick="openGalleryById('${villa.id}')" class="p-2.5 rounded-xl bg-apex-dark border border-apex-border hover:border-apex-gold text-slate-300 hover:text-white transition-colors" title="Открыть фотогалерею">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </button>
        </div>

      </div>

    </div>
  `).join('');

  // Re-bind 3D tilt listeners to new elements
  bind3DTiltListeners();
}

// Filter Grid
function filterGrid(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.grid-filter-btn').forEach(btn => {
      btn.classList.remove('bg-apex-gold', 'text-slate-950', 'border-apex-gold');
      btn.classList.add('bg-apex-surface', 'text-slate-300', 'border-apex-border');
    });
    btnElement.classList.remove('bg-apex-surface', 'text-slate-300', 'border-apex-border');
    btnElement.classList.add('bg-apex-gold', 'text-slate-950', 'border-apex-gold');
  }

  let filtered = VILLAS_COLLECTION;
  if (category === 'novariga') {
    filtered = VILLAS_COLLECTION.filter(v => v.category === 'novariga');
  } else if (category === 'rublevka') {
    filtered = VILLAS_COLLECTION.filter(v => v.category === 'rublevka');
  } else if (category === 'water') {
    filtered = VILLAS_COLLECTION.filter(v => v.category === 'water');
  }

  renderGrid(filtered);
}

// 3D Parallax & Mouse Movement Engine
function init3DParallax() {
  const ambient = document.getElementById('ambientBg');
  
  // Ambient background gentle mouse parallax
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 35;
    const y = (e.clientY / window.innerHeight - 0.5) * 35;
    if (ambient) {
      ambient.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
    }
  });

  bind3DTiltListeners();
}

// Bind 3D Card Tilt on Mouse Move
function bind3DTiltListeners() {
  const cards = document.querySelectorAll('.card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg tilt
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// Open Lightbox for Active Featured Villa
function openGalleryForCurrentVilla() {
  openGalleryById(VILLAS_COLLECTION[currentIndex].id);
}

function openGalleryById(id) {
  const villa = VILLAS_COLLECTION.find(v => v.id === id);
  if (!villa) return;

  currentModalVilla = villa;
  currentModalPhotoIndex = 0;

  document.getElementById('modalBadge').innerHTML = villa.badge;
  document.getElementById('modalLocation').innerHTML = villa.location;
  document.getElementById('modalTitle').innerText = villa.title;
  document.getElementById('modalPrice').innerText = villa.price;
  document.getElementById('modalSpecsSummary').innerText = `${villa.area} &middot; ${villa.plot} &middot; ${villa.bedrooms}`;

  updateModalPhoto(0);

  // Render Thumb Strip
  const strip = document.getElementById('modalThumbStrip');
  if (strip) {
    strip.innerHTML = villa.photos.map((p, idx) => `
      <button onclick="updateModalPhoto(${idx})" class="modal-thumb-btn h-14 rounded-lg overflow-hidden border ${idx === 0 ? 'border-apex-gold ring-2 ring-apex-gold/50' : 'border-apex-border'} transition-all">
        <img src="${p.url}" alt="Фото" class="w-full h-full object-cover">
      </button>
    `).join('');
  }

  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function updateModalPhoto(photoIdx) {
  if (!currentModalVilla) return;
  currentModalPhotoIndex = photoIdx;

  const photo = currentModalVilla.photos[photoIdx];
  const mainImg = document.getElementById('modalMainImg');
  const caption = document.getElementById('modalPhotoCaption');

  if (mainImg) {
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = photo.url;
      mainImg.style.opacity = '1';
    }, 120);
  }

  if (caption) {
    caption.innerHTML = photo.caption;
  }

  // Highlight active thumb
  document.querySelectorAll('.modal-thumb-btn').forEach((btn, i) => {
    if (i === photoIdx) {
      btn.classList.add('border-apex-gold', 'ring-2', 'ring-apex-gold/50');
      btn.classList.remove('border-apex-border');
    } else {
      btn.classList.remove('border-apex-gold', 'ring-2', 'ring-apex-gold/50');
      btn.classList.add('border-apex-border');
    }
  });
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function bookCurrentVilla() {
  openBookingModal(`Просмотр: ${VILLAS_COLLECTION[currentIndex].title}`);
}

function bookFromModal() {
  closeGalleryModal();
  if (currentModalVilla) {
    openBookingModal(`Просмотр: ${currentModalVilla.title}`);
  }
}

// Booking Modal
function openBookingModal(targetTitle) {
  const modal = document.getElementById('bookingModal');
  const input = document.getElementById('bookingTarget');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (input && targetTitle) {
    input.value = targetTitle;
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('bookingName').value;
  const target = document.getElementById('bookingTarget').value;

  closeBookingModal();
  showToast(`Заявка принята, ${name}! Персональный брокер свяжется с вами.`);
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3500);
}

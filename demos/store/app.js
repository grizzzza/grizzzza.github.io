
// ==========================================
// COPY TO CLIPBOARD HELPER
// ==========================================
function copyToClipboard(text, label = 'Номер') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    } catch(e) {}
  }
  showToast(`${label} скопирован в буфер: ${text}`);
}


let currentPage = 1;
const ITEMS_PER_PAGE = 8;
let currentFilteredProducts = [];
let isLoggedIn = localStorage.getItem('nordic_user_logged_in') === 'true';



const products = [
  {
    id: 1,
    title: 'Диван трехместный Møbler',
    category: 'Мебель',
    price: 79990,
    oldPrice: 99990,
    badge: 'Скидка -20%',
    rating: 4.9,
    reviews: 42,
    img: 'assets/product-1.jpg',
    desc: 'Удобный трехместный диван в скандинавском стиле с мягкой обивкой из фактурного шенилла.'
  },
  {
    id: 2,
    title: 'Обеденный стол Eken',
    category: 'Мебель',
    price: 39990,
    oldPrice: 49990,
    badge: 'Хит',
    rating: 4.8,
    reviews: 36,
    img: 'assets/product-2.jpg',
    desc: 'Обеденный стол из массива европейского беленого дуба на 6 персон.'
  },
  {
    id: 3,
    title: 'Кресло для отдыха Vile',
    category: 'Мебель',
    price: 28990,
    oldPrice: 34990,
    badge: 'Новинка',
    rating: 4.9,
    reviews: 19,
    img: 'assets/product-3.jpg',
    desc: 'Мягкое кресло с эргономичной поддержкой и ножками из массива бука.'
  },
  {
    id: 4,
    title: 'Полка настенная Hylla',
    category: 'Мебель',
    price: 8990,
    oldPrice: 10990,
    badge: 'Хит',
    rating: 4.7,
    reviews: 58,
    img: 'assets/product-4.jpg',
    desc: 'Модульная навесная полка из светлого дуба для книг и интерьерного декора.'
  },
  {
    id: 5,
    title: 'Люстра подвесная Ljus',
    category: 'Освещение',
    price: 18990,
    oldPrice: 22990,
    badge: 'Хит',
    rating: 4.9,
    reviews: 31,
    img: 'assets/product-5.jpg',
    desc: 'Геометрическая подвесная люстра со сферическими плафонами мягкого рассеянного света.'
  },
  {
    id: 6,
    title: 'Торшер напольный Golv',
    category: 'Освещение',
    price: 14990,
    oldPrice: 18990,
    badge: 'Скидка -20%',
    rating: 4.8,
    reviews: 27,
    img: 'assets/product-6.jpg',
    desc: 'Минималистичный металлический торшер с регулируемым направлением плафона.'
  },
  {
    id: 7,
    title: 'Бра настенное Skina',
    category: 'Освещение',
    price: 6990,
    oldPrice: 8990,
    badge: 'Новинка',
    rating: 4.9,
    reviews: 14,
    img: 'assets/product-7.jpg',
    desc: 'Латунное акцентное бра с направленным теплым свечением для спальни и гостиной.'
  },
  {
    id: 8,
    title: 'Настольная лампа Bord',
    category: 'Освещение',
    price: 7990,
    oldPrice: 9990,
    badge: 'Скидка -20%',
    rating: 4.8,
    reviews: 22,
    img: 'assets/product-8.jpg',
    desc: 'Дизайнерская лампа с мраморным основанием и сенсорным ступенчатым диммером.'
  },
  {
    id: 9,
    title: 'Дизайнерский стул',
    category: 'Мебель',
    price: 4990,
    oldPrice: 5990,
    badge: 'Хит',
    rating: 4.9,
    reviews: 64,
    img: 'assets/product-9.jpg',
    desc: 'Эргономичный дизайнерский стул с сиденьем из формованного пластика и деревянными ножками.'
  },
  {
    id: 10,
    title: 'Рабочая лампа',
    category: 'Освещение',
    price: 12990,
    oldPrice: 15990,
    badge: 'Новинка',
    rating: 4.8,
    reviews: 18,
    img: 'assets/product-10.jpg',
    desc: 'Функциональная настольная рабочая лампа с гибким кронштейном для комфортной работы.'
  },
  {
    id: 11,
    title: 'Декоративная полка',
    category: 'Мебель',
    price: 3990,
    oldPrice: 4990,
    badge: 'Скидка -20%',
    rating: 4.7,
    reviews: 29,
    img: 'assets/product-11.jpg',
    desc: 'Компактная фигурная полка из натурального дерева для сувениров и растений.'
  },
  {
    id: 12,
    title: 'Журнальный столик',
    category: 'Мебель',
    price: 2990,
    oldPrice: 3990,
    badge: 'Хит',
    rating: 4.9,
    reviews: 43,
    img: 'assets/product-12.jpg',
    desc: 'Элегантный журнальный столик со столешницей из шпона ясеня для гостиной.'
  },
  {
    id: 13,
    title: 'Мягкий пуф',
    category: 'Мебель',
    price: 6990,
    oldPrice: 8990,
    badge: 'Хит',
    rating: 4.9,
    reviews: 75,
    img: 'assets/product-13.jpg',
    desc: 'Уютный круглый пуф с обивкой из износостойкой фактурной ткани.'
  },
  {
    id: 14,
    title: 'Настенные часы',
    category: 'Декор',
    price: 11990,
    oldPrice: 14990,
    badge: 'Скидка -20%',
    rating: 4.9,
    reviews: 38,
    img: 'assets/product-14.jpg',
    desc: 'Минималистичные настенные часы с бесшумным кварцевым механизмом.'
  },
  {
    id: 15,
    title: 'Интерьерная картина',
    category: 'Декор',
    price: 1990,
    oldPrice: 2990,
    badge: 'Новинка',
    rating: 4.8,
    reviews: 51,
    img: 'assets/product-15.jpg',
    desc: 'Абстрактный художественный постер в лаконичной деревянной раме.'
  },
  {
    id: 16,
    title: 'Вязаный плед Kärlek',
    category: 'Текстиль',
    price: 9990,
    oldPrice: 12990,
    badge: 'Хит',
    rating: 4.8,
    reviews: 26,
    img: 'assets/product-16.jpg',
    desc: 'Мягкий уютный шерстяной плед крупной вязки из 100% новозеландской мериносовой шерсти.'
  }
];

let cart = JSON.parse(localStorage.getItem('nordic_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('nordic_wishlist')) || [];
let currentFilter = 'all';
let currentCity = localStorage.getItem('nordic_city') || 'Казань';

// Filter out non-existing products in stored session
cart = cart.filter(item => products.some(p => p.id === item.id));
wishlist = wishlist.filter(id => products.some(p => p.id === id));

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filtersContainer = document.getElementById('filters');
const searchInput = document.getElementById('searchInput');
const cartBadge = document.getElementById('cartBadge');
const wishBadge = document.getElementById('wishBadge');
const cityLabel = document.getElementById('cityLabel');

const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) return five;
  n %= 10;
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return two;
  return five;
}

// --- POPULAR CITIES & CITY MODAL (Lemana Pro / Hoff style) ---
const POPULAR_CITIES = [
  'Казань', 'Москва', 'Санкт-Петербург', 'Екатеринбург',
  'Новосибирск', 'Нижний Новгород', 'Самара', 'Уфа',
  'Краснодар', 'Ростов-на-Дону', 'Тюмень', 'Челябинск'
];

function formatCityIn(city) {
  const map = {
    'Казань': 'в Казани',
    'Москва': 'в Москве',
    'Санкт-Петербург': 'в Санкт-Петербурге',
    'Екатеринбург': 'в Екатеринбурге',
    'Новосибирск': 'в Новосибирске',
    'Нижний Новгород': 'в Нижнем Новгороде',
    'Самара': 'в Самаре',
    'Уфа': 'в Уфе',
    'Краснодар': 'в Краснодаре',
    'Ростов-на-Дону': 'в Ростове-на-Дону',
    'Тюмень': 'в Тюмени',
    'Челябинск': 'в Челябинске'
  };
  return map[city] || `в г. ${city}`;
}

function updateCityUI() {
  if (cityLabel) cityLabel.textContent = currentCity;
  const mobileCitySpan = document.getElementById('mobileCitySpan');
  if (mobileCitySpan) mobileCitySpan.textContent = currentCity;
  const heroSlideCitySpan = document.getElementById('heroSlideCitySpan');
  if (heroSlideCitySpan) {
    heroSlideCitySpan.textContent = formatCityIn(currentCity);
  }
}

function openCityModal() {
  const sidebar = document.getElementById('citySidebar');
  const overlay = document.getElementById('drawerOverlay');
  const input = document.getElementById('citySearchInput');
  if (!sidebar || !overlay) return;
  
  renderCityList();
  
  sidebar.classList.remove('hidden');
  sidebar.style.transform = 'translateX(0)';
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    if (input) input.focus();
  }, 10);
}

function closeCityModal() {
  const sidebar = document.getElementById('citySidebar');
  const overlay = document.getElementById('drawerOverlay');
  if (!sidebar || !overlay) return;

  sidebar.style.transform = 'translateX(-100%)';
  overlay.classList.add('opacity-0');
  setTimeout(() => {
    sidebar.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 300);
}

function renderCityList(filter = '') {
  const container = document.getElementById('cityListContainer');
  if (!container) return;
  const filtered = POPULAR_CITIES.filter(c => c.toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-6 text-brand-500 text-sm">Город не найден</div>`;
    return;
  }
  container.innerHTML = filtered.map(city => {
    return `
      <button onclick="selectCity('${city}')" class="w-full text-left px-6 py-4 border-b border-brand-100 hover:bg-brand-50 transition-colors text-sm text-brand-900 font-medium">
        ${city}
      </button>
    `;
  }).join('');
}

function filterCityList() {
  const input = document.getElementById('citySearchInput');
  if (input) renderCityList(input.value.trim());
}

function selectCityFromSearch() {
  const input = document.getElementById('citySearchInput');
  if (input && input.value.trim()) {
    selectCity(input.value.trim());
  }
}

function selectCity(city) {
  currentCity = city;
  localStorage.setItem('nordic_city', currentCity);
  updateCityUI();
  closeCityModal();
  showToast(`Город доставки изменен: ${currentCity}. Условия обновлены.`);
}

function changeCity() {
  openCityModal();
}

// --- CALLBACK MODAL ---
function openCallbackModal() {
  const modal = document.getElementById('callbackModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    const box = modal.querySelector('div');
    if (box) box.classList.remove('scale-95');
  }, 10);
}

function closeCallbackModal() {
  const modal = document.getElementById('callbackModal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  const box = modal.querySelector('div');
  if (box) box.classList.add('scale-95');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function handleCallbackSubmit(e) {
  e.preventDefault();
  closeCallbackModal();
  showToast('Заявка принята! Наш дизайнер свяжется с вами в течение 10 минут.');
}

// --- HERO PROMO SLIDER ---
let currentSlide = 0;
const totalSlides = 3;
let sliderTimer = null;
const SLIDE_DURATION = 5000;


function initSlider() {
  renderSliderDots();
  showSlide(currentSlide);
  startSliderTimer();

  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
      }
    }, { passive: true });
  }

  // Keyboard arrows
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
}

function showSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach((slide, idx) => {
    if (idx === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  const slideCounter = document.getElementById('slideCounter');
  if (slideCounter) {
    slideCounter.textContent = `0${currentSlide + 1} / 0${totalSlides}`;
  }

  renderSliderDots();
}

function renderSliderDots() {
  const container = document.getElementById('sliderDotsContainer');
  if (!container) return;

  container.innerHTML = Array.from({ length: totalSlides }).map((_, idx) => {
    const isActive = idx === currentSlide;
    if (isActive) {
      return `
        <button onclick="goToSlide(${idx})" class="w-10 sm:w-14 h-2.5 bg-white/30 rounded-full relative overflow-hidden transition-all duration-300 focus:outline-none" title="Слайд ${idx + 1} (активный)">
          <div id="sliderProgressBar" class="h-full bg-white rounded-full slider-progress-bar "></div>
        </button>
      `;
    }
    return `
      <button onclick="goToSlide(${idx})" class="w-2.5 h-2.5 bg-white/40 hover:bg-white/80 rounded-full transition-all duration-300 focus:outline-none" title="Перейти к слайду ${idx + 1}"></button>
    `;
  }).join('');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
  resetSliderTimer();
}

function startSliderTimer() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
}

function pauseSliderTimer() {}

function resumeSliderTimer() {}

function resetSliderTimer() {
  startSliderTimer();
  
}

function filterAndScroll(category) {
  setFilter(category, true);
}

function handleNewsletter(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  if (input && input.value) {
    showToast('Вы успешно подписались на закрытые скидки! Промокод отправлен.');
    input.value = '';
  }
}

function init() {
  updateCityUI();
  updateBadges();
  renderFilters();
  renderProducts();
  if (document.getElementById('heroSlider')) {
    initSlider();
  }
  renderAccount();
  renderCart();
  renderProductDetails();
}

function renderProductDetails() {
  const container = document.getElementById('productDetailsContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  let productId = parseInt(urlParams.get('id'));
  if (!productId) {
    productId = 1;
  }

  const p = products.find(x => x.id === productId);
  if (!p) {
    container.innerHTML = '<p class="text-center text-brand-500">Товар не найден. <a href="index.html" class="underline">Вернуться в каталог</a></p>';
    return;
  }

  const inCart = cart.some(item => item.id === p.id);
  const inWishlist = wishlist.some(item => item.id === p.id);
  const cartBtnText = inCart ? 'В корзине' : 'В корзину';
  const cartBtnClass = inCart 
    ? 'bg-brand-100 text-brand-900 border border-brand-200' 
    : 'bg-brand-900 text-white border border-brand-900 hover:bg-brand-800';
  const wishIconClass = inWishlist ? 'text-red-500 fill-current' : 'text-brand-400';

  // Mock characteristics & reviews
  const specs = [
    { name: 'Материал', value: p.category === 'Текстиль' ? '100% хлопок' : 'Дерево / Металл' },
    { name: 'Габариты', value: 'Ш 60 x Г 60 x В 80 см' },
    { name: 'Вес', value: '4.5 кг' },
    { name: 'Страна производства', value: 'Швеция' }
  ];
  
  const reviews = [
    { author: 'Анна С.', rating: 5, date: '12 Сентября 2026', text: 'Отличное качество, идеально вписалось в интерьер гостиной. Доставили вовремя.' },
    { author: 'Игорь М.', rating: 4, date: '05 Августа 2026', text: 'Все хорошо, но коробка была немного помята при доставке. Сам товар без повреждений.' },
    { author: 'Елена', rating: 5, date: '21 Июля 2026', text: 'Очень стильная вещь, буду заказывать еще!' }
  ];

  container.innerHTML = `
    <!-- Хлебные крошки -->
    <nav class="flex items-center gap-2 text-xs font-medium text-brand-500 mb-8">
      <a href="index.html" class="hover:text-brand-900 transition-colors">Главная</a>
      <span>/</span>
      <a href="index.html#catalog" class="hover:text-brand-900 transition-colors">Каталог</a>
      <span>/</span>
      <a href="index.html#catalog" class="hover:text-brand-900 transition-colors">${p.category}</a>
      <span>/</span>
      <span class="text-brand-900 truncate max-w-[200px] sm:max-w-xs">${p.title}</span>
    </nav>

    <div class="flex flex-col md:flex-row gap-10 lg:gap-16">
      <div class="flex-1">
        <div class="aspect-square bg-white rounded-2xl border border-brand-200 overflow-hidden relative">
          ${p.badge ? `<span class="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-900 text-white rounded z-10">${p.badge}</span>` : ''}
          <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <div class="flex flex-wrap items-center gap-4 mb-3">
          <span class="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-bold uppercase tracking-wider rounded">${p.category}</span>
          <div class="flex items-center gap-1.5 text-xs font-medium text-amber-500">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ${p.rating} <span class="text-brand-400">(${p.reviews} отзывов)</span>
          </div>
          <span class="text-xs text-emerald-600 font-semibold flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> В наличии</span>
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 mb-4 tracking-tight">${p.title}</h1>
        <p class="text-sm text-brand-600 mb-6 leading-relaxed">${p.desc}</p>
        
        <div class="flex items-end gap-3 mb-8">
          <span class="text-3xl font-extrabold text-brand-900">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="text-sm font-semibold text-brand-400 line-through mb-1.5">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>

        <div class="flex items-center gap-3">
          <button onclick="toggleCartItem(${p.id}); renderProductDetails()" class="flex-1 ${cartBtnClass} font-semibold py-4 rounded-xl transition-all active:scale-95 text-sm sm:text-base">
            ${cartBtnText}
          </button>
          <button onclick="toggleWishlistItem(${p.id}); renderProductDetails()" class="w-14 h-14 shrink-0 flex items-center justify-center bg-white border border-brand-200 rounded-xl hover:border-brand-300 hover:bg-brand-50 transition-all active:scale-95" title="В избранное">
            <svg class="w-6 h-6 ${wishIconClass} transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
        </div>
        
        <!-- Info boxes -->
        <div class="mt-8 grid grid-cols-2 gap-4">
           <div class="bg-brand-50 p-4 rounded-xl border border-brand-100 flex gap-3">
             <svg class="w-5 h-5 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
             <div><span class="block text-xs font-semibold text-brand-900 mb-0.5">Доставка</span><span class="text-[11px] text-brand-500">От 1 дня, бесплатно от 30 000 ₽</span></div>
           </div>
           <div class="bg-brand-50 p-4 rounded-xl border border-brand-100 flex gap-3">
             <svg class="w-5 h-5 text-brand-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
             <div><span class="block text-xs font-semibold text-brand-900 mb-0.5">Гарантия</span><span class="text-[11px] text-brand-500">2 года на все товары</span></div>
           </div>
        </div>
      </div>
    </div>
    
    <!-- ТАБЫ И ОТЗЫВЫ -->
    <div class="mt-16 border-t border-brand-200 pt-10">
      <div class="flex items-center gap-6 border-b border-brand-200 mb-8 overflow-x-auto pb-1">
        <button onclick="switchTab('desc')" id="tabBtn-desc" class="pb-3 text-sm font-bold text-brand-900 border-b-2 border-brand-900 whitespace-nowrap transition-colors">Описание</button>
        <button onclick="switchTab('specs')" id="tabBtn-specs" class="pb-3 text-sm font-bold text-brand-500 hover:text-brand-900 border-b-2 border-transparent whitespace-nowrap transition-colors">Характеристики</button>
        <button onclick="switchTab('reviews')" id="tabBtn-reviews" class="pb-3 text-sm font-bold text-brand-500 hover:text-brand-900 border-b-2 border-transparent whitespace-nowrap transition-colors">Отзывы (${p.reviews})</button>
        <button onclick="switchTab('docs')" id="tabBtn-docs" class="pb-3 text-sm font-bold text-brand-500 hover:text-brand-900 border-b-2 border-transparent whitespace-nowrap transition-colors">Документы</button>
      </div>
      
      <div id="tabContent-desc" class="tab-pane animate-fade-in text-sm text-brand-700 leading-relaxed max-w-3xl">
        <p class="mb-4">${p.desc}</p>
        <p>Наш продукт создан с учетом современных тенденций скандинавского дизайна. Мы используем только экологически чистые материалы и заботимся о каждой детали. Это идеальное решение для вашего интерьера, которое прослужит долгие годы, сохраняя свой первоначальный вид.</p>
      </div>
      
      <div id="tabContent-specs" class="tab-pane hidden animate-fade-in max-w-2xl">
        <table class="w-full text-sm text-left">
          <tbody>
            ${specs.map(s => `
              <tr class="border-b border-brand-100 last:border-0">
                <td class="py-3 font-medium text-brand-600 w-1/3">${s.name}</td>
                <td class="py-3 text-brand-900">${s.value}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div id="tabContent-reviews" class="tab-pane hidden animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="md:col-span-1">
            <h4 class="font-bold text-4xl text-brand-900 mb-2">${p.rating} <span class="text-sm font-medium text-brand-500">/ 5</span></h4>
            <div class="flex items-center gap-1 text-amber-500 mb-2">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <p class="text-xs text-brand-500 mb-6">На основе ${p.reviews} отзывов</p>
            <button onclick="showToast('Откроется форма авторизации или отзыва')" class="w-full py-2.5 bg-brand-900 text-white font-semibold rounded text-sm hover:bg-brand-800 transition-colors">Оставить отзыв</button>
          </div>
          <div class="md:col-span-2 flex flex-col gap-6">
            ${reviews.map(r => `
              <div class="border-b border-brand-100 pb-6 last:border-0">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-sm text-brand-900">${r.author}</span>
                  <span class="text-xs text-brand-400">${r.date}</span>
                </div>
                <div class="flex items-center gap-0.5 text-amber-500 mb-3">
                  ${'<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'.repeat(r.rating)}
                </div>
                <p class="text-sm text-brand-700">${r.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div id="tabContent-docs" class="tab-pane hidden animate-fade-in max-w-2xl">
        <div class="flex items-center justify-between p-4 bg-brand-50 rounded-lg border border-brand-100 mb-3 hover:bg-white transition-colors cursor-pointer" onclick="showToast('Началось скачивание PDF')">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            <div>
              <span class="block text-sm font-semibold text-brand-900">Инструкция по сборке и эксплуатации</span>
              <span class="text-xs text-brand-500">PDF, 2.4 МБ</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </div>
      </div>
    </div>
  `;
}


function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'bg-brand-900 text-white px-5 py-3 shadow-2xl rounded-lg transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3 text-xs sm:text-sm font-medium z-[150]';
  toast.innerHTML = `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.remove('translate-y-10', 'opacity-0'); }, 10);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// RESTORED FUNCTIONS
function toggleDrawer(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer || !overlay) return;

  const isOpen = !drawer.classList.contains('translate-x-full');
  if (isOpen) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    if (id === "cartSidebar") renderCart();

    ['cartSidebar', 'citySidebar', 'accountSidebar', 'wishSidebar', 'mobileMenuDrawer'].forEach(d => {
      const el = document.getElementById(d);
      if (el && d !== id) el.classList.add('translate-x-full');
    });
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function updateCityUI() {
  const currentCityBtn = document.getElementById('currentCityBtn');
  if (currentCityBtn) {
    currentCityBtn.innerHTML = `
      <svg class="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      ${currentCity}
    `;
  }
}

function selectCity(city) {
  currentCity = city;
  localStorage.setItem('nordic_city', city);
  updateCityUI();
  toggleDrawer('citySidebar');
}

function filterCityList() {
  const q = document.getElementById('citySearchInput');
  if (!q) return;
  const val = q.value.toLowerCase();
  const lists = document.querySelectorAll('.city-list');
  lists.forEach(ul => {
    const items = ul.querySelectorAll('li');
    items.forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(val) ? '' : 'none';
    });
  });
}

function renderFilters() {
  const container = document.getElementById('filters');
  if (!container) return;
  const cats = ['all', ...new Set(products.map(p => p.category))];
  
  container.innerHTML = cats.map(c => {
    const isActive = c === currentFilter;
    const cls = isActive ? 'bg-brand-900 text-white' : 'bg-brand-100 text-brand-900 hover:bg-brand-200';
    const label = c === 'all' ? 'Все товары' : c;
    return `<button onclick="setFilter('${c}')" class="px-4 py-2 rounded-full text-sm font-semibold transition-colors ${cls}">${label}</button>`;
  }).join('');
}

function setFilter(cat, scroll = false) {
  currentFilter = cat;
  renderFilters();
  renderProducts();
  if (scroll) {
    const grid = document.getElementById('catalog');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleCartItem(id) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    showToast('Товар удален из корзины');
  } else {
    cart.push({ id, qty: 1 });
    showToast('Товар добавлен в корзину');
  }
  localStorage.setItem('nordic_cart', JSON.stringify(cart));
  updateBadges();
  renderCart();
}

function toggleWishlistItem(id) {
  const idx = wishlist.indexOf(id);
  if (idx !== -1) {
    wishlist.splice(idx, 1);
    showToast('Удалено из избранного');
  } else {
    wishlist.push(id);
    showToast('Добавлено в избранное');
  }
  localStorage.setItem('nordic_wishlist', JSON.stringify(wishlist));
  updateBadges();
}

function updateBadges() {
  const cartBadge = document.getElementById('cartBadge');
  const wishBadge = document.getElementById('wishBadge');
  
  if (cartBadge) {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = count;
    cartBadge.classList.toggle('hidden', count === 0);
  }
  if (wishBadge) {
    wishBadge.textContent = wishlist.length;
    wishBadge.classList.toggle('hidden', wishlist.length === 0);
  }
}

function submitCheckout() {
  const content = document.getElementById('cartContent');
  if (!content) return;
  content.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <div class="w-12 h-12 border-4 border-brand-200 border-t-brand-900 rounded-full animate-spin mb-4"></div>
      <p class="text-brand-900 font-bold">Обработка платежа...</p>
    </div>
  `;
  setTimeout(() => {
    cart = [];
    localStorage.setItem('nordic_cart', '[]');
    updateBadges();
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <svg class="w-16 h-16 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="text-brand-900 font-bold text-lg mb-2">Оплата прошла успешно!</p>
        <p class="text-brand-500 text-sm">Ваш заказ №4910-12 оформлен. Мы свяжемся с вами в ближайшее время.</p>
        <button onclick="toggleDrawer('cartSidebar')" class="mt-6 px-6 py-2 bg-brand-900 text-white rounded font-medium hover:bg-brand-800">Продолжить покупки</button>
      </div>
    `;
  }, 2000);
}

function renderProducts() {
  if (!productsGrid) return;
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  currentFilteredProducts = products.filter(p => {
    const matchesCat = currentFilter === 'all' || p.category === currentFilter;
    const matchesQuery = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const countEl = document.getElementById('productCount');
  if (countEl) {
    countEl.textContent = `${currentFilteredProducts.length} ${getNoun(currentFilteredProducts.length, 'товар', 'товара', 'товаров')}`;
  }

  resetPagination();
  renderProductsGrid(false);
}

function renderProductsGrid(append = false) {
  if (!productsGrid) return;
  
  if (currentFilteredProducts.length === 0) {
    productsGrid.innerHTML = `<div class="col-span-full text-center text-brand-500 py-16">
      <svg class="w-12 h-12 mx-auto mb-3 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <p class="font-medium text-base text-brand-800">Ничего не найдено</p>
      <p class="text-xs text-brand-500 mt-1">Попробуйте изменить условия поиска</p>
    </div>`;
    const pagContainer = document.getElementById('paginationContainer');
    if (pagContainer) pagContainer.classList.add('hidden');
    return;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = currentFilteredProducts.slice(startIndex, endIndex);

  let html = '';
  try {
  pageItems.forEach(p => {
    const inCart = cart.some(item => item.id === p.id);
    const inWishlist = wishlist.some(item => item.id === p.id);
    
    const cartBtnClass = inCart 
      ? 'bg-brand-900 text-white shadow-md shadow-brand-900/20' 
      : 'bg-white text-brand-900 shadow-sm hover:shadow-md';
    const wishIconClass = inWishlist ? 'text-red-500 fill-current' : 'text-brand-400';
    
    html += `
      <div class="group relative flex flex-col cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="relative w-full aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-brand-100 group-hover:border-brand-300 transition-colors mb-4">
          ${p.badge ? `<span class="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-900 text-white rounded z-10">${p.badge}</span>` : ''}
          
          <button onclick="event.stopPropagation(); toggleWishlistItem(${p.id}); renderProducts()" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur rounded-full hover:bg-white text-brand-400 transition-colors z-10">
            <svg class="w-4 h-4 ${wishIconClass} transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
          
          <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
          
          <button onclick="event.stopPropagation(); toggleCartItem(${p.id}); renderProducts()" class="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-xl transition-all z-10 ${cartBtnClass}" title="${inCart ? 'В корзине' : 'В корзину'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </button>
        </div>
        
        <div class="flex flex-col flex-1">
          <div class="flex items-center gap-1.5 text-[10px] font-medium text-brand-500 mb-1.5 uppercase tracking-wider">
            <span>${p.category}</span>
            <span class="w-1 h-1 rounded-full bg-brand-200"></span>
            <div class="flex items-center gap-0.5 text-amber-500">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ${p.rating}
            </div>
          </div>
          <h3 class="font-bold text-brand-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors">${p.title}</h3>
          
          <div class="mt-auto pt-2 flex items-end gap-2">
            <span class="text-sm font-bold text-brand-900">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="text-xs text-brand-400 line-through mb-0.5">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  if (append) {
    productsGrid.insertAdjacentHTML('beforeend', html);
  } else {
    productsGrid.innerHTML = html;
  }
  } catch(err) {
    productsGrid.innerHTML = '<div style="color:red">' + err.toString() + '\n' + err.stack + '</div>';
  }

  // Handle pagination button visibility
  const pagContainer = document.getElementById('paginationContainer');
  if (pagContainer) {
    if (endIndex >= currentFilteredProducts.length) {
      pagContainer.classList.add('hidden');
    } else {
      pagContainer.classList.remove('hidden');
    }
  }
}


// ==========================================
// TABS LOGIC
// ==========================================
function switchTab(tabId) {
  const tabs = ['desc', 'specs', 'reviews', 'docs'];
  tabs.forEach(t => {
    const btn = document.getElementById('tabBtn-' + t);
    const content = document.getElementById('tabContent-' + t);
    if (!btn || !content) return;
    
    if (t === tabId) {
      content.classList.remove('hidden');
      btn.classList.remove('text-brand-500', 'border-transparent');
      btn.classList.add('text-brand-900', 'border-brand-900');
    } else {
      content.classList.add('hidden');
      btn.classList.add('text-brand-500', 'border-transparent');
      btn.classList.remove('text-brand-900', 'border-brand-900');
    }
  });
}

// ==========================================
// ACCOUNT LOGIC
// ==========================================


function renderAccount() {
  const container = document.getElementById('accountContainer');
  if (!container) return;
  const titleEl = document.getElementById('accountSidebarTitle');
  
  if (!isLoggedIn) {
    if (titleEl) titleEl.textContent = 'Вход';
    container.innerHTML = `
      <form onsubmit="handleLogin(event)" class="flex flex-col gap-4 mt-4">
        <div>
          <label class="block text-xs font-medium text-brand-500 mb-1">Email</label>
          <input type="email" required placeholder="mail@example.com" class="w-full px-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm outline-none focus:border-brand-900 transition-colors">
        </div>
        <div>
          <label class="block text-xs font-medium text-brand-500 mb-1">Пароль</label>
          <input type="password" required placeholder="••••••••" class="w-full px-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm outline-none focus:border-brand-900 transition-colors">
        </div>
        <button type="submit" class="w-full py-3 bg-brand-900 text-white font-bold rounded-lg hover:bg-brand-800 transition-colors mt-2">Войти</button>
        <div class="text-center mt-4 text-xs text-brand-500">
          Для демо-версии введите любые данные
        </div>
      </form>
    `;
  } else {
    if (titleEl) titleEl.textContent = 'Профиль';
    container.innerHTML = `
      <div class="flex items-center gap-4 mb-8 p-4 bg-brand-50 rounded-xl border border-brand-100">
        <div class="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center text-brand-900 font-bold text-xl">
          И
        </div>
        <div>
          <div class="font-bold text-brand-900">Иван Иванов</div>
          <div class="text-xs text-brand-500">ivan@example.com</div>
        </div>
      </div>
      
      <h4 class="font-bold text-brand-900 mb-4">История заказов</h4>
      <div class="flex flex-col gap-4 mb-8">
        <div class="border border-brand-200 rounded-lg p-4 hover:border-brand-900 transition-colors cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Доставлен</span>
            <span class="text-xs text-brand-400">12 Октября</span>
          </div>
          <div class="font-medium text-brand-900 text-sm mb-1">Заказ №4812-99</div>
          <div class="text-xs text-brand-500 mb-2">3 товара на сумму 45 900 ₽</div>
        </div>
        
        <div class="border border-brand-200 rounded-lg p-4 hover:border-brand-900 transition-colors cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">В пути</span>
            <span class="text-xs text-brand-400">Вчера</span>
          </div>
          <div class="font-medium text-brand-900 text-sm mb-1">Заказ №4900-11</div>
          <div class="text-xs text-brand-500 mb-2">1 товар на сумму 12 990 ₽</div>
        </div>
      </div>
      
      <button onclick="handleLogout()" class="w-full py-2.5 bg-white border border-brand-200 text-brand-900 font-bold rounded-lg hover:bg-brand-50 transition-colors">Выйти из аккаунта</button>
    `;
  }
}

function handleLogin(e) {
  e.preventDefault();
  isLoggedIn = true;
  localStorage.setItem('nordic_user_logged_in', 'true');
  renderAccount();
  renderCart();
  showToast('Вы успешно вошли в систему');
}

function handleLogout() {
  isLoggedIn = false;
  localStorage.setItem('nordic_user_logged_in', 'false');
  renderAccount();
  renderCart();
  showToast('Вы вышли из аккаунта');
}

// ==========================================
// PAGINATION LOGIC
// ==========================================


function loadMoreProducts() {
  currentPage++;
  renderProductsGrid(true); // true means append
}

function resetPagination() {
  currentPage = 1;
}




// ==========================================
// FULL CART LOGIC & UI RENDERER
// ==========================================
function renderCart() {
  const container = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountTagEl = document.getElementById('cartCountTag');
  const cartTotalHeaderEl = document.getElementById('cartTotalHeader');
  
  if (!container) return;

  let totalSum = 0;
  let totalQty = 0;

  if (!cart || cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-center text-brand-500">
        <svg class="w-16 h-16 text-brand-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        <p class="font-bold text-base text-brand-900 mb-1">Ваша корзина пуста</p>
        <p class="text-xs text-brand-500 mb-6">Добавьте понравившиеся товары из каталога</p>
        <button onclick="toggleDrawer('cartSidebar')" class="px-5 py-2.5 bg-brand-900 text-white text-xs font-bold rounded-lg hover:bg-brand-800 transition-colors">Перейти в каталог</button>
      </div>
    `;
    if (cartTotalEl) cartTotalEl.textContent = '0 ₽';
    if (cartCountTagEl) cartCountTagEl.textContent = '0 шт';
    if (cartTotalHeaderEl) cartTotalHeaderEl.textContent = 'Корзина';
    updateBadges();
    return;
  }

  let html = '';
  cart.forEach(item => {
    const p = products.find(prod => prod.id === item.id);
    if (!p) return;
    
    const itemTotal = p.price * item.qty;
    totalSum += itemTotal;
    totalQty += item.qty;

    html += `
      <div class="flex items-center gap-4 p-3 bg-brand-50 rounded-xl border border-brand-100 relative group">
        <img src="${p.img}" alt="${p.title}" class="w-16 h-16 object-cover rounded-lg bg-white border border-brand-200">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs text-brand-900 truncate mb-1">${p.title}</h4>
          <div class="text-xs font-bold text-brand-900 mb-2">${formatPrice(p.price)}</div>
          <div class="flex items-center gap-2">
            <div class="flex items-center border border-brand-200 rounded-lg bg-white overflow-hidden">
              <button onclick="updateCartQty(${p.id}, -1)" class="w-6 h-6 flex items-center justify-center text-brand-700 hover:bg-brand-100 font-bold text-xs">-</button>
              <span class="px-2 text-xs font-bold text-brand-900 min-w-[20px] text-center">${item.qty}</span>
              <button onclick="updateCartQty(${p.id}, 1)" class="w-6 h-6 flex items-center justify-center text-brand-700 hover:bg-brand-100 font-bold text-xs">+</button>
            </div>
            <span class="text-xs text-brand-400 font-medium">× ${item.qty}</span>
          </div>
        </div>
        <button onclick="removeFromCart(${p.id})" class="p-1.5 text-brand-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors" title="Удалить">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(totalSum);
  if (cartCountTagEl) cartCountTagEl.textContent = `${totalQty} шт`;
  if (cartTotalHeaderEl) cartTotalHeaderEl.textContent = `${formatPrice(totalSum)}`;
  updateBadges();
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    showToast('Товар удален из корзины');
  }
  localStorage.setItem('nordic_cart', JSON.stringify(cart));
  renderCart();
  renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('nordic_cart', JSON.stringify(cart));
  renderCart();
  renderProducts();
  showToast('Товар удален из корзины');
}

function openCheckout() {
  if (!cart || cart.length === 0) {
    showToast('Корзина пуста. Добавьте товары перед оформлением');
    return;
  }
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function closeAllDrawers() {
  ['cartSidebar', 'citySidebar', 'accountSidebar', 'wishSidebar', 'mobileMenuDrawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'citySidebar') {
        closeCityModal();
      } else {
        el.classList.add('translate-x-full');
      }
    }
  });
  const overlay = document.getElementById('drawerOverlay');
  if (overlay) {
    overlay.classList.add('opacity-0', 'hidden');
  }
  document.body.style.overflow = '';
}

// Скрипт: переключение миров (Саванна -> Океан), живой атмосферный Canvas, кэширование и прогресс скролла
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const portal = document.getElementById('portal-threshold');
  const progressBar = document.getElementById('scroll-progress');
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  // -------------------------------------------------------------
  // 1. ОТСЛЕЖИВАНИЕ СКРОЛЛА, КЭШИРОВАНИЕ И СМЕНА МИРОВ (САВАННА <-> ОКЕАН)
  // -------------------------------------------------------------
  // Начальная тема из кэша, чтобы волны и частицы сразу соответствовали нужному миру
  const cachedTheme = localStorage.getItem('cashu_theme') || (body.classList.contains('theme-cyan') ? 'cyan' : 'amber');
  let currentBlend = cachedTheme === 'cyan' ? 1 : 0; // 0 = Саванна (золото/закат), 1 = Океан (бирюза/бездна)
  let targetBlend = currentBlend;

  let saveScrollTimer = null;
  function cacheScrollPosition(y) {
    if (saveScrollTimer) return;
    saveScrollTimer = setTimeout(() => {
      saveScrollTimer = null;
      try {
        localStorage.setItem('cashu_scroll_pos', Math.round(y));
        localStorage.setItem('cashu_theme', body.getAttribute('data-theme') || 'amber');
      } catch (e) {}
    }, 80);
  }

  // Синхронное сохранение при закрытии/обновлении вкладки
  window.addEventListener('beforeunload', () => {
    try {
      localStorage.setItem('cashu_scroll_pos', Math.round(window.scrollY));
      localStorage.setItem('cashu_theme', body.getAttribute('data-theme') || 'amber');
    } catch (e) {}
  });
  window.addEventListener('pagehide', () => {
    try {
      localStorage.setItem('cashu_scroll_pos', Math.round(window.scrollY));
      localStorage.setItem('cashu_theme', body.getAttribute('data-theme') || 'amber');
    } catch (e) {}
  });

  function updateScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Кэшируем текущую позицию
    cacheScrollPosition(scrollY);

    // Полоса прогресса
    if (progressBar && docHeight > 0) {
      progressBar.style.width = Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) + '%';
    }

    // Точка трансформации
    if (portal) {
      const portalRect = portal.getBoundingClientRect();
      const trigger = window.innerHeight * 0.55;

      if (portalRect.top < trigger) {
        if (!body.classList.contains('theme-cyan')) {
          body.classList.remove('theme-amber');
          body.classList.add('theme-cyan');
          body.setAttribute('data-theme', 'cyan');
        }
        targetBlend = 1;
      } else {
        if (!body.classList.contains('theme-amber')) {
          body.classList.remove('theme-cyan');
          body.classList.add('theme-amber');
          body.setAttribute('data-theme', 'amber');
        }
        targetBlend = 0;
      }
    }
  }

  // Восстановление позиции скролла из кэша
  function restoreScrollPosition() {
    try {
      const savedPos = localStorage.getItem('cashu_scroll_pos');
      if (savedPos !== null) {
        const targetY = parseInt(savedPos, 10);
        if (!isNaN(targetY) && targetY > 0) {
          window.scrollTo(0, targetY);
          updateScroll();

          // Повторная доводка для компенсации подгрузки шрифтов и картинок
          requestAnimationFrame(() => {
            window.scrollTo(0, targetY);
            updateScroll();
          });
          setTimeout(() => {
            window.scrollTo(0, targetY);
            updateScroll();
          }, 60);
          setTimeout(() => {
            window.scrollTo(0, targetY);
            updateScroll();
          }, 200);
          setTimeout(() => {
            window.scrollTo(0, targetY);
            updateScroll();
            // Включаем плавный скролл для пользовательских кликов
            document.documentElement.classList.add('scroll-smooth');
          }, 450);
          return;
        }
      }
    } catch (e) {}
    document.documentElement.classList.add('scroll-smooth');
  }

  // -------------------------------------------------------------
  // КЛИК ПО ЛОГОТИПУ: СБРОС НАВЕРХ И ОЧИСТКА СОХРАНЕННОГО СКРОЛЛА
  // -------------------------------------------------------------
  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        localStorage.removeItem('cashu_scroll_pos');
      } catch (err) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        history.pushState(null, '', window.location.pathname);
      } catch (err) {}
      closeMobileMenu();
    });
  }

  // -------------------------------------------------------------
  // МОБИЛЬНОЕ МЕНЮ (БУРГЕР)
  // -------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerLine1 = document.getElementById('burger-line-1');
  const burgerLine2 = document.getElementById('burger-line-2');
  const burgerLine3 = document.getElementById('burger-line-3');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    if (burgerLine1 && burgerLine2 && burgerLine3) {
      burgerLine1.style.transform = 'translateY(8px) rotate(45deg)';
      burgerLine2.style.opacity = '0';
      burgerLine3.style.transform = 'translateY(-8px) rotate(-45deg)';
    }
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (burgerLine1 && burgerLine2 && burgerLine3) {
      burgerLine1.style.transform = 'none';
      burgerLine2.style.opacity = '1';
      burgerLine3.style.transform = 'none';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = mobileMenu.classList.contains('-translate-y-full');
      if (isClosed) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });
  }

  // Закрытие при клике по пунктам меню
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Закрытие при клике мимо меню
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('-translate-y-full')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  }, { passive: true });

  // Плавный скролл при клике на якорные ссылки
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        try {
          history.pushState(null, '', href);
        } catch (err) {}
      }
    });
  });

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('load', () => {
    restoreScrollPosition();
  });
  restoreScrollPosition();
  updateScroll();

  // -------------------------------------------------------------
  // 2. ЖИВОЙ АТМОСФЕРНЫЙ CANVAS: ВОЛНЫ ЗАКАТНОЙ САВАННЫ И ГЛУБИНЫ ОКЕАНА
  // -------------------------------------------------------------
  if (!canvas || !ctx) return;

  let width = 0;
  let height = 0;
  let isMobile = false;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = window.innerWidth < 768;
  }
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  // Плавающие светящиеся частицы (золотые искры заката в саванне / мерцающие звездочки в океане)
  const motes = [];
  const moteCount = 55;
  for (let i = 0; i < moteCount; i++) {
    motes.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1.2,
      speedY: -(Math.random() * 0.35 + 0.12),
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.35,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.015
    });
  }

  // Функция отрисовки 4-конечной сияющей звездочки (✦)
  function drawSparkleStar(ctx, cx, cy, outerRadius, innerRadius, rotation) {
    let rot = Math.PI / 2 * 3 + rotation;
    const spikes = 4;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  // Функция отрисовки маленького деликатного оранжевого цветочка (5 лепестков + золотая сердцевинка)
  function drawFlower(ctx, cx, cy, size, rotation, alpha) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    const petals = 5;
    const petalDist = size * 0.52;
    const petalRadius = size * 0.38;

    // Лепестки: мягкий закатно-янтарный оттенок (пакетная отрисовка без тяжелого блюра)
    ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.72})`;
    ctx.beginPath();
    for (let p = 0; p < petals; p++) {
      const angle = (p * 2 * Math.PI) / petals;
      const px = Math.cos(angle) * petalDist;
      const py = Math.sin(angle) * petalDist;
      ctx.moveTo(px + petalRadius, py);
      ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
    }
    ctx.fill();

    // Деликатная теплая золотистая сердцевинка (смягченное свечение на десктопе, отключено на мобилках)
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.26, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(253, 224, 71, ${alpha * 0.85})`;
    if (!isMobile) {
      ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
      ctx.shadowBlur = 3;
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.fill();

    ctx.restore();
  }

  let time = 0;

  function animate() {
    time += 0.008;

    // Плавное перетекание между темами
    currentBlend += (targetBlend - currentBlend) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Цвет Саванны (теплый янтарный закат) vs Цвет Океана (глубокий биолюминесцентный циан)
    // Саванна: r: 249, g: 115, b: 22 | Океан: r: 6, g: 182, b: 212
    const r1 = Math.round(249 + (6 - 249) * currentBlend);
    const g1 = Math.round(115 + (182 - 115) * currentBlend);
    const b1 = Math.round(22 + (212 - 22) * currentBlend);

    // Дополнительный акцентный оттенок (золото vs индиго)
    const r2 = Math.round(245 + (14 - 245) * currentBlend);
    const g2 = Math.round(158 + (165 - 158) * currentBlend);
    const b2 = Math.round(11 + (233 - 11) * currentBlend);

    // 1. Рисуем гармоничные шелковистые волны на горизонте
    const waveConfigs = [
      { yOffset: 0.68, amplitude: 55, frequency: 0.0022, speed: 1.2, alpha: 0.08 },
      { yOffset: 0.76, amplitude: 70, frequency: 0.0018, speed: -0.9, alpha: 0.10 },
      { yOffset: 0.85, amplitude: 85, frequency: 0.0014, speed: 1.5, alpha: 0.13 },
      { yOffset: 0.94, amplitude: 100, frequency: 0.0010, speed: -1.0, alpha: 0.15 }
    ];

    waveConfigs.forEach((cfg, idx) => {
      ctx.beginPath();
      const baseY = height * cfg.yOffset;
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 8) {
        const angle = x * cfg.frequency + time * cfg.speed + idx * 1.5;
        const waveY = baseY + Math.sin(angle) * cfg.amplitude + Math.cos(angle * 0.6) * (cfg.amplitude * 0.4);
        ctx.lineTo(x, waveY);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Мягкий вертикальный градиент волны
      const grad = ctx.createLinearGradient(0, baseY - cfg.amplitude, 0, height);
      const isSecond = idx % 2 === 1;
      const curR = isSecond ? r2 : r1;
      const curG = isSecond ? g2 : g1;
      const curB = isSecond ? b2 : b1;

      grad.addColorStop(0, `rgba(${curR}, ${curG}, ${curB}, ${cfg.alpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(${curR}, ${curG}, ${curB}, ${cfg.alpha})`);
      grad.addColorStop(1, `rgba(${curR}, ${curG}, ${curB}, 0)`);

      ctx.fillStyle = grad;
      ctx.fill();
    });

    // 2. Рисуем парящие частицы:
    // В Саванне — теплые золотые искры;
    // В Океане и тьме — мерцающие кристалльно-бирюзовые и белые звездочки (✦)!
    motes.forEach(m => {
      m.y += m.speedY;
      m.x += m.speedX;
      m.rotation += m.rotSpeed;

      if (m.y < -20) {
        m.y = height + 20;
        m.x = Math.random() * width;
      }
      if (m.x < -20) m.x = width + 20;
      if (m.x > width + 20) m.x = -20;

      // Мерцание (пульсация яркости)
      const twinkle = 0.65 + 0.35 * Math.sin(time * 2.8 + m.phase);
      const curAlpha = m.alpha * twinkle;

      const warmWeight = Math.max(0, 1 - currentBlend * 2.2);
      const coolWeight = Math.min(1, currentBlend * 2.2);

      // ОРАНЖЕВАЯ ТЕМА (САВАННА): МАЛЕНЬКИЕ МИЛЫЕ ОРАНЖЕВЫЕ ЦВЕТОЧКИ
      if (warmWeight > 0.02) {
        const flowerSize = m.radius * (1.15 + 0.3 * twinkle);
        drawFlower(ctx, m.x, m.y, flowerSize, m.rotation, curAlpha * warmWeight);
      }

      // ТЕМНАЯ ЗОНА (ОКЕАН И ТЬМА): МЕРЦАЮЩИЕ ЗВЕЗДОЧКИ (✦)
      if (coolWeight > 0.02) {
        const starOuter = m.radius * (2.8 + 1.2 * twinkle);
        const starInner = starOuter * 0.22;

        ctx.save();
        drawSparkleStar(ctx, m.x, m.y, starOuter, starInner, m.rotation);

        // Бриллиантово-бирюзовое и белое сияние звезд
        const starGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, starOuter * 1.5);
        starGlow.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * coolWeight})`);
        starGlow.addColorStop(0.4, `rgba(34, 211, 238, ${curAlpha * 0.85 * coolWeight})`);
        starGlow.addColorStop(1, `rgba(6, 182, 212, 0)`);

        ctx.fillStyle = starGlow;
        if (!isMobile) {
          ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
          ctx.shadowBlur = 6 * twinkle;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.restore();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  // -------------------------------------------------------------
  // 3. ИНТЕРАКТИВНАЯ КОМАНДНАЯ СТРОКА (TERMINAL)
  // -------------------------------------------------------------
  const termInput = document.getElementById('term-input');
  const termBody = document.getElementById('terminal-body');
  const quickBtns = document.querySelectorAll('.term-quick-btn');

  function handleCommand(cmd, isRestore = false) {
    if (!termBody) return;
    const cleanCmd = (cmd || '').trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear' || cleanCmd === 'cls' || cleanCmd === 'очистить' || cleanCmd === 'сброс') {
      termBody.querySelectorAll('.dynamic-term-row').forEach(el => el.remove());
      try {
        localStorage.removeItem('cashu_term_history');
      } catch (e) {}
      return;
    }

    // Строка команды
    const cmdLine = document.createElement('div');
    cmdLine.className = 'dynamic-term-row flex items-center gap-2 text-cyan-400 mt-2.5 text-sm sm:text-base font-semibold';
    cmdLine.innerHTML = `<span class="text-emerald-400">cashu@web:~$</span> <span>${cleanCmd}</span>`;
    termBody.insertBefore(cmdLine, termInput ? termInput.parentElement : null);

    // Строка ответа
    const resp = document.createElement('div');
    resp.className = 'dynamic-term-row text-white/90 text-xs sm:text-sm pl-3.5 border-l-2 border-white/20 my-2 font-mono leading-relaxed';

    if (cleanCmd === 'help' || cleanCmd === 'помощь' || cleanCmd === 'хелп' || cleanCmd === '?' || cleanCmd === 'команды') {
      resp.innerHTML = `Доступные команды:<br>• <span class="text-cyan-300">обо мне</span> (about) — кто я и чем занимаюсь<br>• <span class="text-cyan-300">тг</span> (tg) — ссылка на Telegram разработчика (@grizzzza)<br>• <span class="text-cyan-300">прайс</span> / <span class="text-cyan-300">смета</span> (price) — примерная стоимость разработки<br>• <span class="text-cyan-300">стек</span> (stack) — ключевые технологии<br>• <span class="text-cyan-300">очистить</span> (clear) — очистить терминал`;
    } else if (cleanCmd === 'about' || cleanCmd === 'bio' || cleanCmd === 'me' || cleanCmd === 'who' || cleanCmd === 'обо мне' || cleanCmd === 'о себе' || cleanCmd === 'автор' || cleanCmd === 'разработчик') {
      resp.innerHTML = `Программист в разных областях. В разработке пару лет.<br>★ <a href="https://t.me/grizzzza" target="_blank" class="text-cyan-300 hover:text-cyan-200 underline font-bold">Ссылка на отзывы здесь →</a>`;
    } else if (cleanCmd === 'tg' || cleanCmd === 'contact' || cleanCmd === 'тг' || cleanCmd === 'телеграм' || cleanCmd === 'telegram' || cleanCmd === 'связь' || cleanCmd === 'контакты') {
      resp.innerHTML = `Ссылка на Telegram: <a href="https://t.me/grizzzza" target="_blank" rel="noopener noreferrer" class="text-cyan-300 hover:text-cyan-200 underline font-bold">@grizzzza (t.me/grizzzza)</a> → нажмите для перехода`;
    } else if (cleanCmd === 'price' || cleanCmd === 'cost' || cleanCmd === 'прайс' || cleanCmd === 'смета' || cleanCmd === 'цена' || cleanCmd === 'цены' || cleanCmd === 'стоимость') {
      resp.innerHTML = `Промо-лендинг под ключ: от 19 900 ₽<br>Сайт-каталог / сервис: от 34 900 ₽<br>Фиксированный договор, без доплат за согласованное ТЗ.`;
    } else if (cleanCmd === 'stack' || cleanCmd === 'стек' || cleanCmd === 'навыки' || cleanCmd === 'технологии' || cleanCmd === 'skills' || cleanCmd === 'tech') {
      resp.innerHTML = `Стек: HTML5, CSS3, Tailwind, JavaScript (ES6+), Telegram Bot API, REST, Git, Vercel/GitHub Pages.`;
    } else {
      resp.innerHTML = `Команда не распознана: "${cleanCmd}". Введите <span class="text-cyan-300">помощь</span> или <span class="text-cyan-300">help</span> для списка доступных команд.`;
    }

    termBody.insertBefore(resp, termInput ? termInput.parentElement : null);
    termBody.scrollTop = termBody.scrollHeight;

    if (!isRestore) {
      try {
        let history = [];
        const raw = localStorage.getItem('cashu_term_history');
        if (raw) history = JSON.parse(raw);
        history.push(cleanCmd);
        if (history.length > 15) history.shift();
        localStorage.setItem('cashu_term_history', JSON.stringify(history));
      } catch (e) {}
    }
  }

  // Восстановление истории команд терминала из кэша
  try {
    const rawHistory = localStorage.getItem('cashu_term_history');
    if (rawHistory) {
      const history = JSON.parse(rawHistory);
      if (Array.isArray(history)) {
        history.forEach(cmd => handleCommand(cmd, true));
      }
    }
  } catch (e) {}

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        handleCommand(val);
      }
    });
  }

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      handleCommand(cmd);
    });
  });

  // -------------------------------------------------------------
  // 4. ПОЛУАВТОМАТИЧЕСКИЙ СЛАЙДЕР КЕЙСОВ
  // -------------------------------------------------------------
  const casesSlider = document.getElementById('cases-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const counterEl = document.getElementById('slider-counter');
  const autoBar = document.getElementById('slider-auto-bar');
  const autoStatus = document.getElementById('slider-auto-status');

  if (casesSlider) {
    const totalSlides = 5;
    let currentSlide = 0;

    // Считываем сохраненный слайд из кэша
    try {
      const savedSlide = localStorage.getItem('cashu_slider_index');
      if (savedSlide !== null) {
        const idx = parseInt(savedSlide, 10);
        if (!isNaN(idx) && idx >= 0 && idx < totalSlides) {
          currentSlide = idx;
        }
      }
    } catch (e) {}

    let isPaused = false;
    let autoProgress = 0;
    const slideDuration = 2800; // 2.8 секунды на слайд (быстрее и динамичнее)
    const progressInterval = 50;

    const getCardStep = () => {
      const firstItem = casesSlider.querySelector('.cases-slider-item');
      return firstItem ? firstItem.offsetWidth + 28 : 460;
    };

    function updateCounter(idx) {
      if (counterEl) {
        counterEl.textContent = `0${idx + 1} / 0${totalSlides}`;
      }
    }

    function goToSlide(index, smooth = true) {
      currentSlide = (index + totalSlides) % totalSlides;
      const step = getCardStep();
      casesSlider.scrollTo({
        left: currentSlide * step,
        behavior: smooth ? 'smooth' : 'instant'
      });
      updateCounter(currentSlide);
      autoProgress = 0;
      if (autoBar) autoBar.style.width = '0%';
      try {
        localStorage.setItem('cashu_slider_index', currentSlide);
      } catch (e) {}
    }

    // Восстанавливаем позицию слайдера при загрузке страницы
    if (currentSlide > 0) {
      updateCounter(currentSlide);
      setTimeout(() => {
        const step = getCardStep();
        casesSlider.scrollTo({
          left: currentSlide * step,
          behavior: 'instant'
        });
      }, 80);
      setTimeout(() => {
        const step = getCardStep();
        casesSlider.scrollTo({
          left: currentSlide * step,
          behavior: 'instant'
        });
      }, 250);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }

    // Автопрокрутка с прогресс-баром
    setInterval(() => {
      if (isPaused) return;

      autoProgress += (progressInterval / slideDuration) * 100;
      if (autoBar) {
        autoBar.style.width = Math.min(100, autoProgress) + '%';
      }

      if (autoProgress >= 100) {
        autoProgress = 0;
        goToSlide(currentSlide + 1);
      }
    }, progressInterval);

    // Пауза при наведении мыши или касании
    casesSlider.addEventListener('mouseenter', () => {
      isPaused = true;
      if (autoStatus) autoStatus.textContent = '❚❚ Пауза';
    });

    casesSlider.addEventListener('mouseleave', () => {
      isPaused = false;
      if (autoStatus) autoStatus.textContent = '▶ Автолистание';
    });

    casesSlider.addEventListener('touchstart', () => {
      isPaused = true;
      if (autoStatus) autoStatus.textContent = '❚❚ Пауза';
    }, { passive: true });

    casesSlider.addEventListener('touchend', () => {
      setTimeout(() => {
        isPaused = false;
        if (autoStatus) autoStatus.textContent = '▶ Автолистание';
      }, 1500);
    }, { passive: true });

    // Возможность переключать автолистание кликом по бейджу как в плеере
    if (autoStatus) {
      autoStatus.style.cursor = 'pointer';
      autoStatus.title = 'Нажмите для паузы / продолжения';
      autoStatus.addEventListener('click', (e) => {
        e.stopPropagation();
        isPaused = !isPaused;
        autoStatus.textContent = isPaused ? '❚❚ Пауза' : '▶ Автолистание';
      });
    }

    // Синхронизация при ручном скролле
    let scrollTimeout;
    casesSlider.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const step = getCardStep();
        const detectedIndex = Math.min(totalSlides - 1, Math.max(0, Math.round(casesSlider.scrollLeft / step)));
        currentSlide = detectedIndex;
        updateCounter(currentSlide);
        try {
          localStorage.setItem('cashu_slider_index', currentSlide);
        } catch (e) {}
      }, 60);
    }, { passive: true });

    // Drag-to-scroll для мыши
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    casesSlider.addEventListener('mousedown', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      isDown = true;
      isPaused = true;
      startX = e.pageX - casesSlider.offsetLeft;
      scrollLeft = casesSlider.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => { isPaused = false; }, 1000);
      }
    });

    casesSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - casesSlider.offsetLeft;
      const walk = (x - startX) * 1.4;
      casesSlider.scrollLeft = scrollLeft - walk;
    });
  }
});


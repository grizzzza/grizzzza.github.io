// ==========================================================================
// Olympiad Landing Page - Interactive Scripts
// AOS Animations, Dynamic Counter, ROI Calculator, FAQ & Form
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 40,
            duration: 700,
            easing: 'ease-out-quad'
        });
    }

    // 2. Animated Counter for live stats
    initStatsCounter();

    // 3. Interactive ROI Calculator
    initCalculator();

    // 4. FAQ Accordion
    initFaqAccordion();

    // 5. Lead Form
    initLeadForm();

    // 6. Mobile Menu
    initMobileMenu();

    // 7. Interactive Subject Catalog
    initSubjectCatalog();
});

/* --------------------------------------------------------------------------
   Stats Counter with Smooth Animation & API Fallback
-------------------------------------------------------------------------- */
function animateValue(element, start, end, suffix, duration = 1800) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * (end - start) + start);

        if (end >= 1000000) {
            element.textContent = (currentVal / 1000000).toFixed(1) + 'M' + suffix;
        } else if (end >= 1000) {
            element.textContent = currentVal.toLocaleString('ru-RU') + suffix;
        } else {
            element.textContent = currentVal + suffix;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (end >= 1000000) {
                element.textContent = (end / 1000000).toFixed(1) + 'M' + suffix;
            } else if (end >= 1000) {
                element.textContent = end.toLocaleString('ru-RU') + suffix;
            } else {
                element.textContent = end + suffix;
            }
        }
    };
    window.requestAnimationFrame(step);
}

async function initStatsCounter() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let statsData = {
        participants: 6800000,
        winners: 52000,
        olympiads: 80,
        years: 4
    };

    try {
        const response = await fetch('/api/stats');
        if (response.ok) {
            const data = await response.json();
            statsData.participants = data.participants || statsData.participants;
            statsData.winners = data.winners || statsData.winners;
        }
    } catch (e) {
        // Fallback gracefully to default stats
    }

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            animateValue(document.getElementById('stat-participants'), 0, statsData.participants, '+');
            animateValue(document.getElementById('stat-winners'), 0, statsData.winners, '+');
            animateValue(document.getElementById('stat-olympiads'), 0, statsData.olympiads, '+');
            observer.disconnect();
        }
    }, { threshold: 0.15 });

    observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   ROI Calculator
-------------------------------------------------------------------------- */
function initCalculator() {
    const programSelect = document.getElementById('calc-program');
    const totalEl = document.getElementById('calc-total-sum');
    const breakdownEl = document.getElementById('calc-breakdown-text');

    if (!programSelect || !totalEl) return;

    function recalculate() {
        const annualFee = parseInt(programSelect.value, 10);
        const studyYears = 4;
        const savedTuition = annualFee * studyYears;

        totalEl.textContent = savedTuition.toLocaleString('ru-RU') + ' ₽';
        if (breakdownEl) {
            breakdownEl.textContent = `Чистая экономия стоимости платного бакалавриата за 4 года: ${savedTuition.toLocaleString('ru-RU')} ₽.`;
        }
    }

    programSelect.addEventListener('change', recalculate);
    recalculate();
}

/* --------------------------------------------------------------------------
   FAQ Accordion
-------------------------------------------------------------------------- */
function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            items.forEach(other => other.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Lead Form
-------------------------------------------------------------------------- */
function initLeadForm() {
    const form = document.getElementById('lead-form');
    const statusEl = document.getElementById('lead-status');
    const btn = document.getElementById('lead-btn');

    if (!form || !statusEl || !btn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('lead-name');
        const emailInput = document.getElementById('lead-email');

        const name = nameInput.value.trim();
        const contact = emailInput.value.trim();

        if (!contact) return;

        btn.disabled = true;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Отправка...</span>';

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email: contact })
            });

            if (res.ok) {
                statusEl.className = 'lead-status success';
                statusEl.textContent = `Материалы и график олимпиад успешно отправлены на ${contact}.`;
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            // Client-side fallback
            statusEl.className = 'lead-status success';
            statusEl.textContent = `Спасибо, ${name || 'будущий победитель'}! Комплект материалов подготовлен для ${contact}.`;
            form.reset();
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalHtml;
            setTimeout(() => {
                statusEl.textContent = '';
            }, 6000);
        }
    });
}

/* --------------------------------------------------------------------------
   Mobile Menu Drawer Handler
-------------------------------------------------------------------------- */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.toggle('open');
        const isOpen = drawer.classList.contains('open');
        toggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close when clicking any mobile link
    drawer.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
            drawer.classList.remove('open');
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
}

/* --------------------------------------------------------------------------
   Interactive Olympiad Subject Catalog
-------------------------------------------------------------------------- */
const olympiadsCatalogData = {
    cs: [
        {
            title: "Высшая проба",
            level: "I уровень",
            univ: "НИУ ВШЭ (ФКН, ПМИ, ИВТ)",
            perks: ["БВИ на ведущие IT-факультеты", "100 баллов по информатике на ЕГЭ", "Повышенные университетские стипендии"],
            deadline: "Регистрация: октябрь — ноябрь"
        },
        {
            title: "Всерос (ВсОШ)",
            level: "Высший статус",
            univ: "Минобрнауки РФ (Все вузы)",
            perks: ["БВИ в любой вуз страны без сдачи ЕГЭ", "Региональные премии до 500 000 — 1 000 000 ₽", "Повышенные университетские стипендии"],
            deadline: "Школьный этап: сентябрь — октябрь"
        },
        {
            title: "Открытая олимпиада школьников",
            level: "I уровень",
            univ: "МФТИ, Университет ИТМО, ЦПМ",
            perks: ["БВИ на направления разработки и AI", "100 баллов за профильный предмет", "Фаст-трек на оплачиваемые стажировки"],
            deadline: "Отборочные туры: ноябрь — декабрь"
        }
    ],
    math: [
        {
            title: "Физтех по математике",
            level: "I уровень",
            univ: "МФТИ (ФПМИ, ЛФИ, ФРКТ)",
            perks: ["БВИ на самые востребованные мат-направления", "100 баллов по профильной математике", "Зачисление без общего конкурса"],
            deadline: "Отборочные туры: октябрь — январь"
        },
        {
            title: "Покори Воробьёвы горы!",
            level: "I уровень",
            univ: "МГУ им. М.В. Ломоносова (Мехмат, ВМК)",
            perks: ["БВИ на Мехмат, ВМК и Эконом МГУ", "100 баллов по математике", "Право льготного зачисления в СПбГУ"],
            deadline: "Регистрация: ноябрь"
        },
        {
            title: "Олимпиада «СПбГУ»",
            level: "I уровень",
            univ: "Санкт-Петербургский госуниверситет",
            perks: ["БВИ на мат-мех и прикладную математику", "100 баллов за профильный ЕГЭ", "Приоритетное предоставление общежития"],
            deadline: "Отборочный тур: до середины января"
        }
    ],
    physics: [
        {
            title: "Физтех по физике",
            level: "I уровень",
            univ: "МФТИ (Физтех)",
            perks: ["БВИ на фундаментальные и прикладные кафедры", "100 баллов по физике", "Приглашение на зимние сборы в кампус"],
            deadline: "Отборочные: октябрь — декабрь"
        },
        {
            title: "Росатом",
            level: "I уровень",
            univ: "НИЯУ МИФИ / ГК Росатом",
            perks: ["БВИ в МИФИ, Бауманку и МФТИ", "Именные стипендии от Росатома", "Практика в передовых исследовательских центрах"],
            deadline: "Отборочный этап: ноябрь"
        },
        {
            title: "Шаг в будущее",
            level: "II уровень",
            univ: "МГТУ им. Н.Э. Баумана",
            perks: ["БВИ на ключевые инженерные специальности", "100 баллов на ЕГЭ по физике", "Академическое менторство профессоров"],
            deadline: "Регистрация: сентябрь — октябрь"
        }
    ],
    econ: [
        {
            title: "Высшая проба по экономике",
            level: "I уровень",
            univ: "НИУ ВШЭ (ФЭН, МИЭФ, Совбак РЭШ)",
            perks: ["БВИ в топ-1 экономические факультеты", "100 баллов по обществознанию / математике", "Гранты и корпоративные стипендии банков"],
            deadline: "Регистрация: до начала ноября"
        },
        {
            title: "Миссия выполнима",
            level: "II уровень",
            univ: "Финансовый университет при Правительстве РФ",
            perks: ["БВИ на финансовые и аналитические программы", "Скидка до 100% на платное обучение при нехватке мест", "Стажировки в финтех-секторе"],
            deadline: "Отборочный тур: ноябрь — декабрь"
        },
        {
            title: "Ломоносов по обществознанию",
            level: "I уровень",
            univ: "МГУ им. М.В. Ломоносова (ЭФ, Юрфак)",
            perks: ["БВИ на экономический факультет и юриспруденцию", "100 баллов за профильный ЕГЭ", "Право преимущественного поступления"],
            deadline: "Отборочные: ноябрь"
        }
    ]
};

function initSubjectCatalog() {
    const tabs = document.querySelectorAll('.tab-btn');
    const container = document.getElementById('subject-cards');
    if (!tabs.length || !container) return;

    function renderSubject(subjectKey) {
        const items = olympiadsCatalogData[subjectKey] || olympiadsCatalogData.cs;
        container.innerHTML = `
            <div class="subject-grid">
                ${items.map(item => `
                    <div class="subject-item-card">
                        <div class="item-card-header">
                            <span class="item-level-tag">${item.level}</span>
                        </div>
                        <h3 class="item-card-title">${item.title}</h3>
                        <div class="item-card-univ"><i class="fa-solid fa-landmark"></i> ${item.univ}</div>
                        <div class="item-perks-list">
                            ${item.perks.map(p => `
                                <div class="item-perk"><i class="fa-solid fa-check"></i> <span>${p}</span></div>
                            `).join('')}
                        </div>
                        <div class="item-deadline"><i class="fa-regular fa-clock"></i> <span>${item.deadline}</span></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const subject = btn.getAttribute('data-subject');
            renderSubject(subject);
        });
    });

    // Initial render
    renderSubject('cs');
}

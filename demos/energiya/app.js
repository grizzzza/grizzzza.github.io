// app.js for НПП «Энергия» demo

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navItems = document.querySelectorAll('.mobile-nav-item');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Interactive Calculator Logic
  const cowsRange = document.getElementById('cows-range');
  const yieldRange = document.getElementById('yield-range');
  const cowsVal = document.getElementById('cows-val');
  const yieldVal = document.getElementById('yield-val');
  
  const pickupDaily = document.getElementById('pickup-daily');
  const pickup2Days = document.getElementById('pickup-2days');

  const resModel = document.getElementById('res-model');
  const resDailyMilk = document.getElementById('res-daily-milk');
  const resCapacity = document.getElementById('res-capacity');
  const resType = document.getElementById('res-type');
  const resProfit = document.getElementById('res-profit');

  let isTwoDays = false;

  const standardSizes = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000];

  function updateCalculator() {
    const cows = parseInt(cowsRange.value, 10);
    const dailyYield = parseInt(yieldRange.value, 10);

    cowsVal.textContent = `${cows} коров`;
    yieldVal.textContent = `${dailyYield} л / день`;

    const dailyMilk = cows * dailyYield;
    const neededVol = isTwoDays ? dailyMilk * 2 * 1.15 : dailyMilk * 1.15; // 15% запас

    // Find smallest standard size that fits
    let targetVol = standardSizes[standardSizes.length - 1];
    for (const size of standardSizes) {
      if (size >= neededVol) {
        targetVol = size;
        break;
      }
    }

    const isClosed = targetVol >= 2000;
    const modelCode = isClosed ? `ТОМ-${targetVol}З` : `ТОМ-${targetVol}О`;

    resModel.textContent = modelCode;
    resDailyMilk.textContent = `${dailyMilk.toLocaleString('ru-RU')} л / сут`;
    resCapacity.textContent = `${targetVol.toLocaleString('ru-RU')} литров`;
    resType.textContent = isClosed ? 'Закрытый (CIP мойка 360°)' : 'Открытый с крышкой (газлифты)';

    // Дополнительная прибыль от высшего сорта (+3.2 ₽/л за быструю сдачу)
    const extraProfit = Math.round(dailyMilk * 30 * 3.2);
    resProfit.textContent = `+${extraProfit.toLocaleString('ru-RU')} ₽ / месяц`;
  }

  if (cowsRange && yieldRange) {
    cowsRange.addEventListener('input', updateCalculator);
    yieldRange.addEventListener('input', updateCalculator);

    pickupDaily.addEventListener('click', () => {
      isTwoDays = false;
      pickupDaily.className = 'pickup-btn active py-3 px-4 rounded-xl border border-cyan-400 bg-cyan-500/20 text-cyan-300 font-semibold text-xs text-center transition-all';
      pickup2Days.className = 'pickup-btn py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white font-semibold text-xs text-center transition-all';
      updateCalculator();
    });

    pickup2Days.addEventListener('click', () => {
      isTwoDays = true;
      pickup2Days.className = 'pickup-btn active py-3 px-4 rounded-xl border border-cyan-400 bg-cyan-500/20 text-cyan-300 font-semibold text-xs text-center transition-all';
      pickupDaily.className = 'pickup-btn py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white font-semibold text-xs text-center transition-all';
      updateCalculator();
    });

    updateCalculator();
  }

  // 3. Category Filter
  const filterBtns = document.querySelectorAll('.cat-filter');
  const catCards = document.querySelectorAll('.cat-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'cat-filter px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold';
      });
      btn.className = 'cat-filter active px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs';

      const cat = btn.getAttribute('data-cat');
      catCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Forms & Toasts
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value;
      const equip = document.getElementById('lead-equip').value;
      showToast(`Спасибо, ${name}! Заявка на ${equip} передана в инженерный отдел завода.`);
      leadForm.reset();
    });
  }

  const modalForm = document.getElementById('modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mName = document.getElementById('m-name').value;
      closeSpecModal();
      showToast(`Чертежи и смета отправлены. Инженер свяжется с вами, ${mName}!`);
      modalForm.reset();
    });
  }
});

// Modal functions
function openSpecModal(modelName) {
  const modal = document.getElementById('spec-modal');
  const title = document.getElementById('modal-title');
  if (title) title.textContent = `Запрос чертежей: ${modelName}`;
  if (modal) modal.classList.remove('hidden');
}

function closeSpecModal() {
  const modal = document.getElementById('spec-modal');
  if (modal) modal.classList.add('hidden');
}

function openCalcOrderModal() {
  const currentModel = document.getElementById('res-model')?.textContent || 'ТОМ';
  openSpecModal(currentModel);
}

// Toast notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 4500);
  }
}

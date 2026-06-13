const services = [
  { id: 'socket', category: 'points', icon: '🔌', title: 'Замена розетки', unit: 'точка', price: 1200, description: 'Демонтаж старой, установка новой, проверка контактов' },
  { id: 'switch', category: 'points', icon: '🔘', title: 'Замена выключателя', unit: 'точка', price: 1000, description: 'Обычный, проходной или клавишный выключатель' },
  { id: 'socketBox', category: 'points', icon: '🧱', title: 'Замена подрозетника', unit: 'шт.', price: 600, description: 'Укрепление точки, монтаж нового подрозетника' },
  { id: 'lamp', category: 'light', icon: '💡', title: 'Установка светильника', unit: 'шт.', price: 900, description: 'Накладной светильник, бра, простой потолочный свет' },
  { id: 'chandelier', category: 'light', icon: '✨', title: 'Монтаж люстры', unit: 'шт.', price: 1800, description: 'Сборка, подвес, подключение, проверка режимов' },
  { id: 'ledStrip', category: 'light', icon: '〰️', title: 'Монтаж LED-ленты', unit: 'м', price: 500, description: 'Проклейка, подключение блока питания, проверка' },
  { id: 'breaker', category: 'panel', icon: '⚡', title: 'Замена автомата', unit: 'шт.', price: 900, description: 'Установка автомата в щите без цены самого автомата' },
  { id: 'rcd', category: 'panel', icon: '🛡️', title: 'Установка УЗО / дифавтомата', unit: 'шт.', price: 1600, description: 'Подключение, проверка тестовой кнопки, маркировка' },
  { id: 'panelRevision', category: 'panel', icon: '🧰', title: 'Ревизия щита', unit: 'работа', price: 2500, description: 'Подтяжка контактов, осмотр, базовая маркировка' },
  { id: 'cableOpen', category: 'cable', icon: '➰', title: 'Прокладка кабеля открыто', unit: 'м', price: 180, description: 'Без штробления, по поверхности или в кабель-канале' },
  { id: 'cableChannel', category: 'cable', icon: '📏', title: 'Монтаж кабель-канала', unit: 'м', price: 250, description: 'Разметка, крепёж, укладка кабеля' },
  { id: 'stroba', category: 'cable', icon: '🪨', title: 'Штробление', unit: 'м', price: 700, description: 'Ориентир для бетона/кирпича, без заделки' },
  { id: 'junctionBox', category: 'cable', icon: '📦', title: 'Расключение коробки', unit: 'шт.', price: 1200, description: 'Соединение линий, клеммы/опрессовка по ситуации' },
  { id: 'lineDiagnostic', category: 'diagnostic', icon: '🔎', title: 'Диагностика линии', unit: 'линия', price: 1000, description: 'Поиск причины: нет питания, выбивает автомат, греется точка' },
  { id: 'smallRepair', category: 'diagnostic', icon: '🪛', title: 'Мелкий ремонт контакта', unit: 'точка', price: 800, description: 'Зачистка, подтяжка, восстановление соединения' },
  { id: 'windowAdjust', category: 'windows', icon: '🪟', title: 'Регулировка окна', unit: 'створка', price: 900, description: 'Настройка прижима, устранение задевания, лёгкая регулировка фурнитуры' },
  { id: 'windowHandle', category: 'windows', icon: '🚪', title: 'Замена оконной ручки', unit: 'шт.', price: 600, description: 'Демонтаж старой ручки и установка новой без стоимости ручки' },
  { id: 'windowSeal', category: 'windows', icon: '〽️', title: 'Замена уплотнителя', unit: 'м', price: 250, description: 'Снятие старого уплотнителя, монтаж нового по периметру' },
  { id: 'windowFoam', category: 'windows', icon: '🧴', title: 'Пропенивание / герметизация', unit: 'м', price: 350, description: 'Локальная герметизация щелей и продуваний без отделки откосов' },
  { id: 'mosquitoNet', category: 'windows', icon: '🕸️', title: 'Установка москитной сетки', unit: 'шт.', price: 700, description: 'Монтаж готовой сетки на крепления без изготовления сетки' },
  { id: 'furnitureSimple', category: 'furniture', icon: '🪑', title: 'Сборка простой мебели', unit: 'шт.', price: 1200, description: 'Стул, тумба, небольшой стол, простая полка' },
  { id: 'furnitureBed', category: 'furniture', icon: '🛏️', title: 'Сборка кровати', unit: 'шт.', price: 2500, description: 'Каркас, ламели, подъёмный механизм считается сложностью' },
  { id: 'furnitureWardrobe', category: 'furniture', icon: '🚪', title: 'Сборка шкафа', unit: 'секция', price: 2200, description: 'Корпусный шкаф, пенал, шкаф-купе по секциям' },
  { id: 'furnitureKitchen', category: 'furniture', icon: '🍽️', title: 'Сборка кухонного модуля', unit: 'модуль', price: 1800, description: 'Нижний или верхний модуль без сложной врезки техники' },
  { id: 'furnitureWallMount', category: 'furniture', icon: '🧱', title: 'Навеска полки / шкафа', unit: 'шт.', price: 1000, description: 'Разметка, крепёж, навеска на стену без цены крепежа' },
  { id: 'furnitureDisassemble', category: 'furniture', icon: '🔩', title: 'Разборка мебели', unit: 'шт.', price: 900, description: 'Аккуратная разборка для ремонта, перевозки или утилизации' }
];

const priceStorageKey = 'master_service_prices_v2';

services.forEach((service) => {
  service.basePrice = service.price;
});

function loadCustomPrices() {
  try {
    const saved = JSON.parse(localStorage.getItem(priceStorageKey)) || {};
    services.forEach((service) => {
      const savedPrice = Number(saved[service.id]);
      service.price = Number.isFinite(savedPrice) && savedPrice > 0 ? savedPrice : service.basePrice;
    });
  } catch {
    services.forEach((service) => {
      service.price = service.basePrice;
    });
  }
}

const formatRub = (value) => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}).format(value);

const servicesList = document.querySelector('#servicesList');
const totalEl = document.querySelector('#total');
const detailsEl = document.querySelector('#details');
const copyBtn = document.querySelector('#copyBtn');
const resetBtn = document.querySelector('#resetBtn');
const chips = document.querySelectorAll('.chip');

const fields = {
  visitPrice: document.querySelector('#visitPrice'),
  minimumPrice: document.querySelector('#minimumPrice'),
  materialsExtra: document.querySelector('#materialsExtra'),
  complexity: document.querySelector('#complexity'),
  urgency: document.querySelector('#urgency'),
  discount: document.querySelector('#discount')
};

let activeFilter = 'all';

function numberFromInput(input, fallback = 0) {
  const value = Number(input.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function renderServices() {
  servicesList.innerHTML = services.map((service) => `
    <article class="service-row" data-category="${service.category}" data-id="${service.id}">
      <div class="service-name">
        <span class="service-icon" aria-hidden="true">${service.icon}</span>
        <div>
          <div class="service-title">${service.title}</div>
          <span class="service-meta">${service.description}</span>
        </div>
      </div>
      <div class="service-price">${formatRub(service.price)} / ${service.unit}</div>
      <div class="qty-control" aria-label="Количество для ${service.title}">
        <button type="button" data-action="minus" data-id="${service.id}">−</button>
        <input type="number" min="0" value="0" inputmode="numeric" data-qty="${service.id}" aria-label="Количество: ${service.title}" />
        <button type="button" data-action="plus" data-id="${service.id}">+</button>
      </div>
    </article>
  `).join('');

  servicesList.addEventListener('input', (event) => {
    if (event.target.matches('[data-qty]')) {
      calculate();
    }
  });

  servicesList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const input = document.querySelector(`[data-qty="${button.dataset.id}"]`);
    const current = numberFromInput(input);
    input.value = button.dataset.action === 'plus' ? current + 1 : Math.max(0, current - 1);
    calculate();
  });
}

function refreshServicePrices() {
  services.forEach((service) => {
    const row = document.querySelector(`[data-id="${service.id}"]`);
    if (!row) return;

    const priceEl = row.querySelector('.service-price');
    if (priceEl) {
      priceEl.textContent = `${formatRub(service.price)} / ${service.unit}`;
    }
  });
}

function getSelectedServices() {
  return services
    .map((service) => {
      const input = document.querySelector(`[data-qty="${service.id}"]`);
      const qty = input ? numberFromInput(input) : 0;
      return {
        ...service,
        qty,
        subtotal: qty * service.price
      };
    })
    .filter((service) => service.qty > 0);
}

function applyFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll('.service-row').forEach((row) => {
    const visible = filter === 'all' || row.dataset.category === filter;
    row.hidden = !visible;
  });

  chips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.filter === filter);
  });
}

function calculate() {
  const selected = getSelectedServices();
  const workSubtotal = selected.reduce((sum, service) => sum + service.subtotal, 0);
  const visitPrice = numberFromInput(fields.visitPrice);
  const minimumPrice = numberFromInput(fields.minimumPrice);
  const materialsExtra = numberFromInput(fields.materialsExtra);
  const complexity = Number(fields.complexity.value);
  const urgency = Number(fields.urgency.value);
  const discountPercent = Math.min(50, numberFromInput(fields.discount));

  const beforeCoefficients = workSubtotal + visitPrice + materialsExtra;
  const withCoefficients = Math.round(beforeCoefficients * complexity * urgency);
  const discountValue = Math.round(withCoefficients * (discountPercent / 100));
  const afterDiscount = withCoefficients - discountValue;
  const total = selected.length ? Math.max(afterDiscount, minimumPrice) : 0;
  const minimumAdded = selected.length && total === minimumPrice && afterDiscount < minimumPrice;

  document.querySelectorAll('.service-row').forEach((row) => {
    const qty = numberFromInput(row.querySelector('[data-qty]'));
    row.classList.toggle('active', qty > 0);
  });

  totalEl.textContent = formatRub(total);

  if (!selected.length) {
    detailsEl.textContent = 'Выбери работы для расчёта.';
    return { selected, total, details: [] };
  }

  const details = [
    ...selected.map((service) => `${service.title}: ${service.qty} ${service.unit} × ${formatRub(service.price)} = ${formatRub(service.subtotal)}`),
    `Работы: ${formatRub(workSubtotal)}`,
    `Выезд: ${formatRub(visitPrice)}`,
    materialsExtra ? `Материалы сверху: ${formatRub(materialsExtra)}` : 'Материалы сверху: не указаны',
    complexity > 1 ? `Сложность: x${complexity}` : 'Сложность: обычная',
    urgency > 1 ? `Срочность: x${urgency}` : 'Срочность: обычная',
    discountPercent ? `Скидка: ${discountPercent}% −${formatRub(discountValue)}` : 'Скидка: нет',
    minimumAdded ? `Применён минимальный заказ: ${formatRub(minimumPrice)}` : `Минимальный заказ: ${formatRub(minimumPrice)}`
  ];

  detailsEl.innerHTML = details.join('<br>');

  return {
    selected,
    total,
    details
  };
}

function copyResult() {
  const result = calculate();

  if (!result.selected.length) {
    copyBtn.textContent = 'Сначала выбери работы';
    setTimeout(() => {
      copyBtn.textContent = 'Скопировать расчёт';
    }, 1600);
    return;
  }

  const text = [
    'Предварительный расчёт бытовых работ',
    '',
    ...result.details,
    '',
    `Итого ориентировочно: ${formatRub(result.total)}`,
    '',
    'Точная цена согласовывается после осмотра. Ничего не делается без согласования.'
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Расчёт скопирован';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = 'Скопировать расчёт';
      copyBtn.classList.remove('copied');
    }, 1800);
  }).catch(() => {
    copyBtn.textContent = 'Не удалось скопировать';
    setTimeout(() => {
      copyBtn.textContent = 'Скопировать расчёт';
    }, 1800);
  });
}

function resetCalculator() {
  document.querySelectorAll('[data-qty]').forEach((input) => {
    input.value = 0;
  });

  fields.visitPrice.value = 1000;
  fields.minimumPrice.value = 2000;
  fields.materialsExtra.value = 0;
  fields.complexity.value = 1;
  fields.urgency.value = 1;
  fields.discount.value = 0;
  applyFilter('all');
  calculate();
}

function createPriceEditor() {
  const style = document.createElement('style');
  style.textContent = `
    .price-editor-panel {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: none;
      padding: 18px;
      place-items: center;
      background: rgba(2, 6, 23, 0.72);
      backdrop-filter: blur(10px);
    }

    .price-editor-panel.open {
      display: grid;
    }

    .price-editor-box {
      width: min(920px, 100%);
      max-height: 86vh;
      overflow: auto;
      padding: 22px;
    }

    .price-editor-head {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .price-editor-list {
      display: grid;
      gap: 10px;
    }

    .price-editor-row {
      display: grid;
      grid-template-columns: 1fr 160px;
      gap: 12px;
      align-items: center;
      padding: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px;
      background: rgba(15, 23, 42, 0.42);
    }

    .price-editor-name {
      font-weight: 850;
    }

    .price-editor-base,
    .price-editor-status {
      color: var(--muted);
      line-height: 1.45;
    }

    .price-editor-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 18px;
    }

    .price-editor-actions button,
    .price-editor-close {
      border-radius: 14px;
      padding: 12px 14px;
      font-weight: 900;
      background: var(--accent);
      color: #111827;
    }

    .price-editor-actions .secondary,
    .price-editor-close {
      background: rgba(255,255,255,0.1);
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.16);
    }

    @media (max-width: 640px) {
      .price-editor-head,
      .price-editor-row {
        grid-template-columns: 1fr;
        display: grid;
      }
    }
  `;
  document.head.appendChild(style);

  const openButton = document.createElement('button');
  openButton.className = 'ghost-btn';
  openButton.type = 'button';
  openButton.textContent = 'Редактировать прайс';
  resetBtn.insertAdjacentElement('afterend', openButton);

  const panel = document.createElement('div');
  panel.className = 'price-editor-panel';
  panel.innerHTML = `
    <section class="price-editor-box card" role="dialog" aria-modal="true" aria-labelledby="priceEditorTitle">
      <div class="price-editor-head">
        <div>
          <p class="eyebrow small">Настройка</p>
          <h2 id="priceEditorTitle">Редактор прайса</h2>
          <p class="price-editor-base">Измени цены услуг. Они сохранятся в этом браузере и будут использоваться в расчёте.</p>
        </div>
        <button class="price-editor-close" type="button">Закрыть</button>
      </div>
      <div class="price-editor-list"></div>
      <div class="price-editor-actions">
        <button type="button" data-save-prices>Сохранить цены</button>
        <button class="secondary" type="button" data-reset-prices>Вернуть базовые</button>
      </div>
      <p class="price-editor-status"></p>
    </section>
  `;
  document.body.appendChild(panel);

  const list = panel.querySelector('.price-editor-list');
  const status = panel.querySelector('.price-editor-status');

  function renderPriceRows() {
    list.innerHTML = services.map((service) => `
      <label class="price-editor-row">
        <span>
          <span class="price-editor-name">${service.icon} ${service.title}</span><br>
          <span class="price-editor-base">База: ${formatRub(service.basePrice)} / ${service.unit}</span>
        </span>
        <input type="number" min="0" value="${service.price}" data-service-price="${service.id}" />
      </label>
    `).join('');
  }

  function openPanel() {
    renderPriceRows();
    status.textContent = '';
    panel.classList.add('open');
  }

  function closePanel() {
    panel.classList.remove('open');
  }

  function savePrices() {
    const customPrices = {};

    panel.querySelectorAll('[data-service-price]').forEach((input) => {
      const service = services.find((item) => item.id === input.dataset.servicePrice);
      if (!service) return;

      const newPrice = numberFromInput(input, service.basePrice);
      service.price = newPrice > 0 ? newPrice : service.basePrice;

      if (service.price !== service.basePrice) {
        customPrices[service.id] = service.price;
      }
    });

    localStorage.setItem(priceStorageKey, JSON.stringify(customPrices));
    refreshServicePrices();
    calculate();
    status.textContent = 'Прайс сохранён. Расчёт обновлён.';
  }

  function resetPrices() {
    localStorage.removeItem(priceStorageKey);
    services.forEach((service) => {
      service.price = service.basePrice;
    });
    renderPriceRows();
    refreshServicePrices();
    calculate();
    status.textContent = 'Базовый прайс восстановлен.';
  }

  openButton.addEventListener('click', openPanel);
  panel.querySelector('.price-editor-close').addEventListener('click', closePanel);
  panel.querySelector('[data-save-prices]').addEventListener('click', savePrices);
  panel.querySelector('[data-reset-prices]').addEventListener('click', resetPrices);

  panel.addEventListener('click', (event) => {
    if (event.target === panel) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });
}

Object.values(fields).forEach((field) => {
  field.addEventListener('input', calculate);
  field.addEventListener('change', calculate);
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
});

copyBtn.addEventListener('click', copyResult);
resetBtn.addEventListener('click', resetCalculator);

loadCustomPrices();
renderServices();
applyFilter(activeFilter);
createPriceEditor();
calculate();

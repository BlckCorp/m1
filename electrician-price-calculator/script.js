const services = [
  {
    id: 'socket',
    category: 'points',
    icon: '🔌',
    title: 'Замена розетки',
    unit: 'точка',
    price: 1200,
    description: 'Демонтаж старой, установка новой, проверка контактов'
  },
  {
    id: 'switch',
    category: 'points',
    icon: '🔘',
    title: 'Замена выключателя',
    unit: 'точка',
    price: 1000,
    description: 'Обычный, проходной или клавишный выключатель'
  },
  {
    id: 'socketBox',
    category: 'points',
    icon: '🧱',
    title: 'Замена подрозетника',
    unit: 'шт.',
    price: 600,
    description: 'Укрепление точки, монтаж нового подрозетника'
  },
  {
    id: 'lamp',
    category: 'light',
    icon: '💡',
    title: 'Установка светильника',
    unit: 'шт.',
    price: 900,
    description: 'Накладной светильник, бра, простой потолочный свет'
  },
  {
    id: 'chandelier',
    category: 'light',
    icon: '✨',
    title: 'Монтаж люстры',
    unit: 'шт.',
    price: 1800,
    description: 'Сборка, подвес, подключение, проверка режимов'
  },
  {
    id: 'ledStrip',
    category: 'light',
    icon: '〰️',
    title: 'Монтаж LED-ленты',
    unit: 'м',
    price: 500,
    description: 'Проклейка, подключение блока питания, проверка'
  },
  {
    id: 'breaker',
    category: 'panel',
    icon: '⚡',
    title: 'Замена автомата',
    unit: 'шт.',
    price: 900,
    description: 'Установка автомата в щите без цены самого автомата'
  },
  {
    id: 'rcd',
    category: 'panel',
    icon: '🛡️',
    title: 'Установка УЗО / дифавтомата',
    unit: 'шт.',
    price: 1600,
    description: 'Подключение, проверка тестовой кнопки, маркировка'
  },
  {
    id: 'panelRevision',
    category: 'panel',
    icon: '🧰',
    title: 'Ревизия щита',
    unit: 'работа',
    price: 2500,
    description: 'Подтяжка контактов, осмотр, базовая маркировка'
  },
  {
    id: 'cableOpen',
    category: 'cable',
    icon: '➰',
    title: 'Прокладка кабеля открыто',
    unit: 'м',
    price: 180,
    description: 'Без штробления, по поверхности или в кабель-канале'
  },
  {
    id: 'cableChannel',
    category: 'cable',
    icon: '📏',
    title: 'Монтаж кабель-канала',
    unit: 'м',
    price: 250,
    description: 'Разметка, крепёж, укладка кабеля'
  },
  {
    id: 'stroba',
    category: 'cable',
    icon: '🪨',
    title: 'Штробление',
    unit: 'м',
    price: 700,
    description: 'Ориентир для бетона/кирпича, без заделки'
  },
  {
    id: 'junctionBox',
    category: 'cable',
    icon: '📦',
    title: 'Расключение коробки',
    unit: 'шт.',
    price: 1200,
    description: 'Соединение линий, клеммы/опрессовка по ситуации'
  },
  {
    id: 'lineDiagnostic',
    category: 'diagnostic',
    icon: '🔎',
    title: 'Диагностика линии',
    unit: 'линия',
    price: 1000,
    description: 'Поиск причины: нет питания, выбивает автомат, греется точка'
  },
  {
    id: 'smallRepair',
    category: 'diagnostic',
    icon: '🪛',
    title: 'Мелкий ремонт контакта',
    unit: 'точка',
    price: 800,
    description: 'Зачистка, подтяжка, восстановление соединения'
  }
];

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
    'Предварительный расчёт электромонтажных работ',
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

Object.values(fields).forEach((field) => {
  field.addEventListener('input', calculate);
  field.addEventListener('change', calculate);
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
});

copyBtn.addEventListener('click', copyResult);
resetBtn.addEventListener('click', resetCalculator);

renderServices();
applyFilter(activeFilter);
calculate();

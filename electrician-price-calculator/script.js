const formatRub = (value) => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
}).format(value);

const fields = {
  points: document.querySelector('#points'),
  pointPrice: document.querySelector('#pointPrice'),
  visitPrice: document.querySelector('#visitPrice'),
  materials: document.querySelector('#materials'),
  socketBoxes: document.querySelector('#socketBoxes'),
  diagnostics: document.querySelector('#diagnostics'),
  urgency: document.querySelector('#urgency')
};

const totalEl = document.querySelector('#total');
const detailsEl = document.querySelector('#details');
const copyBtn = document.querySelector('#copyBtn');

function numberFromInput(input, fallback = 0) {
  const value = Number(input.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function calculate() {
  const points = Math.max(1, numberFromInput(fields.points, 1));
  const pointPrice = numberFromInput(fields.pointPrice);
  const visitPrice = numberFromInput(fields.visitPrice);
  const materials = numberFromInput(fields.materials);
  const socketBoxPrice = Number(fields.socketBoxes.value);
  const diagnostics = Number(fields.diagnostics.value);
  const urgency = Number(fields.urgency.value);

  const work = points * pointPrice;
  const materialTotal = points * materials;
  const socketBoxesTotal = points * socketBoxPrice;
  const baseTotal = work + materialTotal + socketBoxesTotal + diagnostics + visitPrice;
  const total = Math.round(baseTotal * urgency);

  const details = [
    `Работа: ${formatRub(work)}`,
    `Материалы: ${formatRub(materialTotal)}`,
    `Подрозетники/сложность: ${formatRub(socketBoxesTotal)}`,
    `Диагностика: ${formatRub(diagnostics)}`,
    `Выезд: ${formatRub(visitPrice)}`,
    urgency > 1 ? `Коэффициент срочности: x${urgency}` : 'Без доплаты за срочность'
  ];

  totalEl.textContent = formatRub(total);
  detailsEl.innerHTML = details.join('<br>');

  return {
    points,
    total,
    details
  };
}

function copyResult() {
  const result = calculate();
  const text = [
    'Предварительный расчёт замены розеток',
    `Количество точек: ${result.points}`,
    ...result.details,
    `Итого ориентировочно: ${formatRub(result.total)}`,
    '',
    'Точная цена согласовывается после осмотра точки.'
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Расчёт скопирован';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = 'Скопировать расчёт';
      copyBtn.classList.remove('copied');
    }, 1800);
  });
}

Object.values(fields).forEach((field) => {
  field.addEventListener('input', calculate);
  field.addEventListener('change', calculate);
});

copyBtn.addEventListener('click', copyResult);
calculate();

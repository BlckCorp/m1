(() => {
  const storageKey = 'master_service_price_overrides_v1';

  function safeNumber(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
  }

  function formatRub(value) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(value);
  }

  function getServices() {
    return typeof services !== 'undefined' && Array.isArray(services) ? services : [];
  }

  function getOverrides() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  }

  function saveOverrides(overrides) {
    localStorage.setItem(storageKey, JSON.stringify(overrides));
  }

  function rememberBasePrices() {
    getServices().forEach((service) => {
      if (!service.basePrice) {
        service.basePrice = service.price;
      }
    });
  }

  function applySavedPrices() {
    rememberBasePrices();
    const overrides = getOverrides();

    getServices().forEach((service) => {
      const customPrice = safeNumber(overrides[service.id]);
      service.price = customPrice > 0 ? customPrice : service.basePrice;
    });
  }

  function updateVisiblePrices() {
    getServices().forEach((service) => {
      const row = document.querySelector(`[data-id="${service.id}"]`);
      if (!row) return;

      const priceEl = row.querySelector('.service-price');
      if (!priceEl) return;

      priceEl.textContent = `${formatRub(service.price)} / ${service.unit}`;
    });
  }

  function recalculate() {
    if (typeof calculate === 'function') {
      calculate();
    }
  }

  function createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .price-editor-open {
        white-space: nowrap;
      }

      .price-editor-overlay {
        position: fixed;
        inset: 0;
        z-index: 90;
        display: none;
        place-items: center;
        padding: 18px;
        background: rgba(2, 6, 23, 0.72);
        backdrop-filter: blur(10px);
      }

      .price-editor-overlay.open {
        display: grid;
      }

      .price-editor-panel {
        width: min(920px, 100%);
        max-height: min(86vh, 900px);
        overflow: auto;
        padding: 22px;
      }

      .price-editor-panel h2 {
        margin: 0;
      }

      .price-editor-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 18px;
      }

      .price-editor-hint,
      .price-editor-status {
        color: var(--muted);
        line-height: 1.5;
        margin: 0 0 16px;
      }

      .price-editor-list {
        display: grid;
        gap: 10px;
      }

      .price-editor-row {
        display: grid;
        grid-template-columns: 1fr 160px 160px;
        gap: 12px;
        align-items: center;
        padding: 12px;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 16px;
        background: rgba(15, 23, 42, 0.42);
      }

      .price-editor-title {
        font-weight: 850;
      }

      .price-editor-default {
        color: var(--muted-dark);
        font-size: 0.92rem;
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

      @media (max-width: 720px) {
        .price-editor-row {
          grid-template-columns: 1fr;
        }

        .price-editor-top {
          display: grid;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createEditorButton() {
    const sectionHead = document.querySelector('.services-card .section-head');
    if (!sectionHead || document.querySelector('#priceEditorOpen')) return;

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '10px';
    actions.style.flexWrap = 'wrap';
    actions.style.justifyContent = 'flex-end';

    const resetBtn = document.querySelector('#resetBtn');
    if (resetBtn) {
      resetBtn.replaceWith(actions);
      actions.appendChild(resetBtn);
    } else {
      sectionHead.appendChild(actions);
    }

    const button = document.createElement('button');
    button.className = 'ghost-btn price-editor-open';
    button.id = 'priceEditorOpen';
    button.type = 'button';
    button.textContent = 'Редактировать прайс';
    actions.appendChild(button);

    button.addEventListener('click', openEditor);
  }

  function createEditorPanel() {
    if (document.querySelector('#priceEditorOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'price-editor-overlay';
    overlay.id = 'priceEditorOverlay';

    overlay.innerHTML = `
      <section class="price-editor-panel card" role="dialog" aria-modal="true" aria-labelledby="priceEditorTitle">
        <div class="price-editor-top">
          <div>
            <p class="eyebrow small">Настройка прайса</p>
            <h2 id="priceEditorTitle">Цены услуг</h2>
          </div>
          <button class="price-editor-close" id="priceEditorClose" type="button">Закрыть</button>
        </div>

        <p class="price-editor-hint">
          Измени цены под свой прайс. Новые значения сохраняются в этом браузере и используются в расчёте.
        </p>

        <div class="price-editor-list" id="priceEditorList"></div>

        <div class="price-editor-actions">
          <button id="priceEditorSave" type="button">Сохранить цены</button>
          <button class="secondary" id="priceEditorReset" type="button">Вернуть базовые</button>
        </div>

        <p class="price-editor-status" id="priceEditorStatus"></p>
      </section>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeEditor();
      }
    });

    document.querySelector('#priceEditorClose').addEventListener('click', closeEditor);
    document.querySelector('#priceEditorSave').addEventListener('click', saveEditorPrices);
    document.querySelector('#priceEditorReset').addEventListener('click', resetEditorPrices);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeEditor();
      }
    });
  }

  function renderEditorRows() {
    const list = document.querySelector('#priceEditorList');
    if (!list) return;

    list.innerHTML = getServices().map((service) => `
      <label class="price-editor-row">
        <span>
          <span class="price-editor-title">${service.icon} ${service.title}</span><br>
          <span class="price-editor-default">База: ${formatRub(service.basePrice)} / ${service.unit}</span>
        </span>
        <span>${service.unit}</span>
        <input type="number" min="0" value="${service.price}" data-price-edit="${service.id}" />
      </label>
    `).join('');
  }

  function openEditor() {
    renderEditorRows();
    const overlay = document.querySelector('#priceEditorOverlay');
    if (overlay) overlay.classList.add('open');
  }

  function closeEditor() {
    const overlay = document.querySelector('#priceEditorOverlay');
    if (overlay) overlay.classList.remove('open');
  }

  function saveEditorPrices() {
    const overrides = {};

    document.querySelectorAll('[data-price-edit]').forEach((input) => {
      const service = getServices().find((item) => item.id === input.dataset.priceEdit);
      if (!service) return;

      const price = safeNumber(input.value, service.basePrice);
      service.price = price > 0 ? price : service.basePrice;

      if (service.price !== service.basePrice) {
        overrides[service.id] = service.price;
      }
    });

    saveOverrides(overrides);
    updateVisiblePrices();
    recalculate();

    const status = document.querySelector('#priceEditorStatus');
    if (status) {
      status.textContent = 'Цены сохранены. Расчёт обновлён.';
    }
  }

  function resetEditorPrices() {
    localStorage.removeItem(storageKey);

    getServices().forEach((service) => {
      service.price = service.basePrice;
    });

    renderEditorRows();
    updateVisiblePrices();
    recalculate();

    const status = document.querySelector('#priceEditorStatus');
    if (status) {
      status.textContent = 'Базовые цены восстановлены.';
    }
  }

  function init() {
    rememberBasePrices();
    applySavedPrices();
    updateVisiblePrices();
    recalculate();
    createStyles();
    createEditorButton();
    createEditorPanel();
  }

  init();
})();

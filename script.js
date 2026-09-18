// ---------- Menú móvil (usado en ambas páginas) ----------
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();

// ---------- Página de Transporte ----------
if (typeof TRANSPORT_DATA !== 'undefined') {

  const SOURCES = Object.keys(TRANSPORT_DATA.supply);
  const DESTS = Object.keys(TRANSPORT_DATA.demand);

  const METHODS = [
    { key: 'noroeste', label: 'Esquina Noroeste', desc: 'Asigna siempre desde la celda superior izquierda disponible, sin comparar costos. Es la forma más simple de construir una solución inicial.' },
    { key: 'costo_minimo', label: 'Costo Mínimo', desc: 'En cada paso busca, entre las celdas disponibles, la de menor costo unitario y asigna ahí la mayor cantidad posible.' },
    { key: 'vogel', label: 'Vogel (VAM)', desc: 'Calcula una penalización por fila y columna (diferencia entre los dos costos más bajos) y asigna primero donde esa penalización es mayor, acercándose más al óptimo.' },
  ];

  // Estado: paso actual por método
  const state = {};
  METHODS.forEach(m => { state[m.key] = 0; });

  function buildAssignedUpTo(methodKey, stepIndex) {
    const steps = TRANSPORT_DATA[methodKey].steps;
    const assigned = {};
    const supplyLeft = { ...TRANSPORT_DATA.supply };
    const demandLeft = { ...TRANSPORT_DATA.demand };
    for (let i = 0; i <= stepIndex; i++) {
      const st = steps[i];
      assigned[st.f + '|' + st.d] = { amt: st.amt, cost: st.cost };
      supplyLeft[st.f] -= st.amt;
      demandLeft[st.d] -= st.amt;
    }
    return { assigned, supplyLeft, demandLeft, lastStep: steps[stepIndex] };
  }

  function renderPanel(methodKey) {
    const panel = document.getElementById('panel-' + methodKey);
    const steps = TRANSPORT_DATA[methodKey].steps;
    const stepIndex = state[methodKey];
    const { assigned, supplyLeft, demandLeft, lastStep } = buildAssignedUpTo(methodKey, stepIndex);

    // Tabla
    let html = '<div class="table-scroll"><table class="alloc-table"><thead><tr><th></th>';
    DESTS.forEach(d => { html += `<th>${d}${demandLeft[d] === 0 ? ' ✓' : ''}</th>`; });
    html += '<th>Oferta restante</th></tr></thead><tbody>';

    SOURCES.forEach(s => {
      html += `<tr><th>${s}${supplyLeft[s] === 0 ? ' ✓' : ''}</th>`;
      DESTS.forEach(d => {
        const key = s + '|' + d;
        const cell = assigned[key];
        const isLast = lastStep && lastStep.f === s && lastStep.d === d;
        if (cell) {
          html += `<td class="assigned${isLast ? ' just-set' : ''}" data-cost="Q${cell.cost} c/u">${cell.amt}</td>`;
        } else {
          html += `<td class="empty-cell">Q${TRANSPORT_DATA.costs[s][d]}</td>`;
        }
      });
      html += `<td>${supplyLeft[s]} / ${TRANSPORT_DATA.supply[s]}</td></tr>`;
    });

    html += '<tr><th>Demanda restante</th>';
    DESTS.forEach(d => { html += `<td>${demandLeft[d]} / ${TRANSPORT_DATA.demand[d]}</td>`; });
    html += '<td></td></tr></tbody></table></div>';

    panel.querySelector('.table-holder').innerHTML = html;

    // Barra de pasos
    const total = steps.length;
    panel.querySelector('.step-info').textContent = `Paso ${stepIndex + 1} de ${total}`;
    panel.querySelector('.step-detail').textContent =
      `${lastStep.f} → ${lastStep.d}: se asignan ${lastStep.amt} unidades a Q${lastStep.cost} c/u`;
    panel.querySelector('.btn-prev').disabled = stepIndex === 0;
    panel.querySelector('.btn-next').disabled = stepIndex === total - 1;

    // Costo acumulado hasta este paso
    let running = 0;
    for (let i = 0; i <= stepIndex; i++) running += steps[i].amt * steps[i].cost;
    panel.querySelector('.running-total').textContent = 'Q' + running.toLocaleString('es-GT');
  }

  function buildPanel(method) {
    const panel = document.createElement('div');
    panel.className = 'method-panel';
    panel.id = 'panel-' + method.key;
    panel.innerHTML = `
      <div class="method-intro">
        <div>
          <h3>${method.label}</h3>
          <p>${method.desc}</p>
        </div>
        <div class="method-total">
          <span class="lbl">Costo acumulado</span>
          <span class="val running-total">Q0</span>
        </div>
      </div>
      <div class="step-bar">
        <button class="btn-prev" type="button">← Anterior</button>
        <button class="btn-next" type="button">Siguiente →</button>
        <span class="step-info"></span>
        <span class="step-detail"></span>
      </div>
      <div class="table-holder"></div>
    `;
    panel.querySelector('.btn-prev').addEventListener('click', () => {
      if (state[method.key] > 0) { state[method.key]--; renderPanel(method.key); }
    });
    panel.querySelector('.btn-next').addEventListener('click', () => {
      if (state[method.key] < TRANSPORT_DATA[method.key].steps.length - 1) {
        state[method.key]++; renderPanel(method.key);
      }
    });
    return panel;
  }

  function initTransportPage() {
    const tabBar = document.getElementById('methodTabs');
    const panelsHolder = document.getElementById('methodPanels');
    if (!tabBar || !panelsHolder) return;

    METHODS.forEach((m, i) => {
      const tab = document.createElement('button');
      tab.className = 'tab-btn' + (i === 0 ? ' active' : '');
      tab.type = 'button';
      tab.textContent = m.label;
      tab.dataset.method = m.key;
      tab.addEventListener('click', () => {
        tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        panelsHolder.querySelectorAll('.method-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('panel-' + m.key).classList.add('active');
      });
      tabBar.appendChild(tab);

      const panel = buildPanel(m);
      if (i === 0) panel.classList.add('active');
      panelsHolder.appendChild(panel);
      renderPanel(m.key);
    });

    // Comparación de costos totales
    const compareHolder = document.getElementById('compareGrid');
    if (compareHolder) {
      const totals = METHODS.map(m => ({ ...m, total: TRANSPORT_DATA[m.key].total }));
      const min = Math.min(...totals.map(t => t.total));
      const max = Math.max(...totals.map(t => t.total));
      totals.forEach(t => {
        const card = document.createElement('div');
        card.className = 'compare-card' + (t.total === min ? ' best' : '');
        const pct = Math.round((t.total / max) * 100);
        card.innerHTML = `
          ${t.total === min ? '<span class="best-badge">Menor costo</span>' : ''}
          <h4>${t.label}</h4>
          <div class="cost">Q${t.total.toLocaleString('es-GT')}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        `;
        compareHolder.appendChild(card);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initTransportPage);
}

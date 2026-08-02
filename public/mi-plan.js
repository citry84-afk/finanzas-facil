(() => {
  const state = {
    step: 0,
    goal: 'wealth',
    contribution: 1000,
    horizon: 15,
    products: new Set(['funds', 'stocks', 'options', 'realestate']),
    detail: 'advanced',
  };

  const goals = {
    calm: { title: 'Vivir con más tranquilidad', subtitle: 'Colchón, ahorro, deuda y control del mes', icon: '◌', target: 30000, current: 16800 },
    home: { title: 'Comprar una vivienda', subtitle: 'Entrada, gastos y fecha objetivo', icon: '⌂', target: 90000, current: 34700 },
    income: { title: 'Generar ingresos mensuales', subtitle: 'Dividendos, alquileres y primas', icon: '↗', target: 3000, current: 1280 },
    wealth: { title: 'Construir mi patrimonio', subtitle: 'Inversiones, inmuebles y objetivos', icon: '◇', target: 500000, current: 184620 },
  };

  const products = [
    ['cash', 'Cuentas'], ['funds', 'Fondos / ETF'], ['stocks', 'Acciones'],
    ['options', 'Opciones'], ['realestate', 'Inmuebles'], ['debt', 'Hipotecas / deuda'],
  ];

  const steps = [
    {
      eyebrow: 'Tu punto de partida',
      counter: '1 de 3',
      render: renderGoalStep,
      valid: () => Boolean(state.goal),
    },
    {
      eyebrow: 'Tu fotografía financiera',
      counter: '2 de 3',
      render: renderProfileStep,
      valid: () => state.products.size > 0,
    },
    {
      eyebrow: 'Tu experiencia',
      counter: '3 de 3',
      render: renderBuildStep,
      valid: () => Boolean(state.detail),
    },
  ];

  const stepContent = document.querySelector('#stepContent');
  const progressBar = document.querySelector('#progressBar');
  const stepEyebrow = document.querySelector('#stepEyebrow');
  const stepCounter = document.querySelector('#stepCounter');
  const backButton = document.querySelector('#backButton');
  const nextButton = document.querySelector('#nextButton');
  const livePreview = document.querySelector('#livePreview');
  const onboarding = document.querySelector('#onboarding');
  const reveal = document.querySelector('#reveal');
  const dashboard = document.querySelector('#dashboard');

  function euro(value, compact = false) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
      notation: compact ? 'compact' : 'standard',
    }).format(value);
  }

  function renderGoalStep() {
    return `
      <p class="step-kicker"><i></i> Empecemos por lo que de verdad importa</p>
      <h1>¿Qué quieres que tu dinero <em>haga por ti?</em></h1>
      <p class="step-lead">No empezamos pidiendo cuentas ni extractos. Primero entendemos el cambio que quieres conseguir.</p>
      <div class="goal-grid" role="radiogroup" aria-label="Objetivo financiero principal">
        ${Object.entries(goals).map(([key, item]) => `
          <button class="goal-card ${state.goal === key ? 'selected' : ''}" data-goal="${key}" role="radio" aria-checked="${state.goal === key}">
            <span class="goal-icon">${item.icon}</span>
            <strong>${item.title}</strong>
            <span>${item.subtitle}</span>
          </button>`).join('')}
      </div>`;
  }

  function renderProfileStep() {
    const contributionPct = ((state.contribution - 100) / 2400) * 100;
    const horizonPct = ((state.horizon - 1) / 29) * 100;
    return `
      <p class="step-kicker"><i></i> Una foto aproximada es suficiente</p>
      <h1>Construyamos un plan que puedas <em>mantener.</em></h1>
      <p class="step-lead">Estas cifras se podrán modificar siempre. Ahora solo necesitamos entender el ritmo y la complejidad de tu patrimonio.</p>
      <div class="form-stack">
        <div class="range-block">
          <div class="range-top"><div><label for="contribution">Aportación mensual sostenible</label><div class="range-sub">Sin contar ingresos extraordinarios</div></div><strong class="range-value">${euro(state.contribution)}</strong></div>
          <input id="contribution" type="range" min="100" max="2500" step="50" value="${state.contribution}" style="--range:${contributionPct}%" />
        </div>
        <div class="range-block">
          <div class="range-top"><div><label for="horizon">Horizonte de tu objetivo</label><div class="range-sub">La fecha se recalculará con cada cambio</div></div><strong class="range-value">${state.horizon} años</strong></div>
          <input id="horizon" type="range" min="1" max="30" step="1" value="${state.horizon}" style="--range:${horizonPct}%" />
        </div>
        <div><span class="question-label">¿Qué quieres controlar?</span><div class="product-grid">
          ${products.map(([key,label]) => `<button class="product-chip ${state.products.has(key) ? 'selected' : ''}" data-product="${key}"><i>✓</i>${label}</button>`).join('')}
        </div></div>
      </div>`;
  }

  function renderBuildStep() {
    return `
      <p class="step-kicker"><i></i> Tú decides cuánta profundidad necesitas</p>
      <h1>La información justa. <em>Nunca ruido.</em></h1>
      <p class="step-lead">El mismo patrimonio puede explicarse de forma esencial, completa o avanzada. Podrás cambiarlo con un toque.</p>
      <div class="detail-grid" role="radiogroup" aria-label="Nivel de detalle">
        <button class="detail-card ${state.detail === 'essential' ? 'selected' : ''}" data-detail="essential"><strong>Esencial</strong><span>Solo quiero saber si voy bien y qué requiere atención.</span></button>
        <button class="detail-card ${state.detail === 'complete' ? 'selected' : ''}" data-detail="complete"><strong>Completo</strong><span>Evolución, distribución, objetivos y reglas.</span></button>
        <button class="detail-card ${state.detail === 'advanced' ? 'selected' : ''}" data-detail="advanced"><strong>Avanzado</strong><span>Operaciones, margen, exposición y métricas detalladas.</span></button>
      </div>
      <div class="build-list" style="margin-top:20px">
        ${buildModules().slice(0,4).map(item => `<div class="build-row"><span class="build-check">✓</span><div><strong>${item.title}</strong><span>${item.description}</span></div></div>`).join('')}
      </div>`;
  }

  function buildModules() {
    const list = [
      { key: 'goal', title: 'Objetivo y ritmo', description: `Progreso hacia ${goals[state.goal].title.toLowerCase()}.` },
      { key: 'control', title: 'Índice de control', description: 'Hábitos, datos actualizados y cumplimiento de tus propias reglas.' },
    ];
    if (state.products.has('funds') || state.products.has('stocks')) list.push({ key: 'invest', title: 'Inversiones', description: 'Aportaciones, rentabilidad, concentración y drawdown.' });
    if (state.products.has('options')) list.push({ key: 'options', title: 'Opciones', description: 'Primas ajustadas, asignaciones, margen y fondos disponibles.' });
    if (state.products.has('realestate')) list.push({ key: 'property', title: 'Patrimonio inmobiliario', description: 'Valor, hipotecas, alquileres y flujo de caja.' });
    if (state.products.has('debt')) list.push({ key: 'debt', title: 'Deuda', description: 'Coste, amortización y límites personales.' });
    return list;
  }

  function bindStepEvents() {
    document.querySelectorAll('[data-goal]').forEach(button => button.addEventListener('click', () => {
      state.goal = button.dataset.goal;
      vibrate(8); rerenderStep();
    }));
    document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.product;
      state.products.has(key) ? state.products.delete(key) : state.products.add(key);
      vibrate(6); rerenderStep();
    }));
    document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => {
      state.detail = button.dataset.detail;
      vibrate(8); rerenderStep();
    }));
    const contribution = document.querySelector('#contribution');
    if (contribution) contribution.addEventListener('input', event => {
      state.contribution = Number(event.target.value); rerenderStep(false);
    });
    const horizon = document.querySelector('#horizon');
    if (horizon) horizon.addEventListener('input', event => {
      state.horizon = Number(event.target.value); rerenderStep(false);
    });
  }

  function renderPreview() {
    const goal = goals[state.goal];
    const modules = buildModules();
    const score = state.detail === 'advanced' ? 86 : state.detail === 'complete' ? 82 : 78;
    const previewModules = [
      `<div class="preview-module"><span>Patrimonio</span><strong>${euro(goal.current, true)}</strong><small>↗ +1.240 € este mes</small></div>`,
      `<div class="preview-module"><span>Objetivo</span><strong>${Math.round((goal.current/goal.target)*100)} %</strong><small>7 meses por delante</small></div>`,
    ];
    if (state.products.has('options')) previewModules.push(`<div class="preview-module"><span>Fondos disponibles</span><strong>34 %</strong><small>Dentro de tu regla</small></div>`);
    else if (state.products.has('realestate')) previewModules.push(`<div class="preview-module"><span>Alquileres</span><strong>1.410 €</strong><small>Flujo mensual</small></div>`);
    else previewModules.push(`<div class="preview-module"><span>Ahorro mensual</span><strong>${euro(state.contribution)}</strong><small>Aportación prevista</small></div>`);
    previewModules.push(`<div class="preview-module wide"><span>Evolución</span><div class="preview-line"></div><small>${modules.length} módulos activos · ${state.detail === 'advanced' ? 'Vista avanzada' : state.detail === 'complete' ? 'Vista completa' : 'Vista esencial'}</small></div>`);
    livePreview.innerHTML = `
      <div class="preview-header"><div class="preview-greeting"><small>Tu sistema financiero</small><strong>Buenas noches, Luis.</strong></div><div class="preview-avatar">LM</div></div>
      <div class="preview-pulse" style="background:conic-gradient(var(--mint) 0 ${score}%,rgba(255,255,255,.075) ${score}%)"><div class="preview-pulse-content"><span>Índice de control</span><strong>${score}</strong><small>Todo en orden</small></div></div>
      <div class="preview-module-grid">${previewModules.join('')}</div>
      <div class="preview-nav"><span>●<br>Inicio</span><span>○<br>Patrimonio</span><span>○<br>Objetivos</span><span>○<br>Informe</span></div>`;
  }

  function rerenderStep(animate = true) {
    const step = steps[state.step];
    stepEyebrow.textContent = step.eyebrow;
    stepCounter.textContent = step.counter;
    progressBar.style.width = `${((state.step + 1) / steps.length) * 100}%`;
    if (animate) {
      stepContent.style.animation = 'none';
      void stepContent.offsetWidth;
      stepContent.style.animation = '';
    }
    stepContent.innerHTML = step.render();
    backButton.style.visibility = state.step === 0 ? 'hidden' : 'visible';
    nextButton.disabled = !step.valid();
    nextButton.querySelector('span').textContent = state.step === steps.length - 1 ? 'Crear mi sistema' : 'Continuar';
    renderPreview();
    bindStepEvents();
  }

  function vibrate(duration) {
    if (navigator.vibrate) navigator.vibrate(duration);
  }

  backButton.addEventListener('click', () => {
    if (state.step > 0) { state.step -= 1; rerenderStep(); vibrate(6); }
  });

  nextButton.addEventListener('click', () => {
    if (!steps[state.step].valid()) return;
    vibrate(10);
    if (state.step < steps.length - 1) { state.step += 1; rerenderStep(); }
    else runReveal();
  });

  document.querySelector('#resetButton').addEventListener('click', () => {
    state.step = 0; state.goal = 'wealth'; state.contribution = 1000; state.horizon = 15;
    state.products = new Set(['funds','stocks','options','realestate']); state.detail = 'advanced';
    dashboard.classList.add('is-hidden'); reveal.classList.add('is-hidden'); onboarding.classList.remove('is-hidden'); rerenderStep();
  });

  function runReveal() {
    onboarding.classList.add('is-hidden'); reveal.classList.remove('is-hidden');
    const checks = [
      `Objetivo: ${goals[state.goal].title}`,
      `${buildModules().length} módulos seleccionados`,
      `Reglas y alertas preparadas`,
      `Privacidad: modo local`,
    ];
    const status = document.querySelector('#revealStatus');
    const container = document.querySelector('#revealChecks');
    container.innerHTML = '';
    const statuses = ['Entendiendo tu objetivo…','Priorizando lo importante…','Activando tus módulos…','Tu sistema está listo.'];
    checks.forEach((text,index) => setTimeout(() => {
      status.textContent = statuses[index];
      container.insertAdjacentHTML('beforeend', `<div class="reveal-check" style="animation-delay:${index*.04}s"><i>✓</i><span>${text}</span></div>`);
      vibrate(6);
    }, 480 + index * 520));
    setTimeout(showDashboard, 2900);
  }

  function showDashboard() {
    const goal = goals[state.goal];
    onboarding.classList.add('is-hidden');
    reveal.classList.add('is-hidden'); dashboard.classList.remove('is-hidden');
    const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
    document.querySelector('#goalTitle').textContent = state.goal === 'wealth' ? 'Patrimonio de 500.000 €' : goal.title;
    document.querySelector('#goalCurrent').textContent = euro(goal.current);
    document.querySelector('#goalPercent').textContent = `${percent} % completado`;
    document.querySelector('#goalTrackFill').style.width = `${percent}%`;
    document.querySelector('#goalMarker').style.left = `${percent}%`;
    document.querySelector('#goalInsightText').textContent = `Manteniendo ${euro(state.contribution)}/mes, tu fecha objetivo mejora con cada aportación.`;
    document.querySelector('#statusNarrative').textContent = `Has avanzado ${euro(1240)} este mes y mantienes ${buildModules().length - 1} áreas de control dentro del rango configurado.`;
    renderMetrics();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMetrics() {
    const goal = goals[state.goal];
    const items = [
      ['◫','Patrimonio neto',euro(goal.current),'+0,7 % este mes','positive'],
      ['↗','Aportación mensual',euro(state.contribution),'Objetivo cumplido','positive'],
    ];
    if (state.products.has('options')) items.push(['◎','Fondos disponibles','34 %','Regla mínima: 30 %','']);
    else items.push(['◌','Fondo de emergencia','5,4 meses','Objetivo: 6 meses','']);
    if (state.products.has('realestate')) items.push(['⌂','Ingresos pasivos','1.410 €','2 alquileres activos','']);
    else items.push(['◇','Rentabilidad YTD','8,4 %','Realizada + no realizada','positive']);
    document.querySelector('#metricsGrid').innerHTML = items.map(([icon,label,value,sub,kind]) => `
      <article class="metric-card"><div class="metric-head"><span>${label}</span><i class="metric-icon">${icon}</i></div><strong>${value}</strong><p class="${kind}">${sub}</p></article>`).join('');
  }

  const stories = [
    {
      kicker: 'Tu semana financiera',
      html: `<h2>Has avanzado <em>1.240 €</em> hacia tu objetivo.</h2><p>No es solo una cifra. Es el resultado combinado de tu aportación y del movimiento de tus inversiones.</p><div class="story-breakdown"><div><span>Aportaciones</span><strong>+1.000 €</strong></div><div><span>Mercado</span><strong>+460 €</strong></div><div><span>Retiradas</span><strong>−220 €</strong></div></div>`,
    },
    {
      kicker: 'Tus reglas',
      html: `<h2>Protegiste lo que <em>depende de ti.</em></h2><p>La liquidez se mantiene en el 34 %, por encima de tu regla mínima del 30 %. No premiamos asumir más riesgo: premiamos respetar tu sistema.</p><div class="story-big-number">34 %</div><p>Fondos disponibles sobre el total de la cartera.</p>`,
    },
    {
      kicker: 'Objetivo principal',
      html: `<h2>Vas <em>7 meses</em> por delante del plan.</h2><p>Tu aportación mensual sostenible está acortando el recorrido. Puedes modificarla y ver cómo cambia la fecha, sin promesas irreales.</p><div class="share-card"><small>PROGRESO HACIA MI OBJETIVO</small><strong>37 % completado</strong><small>Patrimonio oculto · listo para compartir</small></div>`,
    },
  ];
  let storyIndex = 0;
  const storyDialog = document.querySelector('#storyDialog');

  function renderStory() {
    document.querySelector('#storyProgress').innerHTML = stories.map((_,i) => `<i class="${i <= storyIndex ? 'done' : ''}"></i>`).join('');
    const slide = document.querySelector('#storySlide');
    slide.style.animation = 'none'; void slide.offsetWidth; slide.style.animation = '';
    slide.innerHTML = `<span class="story-kicker">${stories[storyIndex].kicker}</span>${stories[storyIndex].html}`;
    document.querySelector('#storyPrev').disabled = storyIndex === 0;
    document.querySelector('#storyNext').innerHTML = storyIndex === stories.length - 1 ? 'Cerrar <span>×</span>' : 'Siguiente <span>›</span>';
  }
  function openStory() { storyIndex = 0; renderStory(); storyDialog.showModal(); vibrate(10); }
  document.querySelector('#openStoryButton').addEventListener('click', openStory);
  document.querySelector('#mobileStoryButton').addEventListener('click', openStory);
  document.querySelector('#storyPrev').addEventListener('click', () => { if (storyIndex > 0) { storyIndex--; renderStory(); } });
  document.querySelector('#storyNext').addEventListener('click', () => {
    if (storyIndex < stories.length - 1) { storyIndex++; renderStory(); vibrate(5); }
    else storyDialog.close();
  });

  rerenderStep();
  const requestedScreen = new URLSearchParams(window.location.search).get('screen');
  if (requestedScreen === 'dashboard') showDashboard();
})();

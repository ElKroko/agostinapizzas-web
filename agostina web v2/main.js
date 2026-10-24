/* Agostina Pizzas — web v2 · interacciones (vanilla JS, sin dependencias)
   - Desktop: la rueda vertical mueve el track en horizontal con inercia (lerp).
   - Mobile (<=760px): scroll vertical nativo.
   - Hover en la carta cambia la pizza del hero, mazo de fotos barajable,
     acordeón de FAQ, stickers arrastrables, parallax ligado al scroll. */
(() => {
  const CFG = { lerp: 0.1, wheelMult: 1.15, mobileBp: 760 };

  const PIZ = [
    { id: 'agostina', name: 'Agostina', img: 'cut-agostina', desc: 'Base pomodoro, mozzarella, queso de cabra, chorizo español y aceitunas verdes.' },
    { id: 'giulianna', name: 'Giulianna', img: 'cut-giulianna', desc: 'Base pomodoro, mozzarella y triple pepperoni.' },
    { id: 'margarita', name: 'Margarita', img: 'cut-margarita', desc: 'Pomodoro, mozzarella, tomate y albahaca.' },
    { id: 'delfina', name: 'Delfina', img: 'cut-delfina', desc: 'Base pomodoro, mozzarella y camarón salteado con toque de ajo, ciboulette y alcaparras aparte.' },
    { id: 'alessia', name: 'Alessia', img: 'cut-alessia', desc: 'Base pomodoro, mozzarella, jamón pierna, aceitunas negras y tomate beef.' },
    { id: 'bianca', name: 'Bianca', img: 'cut-bianca', desc: 'Base pomodoro, mozzarella, queso parmesano, queso ahumado y queso roquefort.' },
    { id: 'isabella', name: 'Isabella', img: 'cut-isabella', desc: 'Base pomodoro, mozzarella, camarón salteado con ajo, pollo, queso crema, ciboulette y pesto de albahaca.' },
    { id: 'julieta', name: 'Julieta', img: 'cut-julieta', desc: 'Base pomodoro, mozzarella, zapallitos italianos, berenjenas y pimentones asados con toques de roquefort.' },
    { id: 'martina', name: 'Martina', img: 'cut-martina', desc: 'Base pomodoro, mozzarella, carne mechada, cebolla morada, tomate cocktail, cilantro y salsa de ostras.' },
    { id: 'rossa', name: 'Rossa', img: 'cut-rossa', desc: 'Base pomodoro, crema, mozzarella, fondos de alcachofa, palmitos y pesto de albahaca.' },
    { id: 'sofia', name: 'Sofía', img: 'cut-sofia', desc: 'Base pomodoro, mozzarella, jamón serrano, rúcula y toque de parmesano.' }
  ];
  const STACK = [
    { img: 'pull-giulianna', alt: 'Porción de Giulianna estirando el queso', r: -4 },
    { img: 'life-amigos-caja', alt: 'Amigos compartiendo una caja de Agostina', r: 3 },
    { img: 'pull-rossa', alt: 'Porción de Rossa recién cortada', r: -1 }
  ];
  const FAQ = [
    { q: '¿Hacen delivery?', a: 'Sí. Despachamos en Providencia, Las Condes, Vitacura y La Reina. Pide directo en agostinapizzas.cl.' },
    { q: '¿Qué tamaños tienen?', a: 'Todas las pizzas vienen en Mediana y Familiar, con la misma receta. El tamaño lo eliges al pedir.' },
    { q: '¿Tienen opciones veggie?', a: 'Sí: Margarita, Julieta, Fabiola y Giannina, entre otras. Revisa la carta completa.' },
    { q: '¿Cuál es el horario?', a: '[HORARIO POR CONFIRMAR]' }
  ];
  const TAPE = ['Pide la tuya ahora', '/', 'Tu antojo. Nuestra pizza.', '/', 'Encuentra tu sabor ideal', '/', 'New York Style desde 2013', '/'];

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const asset = (n) => `assets/${n}.webp`;
  const track = $('#track');
  const isMobile = () => track.clientWidth <= CFG.mobileBp;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero: pizza seleccionada ---------- */
  const heroPz = $('#heroPz'), heroImg = $('#heroImg'), heroName = $('#heroName'), heroDesc = $('#heroDesc');
  let pickId = 'agostina', spin = 0, scrollX = 0;
  PIZ.forEach((p) => { const i = new Image(); i.src = asset(p.img); }); // precarga

  const menuList = $('#menuList');
  PIZ.forEach((p) => {
    const b = el('button', 'mi', p.name);
    b.dataset.pick = p.id;
    menuList.appendChild(b);
  });
  function pick(id) {
    if (id === pickId) return;
    const p = PIZ.find((x) => x.id === id); if (!p) return;
    pickId = id; spin++;
    heroImg.src = asset(p.img); heroImg.alt = `Pizza ${p.name}`;
    heroName.textContent = p.name; heroDesc.textContent = p.desc;
    menuList.querySelectorAll('.mi').forEach((b) => b.classList.toggle('on', b.dataset.pick === id));
    paint();
  }
  menuList.querySelector('[data-pick="agostina"]').classList.add('on');
  ['mouseover', 'focusin', 'click'].forEach((ev) => menuList.addEventListener(ev, (e) => {
    const b = e.target.closest('[data-pick]'); if (b) pick(b.dataset.pick);
  }));
  document.querySelectorAll('.card[data-pick]').forEach((c) => c.addEventListener('click', () => pick(c.dataset.pick)));

  /* ---------- Mazo de fotos ---------- */
  const stack = $('#stack');
  let top = 0;
  const cards = STACK.map((s) => {
    const c = el('span', 'sc', `<img src="${asset(s.img)}" alt="${s.alt}" loading="lazy">`);
    stack.appendChild(c); return c;
  });
  function layoutStack() {
    cards.forEach((c, i) => {
      const d = (i - top + 3) % 3, r = d === 0 ? STACK[i].r : STACK[i].r + d * 3;
      c.style.zIndex = 10 - d;
      c.style.transform = `translate(calc(${d} * 2.2vh), calc(${d} * 2.2vh)) rotate(${r}deg)`;
    });
  }
  stack.addEventListener('click', () => { top = (top + 1) % 3; layoutStack(); });
  layoutStack();

  /* ---------- FAQ ---------- */
  const faqPanel = $('#faqPanel'), faqBtn = $('#faqBtn'), faqList = $('#faqList');
  let faqIdx = 0;
  function renderFaq() {
    faqList.innerHTML = '';
    FAQ.forEach((f, i) => {
      const open = i === faqIdx;
      const w = el('div');
      const q = el('button', 'faq-q', `<span>${f.q}</span><span aria-hidden="true" style="color:#C73A2A">${open ? '−' : '+'}</span>`);
      q.setAttribute('aria-expanded', open);
      q.addEventListener('click', () => { faqIdx = open ? -1 : i; renderFaq(); });
      w.appendChild(q);
      if (open) { const a = el('p', 'faq-a', f.a); a.style.margin = '0'; w.appendChild(a); }
      faqList.appendChild(w);
    });
  }
  function setFaq(open) { faqPanel.hidden = !open; faqBtn.setAttribute('aria-expanded', open); }
  faqBtn.addEventListener('click', () => setFaq(faqPanel.hidden));
  $('#faqClose').addEventListener('click', () => setFaq(false));
  renderFaq();

  /* ---------- Cinta y carrusel Lovers ---------- */
  const tape = $('#tape');
  TAPE.concat(TAPE, TAPE, TAPE).forEach((t) => tape.appendChild(el('span', null, t)));
  const lovers = $('#lovers');
  PIZ.concat(PIZ).forEach((p, i) => {
    const b = el('button', 'lv', `<img src="${asset(p.img)}" alt="Pizza ${p.name}" loading="lazy"><span class="lv-n">${p.name}</span>`);
    if (i >= PIZ.length) b.setAttribute('aria-hidden', 'true'), b.tabIndex = -1; // copia para el loop
    b.addEventListener('click', () => { pick(p.id); goTo('sec-menu'); });
    lovers.appendChild(b);
  });

  /* ---------- Scroll horizontal con inercia ---------- */
  let target = 0, anim = false, raf = 0;
  function step() {
    const cur = track.scrollLeft, diff = target - cur;
    if (Math.abs(diff) < 1.5) { track.scrollLeft = target; anim = false; return; }
    let mv = diff * CFG.lerp; if (Math.abs(mv) < 1) mv = Math.sign(diff);
    track.scrollLeft = cur + mv;
    raf = requestAnimationFrame(step);
  }
  function startAnim() { if (reduced) { track.scrollLeft = target; return; } if (!anim) { anim = true; raf = requestAnimationFrame(step); } }
  track.addEventListener('wheel', (e) => {
    if (isMobile()) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) { target = track.scrollLeft; return; } // trackpad horizontal nativo
    e.preventDefault();
    const max = track.scrollWidth - track.clientWidth;
    if (!anim) target = track.scrollLeft;
    target = Math.max(0, Math.min(max, target + e.deltaY * CFG.wheelMult));
    startAnim();
  }, { passive: false });

  // Teclado: flechas / PageUp / PageDown / Home / End en desktop
  document.addEventListener('keydown', (e) => {
    if (isMobile() || e.target.closest('input, textarea')) return;
    const page = track.clientWidth * 0.8, max = track.scrollWidth - track.clientWidth;
    const map = { ArrowRight: 120, ArrowDown: 120, ArrowLeft: -120, ArrowUp: -120, PageDown: page, PageUp: -page, ' ': page };
    if (e.key in map) { e.preventDefault(); if (!anim) target = track.scrollLeft; target = Math.max(0, Math.min(max, target + map[e.key])); startAnim(); }
    if (e.key === 'Home') { e.preventDefault(); target = 0; startAnim(); }
    if (e.key === 'End') { e.preventDefault(); target = max; startAnim(); }
  });

  function goTo(id) {
    const t = document.getElementById(id); if (!t) return;
    if (isMobile()) track.scrollTo({ top: Math.max(0, t.offsetTop - 10), behavior: reduced ? 'auto' : 'smooth' });
    else { target = Math.min(t.offsetLeft, track.scrollWidth - track.clientWidth); startAnim(); }
  }
  document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
    goTo(b.dataset.go);
    if (b.hasAttribute('data-open-faq')) setFaq(true);
  }));

  /* ---------- Parallax + progreso ---------- */
  const rolls = $('#rolls'), endPz = $('#endPz'), prog = $('#prog');
  const pars = [...document.querySelectorAll('[data-par]')].map((n) => ({ n, s: parseFloat(n.dataset.par), sec: n.closest('section') }));
  function paint() {
    const x = scrollX;
    if (!isMobile()) { const vw = track.clientWidth; pars.forEach((p) => { const d = (p.sec.offsetLeft + p.n.offsetLeft + p.n.offsetWidth / 2) - (x + vw / 2); const y = Math.max(-60, Math.min(60, -d * p.s)); p.n.style.transform = `translateY(${Math.round(y)}px)`; }); }
    const tilt = Math.round((Math.sin(x / 260) * 4 + (spin % 2 ? -3 : 3)) * 10) / 10;
    heroPz.style.transform = `translateX(${Math.round(-x * 0.18)}px) rotate(${tilt}deg)`;
    rolls.style.transform = `translateY(${Math.round(Math.sin(x / 300) * 18)}px) rotate(${Math.round(Math.cos(x / 340) * 30) / 10}deg)`;
    endPz.style.transform = `rotate(${Math.round(x * 0.6) / 10}deg)`;
  }
  let tick = 0;
  track.addEventListener('scroll', () => {
    if (tick) return;
    tick = requestAnimationFrame(() => {
      tick = 0;
      const m = isMobile();
      const pos = m ? track.scrollTop : track.scrollLeft;
      const max = m ? track.scrollHeight - track.clientHeight : track.scrollWidth - track.clientWidth;
      scrollX = pos;
      prog.style.width = (max > 0 ? (pos / max) * 100 : 0) + '%';
      if (!reduced) paint();
    });
  }, { passive: true });
  paint();

  /* ---------- Stickers arrastrables ---------- */
  document.querySelectorAll('[data-st]').forEach((s) => {
    let ox = 0, oy = 0, sx = 0, sy = 0, dragging = false;
    s.addEventListener('pointerdown', (e) => {
      dragging = true; sx = e.clientX - ox; sy = e.clientY - oy;
      s.setPointerCapture(e.pointerId); s.classList.add('dragging'); e.preventDefault();
    });
    s.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      ox = e.clientX - sx; oy = e.clientY - sy;
      s.style.transform = `translate(${ox}px, ${oy}px)`;
    });
    const end = () => { dragging = false; s.classList.remove('dragging'); };
    s.addEventListener('pointerup', end); s.addEventListener('pointercancel', end);
  });

  // Al cruzar el breakpoint, resetea la posición para no quedar a medio camino.
  let wasMobile = isMobile();
  window.addEventListener('resize', () => {
    const m = isMobile(); if (m !== wasMobile) { wasMobile = m; target = 0; track.scrollTo(0, 0); }
  });
})();

/* Agostina Pizzas — intro móvil (GSAP + ScrollTrigger, scrub con el dedo)
   Solo móvil (<=760px): en escritorio el recorrido es horizontal y la intro no se arma
   (la sección queda en display:none por CSS).
   Guion: pantalla roja con la Agostina → zoom hasta entrar en la pizza → capas de pizzas
   a distintas profundidades (parallax + giro leve) → se juntan y explotan con flash crema →
   queda el logo, que viaja al encabezado → el hero queda en reposo.
   La sección mide 1 pantalla + 1,75 de recorrido; su margen negativo deja el hero justo
   debajo del escenario, así que al terminar el flash se desvanece y el hero ya está en su lugar.
   Solo se animan transform y opacity. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// posición de cada capa (fracción del escenario desde el centro), profundidad 0..1 y giro
const LAYERS = [
  { x: -0.9, y: -0.75, z: 0.35, r: -14 },
  { x: 0.85, y: -0.55, z: 0.7, r: 10 },
  { x: -0.6, y: 0.7, z: 0.9, r: 8 },
  { x: 0.7, y: 0.8, z: 0.45, r: -10 },
  { x: 0.05, y: -1, z: 0.6, r: 6 },
  { x: -1, y: 0.1, z: 0.55, r: 12 },
  { x: 1, y: 0.15, z: 0.3, r: -6 },
  { x: -0.2, y: 1, z: 0.75, r: -12 },
  { x: 0.35, y: -0.35, z: 1, r: 14 },
];

export function initIntro({ ag, track, onBar }) {
  const intro = ag.querySelector('#intro');
  if (!intro || ag.classList.contains('no-intro')) return () => {};
  const mm = gsap.matchMedia();

  mm.add('(max-width: 760px)', () => {
    const stage = intro.querySelector('.in-stage');
    const main = intro.querySelector('.in-main');
    const pzs = [...intro.querySelectorAll('.in-p')];
    const logo = intro.querySelector('.in-logo');
    const flash = intro.querySelector('.in-flash');
    const bg = intro.querySelector('.in-bg');
    const hint = intro.querySelector('.in-hint');
    const skip = intro.querySelector('#introSkip');
    const hdLogo = ag.querySelector('.hd-logo');
    const W = () => stage.clientWidth, H = () => stage.clientHeight;
    const dist = () => intro.offsetHeight - stage.clientHeight; // recorrido de scroll de la intro

    // viaje del logo: del centro del escenario al logo del encabezado
    const target = () => {
      const r = hdLogo.getBoundingClientRect(), s = stage.getBoundingClientRect();
      return { x: r.left + r.width / 2 - (s.left + W() / 2), y: r.top + r.height / 2 - (s.top + H() / 2), k: r.width / logo.offsetWidth };
    };

    gsap.set([main, ...pzs, logo], { xPercent: -50, yPercent: -50, force3D: true });
    gsap.set(pzs, { autoAlpha: 0 });
    gsap.set([logo, flash], { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: intro,
        scroller: track,
        start: 'top top',
        end: () => '+=' + dist(),
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          ag.classList.toggle('hd-on', self.progress > 0.95);
          onBar(self.progress > 0.78);
          stage.style.visibility = self.progress > 0.999 ? 'hidden' : '';
        },
      },
    });

    // 1 · pantalla roja con la pizza; 2 · zoom infinito hasta entrar en ella
    tl.to(hint, { autoAlpha: 0, y: 20, duration: 0.6 }, 0)
      .to(main, { scale: 9, rotation: 24, duration: 3, ease: 'power2.in' }, 0.4)
      .to(main, { autoAlpha: 0, duration: 0.5 }, 2.9);

    // capas: aparecen chicas cerca del centro y se abren hacia fuera, cada una a su velocidad
    pzs.forEach((p, i) => {
      const L = LAYERS[i % LAYERS.length];
      gsap.set(p, { x: () => L.x * W() * 0.1, y: () => L.y * H() * 0.08, scale: 0.12 + 0.12 * L.z, rotation: L.r });
      const ang = Math.atan2(L.y, L.x) + (i % 2 ? 0.5 : -0.5);
      tl.to(p, { autoAlpha: 1, duration: 0.5 }, 2.6 + i * 0.05)
        .to(p, {
          x: () => L.x * W() * (0.22 + 0.42 * L.z),
          y: () => L.y * H() * (0.18 + 0.36 * L.z),
          scale: 0.45 + 0.85 * L.z,
          rotation: L.r * (2 + L.z * 2),
          duration: 3.6,
          ease: 'power1.out',
        }, 2.6)
        // 3 · se juntan al centro…
        .to(p, { x: () => L.x * 18, y: () => L.y * 18, scale: 0.34, rotation: `+=${L.r > 0 ? 160 : -160}`, duration: 1, ease: 'power2.in' }, 6.2)
        // …y explotan hacia fuera
        .to(p, {
          x: () => Math.cos(ang) * W() * 1.5,
          y: () => Math.sin(ang) * H() * 1.1,
          scale: 2 + L.z * 1.6,
          rotation: `+=${L.r * 12}`,
          duration: 1.1,
          ease: 'power2.out',
        }, 7.2)
        .to(p, { autoAlpha: 0, duration: 0.5 }, 7.75);
    });

    // flash crema bajo las pizzas que salen disparadas; el rojo se va detrás del flash
    tl.fromTo(flash, { autoAlpha: 0, scale: 0.2 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.in' }, 7.15)
      .set(bg, { autoAlpha: 0 }, 7.55)
    // 4 · del flash queda el logo, que se achica y viaja al encabezado
      .fromTo(logo, { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' }, 7.6)
      .to(logo, { x: () => target().x, y: () => target().y, scale: () => target().k, duration: 1.2, ease: 'power2.inOut' }, 8.5)
    // 5 · el flash se desvanece y deja el hero en reposo; el logo real toma el relevo
      .to(flash, { autoAlpha: 0, duration: 0.4 }, 9.6)
      .to(logo, { autoAlpha: 0, duration: 0.25 }, 9.75);

    const onSkip = () => track.scrollTo({ top: dist(), behavior: 'auto' });
    skip.addEventListener('click', onSkip);
    ScrollTrigger.refresh();
    return () => { skip.removeEventListener('click', onSkip); ag.classList.remove('hd-on'); stage.style.visibility = ''; };
  });

  return () => mm.revert();
}

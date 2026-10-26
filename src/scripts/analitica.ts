/**
 * Capa de eventos de conversión, independiente de la herramienta final
 * [HERRAMIENTA_ANALÍTICA POR CONFIRMAR]. Cada acción relevante despacha un
 * CustomEvent en `document` con el detalle del evento; cuando se confirme
 * la herramienta (GA4, Meta Pixel, etc.) basta con agregar un listener aquí
 * que reenvíe `detail` a esa herramienta — no hay que tocar los componentes.
 *
 * Eventos definidos:
 *  - agostina:pedir_click        { origen: string }  (nav, hero, producto, comuna, cierre...)
 *  - agostina:producto_click     { slug: string, nombre: string }
 *  - agostina:comuna_click       { comuna: string }
 *  - agostina:mapa_click         { origen: string }
 *  - agostina:newsletter_submit  { estado: 'ok' | 'error', mensaje?: string }
 */

export type AgostinaEventName =
  | "agostina:pedir_click"
  | "agostina:producto_click"
  | "agostina:comuna_click"
  | "agostina:mapa_click"
  | "agostina:newsletter_submit";

export function track(name: AgostinaEventName, detail: Record<string, unknown> = {}) {
  if (typeof document === "undefined") return;
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

/** Delega clic en cualquier elemento con data-track="evento" data-track-*="valor". */
export function initTrackingDelegado() {
  if (typeof document === "undefined") return;
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
    if (!el) return;
    const name = el.dataset.track as AgostinaEventName;
    if (!name) return;
    const detail: Record<string, string> = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key === "track" || value === undefined) continue;
      detail[key] = value;
    }
    track(name, detail);
  });
}

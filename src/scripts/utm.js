/**
 * Pasa los UTM y los click ids de la URL actual a los enlaces de pedido
 * (/pedir), para no perder la atribución de campañas y flyers.
 * Se llama en cada `astro:page-load`.
 */
const CLAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "ttclid", "gclid"];

export function reenviarUtm() {
  const q = new URLSearchParams(location.search);
  const presentes = CLAVES.filter((k) => q.get(k));
  if (!presentes.length) return;
  document.querySelectorAll('a[data-track="agostina:pedir_click"]').forEach((a) => {
    const u = new URL(a.href);
    presentes.forEach((k) => u.searchParams.set(k, q.get(k)));
    a.href = u.toString();
  });
}

document.addEventListener("astro:page-load", reenviarUtm);

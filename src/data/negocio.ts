/**
 * Fuente única de datos de negocio. Todo el sitio lee de aquí — para
 * actualizar dirección, redes, URL de pedidos, etc. se edita solo este
 * archivo. Los campos marcados "[POR CONFIRMAR]" no tienen respaldo
 * documental verificado; no publicar como hecho hasta confirmarlos.
 */

export const MARCA = {
  nombre: "Agostina Pizzas",
  descriptor: "Pizzería a la piedra premium, New York Style",
  fundacionAnio: 2013,
  // Confirmado por el cliente en la sesión de diagnóstico (2026-09-08).
  fundador: { nombre: "Pablo", rol: "Fundador" },
} as const;

export const LOCAL = {
  nombre: "Agostina Pizzas — Los Leones",
  direccion: {
    calle: "Los Leones 229, Local 5",
    comuna: "Providencia",
    ciudad: "Santiago",
    region: "Región Metropolitana",
    pais: "Chile",
    codigoPostal: "[POR CONFIRMAR]",
  },
  telefono: "[POR CONFIRMAR]",
  // Horario real pendiente de confirmación operativa. No se muestra un
  // horario inventado en el sitio: se marca explícitamente como pendiente.
  horario: "[POR CONFIRMAR]",
  coordenadas: {
    lat: null as number | null,
    lng: null as number | null,
  },
  estacionamiento: "[POR CONFIRMAR]",
  comoLlegarTransporte: "[POR CONFIRMAR]",
  // URL de Google Maps: usar el nombre + dirección hasta tener el Place ID real.
  mapaUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Agostina Pizzas, Los Leones 229, Local 5, Providencia, Santiago"),
} as const;

// Comunas priorizadas de delivery, tal como las define el encargo de marca.
// (El material heredado de hype.html/index.html/loco.html decía "Ñuñoa" en
// vez de "La Reina" — se corrige aquí siguiendo la instrucción vigente.)
export const COMUNAS_DELIVERY = ["Providencia", "Las Condes", "Vitacura", "La Reina"] as const;

/**
 * URL del sistema de pedidos externo (plataforma de food delivery vinculada
 * a agostinapizzas.cl). Se hereda de la implementación actual, presente de
 * forma consistente en hype.html/index.html/loco.html. El dominio final de
 * este sitio Astro todavía no reemplaza a agostinapizzas.cl (confirmado en
 * diagnóstico), así que esta URL sigue apuntando al dominio actual — no se
 * reconstruye el carrito ni el checkout.
 */
export const URL_PEDIDOS = "https://www.agostinapizzas.cl/pedir?categoria=pizzas";

export const REDES = {
  instagram: { label: "Instagram", url: "https://instagram.com/agostinapizzas", handle: "@agostinapizzas" },
  tiktok: { label: "TikTok", url: "https://www.tiktok.com/@agostinapizzas", handle: "@agostinapizzas" },
} as const;

/**
 * Endpoint del proveedor de email marketing para el formulario de novedades.
 * [PROVEEDOR DE EMAIL POR CONFIRMAR] — mientras no se configure, el formulario
 * se muestra pero no envía datos a ningún servicio externo (ver
 * src/components/FormNewsletter.astro).
 */
export const NEWSLETTER_ENDPOINT: string | null = null;

/**
 * Herramienta de analítica [POR CONFIRMAR]. Mientras tanto, los eventos de
 * conversión se despachan como CustomEvent del DOM (ver src/scripts/analytics.ts)
 * para que conectar Google Analytics / Meta Pixel / lo que se defina sea un
 * solo listener, sin tocar los componentes de UI.
 */
export const ANALYTICS_TOOL_CONFIRMADA = false;

export const SEO_DEFAULT = {
  titleSuffix: "Agostina Pizzas",
  descripcion:
    "Pizzería a la piedra premium, New York Style, desde 2013. Masa hecha a mano, horneada al momento, en Los Leones 229, Providencia. Delivery en Providencia, Las Condes, Vitacura y La Reina.",
  ogImage: "/assets/hero-pepperoni.jpg",
} as const;

/**
 * Oferta de slice (lanzamiento 27 oct 2026). Precios confirmados por Pablo.
 * Horario y WhatsApp quedan en null hasta tener el dato real: la landing no
 * muestra nada inventado (ver src/pages/slice/index.astro).
 */
export const SLICE = {
  precioSola: 4990,
  precioConBebida: 5990,
  horario: null as string | null,
  whatsapp: null as string | null, // solo dígitos con código de país, ej. "56912345678"
} as const;

/**
 * Marca hermana: sale de la misma cocina de Agostina (paninis de focaccia).
 * Aún sin redes ni fecha de lanzamiento confirmadas: `instagram` y `lanzamiento`
 * quedan en null y la web no los muestra. Cuando existan, la marca tendrá su
 * propia página.
 */
export const MAXIMO = {
  nombre: "Máximo Panini",
  instagram: null as string | null,
  lanzamiento: null as string | null,
} as const;

/** Interruptores de secciones de la home. */
export const HOME = {
  mostrarMomentos: true,
  mostrarMaximo: true,
} as const;

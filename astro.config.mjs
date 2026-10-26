import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// SITE_URL: dominio real [POR CONFIRMAR]. Mientras el sitio vive en un
// dominio/subdominio propio (no reemplaza aún a agostinapizzas.cl), se usa el
// hosting por defecto del proyecto Firebase declarado en .firebaserc.
// Actualizar aquí en cuanto el dominio final esté confirmado.
const SITE_URL = "https://agostina-web.web.app";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});

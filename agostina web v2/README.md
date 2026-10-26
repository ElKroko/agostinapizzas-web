# Agostina Pizzas — web v2

Rediseño de agostinapizzas.cl: home de **scroll horizontal** en desktop y **vertical** en mobile (≤760px), con stickers arrastrables, parallax y carrusel de pizzas recortadas. Portado desde la maqueta del canvas de diseño a HTML/CSS/JS vanilla, sin dependencias ni build.

## Correr local
```bash
cd "agostina web v2"
npx serve .        # o: python -m http.server 8080
```
Abrir con un servidor (no `file://`) para que carguen las fuentes.

## Estructura
- `index.html`: markup de las 8 secciones (Hero+Menú, Nosotros, FAQ, Los Leones 229, Slice, Momentos, Lovers, Esto es Agostina)
- `styles.css`: tokens del brandbook 2026 + layout desktop (unidades `vh`) + overrides mobile (`@media (max-width:760px)`)
- `main.js`: scroll con inercia, hover de carta → hero, mazo barajable, FAQ, stickers drag, progreso
- `assets/`: `life-*` = lifestyle IA del moodboard "Momentos de disfrute" (MASSTUDIO/AGOSTINA/PIEZAS/_assets); `pull-*` = cheese pulls IA; `local-interior` = render IA del local (marcado en la web como referencia, reemplazar por foto real); `cut-*` = pizzas sin fondo (recorte automático, revisar bordes antes de producción); `ph-*` = fotos; logos rasterizados desde los SVG oficiales
- `fonts/`: Bebas Neue, Montserrat, Yellowtail (self-hosted; Yellowtail es el reemplazo de Nefelibata que indica el brandbook)

## Ajustes rápidos (`main.js` → `CFG`)
- `lerp`: suavidad del scroll (0.04 muy suave – 0.3 seco)
- `wheelMult`: cuánto avanza cada tick de rueda
- `mobileBp`: breakpoint mobile (sincronizar con el `@media` de `styles.css`)

## Pendientes
- Fotos: fachada Los Leones 229 e interior real (hoy render IA). Las imágenes `life-*` y `pull-*` son IA: validar con Pablo antes de publicar (Brandbook IA §11: en piezas de venta la pizza debe ser real)
- Horario real (`[HORARIO POR CONFIRMAR]`)
- Links "Ver carta completa" y "Leer el blog" apuntan a `#`
- Confirmar con el cliente los "tres conceptos" de la última sección
- Para integrarlo al proyecto Astro: cada sección es un `<section class="pan">` autocontenido → candidato directo a componente

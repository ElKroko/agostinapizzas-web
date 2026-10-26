# Lista de tomas pendientes — Agostina Pizzas

Fotografía real ya cubierta: Giulianna y las 22 pizzas Lovers restantes, más 3 picoteos, están resueltas con material de `assets/fotos-reales/` (ver `public/assets/pizzas/`). Lo que falta abajo es material que **no existe** en el repositorio y hoy se muestra como placeholder visible ("Foto pendiente") en vez de una foto de stock.

Para cada toma: nombre de archivo esperado, proporción, uso, descripción, luz, encuadre y protagonista.

## Prioridad alta

### 1. `giulianna-macro.jpg`
- **Proporción:** 4:5 (vertical) y 16:9 (horizontal)
- **Uso:** Hero de home (versión alternativa) y spotlight de producto
- **Descripción:** Giulianna en primerísimo primer plano, corte recién hecho, pepperoni crujiente visible
- **Luz:** Cálida, lateral, que resalte la grasa del pepperoni y el gratinado del borde
- **Encuadre:** Muy cerrado, 2/3 de la porción ocupando el cuadro
- **Protagonista:** Triple pepperoni y borde de masa

### 2. `queso-textura.jpg`
- **Proporción:** 1:1
- **Uso:** Sección "Diferencial de producto" en home, tarjetas de ingredientes
- **Descripción:** Hilo de queso estirándose al levantar una porción
- **Luz:** Cálida, cenital suave
- **Encuadre:** Extremo close-up, sin contexto de mesa
- **Protagonista:** Mozzarella derretida

### 3. `pizza-cortada.jpg`
- **Proporción:** 4:3
- **Uso:** Página `/nosotros/`, sección "El producto siempre es protagonista"
- **Descripción:** Pizza siendo cortada o una porción siendo doblada estilo NY
- **Luz:** Cálida, desde atrás/lateral para silueta del vapor
- **Encuadre:** Medio, manos visibles pero no como protagonista
- **Protagonista:** El corte / el doblez

### 4. `masa-manos.jpg`
- **Proporción:** 4:3 y 1:1
- **Uso:** Home sección "Historia", `/nosotros/`
- **Descripción:** Manos trabajando la masa a la piedra, estirándola
- **Luz:** Cálida, ambiente de cocina real (no estudio)
- **Encuadre:** Medio-cerrado, manos y masa en foco
- **Protagonista:** La masa, el gesto artesanal

### 5. `horno-salida.jpg`
- **Proporción:** 16:9
- **Uso:** Home sección "Diferencial", `/nosotros/`
- **Descripción:** Pizza saliendo del horno a la piedra, con la pala
- **Luz:** Cálida, contraste con el resplandor del horno
- **Encuadre:** Medio, horno + pizza + pala visibles
- **Protagonista:** El momento de salida del horno

## Prioridad media

### 6. `caja-delivery.jpg`
- **Proporción:** 1:1 y 4:5
- **Uso:** `/delivery/`
- **Descripción:** Caja de delivery Agostina cerrada y/o recién abierta con la pizza dentro
- **Luz:** Cálida, ambiente doméstico
- **Encuadre:** Medio, caja centrada
- **Protagonista:** El empaque de marca

### 7. `porcion-comiendo.jpg`
- **Proporción:** 4:5
- **Uso:** Home cierre de conversión (alternativa al hero actual)
- **Descripción:** Persona comiendo una porción doblada estilo NY (sin mostrar rostro si no hay autorización de imagen)
- **Luz:** Cálida, natural
- **Encuadre:** Medio-cerrado, manos y porción en primer plano
- **Protagonista:** El gesto de comer, la porción

### 8. `fachada-losleones.jpg`
- **Proporción:** 4:3 y 9:16
- **Uso:** `/como-llegar/`
- **Descripción:** Fachada del local en Los Leones 229, Providencia, de día
- **Luz:** Natural, día despejado
- **Encuadre:** General, letrero/insignia visible
- **Protagonista:** La fachada y el letrero de marca

### 9. `interior-equipo.jpg`
- **Proporción:** 16:9
- **Uso:** `/nosotros/`, `/como-llegar/`
- **Descripción:** Interior del local o equipo trabajando en el horno
- **Luz:** Ambiente real del local
- **Encuadre:** General
- **Protagonista:** El espacio o el equipo, sin posar forzado

## Prioridad baja — catálogo Basics

Las 5 recetas de Agostina Basics (Doble Pepperoni, Jamón Aceitunas Verdes, Pollo Capresse, Salame Tomate Beef, Choclo Palmitos) no tienen foto en `assets/fotos-reales/` y hoy se muestran con el estado "Foto pendiente" en `/pizzas/`.

- **Proporción:** 900×720 (5:4), consistente con el resto del catálogo
- **Uso:** Tarjetas de catálogo en `/pizzas/`
- **Luz:** Cálida, igual criterio que las fotos Lovers ya existentes
- **Encuadre:** Vista 3/4 desde arriba, pizza completa o corte, mismo estilo que `public/assets/pizzas/*.jpg`
- **Protagonista:** El ingrediente distintivo de cada receta (doble pepperoni, jamón/aceitunas, pollo/tomate, salame/tomate, choclo/palmitos)

## Notas de producción

- No deformar pizzas ni ingredientes; no usar fotografía de stock genérica en ningún caso.
- Formato de entrega: JPEG optimizado ≤120KB por imagen de catálogo, ≤250KB para imágenes hero.
- Nombrar los archivos exactamente como se indica arriba y ubicarlos en `public/assets/` (catálogo en `public/assets/pizzas/`) para que los componentes existentes los recojan sin cambios de código.

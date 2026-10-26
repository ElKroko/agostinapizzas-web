/**
 * Catálogo editorial de Agostina Pizzas. Recetas y nombres verificados desde
 * el documento de contexto de marca (2026-08-08). Los precios no están
 * documentados como vigentes — no se muestran precios en el sitio; el precio
 * real se ve en el sistema de pedidos (URL_PEDIDOS).
 *
 * Todas las pizzas existen en tamaño Mediana y Familiar con la misma receta;
 * el tamaño se elige en el sistema de pedidos, no aquí.
 */

export type Pizza = {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
  heroe?: boolean;
};

export const PIZZA_HEROE_SLUG = "giulianna";

export const PIZZAS_BASICS: Pizza[] = [
  {
    slug: "doble-pepperoni",
    nombre: "Doble Pepperoni",
    descripcion: "Base pomodoro, mozzarella y doble pepperoni.",
  },
  {
    slug: "jamon-aceitunas-verdes",
    nombre: "Jamón Aceitunas Verdes",
    descripcion: "Base pomodoro, mozzarella, jamón pierna y aceitunas verdes.",
  },
  {
    slug: "pollo-capresse",
    nombre: "Pollo Capresse",
    descripcion: "Base pomodoro, mozzarella, pollo, tomate beef y albahaca.",
  },
  {
    slug: "salame-tomate-beef",
    nombre: "Salame Tomate Beef",
    descripcion: "Base pomodoro, mozzarella, salame italiano y tomate beef.",
  },
  {
    slug: "choclo-palmitos",
    nombre: "Choclo Palmitos",
    descripcion: "Base pomodoro, mozzarella, choclo y palmitos.",
  },
];

export const PIZZAS_LOVERS: Pizza[] = [
  {
    slug: "agostina",
    nombre: "Agostina",
    descripcion: "Base pomodoro, mozzarella, queso de cabra, chorizo español y aceitunas verdes.",
    imagen: "/assets/pizzas/agostina.jpg",
  },
  {
    slug: "alessia",
    nombre: "Alessia",
    descripcion: "Base pomodoro, mozzarella, jamón pierna, aceitunas negras y tomate beef.",
    imagen: "/assets/pizzas/alessia.jpg",
  },
  {
    slug: "amelia",
    nombre: "Amelia",
    descripcion: "Base pomodoro, mozzarella, pollo, salsa mostaza miel, champiñones y pesto de albahaca.",
    imagen: "/assets/pizzas/amelia.jpg",
  },
  {
    slug: "bianca",
    nombre: "Bianca",
    descripcion: "Base pomodoro, mozzarella, queso parmesano, queso ahumado y queso roquefort.",
    imagen: "/assets/pizzas/bianca.jpg",
  },
  {
    slug: "cate",
    nombre: "Cate",
    descripcion: "Base pomodoro, mozzarella, carne mechada, pimentón rojo y cebolla caramelizada.",
    imagen: "/assets/pizzas/cate.jpg",
  },
  {
    slug: "constanza",
    nombre: "Constanza",
    descripcion: "Base pomodoro, mozzarella, salame, aceitunas negras, champiñón y jamón.",
    imagen: "/assets/pizzas/constanza.jpg",
  },
  {
    slug: "delfina",
    nombre: "Delfina",
    descripcion: "Base pomodoro, mozzarella y camarón salteado con toque de ajo, ciboulette y alcaparras aparte.",
    imagen: "/assets/pizzas/delfina.jpg",
  },
  {
    slug: "fabiola",
    nombre: "Fabiola",
    descripcion: "Base pomodoro, mozzarella, tomate, palmitos, choclo y aceitunas negras.",
    imagen: "/assets/pizzas/fabiola.jpg",
  },
  {
    slug: "gertrudis",
    nombre: "Gertrudis",
    descripcion: "Base pomodoro, mozzarella, tocino asado, pollo, pepperoni y choclo.",
    imagen: "/assets/pizzas/gertrudis.jpg",
  },
  {
    slug: "giannina",
    nombre: "Giannina",
    descripcion: "Base pomodoro, mozzarella, alcaparras, pimentón rojo, champiñones y fondos de alcachofa.",
    imagen: "/assets/pizzas/giannina.jpg",
  },
  {
    slug: "giovanna",
    nombre: "Giovanna",
    descripcion: "Base pomodoro, mozzarella, pollo, carne mechada, cebollín y salsa de ostras.",
    imagen: "/assets/pizzas/giovanna.jpg",
  },
  {
    slug: "giulianna",
    nombre: "Giulianna",
    descripcion: "Base pomodoro, mozzarella y triple pepperoni.",
    imagen: "/assets/pizzas/giulianna.jpg",
    heroe: true,
  },
  {
    slug: "isabella",
    nombre: "Isabella",
    descripcion: "Base pomodoro, mozzarella, camarón salteado con ajo, pollo, queso crema, ciboulette y pesto de albahaca.",
    imagen: "/assets/pizzas/isabella.jpg",
  },
  {
    slug: "jacinta",
    nombre: "Jacinta",
    descripcion: "Base pomodoro, mozzarella, salame, pimentón rojo y champiñón.",
    imagen: "/assets/pizzas/jacinta.jpg",
  },
  {
    slug: "julieta",
    nombre: "Julieta",
    descripcion: "Base pomodoro, mozzarella, zapallitos italianos, berenjenas y pimentones asados con toques de roquefort.",
    imagen: "/assets/pizzas/julieta.jpg",
  },
  {
    slug: "lorenza",
    nombre: "Lorenza",
    descripcion: "Base pomodoro, mozzarella, queso de cabra, tomates cocktail asados y pesto de albahaca.",
    imagen: "/assets/pizzas/lorenza.jpg",
  },
  {
    slug: "lucia",
    nombre: "Lucía",
    descripcion: "Base pomodoro, mozzarella, jamón pierna y piña.",
    imagen: "/assets/pizzas/lucia.jpg",
  },
  {
    slug: "luciana",
    nombre: "Luciana",
    descripcion: "Base pomodoro, mozzarella, jamón de pierna, pimentón caramelizado, aceitunas negras y rúcula.",
    imagen: "/assets/pizzas/luciana.jpg",
  },
  {
    slug: "margarita",
    nombre: "Margarita",
    descripcion: "Pomodoro, mozzarella, tomate y albahaca.",
    imagen: "/assets/pizzas/margarita.jpg",
  },
  {
    slug: "martina",
    nombre: "Martina",
    descripcion: "Base pomodoro, mozzarella, carne mechada, cebolla morada, tomate cocktail, cilantro y salsa de ostras.",
    imagen: "/assets/pizzas/martina.jpg",
  },
  {
    slug: "maria",
    nombre: "María",
    descripcion: "Base pomodoro, mozzarella, carne mechada, cebolla caramelizada y merquén aparte.",
    imagen: "/assets/pizzas/maria.jpg",
  },
  {
    slug: "rossa",
    nombre: "Rossa",
    descripcion: "Base pomodoro, crema, mozzarella, fondos de alcachofa, palmitos y pesto de albahaca.",
    imagen: "/assets/pizzas/rossa.jpg",
  },
  {
    slug: "sofia",
    nombre: "Sofía",
    descripcion: "Base pomodoro, mozzarella, jamón serrano, rúcula y toque de parmesano.",
    imagen: "/assets/pizzas/sofia.jpg",
  },
];

export type Picoteo = {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen?: string;
};

export const PICOTEOS: Picoteo[] = [
  {
    slug: "agostina-rolls",
    nombre: "Agostina Rolls",
    descripcion: "Rolls de masa con mantequilla de ajo, mozzarella, parmesano y roquefort. 4 unidades.",
    imagen: "/assets/pizzas/agostina-rolls.jpg",
  },
  {
    slug: "bastones-ajo-parmesano",
    nombre: "Bastones de Ajo Parmesano",
    descripcion: "Bastones de masa fresca con mantequilla de ajo, mozzarella, parmesano y pesto de albahaca. 5 unidades.",
    imagen: "/assets/pizzas/bastones-ajo-parmesano.jpg",
  },
  {
    slug: "bruschetta-gratin-roquefort",
    nombre: "Bruschetta Gratín Roquefort",
    descripcion: "Pan masa madre tostado con mantequilla de ajo, gratinado con mozzarella y roquefort. 2 unidades.",
    imagen: "/assets/pizzas/bruschetta-gratin.jpg",
  },
];

export const EMPANADAS: Picoteo[] = [
  { slug: "empanada-camaron-queso", nombre: "Empanada Camarón & Queso", descripcion: "Camarón, mozzarella y toque de ajo y ciboulette." },
  { slug: "empanada-champinon-roquefort", nombre: "Empanada Champiñón & Roquefort", descripcion: "Cebolla caramelizada, champiñón asado, mozzarella y roquefort." },
  { slug: "empanada-pino-premium", nombre: "Empanada de Pino Premium", descripcion: "Pino de carne picada, aceitunas negras y huevo." },
  { slug: "empanada-verduras-asadas", nombre: "Empanada de Verduras Asadas", descripcion: "Zapallito italiano, berenjenas, pimentones asados, queso de cabra, mozzarella y cilantro." },
  { slug: "empanada-napolitana", nombre: "Empanada Napolitana", descripcion: "Mozzarella, tomate, jamón, aceitunas y orégano." },
  { slug: "empanada-pollo-capresse", nombre: "Empanada Pollo Capresse", descripcion: "Pollo, mozzarella, tomate y albahaca." },
];

export const POSTRES: Picoteo[] = [
  { slug: "cinnamon-rolls", nombre: "Cinnamon Rolls", descripcion: "Rollos de canela bañados en frosting. 2 unidades." },
];

export function buscarPizza(slug: string): Pizza | undefined {
  return [...PIZZAS_BASICS, ...PIZZAS_LOVERS].find((p) => p.slug === slug);
}

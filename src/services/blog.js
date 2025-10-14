
export const POSTS = [
    {
        id: 1,
        slug: "novedades-septiembre-ps5",
        title: "Novedades de septiembre en PS5",
        excerpt: "Repasamos los lanzamientos y actualizaciones más potentes del mes para PlayStation 5.",
        content: `
## Lo más destacado
- Parche 4K/60 en varios títulos.
- Nuevos accesorios de alto rendimiento.
- Ofertas relámpago en la PS Store.

### Tips rápidos
Ajusta el Modo Rendimiento para shooters competitivos.
    `.trim(),
        date: "2025-09-20",
        author: "Equipo LevelUp",
        category: "Consolas",
        tags: ["PS5", "Lanzamientos", "Ofertas"],
        cover: "/images/blog/novedades-septiembre-ps5.jpg"
    },
    {
        id: 2,
        slug: "setup-gamer-rtx-4070",
        title: "Arma tu setup gamer con RTX 4070",
        excerpt: "Guía 80/20 para elegir CPU, monitor y gabinete que no hagan cuello de botella a tu GPU.",
        content: `
## Checklist esencial
- CPU con buen single-core.
- Monitor 144Hz o 165Hz según género.
- Fuente certificada + margen del 20%.

> Pro tip: prioriza airflow antes que RGB.
    `.trim(),
        date: "2025-08-31",
        author: "Seba",
        category: "PC Gamer",
        tags: ["RTX 4070", "Monitores", "Periféricos"],
        cover: "/images/blog/setup-gamer-rtx-4070.jpg"
    },
    {
        id: 3,
        slug: "top-mouses-2025",
        title: "Top mouses 2025 para FPS",
        excerpt: "Probamos 6 modelos populares. Precisión, peso y switches: lo que realmente importa.",
        content: `
## Ganadores por categoría
- Mejor peso-pluma: Model O-
- Mejor sensor: HERO 25K
- Mejor calidad/precio: Viper Mini

### Por qué del por qué
Menos peso = menos fatiga y microajustes más finos.
    `.trim(),
        date: "2025-07-10",
        author: "Equipo LevelUp",
        category: "Periféricos",
        tags: ["Mouse", "FPS", "eSports"],
        cover: "/images/blog/top-mouses-2025.jpg"
    }
];


export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });

export const readingTime = (text) => {
    const words = (text || "").replace(/[#>*`]/g, "").split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min de lectura`;
};

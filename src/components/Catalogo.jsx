import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { formatCLP } from "../services/currency";
import { PRODUCTS } from "../services/products";
import { CartCtx } from "../context/cartCtx";



const CATEGORY_LABELS = {
    "juegos-mesa": "Juegos de Mesa",
    accesorios: "Accesorios",
    consolas: "Consolas",
    computadores: "Computadores",
    sillas: "Sillas Gamers",
};

const CATEGORY_ORDER = [
    "juegos-mesa",
    "accesorios",
    "consolas",
    "computadores",
    "sillas",
];

function getImageSrc(code, ext = "jpg") {
    return `/images/products/${code}.${ext}`;
}

function QuantityInput({ value, onChange, min = 1, max = 10 }) {
    return (
        <div className="input-group" style={{ maxWidth: 140 }}>
            <span className="input-group-text">Cant.</span>
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange?.(Number(e.target.value) || min)}
                className="form-control"
            />
        </div>
    );
}

function ProductCard({ product, onAdd }) {

    const [qty, setQty] = useState(1);

    const handleAdd = () => {
        if (typeof onAdd === "function") onAdd(product.code, qty);
    };

    const priceLabel = formatCLP(product.price);

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div className="card bg-black text-light h-100 border border-2 border-dark">
                <img
                    src={getImageSrc(product.code)}
                    alt={product.alt || product.name}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: 200 }}
                    onError={(e) => {
                        const src = e.currentTarget.getAttribute("src");
                        if (src && src.endsWith(".jpg")) {
                            e.currentTarget.src = src.replace(".jpg", ".png");
                        }
                    }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{product.name}</h5>
                    <small className="text-secondary mb-2">
                        {CATEGORY_LABELS[product.category]} — {product.code}
                    </small>
                    <p className="text-warning fs-5 fw-bold mb-2">{priceLabel}</p>
                    <p className="text-secondary small mb-3">{product.desc}</p>

                    <div className="d-flex align-items-center gap-2 mt-auto">
                        <QuantityInput value={qty} onChange={setQty} max={product.max ?? 10} />
                        <button className="btn btn-warning flex-fill fw-semibold" onClick={handleAdd}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryFilterBar({ active, onChange }) {
    return (
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            <button
                className={`btn ${active === "all" ? "btn-warning" : "btn-outline-warning"}`}
                onClick={() => onChange("all")}
            >
                Todos
            </button>
            {CATEGORY_ORDER.map((key) => (
                <button
                    key={key}
                    className={`btn ${active === key ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => onChange(key)}
                >
                    {CATEGORY_LABELS[key]}
                </button>
            ))}
        </div>
    );
}

export default function Catalogo() {
    const { add } = useContext(CartCtx);

    const onAddToCart = (code, qty) => {
        add(code, qty);


    };

    const [params, setParams] = useSearchParams();
    const initial = params.get("category") || "all";
    const [activeCategory, setActiveCategory] = useState(initial);

    const handleFilterChange = (key) => {
        setActiveCategory(key);
        const next = new URLSearchParams(params);
        if (key === "all") next.delete("category");
        else next.set("category", key);
        setParams(next, { replace: true });
    };

    const filtered = useMemo(() => {
        if (activeCategory === "all") return PRODUCTS;
        return PRODUCTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const handleAdd = (code, qty) => {
        if (typeof onAddToCart === "function") onAddToCart(code, qty);
    };

    return (
        <section id="catalogo" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="catalogo-h">
            <div className="container">
                <h2 id="catalogo-h" className="display-6 text-center text-warning fw-bold mb-3">
                    Catálogo destacado
                </h2>
                <p className="text-center text-secondary mb-4">
                    Explora nuestros productos o filtra por categoría.
                </p>

                <CategoryFilterBar active={activeCategory} onChange={handleFilterChange} />

                <div className="row g-3" role="list">
                    {filtered.map((p) => (
                        <ProductCard key={p.code} product={p} onAdd={handleAdd} />
                    ))}
                </div>
            </div>
        </section>
    );
}

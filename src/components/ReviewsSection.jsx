import { useEffect, useMemo, useState } from "react";


const fmtDate = (d = new Date()) =>
    new Date(d).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" });

// Componente de estrellas (1..5)
function StarRating({ value, onChange }) {
    const [hover, setHover] = useState(0);
    const active = hover || value;
    return (
        <div className="d-flex gap-1 fs-3" role="radiogroup" aria-label="Calificación">
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    key={n}
                    type="button"
                    className="btn p-0 border-0 bg-transparent"
                    aria-checked={value === n}
                    role="radio"
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => onChange(n)}
                    title={`${n} estrella${n > 1 ? "s" : ""}`}
                    style={{ lineHeight: 1 }}
                >
                    <span style={{ color: n <= active ? "#ffd700" : "#666" }}>★</span>
                </button>
            ))}
        </div>
    );
}


export default function ReviewsSection({ products = [] }) {
    const [form, setForm] = useState({
        producto: "",
        comentario: "",
        rating: 0,
    });
    const [touched, setTouched] = useState({});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [reviews, setReviews] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("levelup-reviews") || "[]");
        } catch {
            return [];
        }
    });


    const productOptions = useMemo(() => {
        if (products.length) return products;
        return [
            { code: "JM002", name: "Carcassonne" },
            { code: "AC002", name: "Auriculares HyperX Cloud II" },
            { code: "CO001", name: "PlayStation 5" },
            { code: "CG001", name: "PC ASUS ROG Strix" },
            { code: "SG001", name: "Silla Secretlab Titan" },
            { code: "MS001", name: "Mouse Logitech G502" },
        ];
    }, [products]);

    // Reglas de validación
    const errors = {
        producto: !form.producto ? "Selecciona un producto" : null,
        comentario:
            !form.comentario ? "Escribe tu reseña" :
                form.comentario.length < 10 ? "Mínimo 10 caracteres" :
                    form.comentario.length > 500 ? "Máximo 500 caracteres" : null,
        rating: form.rating < 1 ? "Selecciona una calificación" : null,
    };
    const isValid = Object.values(errors).every(e => e === null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(s => ({ ...s, [name]: value }));
    };
    const handleBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ producto: true, comentario: true, rating: true });
        if (!isValid) return;

        setSaving(true);
        try {
            // simular POST
            await new Promise(r => setTimeout(r, 600));
            const entry = {
                id: crypto.randomUUID(),
                productCode: form.producto,
                productName: productOptions.find(p => p.code === form.producto)?.name || form.producto,
                comment: form.comentario.trim(),
                rating: form.rating,
                createdAt: new Date().toISOString(),
            };
            const next = [entry, ...reviews];
            setReviews(next);
            localStorage.setItem("levelup-reviews", JSON.stringify(next));
            setForm({ producto: "", comentario: "", rating: 0 });
            setTouched({});
            setSuccess(true);
        } finally {
            setSaving(false);
        }
    };

    // Limpiar aviso de éxito
    useEffect(() => {
        if (!success) return;
        const id = setTimeout(() => setSuccess(false), 2500);
        return () => clearTimeout(id);
    }, [success]);

    // Promedio por producto (opcional visual)
    const avgByProduct = useMemo(() => {
        const acc = {};
        for (const r of reviews) {
            acc[r.productCode] ??= { sum: 0, count: 0 };
            acc[r.productCode].sum += r.rating;
            acc[r.productCode].count += 1;
        }
        const out = {};
        for (const code in acc) {
            out[code] = (acc[code].sum / acc[code].count).toFixed(1);
        }
        return out;
    }, [reviews]);

    return (
        <section id="reseñas" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="reseñas-h">
            <div className="container">
                <h2 id="reseñas-h" className="display-6 text-center text-warning fw-bold mb-4">Reseñas de clientes</h2>

                {/* Formulario */}
                <form className="bg-black border border-warning rounded-3 p-4 mb-4" onSubmit={handleSubmit} noValidate>
                    {success && (
                        <div className="alert alert-success" role="alert">¡Reseña enviada exitosamente!</div>
                    )}

                    <div className="row g-3">
                        {/* Producto */}
                        <div className="col-md-6">
                            <label className="form-label">Producto (código)</label>
                            <select
                                name="producto"
                                className={`form-select ${touched.producto && errors.producto ? "is-invalid" : ""}`}
                                value={form.producto}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            >
                                <option value="">Seleccione un producto</option>
                                {productOptions.map(p => (
                                    <option key={p.code} value={p.code}>
                                        {p.name} — {p.code}{avgByProduct[p.code] ? ` (★${avgByProduct[p.code]})` : ""}
                                    </option>
                                ))}
                            </select>
                            {touched.producto && errors.producto && <div className="invalid-feedback">{errors.producto}</div>}
                        </div>

                        {/* Rating */}
                        <div className="col-md-6">
                            <label className="form-label">Calificación</label>
                            <div className={`${touched.rating && errors.rating ? "border border-danger rounded-2 p-1" : ""}`}>
                                <StarRating value={form.rating} onChange={(n) => setForm(s => ({ ...s, rating: n }))} />
                            </div>
                            {touched.rating && errors.rating && <div className="text-danger small mt-1">{errors.rating}</div>}
                        </div>

                        {/* Comentario */}
                        <div className="col-12">
                            <label className="form-label">Tu reseña</label>
                            <textarea
                                name="comentario"
                                rows={4}
                                className={`form-control ${touched.comentario && errors.comentario ? "is-invalid" : ""}`}
                                value={form.comentario}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                maxLength={500}
                            />
                            <div className="d-flex justify-content-between">
                                <div className="form-text">Entre 10 y 500 caracteres.</div>
                                <div className="small fw-semibold text-warning">{form.comentario.length}/500</div>
                            </div>
                            {touched.comentario && errors.comentario && <div className="invalid-feedback">{errors.comentario}</div>}
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-warning fw-semibold" disabled={saving}>
                                {saving ? "Enviando..." : "Enviar reseña"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Listado */}
                <div className="bg-black border border-secondary rounded-3 p-3">
                    {reviews.length === 0 ? (
                        <div className="text-center text-secondary py-5">
                            Aún no hay reseñas. ¡Sé el primero en opinar!
                        </div>
                    ) : (
                        <ul className="list-unstyled m-0">
                            {reviews.map(r => (
                                <li key={r.id} className="mb-3 pb-3 border-bottom border-secondary-subtle">
                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                        <h5 className="m-0">
                                            {"★".repeat(r.rating)}
                                            <span className="text-secondary">{"★".repeat(5 - r.rating)}</span>
                                            {" "}
                                            <span className="text-warning">{r.productName}</span>
                                            <small className="text-secondary"> — {r.productCode}</small>
                                        </h5>
                                        <small className="text-secondary">{fmtDate(r.createdAt)}</small>
                                    </div>
                                    <p className="mt-2 mb-1">{r.comment}</p>
                                    <small className="text-success">Usuario verificado</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}

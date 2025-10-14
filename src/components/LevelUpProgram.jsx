// src/components/LevelUpProgram.jsx
import { useEffect, useMemo, useState } from "react";


const MOCK_POINTS = {
    "angel@duoc.cl": 1250,
    "gamer@example.com": 380,
};

// 🔹 Definición de niveles
const TIERS = [
    { id: "bronze", name: "Bronce", from: 0, to: 499, perks: ["5% dcto. selecto"] },
    { id: "silver", name: "Plata", from: 500, to: 1499, perks: ["10% dcto.", "Acceso anticipado a ofertas"] },
    { id: "gold", name: "Oro", from: 1500, to: 2999, perks: ["15% dcto.", "Despacho preferente"] },
    { id: "elite", name: "Élite", from: 3000, to: Infinity, perks: ["20% dcto.", "Soporte VIP"] },
];

// 🔹 Regla de puntos (ejemplo)
const RULES = [
    { label: "Compra", value: "1 punto por $1.000 CLP" },
    { label: "Referido validado", value: "+250 puntos" },
];

function getTier(points) {
    return TIERS.find(t => points >= t.from && points <= t.to) || TIERS[TIERS.length - 1];
}

function progressToNext(points) {
    const tier = getTier(points);
    const next = TIERS[TIERS.indexOf(tier) + 1];
    if (!next) return { pct: 100, nextNeeded: 0, nextName: tier.name };
    const range = next.from - tier.from;
    const current = points - tier.from;
    const pct = Math.max(0, Math.min(100, Math.round((current / range) * 100)));
    const nextNeeded = Math.max(0, next.from - points);
    return { pct, nextNeeded, nextName: next.name };
}

export default function LevelUpProgram() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState(null);
    const [error, setError] = useState("");

    // Prefill con usuario logueado (localStorage)
    useEffect(() => {
        const raw = localStorage.getItem("levelup-user");
        if (raw) {
            try {
                const u = JSON.parse(raw);
                if (u?.email) setEmail(u.email);
            } catch { }
        }
    }, []);

    const tier = useMemo(() => (points == null ? null : getTier(points)), [points]);
    const prog = useMemo(() => (points == null ? null : progressToNext(points)), [points]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Ingresa un correo válido");
            return;
        }
        setLoading(true);
        try {
            // Simula request
            await new Promise(r => setTimeout(r, 700));
            const found = MOCK_POINTS[email.toLowerCase()] ?? 0; // si no existe, 0 puntos
            setPoints(found);
        } finally {
            setLoading(false);
        }
    };

    const canRedeem = points != null && points >= 500;

    return (
        <section id="programa" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="programa-h">
            <div className="container">
                <h2 id="programa-h" className="display-6 text-center text-warning fw-bold mb-4">
                    Programa LevelUp
                </h2>
                <p className="text-center text-secondary mb-4">
                    Gana puntos por compras y referidos. Sube de nivel y desbloquea beneficios exclusivos.
                </p>

                {/* Features / reglas rápidas */}
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <div className="card bg-black border border-warning h-100">
                            <div className="card-body">
                                <h5 className="card-title text-warning">¿Cómo gano puntos?</h5>
                                <ul className="list-unstyled m-0 mt-2">
                                    {RULES.map((r, i) => (
                                        <li key={i} className="d-flex justify-content-between border-bottom border-secondary-subtle py-2">
                                            <span>{r.label}</span><span className="text-warning fw-semibold">{r.value}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card bg-black border border-secondary h-100">
                            <div className="card-body">
                                <h5 className="card-title">Niveles y beneficios</h5>
                                <div className="table-responsive">
                                    <table className="table table-dark table-sm align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Nivel</th>
                                                <th>Rango</th>
                                                <th>Beneficios</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TIERS.map(t => (
                                                <tr key={t.id}>
                                                    <td><span className="badge text-bg-warning">{t.name}</span></td>
                                                    <td>{t.to === Infinity ? `${t.from}+` : `${t.from}–${t.to}`} pts</td>
                                                    <td>
                                                        <ul className="m-0 ps-3">
                                                            {t.perks.map((p, i) => <li key={i}>{p}</li>)}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consulta de puntos */}
                <form className="bg-black border border-warning rounded-3 p-4 mb-4" onSubmit={onSubmit} noValidate>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-8">
                            <label className="form-label">Usuario (email)</label>
                            <input
                                type="email"
                                className={`form-control ${error ? "is-invalid" : ""}`}
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tucorreo@dominio.cl"
                                required
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-warning w-100 fw-semibold" disabled={loading}>
                                {loading ? "Buscando..." : "Ver puntos"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Resultado */}
                {points != null && (
                    <div className="card bg-black border border-secondary">
                        <div className="card-body">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                                <div>
                                    <h5 className="m-0">Puntos de <span className="text-warning">{email}</span></h5>
                                    <div className="display-6 fw-bold text-warning mt-1">{points} pts</div>
                                </div>

                                <div className="flex-grow-1 w-100">
                                    <div className="small text-secondary mb-1">
                                        Nivel actual: <span className="text-light fw-semibold">{tier?.name}</span>
                                        {prog && tier && (
                                            <> — Próximo: <span className="text-light fw-semibold">{prog.nextName}</span> ({prog.nextNeeded} pts)</>
                                        )}
                                    </div>
                                    <div className="progress" role="progressbar" aria-valuenow={prog?.pct || 0} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-warning" style={{ width: `${prog?.pct || 0}%` }} />
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

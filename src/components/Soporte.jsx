
import { useEffect, useMemo, useState } from "react";

const initial = {
    nombre: "",
    correo: "",
    tipo: "",
    mensaje: "",
};

const tipos = [
    { value: "tecnico", label: "Soporte técnico" },
    { value: "producto", label: "Consulta de producto" },
    { value: "envio", label: "Información de envío" },
    { value: "devolucion", label: "Devolución/Cambio" },
    { value: "otro", label: "Otro" },
];

function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Soporte() {
    const [data, setData] = useState(initial);
    const [touched, setTouched] = useState({});
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const raw = localStorage.getItem("levelup-user");
        if (!raw) return;
        try {
            const u = JSON.parse(raw);
            setData((s) => ({
                ...s,
                nombre: u?.nombre ?? s.nombre,
                correo: u?.email ?? s.correo,
            }));
        } catch { }
    }, []);

    // Validación
    const errors = {
        nombre: !data.nombre.trim() ? "Ingresa tu nombre" : null,
        correo: !isEmail(data.correo) ? "Ingresa un correo válido" : null,
        tipo: !data.tipo ? "Selecciona un tipo de consulta" : null,
        mensaje:
            !data.mensaje.trim()
                ? "Cuéntanos tu caso"
                : data.mensaje.trim().length < 10
                    ? "Mínimo 10 caracteres"
                    : null,
    };
    const isValid = useMemo(() => Object.values(errors).every((e) => e === null), [errors]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((s) => ({ ...s, [name]: value }));
    };
    const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setTouched({ nombre: true, correo: true, tipo: true, mensaje: true });
        if (!isValid) return;

        setSending(true);
        try {
            // 👇 aquí iría tu request real: fetch('/soporte', { method:'POST', body: JSON.stringify(data) })
            await new Promise((r) => setTimeout(r, 900)); // simulación
            setSuccess(true);
            setData((s) => ({ ...initial, correo: s.correo, nombre: s.nombre })); // deja nombre/correo prellenados
            setTouched({});
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        if (!success) return;
        const id = setTimeout(() => setSuccess(false), 3500);
        return () => clearTimeout(id);
    }, [success]);


    const whatsappHref = useMemo(() => {
        const base = "https://wa.me/569XXXXXXXX";
        const texto = `Hola, necesito ayuda con: ${data.tipo || "(sin especificar)"}.\n\nMensaje: ${data.mensaje || ""}\n\nAtte: ${data.nombre || ""} (${data.correo || ""})`;
        return `${base}?text=${encodeURIComponent(texto)}`;
    }, [data]);

    return (
        <section id="soporte" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="soporte-h">
            <div className="container">
                <h2 id="soporte-h" className="display-6 text-center text-warning fw-bold mb-3">Soporte técnico</h2>
                <p className="text-center text-secondary">Contáctanos por WhatsApp o completa el formulario.</p>

                <div className="d-flex justify-content-center mb-4">
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success fw-semibold"
                        aria-label="Contactar soporte por WhatsApp"
                    >
                        Chatear por WhatsApp
                    </a>
                </div>

                {success && (
                    <div className="alert alert-success" role="alert">
                        ¡Mensaje enviado exitosamente! Te responderemos pronto.
                    </div>
                )}

                <form className="bg-black border border-warning rounded-3 p-4" onSubmit={onSubmit} noValidate>
                    {/* Nombre */}
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className={`form-control ${touched.nombre && errors.nombre ? "is-invalid" : ""}`}
                            value={data.nombre}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                        />
                        {touched.nombre && errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>

                    {/* Correo */}
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            className={`form-control ${touched.correo && errors.correo ? "is-invalid" : ""}`}
                            value={data.correo}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                        />
                        {touched.correo && errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                    </div>

                    {/* Tipo */}
                    <div className="mb-3">
                        <label className="form-label">Tipo de consulta</label>
                        <select
                            name="tipo"
                            className={`form-select ${touched.tipo && errors.tipo ? "is-invalid" : ""}`}
                            value={data.tipo}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                        >
                            <option value="">Seleccione el tipo</option>
                            {tipos.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                        {touched.tipo && errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
                    </div>

                    {/* Mensaje */}
                    <div className="mb-3">
                        <label className="form-label">Mensaje</label>
                        <textarea
                            name="mensaje"
                            rows={4}
                            className={`form-control ${touched.mensaje && errors.mensaje ? "is-invalid" : ""}`}
                            value={data.mensaje}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            minLength={10}
                        />
                        {touched.mensaje && errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                    </div>

                    <button type="submit" className="btn btn-warning fw-semibold" disabled={!isValid || sending}>
                        {sending ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </div>
        </section>
    );
}

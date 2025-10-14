// src/components/Register.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const initial = {
    nombre: "",
    email: "",
    fecha_nacimiento: "",
    password: "",
    password_confirm: "",
    news: true,
    gamify: true,
    codigo_referido: "",
};

function validateNombre(v) {
    if (v.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v)) return "El nombre solo puede contener letras";
    return null;
}
function validateEmail(v) {
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(v)) return "Ingresa un correo válido";
    return null;
}
function validateEdad(fechaStr) {
    if (!fechaStr) return "La fecha de nacimiento es requerida";
    const birth = new Date(fechaStr);
    if (Number.isNaN(birth.getTime())) return "Fecha inválida";
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age < 18) return "Debes ser mayor de 18 años";
    return null;
}
function validatePassword(v) {
    if (v.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v)) {
        return "Debe incluir mayúsculas, minúsculas y números";
    }
    return null;
}
function validatePasswordConfirm(pass, confirm) {
    if (!confirm) return "Confirma tu contraseña";
    if (pass !== confirm) return "Las contraseñas no coinciden";
    return null;
}

export default function Register() {
    const [data, setData] = useState(initial);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // hint especial para duoc
    const duocHint = useMemo(() => {
        if (data.email.toLowerCase().endsWith("@duoc.cl")) {
            return "¡Correo Duoc detectado! Recibirás 20% de descuento (tras validación).";
        }
        return "";
    }, [data.email]);

    // límites de fecha: máximo hoy-18 años (ayuda visual)
    const maxDate = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 18);
        return d.toISOString().slice(0, 10);
    }, []);

    // errores por campo
    const errors = {
        nombre: validateNombre(data.nombre),
        email: validateEmail(data.email),
        fecha_nacimiento: validateEdad(data.fecha_nacimiento),
        password: validatePassword(data.password),
        password_confirm: validatePasswordConfirm(data.password, data.password_confirm),
    };

    const isValid = Object.values(errors).every((e) => e === null);

    const onChange = (e) => {
        const { name, type, value, checked } = e.target;
        setData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    };
    const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setTouched({
            nombre: true, email: true, fecha_nacimiento: true,
            password: true, password_confirm: true
        });
        if (!isValid) return;

        try {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 1200)); // simula POST

            //guardar usuario en localStorage
            const userInfo = {
                nombre: data.nombre.trim(),
                email: data.email.trim().toLowerCase(),
                fecha_nacimiento: data.fecha_nacimiento,
                news: data.news,
                gamify: data.gamify,
                codigo_referido: data.codigo_referido.trim(),
                registrado_en: new Date().toISOString(),
            };
            localStorage.setItem("levelup-user", JSON.stringify(userInfo));

            setSuccess(true);
            setData(initial);
            setTouched({});

            // redirigir después de un breve delay (para mostrar el mensaje)
            setTimeout(() => {
                navigate("/"); // 👈 vuelve a la página principal
            }, 2500);

        } finally {
            setLoading(false);
        }
    };


    // limpiar mensaje de éxito a los 5s
    useEffect(() => {
        if (!success) return;
        const id = setTimeout(() => setSuccess(false), 5000);
        return () => clearTimeout(id);
    }, [success]);

    return (
        <section id="registro" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="registro-h">
            <div className="container">
                <h2 id="registro-h" className="display-6 text-center text-warning fw-bold mb-3">Registro de usuario</h2>
                <p className="text-center text-secondary">Solo mayores de 18 años (validación cliente/servidor requerida).</p>

                {success && (
                    <div className="alert alert-success" role="alert">
                        ¡Cuenta creada exitosamente!
                    </div>
                )}

                <form className="bg-black border border-warning rounded-3 p-4" onSubmit={onSubmit} noValidate>
                    {/* Nombre */}
                    <div className="mb-3">
                        <label className="form-label">Nombre completo</label>
                        <input
                            type="text"
                            name="nombre"
                            className={`form-control ${touched.nombre && errors.nombre ? "is-invalid" : touched.nombre && !errors.nombre ? "is-valid" : ""}`}
                            value={data.nombre}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            minLength={2}
                        />
                        {touched.nombre && errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${touched.email && errors.email ? "is-invalid" : touched.email && !errors.email ? "is-valid" : ""}`}
                            value={data.email}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                        />
                        <div className="form-text">
                            Los correos @duoc.cl reciben 20% de descuento de por vida después de validación.
                        </div>
                        {duocHint && <div className="text-success small mt-1">{duocHint}</div>}
                        {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Fecha de nacimiento */}
                    <div className="mb-3">
                        <label className="form-label">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            className={`form-control ${touched.fecha_nacimiento && errors.fecha_nacimiento ? "is-invalid" : touched.fecha_nacimiento && !errors.fecha_nacimiento ? "is-valid" : ""}`}
                            value={data.fecha_nacimiento}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            max={maxDate}
                            aria-describedby="edadHint"
                        />
                        <div id="edadHint" className="form-text">Debes ser mayor de 18 años. Se validará en el servidor.</div>
                        {touched.fecha_nacimiento && errors.fecha_nacimiento && (
                            <div className="invalid-feedback">{errors.fecha_nacimiento}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${touched.password && errors.password ? "is-invalid" : touched.password && !errors.password ? "is-valid" : ""}`}
                            value={data.password}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            minLength={8}
                        />
                        <div className="form-text">Mínimo 8 caracteres, debe incluir mayúsculas, minúsculas y números.</div>
                        {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label className="form-label">Confirmar contraseña</label>
                        <input
                            type="password"
                            name="password_confirm"
                            className={`form-control ${touched.password_confirm && errors.password_confirm ? "is-invalid" : touched.password_confirm && !errors.password_confirm ? "is-valid" : ""}`}
                            value={data.password_confirm}
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                        />
                        {touched.password_confirm && errors.password_confirm && (
                            <div className="invalid-feedback">{errors.password_confirm}</div>
                        )}
                    </div>

                    {/* Código referido */}
                    <div className="mb-3">
                        <label className="form-label">Código de referido (opcional)</label>
                        <input
                            type="text"
                            name="codigo_referido"
                            className="form-control"
                            placeholder="Ej: AMIGO123"
                            value={data.codigo_referido}
                            onChange={onChange}
                        />
                    </div>

                    {/* Preferencias */}
                    <fieldset className="mb-3 border rounded-3 p-3 border-warning">
                        <legend className="float-none w-auto px-2 text-warning">Preferencias</legend>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="news" name="news" checked={data.news} onChange={onChange} />
                            <label className="form-check-label" htmlFor="news">Recibir novedades y ofertas</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gamify" name="gamify" checked={data.gamify} onChange={onChange} />
                            <label className="form-check-label" htmlFor="gamify">Participar en programa LevelUp</label>
                        </div>
                    </fieldset>

                    <button type="submit" className="btn btn-warning fw-semibold w-100" disabled={!isValid || loading}>
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>
                </form>
            </div>
        </section>
    );
}

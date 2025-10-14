import { Link, NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CartCtx } from "../context/cartCtx";


export default function Header() {
    const { count } = useContext(CartCtx);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("levelup-user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                setUser(null);
            }
        }
    }, []);

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
            <div className="container">
                <Link to="/" className="navbar-brand fw-bold text-warning">
                    LEVEL-UP GAMER
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Alternar navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <nav id="mainNavbar" className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/#catalogo">Catálogo</a></li>

                        <li className="nav-item"><a className="nav-link" href="/#programa">Programa LevelUp</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#blog">Blog</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#soporte">Soporte</a></li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {user ? (
                            <span className="text-warning fw-semibold">
                                👋 Hola, {user.nombre.split(" ")[0]}
                            </span>
                        ) : (
                            <NavLink to="/registro" className="btn btn-warning fw-semibold">
                                Regístrate
                            </NavLink>
                        )}

                        <button
                            type="button"
                            className="btn btn-outline-warning position-relative"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasBottom"
                        >
                            Carrito
                            {count > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {count}
                                </span>
                            )}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

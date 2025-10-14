// src/components/Footer.jsx
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-black text-light border-top border-warning py-4 mt-auto">
            <div className="container">
                <div className="row g-4 align-items-start">
                    {/* Columna 1: Marca */}
                    <div className="col-12 col-md-4">
                        <h5 className="text-warning fw-bold">LEVEL-UP GAMER</h5>
                        <p className="small text-secondary mb-2">
                            Consolas, periféricos, sillas y más. Tu nivel gamer comienza aquí 🎮
                        </p>
                        <p className="small text-secondary mb-0">
                            Álvarez 2366, Chorrillos, Viña del Mar
                        </p>
                        <p className="small text-secondary">contacto@levelupgamer.cl</p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div className="col-6 col-md-4">
                        <h6 className="text-warning fw-semibold mb-3">Enlaces rápidos</h6>
                        <ul className="list-unstyled small">
                            <li><a className="link-warning text-decoration-none" href="#catalogo">Catálogo</a></li>
                            <li><a className="link-warning text-decoration-none" href="#programa">Programa LevelUp</a></li>
                            <li><a className="link-warning text-decoration-none" href="#blog">Blog y noticias</a></li>
                            <li><a className="link-warning text-decoration-none" href="#soporte">Soporte técnico</a></li>
                            <li><a className="link-warning text-decoration-none" href="#registro">Registro</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Redes sociales */}
                    <div className="col-6 col-md-4">
                        <h6 className="text-warning fw-semibold mb-3">Síguenos</h6>
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                                    className="text-warning fs-5 me-2"><i className="bi bi-instagram"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                                    className="text-warning fs-5 me-2"><i className="bi bi-facebook"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"
                                    className="text-warning fs-5 me-2"><i className="bi bi-tiktok"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
                                    className="text-warning fs-5"><i className="bi bi-youtube"></i></a>
                            </li>
                        </ul>

                        <p className="small text-secondary mb-0">© {new Date().getFullYear()} Level-Up Gamer</p>
                        <p className="small text-secondary">Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

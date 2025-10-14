
export default function Ubicacion() {
    return (
        <section id="ubicacion" className="py-5 bg-dark text-light border-top border-warning">
            <div className="container">
                <h2 className="display-6 text-warning fw-bold mb-4 text-center">
                    Nuestra tienda — Sede Viña del Mar
                </h2>

                <div className="row g-4 align-items-center">
                    {/* Mapa */}
                    <div className="col-12 col-lg-6">
                        <div className="ratio ratio-16x9 border border-warning rounded-3 overflow-hidden shadow">
                            <iframe
                                title="Mapa Tienda Level-Up Gamer Viña del Mar"
                                src="https://www.google.com/maps?q=Álvarez+2366,+Chorrillos,+Viña+del+Mar,+Chile&output=embed"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Información */}
                    <div className="col-12 col-lg-6">
                        <div className="p-4 bg-black rounded-3 border border-warning h-100">
                            <h3 className="text-warning mb-3">Información de contacto</h3>
                            <ul className="list-unstyled mb-4">
                                <li><strong>📍 Dirección:</strong> Álvarez 2366, Chorrillos, Viña del Mar</li>
                                <li><strong>📞 Teléfono:</strong> +56 9 1234 5678</li>
                                <li><strong>✉️ Correo:</strong> contacto@levelupgamer.cl</li>
                            </ul>

                            <h4 className="text-warning mb-2">🕐 Horarios de atención</h4>
                            <p className="mb-0">Lunes a Viernes: <strong>08:30 a 18:15 hrs</strong></p>
                            <p className="text-secondary small mb-4">(Cerrado sábados, domingos y festivos)</p>

                            <a
                                href="https://www.google.com/maps/place/Álvarez+2366,+Chorrillos,+Viña+del+Mar,+Chile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-warning fw-semibold w-100"
                            >
                                Ver en Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

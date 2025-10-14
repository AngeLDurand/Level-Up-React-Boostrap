export default function Hero() {
    return (
        <section className="hero d-flex align-items-center justify-content-center text-center bg-dark text-light py-5 border-bottom border-warning">
            <div className="container py-5">
                <h1 className="display-4 fw-bold text-warning mb-3">
                    Desafía tus límites — Level‑Up Gamer
                </h1>
                <p className="lead mb-4">
                    Consolas, periféricos, sillas y más. <br className="d-none d-md-block" />
                    Envíos a todo Chile.
                </p>
                <a href="/#catalogo" className="btn btn-warning btn-lg fw-semibold">
                    Explora el Catálogo
                </a>
            </div>
        </section>
    );
}

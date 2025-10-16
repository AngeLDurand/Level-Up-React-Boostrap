import { useRouteError, Link } from "react-router";

export default function Error404() {
    const error = useRouteError();

    console.error(error); // solo para debug en consola

    return (
        <div className="container vh-100 bg-dark text-bg-dark d-flex flex-column align-items-center justify-content-center gap-4">
            <h1 className="text-warning">Oops!</h1>
            <p>{error?.statusText || error?.message || "Página no encontrada"}</p>
            <Link className="btn btn-warning fw-semibold" to="/">Volver a Home</Link>
        </div>
    );
}

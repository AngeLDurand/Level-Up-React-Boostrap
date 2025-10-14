// src/components/CartOffcanvas.jsx
import { useContext, useEffect, useRef } from "react";
import { CartCtx } from "../context/cartCtx";


const formatCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function CartOffcanvas() {
    const { items, remove, clear, subtotal, total } = useContext(CartCtx);
    const bsOffcanvas = useRef(null);

    useEffect(() => {

        bsOffcanvas.current = new bootstrap.Offcanvas("#offcanvasBottom");
    }, []);

    return (
        <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasBottom"
            aria-labelledby="offcanvasBottomLabel"
            data-bs-scroll="true"
        >
            <div className="offcanvas-header border-bottom border-warning">
                <h5 id="offcanvasBottomLabel" className="offcanvas-title text-warning">
                    Carrito
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Cerrar"
                />
            </div>

            <div className="offcanvas-body d-flex flex-column gap-3">
                {items.length === 0 ? (
                    <div className="text-center text-secondary py-5">Tu carrito está vacío</div>
                ) : (
                    <div className="d-flex flex-column gap-2">
                        {items.map((it) => (
                            <div key={it.code} className="card bg-black border border-secondary-subtle">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start gap-2">
                                        <div>
                                            <div className="fw-semibold text-light">{it.name}</div>
                                            <small className="text-secondary">x{it.quantity}</small>
                                        </div>
                                        <div className="text-end">
                                            <div className="text-warning fw-bold">
                                                {formatCLP(it.price * it.quantity)}
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger mt-2"
                                                onClick={() => remove(it.code)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-auto">
                    <dl className="row small">
                        <dt className="col-6">Subtotal</dt>
                        <dd className="col-6 text-end">{formatCLP(subtotal)}</dd>
                        <dt className="col-6">Envío</dt>
                        <dd className="col-6 text-end">Calculado en el checkout</dd>
                        <dt className="col-6 border-top pt-2 fw-bold">Total</dt>
                        <dd className="col-6 border-top pt-2 fw-bold text-end">{formatCLP(total)}</dd>
                    </dl>

                    <div className="d-flex gap-2">
                        <button className="btn btn-danger flex-fill" onClick={clear} disabled={!items.length}>
                            Vaciar carrito
                        </button>
                        <a
                            href="/#checkout"
                            className="btn btn-warning flex-fill fw-semibold"
                            data-bs-dismiss="offcanvas"
                        >
                            Finalizar compra
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const formatCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

import { useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartCtx } from "./cartCtx";





export function CartProvider({ children, productsByCode = {} }) {
    const [items, setItems] = useLocalStorage("levelup-cart", []);

    const add = (code, qty = 1) => {
        setItems(prev => {
            const idx = prev.findIndex(x => x.code === code);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
                return copy;
            }
            const meta = productsByCode[code] || {};
            return [...prev, { code, name: meta.name || code, price: meta.price || 0, quantity: qty }];
        });
    };

    const remove = (code) => setItems(prev => prev.filter(x => x.code !== code));
    const clear = () => setItems([]);

    const { subtotal, total, count } = useMemo(() => {
        const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
        const count = items.reduce((s, it) => s + it.quantity, 0);
        return { subtotal, total: subtotal, count };
    }, [items]);

    const value = useMemo(
        () => ({ items, add, remove, clear, subtotal, total, count }),
        [items, subtotal, total, count]
    );

    return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

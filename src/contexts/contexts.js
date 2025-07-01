'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    const [orderModal, setOrderModal] = useState(false);
    const [callBackModal, setCallBackModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        };
        return [];
    });

    const addToCart = (id, selectedOptions = {}) => {
        let exists = false;
        let added = false;
        setCart((prevCart) => {
            exists = prevCart.some(
                (item) =>
                    item.id === id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );
            if (exists) {
                added = false;
                return prevCart;
            };
            added = true;
            return [
                ...prevCart,
                {
                    id,
                    selectedOptions,
                    quantity: 1,
                    isChecked: true,
                },
            ];
        });
        return added;
    };

    const removeFromCart = (id, selectedOptions = {}) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) =>
                    !(item.id === id &&
                        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
            );
            return updatedCart;
        });
        toast.success("Mahsulot savatchadan o`chirildi!");
    };

    const updateQuantity = (id, selectedOptions = {}, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
                    return { ...item, quantity: newQuantity };
                };
                return item;
            });
            return updatedCart;
        });
    };

    const toggleCheck = (id, selectedOptions = {}, newCheck) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
                    return { ...item, isChecked: newCheck };
                };
                return item;
            });
            return updatedCart;
        });
    };

    const handleCheckAll = () => {
        setCart((prevCart) => {
            const allChecked = prevCart.every(item => item.isChecked);
            return prevCart.map(item => ({
                ...item,
                isChecked: !allChecked
            }));
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <GlobalContext.Provider value={{
            addToCart,
            setCart,
            cart,
            removeFromCart,
            updateQuantity,
            toggleCheck,
            handleCheckAll,
            orderModal,
            setOrderModal,
            callBackModal,
            setCallBackModal,
            openFilter,
            setOpenFilter,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
    return context;
};
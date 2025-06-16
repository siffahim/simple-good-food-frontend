import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: 'ADD_ITEM'; item: CartItem }
    | { type: 'INCREASE_QUANTITY'; id: string }
    | { type: 'DECREASE_QUANTITY'; id: string }
    | { type: 'REMOVE_ITEM'; id: string }
    | { type: 'INIT_CART'; items: CartItem[] }
    | { type: 'CLEAR_CART' }; 

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({
    state: { items: [] },
    dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.item.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.item.id
                            ? { ...item, quantity: item.quantity + action.item.quantity }
                            : item
                    ),
                };
            }
            return { ...state, items: [...state.items, action.item] };

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id
                        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                        : item
                ),
            };

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id),
            };
            
        case 'CLEAR_CART':
            return { ...state, items: [] };  // Clears the cart

        case 'INIT_CART':
            return { ...state, items: action.items };

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Load the cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                dispatch({ type: 'INIT_CART', items: parsedCart });
            }
        }
    }, []);

    // Save the cart to localStorage whenever it changes and has valid items
    useEffect(() => {
        const isValidCart = state.items.every(item => item.id && item.quantity > 0 && item.price > 0);
        if (state.items.length > 0 && isValidCart) {
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

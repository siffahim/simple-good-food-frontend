'use client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from "@/redux/store";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/provider/User';
import { CartProvider } from '@/provider/Cart';

const ClientProvider = ({ children }: {children: ReactNode}) => {
    return (
        <Provider store={store}>
            <CartProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </CartProvider>
            <Toaster />
        </Provider>
    );
};
  
export default ClientProvider;
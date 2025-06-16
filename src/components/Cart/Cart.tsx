"use client";
import { useCart } from '@/provider/Cart';
import React, { useEffect, useRef, useState } from 'react';
import CartPopUp from '../CartPopUp';
import { Badge } from 'antd';
import { FaCartPlus } from 'react-icons/fa6';

const Cart = () => {
    const [open, setOpen] = useState(false);
    const { state: { items } } = useCart();

    const cartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    
    return (
        <div>
            {
                open &&
                <CartPopUp setOpen={setOpen} open={open} />
            }

            <div onClick={()=>setOpen(true)} className='bg-primary cursor-pointer fixed right-6 top-1/2 w-[64px] h-[64px] rounded-full flex items-center justify-center'>
                <Badge count={items?.length} color='#735571' style={{border: "none"}}>
                    <FaCartPlus color='#F4F4F4' size={24} />
                </Badge>
            </div>
        </div>
    )
}

export default Cart
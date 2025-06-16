"use client";
import React, { useState } from 'react';
import MealOrder from './MealOrder';
import MenuOrder from './MenuOrder';

const OrderHistory = () => {
    const [tab, setTab] = useState("Meal")
    return (
        <div className='overflow-y-hidden'>

            <div className='flex gap-6 items-center justify-end mb-6 mr-6'>
                <button onClick={()=>setTab("Meal")} className={` ${tab === "Meal" ? "bg-primary bg-opacity-[100%]" : "bg-primary bg-opacity-[60%]"}  text-white rounded-md h-[42px] w-[130px]`}>Meal</button>
                <button onClick={()=>setTab("Menu")} className={` ${tab === "Menu" ? "bg-primary bg-opacity-[100%]" : "bg-primary bg-opacity-[60%]"}  text-white rounded-md h-[42px] w-[130px]`}>Menu</button>
            </div>
            { tab === "Meal" && <MealOrder/>}
            { tab === "Menu" && <MenuOrder/>}

            
        </div>
    )
}

export default OrderHistory
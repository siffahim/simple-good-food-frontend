"use client";
import MealTransactions from '@/components/Transactions/MealTransactions';
import MenuTransactions from '@/components/Transactions/MenuTransactions';
import React, { useState } from 'react';


const TransactionsClient = () => {
    const [tab, setTab] = useState("Meal");
    return (
        <div className='p-4'>
            <div className='flex gap-6 items-center justify-end mb-6 mr-6'>
                <button onClick={()=>setTab("Meal")} className={` ${tab === "Meal" ? "bg-primary bg-opacity-[100%]" : "bg-primary bg-opacity-[60%]"}  text-white rounded-md h-[42px] w-[130px]`}>Meal</button>
                <button onClick={()=>setTab("Menu")} className={` ${tab === "Menu" ? "bg-primary bg-opacity-[100%]" : "bg-primary bg-opacity-[60%]"}  text-white rounded-md h-[42px] w-[130px]`}>Menu</button>
            </div>

            { tab === "Meal" && <MealTransactions/>}
            { tab === "Menu" && <MenuTransactions/>}
        </div>
    )
}

export default TransactionsClient
"use client"
import Heading from '@/components/shared/Heading'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import Modal from '@/components/shared/Modal';
import { useMenuQuery } from '@/redux/apiSlices/menuSlice';
import { imageUrl } from '@/redux/api/baseApi';
import CheckoutModal from '@/components/shared/CheckoutModal';

const MealClient = () => {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState("Small Meal");
    const [count, setCount] = useState(1);
    const [tabItem, setTabItem] = useState<number | null>(0);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const initialTab = new URLSearchParams(window.location.search).get('tab') || "Small Meal";
        setTab(initialTab);
    }, []);

    const handleTab = (tab: string, index:any) => {
        setTab(tab);
        setTabItem(index);
        setCount(1)

        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);

        const indexParams = new URLSearchParams(window.location.search);
        indexParams.set('index', index);
        window.history.pushState(null, "", `?${indexParams.toString()}`);
    }

    

    const {data: products, isLoading} = useMenuQuery({ meal:tab});
    
    useEffect(() => {
        const calculatedTotal = products?.data?.reduce((acc: number, rev: any) => acc + Number(rev?.price), 0) * count;
        setTotal(calculatedTotal);
    }, [count, products, tab]);


    if (isLoading) return <div>Loading...</div>;
    const productList = products?.data?.map((item:any)=> ({product: item?._id}));

    const orderData = {
        quantity: count,
        mealPlanType: tab,
        price: total,
        totalItems: products?.data?.length,
        products: productList,
        deliveryCharge: 5,
    }


    return (
        <div className='container pt-[100px] h-full bg-[#F7F7F7] pb-20'>
            <Heading name='Select your meal plans ' style='font-bold text-[32px]  md:text-[40px] leading-[38px] md:leading-[46px] text-[#333333] mb-6' />

            <div className='grid grid-cols-12 gap-6'>

                {/* meal plans  */}
                <div className='bg-white col-span-12 lg:col-span-4 h-fit p-6 rounded-lg'>
                    <div className='grid grid-cols-1 gap-6'>
                        {
                            ["Small Meal", "Small Paleo Meal", "Medium Meal", "Medium Paleo Meal", "Large Meal", "Large Paleo Meal"]?.map((item, index)=>{
                                return(
                                    <div key={index} className='flex items-center justify-between'>
                                        <p 
                                            onClick={()=>handleTab(item, index)}
                                            className={`
                                                w-[200px] flex items-center justify-center 
                                                h-[40px] cursor-pointer 
                                                ${tab === item ? "bg-[#FDB64E] text-[#F4F4F4]" : "bg-[#EEEEEE] text-[#656565] "}
                                                rounded-[24px] font-medium text-[16px] leading-5
                                            `}
                                        >
                                            {item}
                                        </p>
                                        <div 
                                            className={`
                                                bg-[#ECECEC] 
                                                ${Number(tabItem) === index ? "flex": "none"}
                                                items-center 
                                                rounded-[24px] px-6 w-[150px] h-10 justify-between    
                                            `}
                                        >
                                            <button className='text-[#656565]' onClick={()=>setCount(count - 1)} >-</button>
                                            <p className='text-[#656565]' >{count}</p>
                                            <button className='text-[#656565]' onClick={()=>setCount(count + 1)} >+</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* meal details */}
                <div className='bg-white col-span-12 lg:col-span-8 h-fit p-6 rounded-lg'>
                    <div className='rounded-lg p-2 bg-[#F4F4F4] px-[34px] py-[14px] flex items-center justify-between'>
                        <p className='text-[16px] leading-5 text-[#F52B2E] font-medium'>Subtotal :</p>
                        <p className='text-[16px] leading-5 text-[#F52B2E] font-bold'>${total}</p>
                    </div>

                    <button onClick={()=>setOpen(true)} className='bg-primary mt-4 text-white rounded-lg h-[48px] w-full font-medium text-[14px] leading-6'>CONFIRM MEALS</button>

                    <div className='w-full h-[1px] bg-[#D9D9D9] my-4' />
                    <Heading name='Meal details ' style='font-medium text-[24px] leading-[31px] text-[#1A1A1A] mb-4' />

                    <div className='grid grid-cols-1 gap-3'>
                        {
                            products?.data?.map((product:any, index:number)=>{
                                return(
                                    <div key={index} className='bg-[#F7F7F7] w-full h-full sm:h-[75px] p-2 rounded-lg'>
                                        <div className='flex flex-col sm:flex-row items-center gap-4'>
                                            <Image
                                                alt='Product'
                                                src={`${imageUrl}${product?.image}`}
                                                width={60}
                                                height={60}
                                            />
                                            <div className='grid-cols-1 grid gap-0 sm:gap-4'>
                                                <div className='flex  items-center sm:gap-4'>
                                                    <p className='font-bold text-[18px] leading-7 text-[#5C5C5C]'>{product?.name}</p>
                                                    {
                                                        product?.rating
                                                        &&
                                                        <div className='flex items-center gap-3'>
                                                            <FaStar className='' color='#FDB64E' size={14} /> <span className='text-[#FDB64E] text-[14px] leading-[18px] font-medium'>4.5/5</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className='flex items-center justify-center gap-3'>
                                                    <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Protein {product?.protein}g</span>
                                                    <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                                                    <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Carbs {product?.carbs}g</span>
                                                    <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                                                    <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Fat {product?.fat}g</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>

            <Modal
                width={1000}
                open={open}
                setOpen={setOpen} 
                title='Confirm Checkout' 
                body={<CheckoutModal type={"mealPlan"} modalOpen={modalOpen} setModalOpen={setModalOpen} setOpen={setOpen} orderData={orderData}/>}
            />
        </div>
    )
}

export default MealClient
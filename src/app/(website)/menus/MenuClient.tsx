"use client";
import React, { useEffect, useState } from 'react';
import Product from "@/assets/foods.png";
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import Link from 'next/link';
import { useMenuQuery } from '@/redux/apiSlices/menuSlice';
import { imageUrl } from '@/redux/api/baseApi';
import { useCart } from '@/provider/Cart';

const MenuClient = () => {
    const [tab, setTab] = useState("Full Menus");
    const [page, setPage] = useState<string>("1");
    const { dispatch } = useCart();

    useEffect(() => {
        const initialTab = new URLSearchParams(window.location.search).get('tab') || "Full Menus";
        setTab(initialTab);
        const initialPage = new URLSearchParams(window.location.search).get('page') || 1;
        setPage(initialPage.toString())
    }, []);


    const handleTab = (tab: string) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const handlePageChange = (page: number) => {
        setPage(page.toString());
        const params = new URLSearchParams(window.location.search);
        params.set('page', String(page));
        window.history.pushState(null, "", `?${params.toString()}`);
    }


    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const { data, isLoading } = useMenuQuery({page, tab});
    if (isLoading) return <div>Loading...</div>;

    const addToCart = (e:any, value:any) => {
        e.preventDefault();
        e.stopPropagation()

        const product = {
            id: value?._id,
            name: value?.name,
            image: value?.image,
            quantity: 1,
            price: Number(value?.price)
        };
        dispatch({ type: 'ADD_ITEM', item: product });
    };

    return (
        <div className='container mt-[100px]'>

            {/* total menus */}
            <div className='flex flex-col sm:flex-row items-center gap-6 mb-6'>
                {
                    ["Full Menus", "Entree", "Breakfast", "Snacks"]?.map((item, index)=>{
                        return(
                            <p 
                                onClick={()=>handleTab(item)}
                                className={`
                                    w-full sm:w-[120px] flex items-center justify-center 
                                    h-[35px] cursor-pointer 
                                    ${tab === item ? "bg-[#FDB64E] text-[#F4F4F4]" : "bg-[#EEEEEE] text-[#656565] "}
                                    rounded-lg font-medium text-[16px] leading-5
                                    capitalize
                                `} 
                                key={index}
                            >
                                {item}
                            </p>
                        )
                    })
                }
            </div>

            {/* menus container */}
            <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 menu-container'>
                {
                    data?.data?.map((product:any, index:number)=>{
                        return(
                            <Link href={`/details/${product?._id}`} key={index}>
                                <div className='bg-[#F7F7F7] relative p-2 rounded-lg'>
                                        <div className='relative h-[200px]'>
                                            <Image
                                                alt='Product'
                                                src={`${imageUrl}${product?.image}`}
                                                fill
                                                style={{objectFit: "fill"}}
                                            />
                                        </div>

                                        {/* meal description */}
                                        <div>
                                            {
                                                product?.rating
                                                &&
                                                <div className='flex items-center gap-3 mt-4 mb-1'>
                                                    <FaStar className='' color='#FDB64E' size={14} /> <span className='text-[#FDB64E] text-[14px] leading-[18px] font-medium'>{product?.rating}</span>
                                                </div>
                                            }
                                            <p className='font-bold text-[18px] leading-7 text-[#5C5C5C]'>{product?.name}</p>
                                            <p className='font-semibold text-[16px] leading-5 text-[#735571] my-1'>${product?.price}</p>
                                            <button 
                                                className='border-none font-medium text-[14px] leading-6 bg-primary text-white w-full h-10 rounded-lg'
                                                onClick={(e)=>addToCart(e, product)}
                                            >
                                                Add to cart
                                            </button>

                                            <div className='flex items-center justify-center gap-3 my-3'>
                                                <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Protein {product?.protein}g</span>
                                                <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                                                <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Carbs {product?.carbs}g</span>
                                                <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                                                <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Fat {product?.fat}g</span>
                                            </div>
                                        </div>
                                    </div>
                            </Link>
                        )
                    })
                }
            </div>
            
            <div className='my-6 flex items-center justify-center w-full'>
                <Pagination
                    current={parseInt(page)}
                    showSizeChanger={false} 
                    total={data?.meta?.total}
                    onChange={handlePageChange} 
                    itemRender={itemRender}
                />
            </div>
        </div>
    )
}

export default MenuClient
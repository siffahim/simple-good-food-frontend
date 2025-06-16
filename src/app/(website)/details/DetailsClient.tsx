"use client";
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import Heading from '@/components/shared/Heading';
import { useMenuDetailsQuery } from '@/redux/apiSlices/menuSlice';
import { imageUrl } from '@/redux/api/baseApi';
import RelatedMenu from '@/components/Menu/RelatedMenu';

const DetailsClient = ({mealId}: {mealId : string}) => {
    const {data: product} = useMenuDetailsQuery(mealId);
    return (
        <div className='container mt-[100px]'>

            <div className='grid grid-cols-12 gap-5 lg:gap-10 mb-6'>

                {/* image container */}
                <div className="col-span-12 lg:col-span-6 h-fit  order-1 lg:order-1">
                    <div className='relative w-full h-[400px]'>
                        {
                            product?.image
                            &&

                            <Image
                                alt="Catering"
                                src={`${imageUrl}${product?.image}`}
                                fill
                                style={{ objectFit: 'fill' }}
                            />
                        }
                    </div>
                    
                </div>
                
                {/* product container */}
                <div className='col-span-12 lg:col-span-6 order-2 lg:order-2'>
                    <Heading name={product?.name} style='font-bold text-[24px] leading-[36px] text-[#5C5C5C] mb-1' />
                    {
                        product?.rating
                        &&
                        <div className='flex items-center gap-3 mt-4 mb-1'>
                            <FaStar className='' color='#FDB64E' size={14} /> <span className='text-[#FDB64E] text-[14px] leading-[18px] font-medium'>{product?.rating}</span>
                        </div>
                    }

                    <div className='flex items-center gap-3 my-3'>
                        <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Protein {product?.protein}g</span>
                        <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                        <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Carbs {product?.carbs}g</span>
                        <span className='font-medium text-[14px] leading-[18px] text-[#000000]'>/</span>
                        <span className='font-medium text-[14px] leading-[18px] text-[#BF757B]'>Fat {product?.fat}g</span>
                    </div>

                    <p className='font-semibold text-[24px] leading-5 text-[#735571] mt-1'>${product?.price}</p>

                    <p className='font-medium text-[16px] leading-[20px] text-[#7E7E7E] my-4'>
                        {product?.details}
                    </p>

                    <button className='border-none font-medium text-[14px] leading-6 bg-primary text-white w-full h-10 rounded-lg'>Add to cart</button>
                    <p className='font-medium text-[16px] leading-[24px] text-[#656565] mt-4'>Ingredients</p>
                    <p className='font-normal text-[16px] leading-[20px] text-[#7E7E7E] my-2'>
                        {product?.ingredient}
                    </p>

                    <br />
                    <p className='font-medium text-[16px] leading-[24px] text-[#656565]'>Instructions</p>
                    <p className='font-normal text-[16px] leading-[20px] text-[#7E7E7E] my-2'>
                        {product?.instructions}
                    </p>
                </div>
            </div>

            
            <RelatedMenu id={product?._id} />
            
        </div>
    )
}

export default DetailsClient
"use client";
import Image from 'next/image';
import React from 'react';
import Product from "@/assets/foods.png";
import { FaStar } from 'react-icons/fa6';
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useMenuQuery } from '@/redux/apiSlices/menuSlice';
import { imageUrl } from '@/redux/api/baseApi';
import Link from 'next/link';
import { useCart } from '@/provider/Cart';

const NewProduct = () => {
    const { dispatch } = useCart();

    const ArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
        <button
            {...props}
            className="prev absolute z-[1] top-[50%] left-0 bg-black bg-opacity-[30%] w-9 h-9 rounded-full flex items-center justify-center"
        >
            <BiChevronLeft size={24} color='#EEEEEE' className='mx-auto ' />
        </button>
    );
    
    const ArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
        <button
            {...props}
            className="next bg-black bg-opacity-[30%] w-9 h-9 rounded-full flex items-center justify-center absolute top-[50%] right-0"
        >
            <BiChevronRight size={24} color='#EEEEEE' className='mx-auto' />
        </button>
    );

    const settings: Settings = {
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: false,
        dots: false,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const {data: products} = useMenuQuery({});

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
            <div className='my-16'>
                <Slider {...settings}>
                    {
                        products?.data?.map((product:any, index:number)=>{
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
                                            <button onClick={(e)=>addToCart(e, product)} className='border-none font-medium text-[14px] leading-6 bg-primary text-white w-full h-10 rounded-lg'>Add to cart</button>

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
                </Slider>
            </div>
    )
}

export default NewProduct
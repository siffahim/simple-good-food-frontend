"use client";
import Heading from '@/components/shared/Heading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import review from "@/assets/review.png";
import { useGetFeedbackQuery } from '@/redux/apiSlices/feedbackSlice';
import { imageUrl } from '@/redux/api/baseApi';
import { Pagination, PaginationProps } from 'antd';

const TestimonialClient = () => {
    const [page, setPage] = useState(1)
    console.log(page)
    useEffect(() => {
        const initialPage = new URLSearchParams(window.location.search).get('page') || 1;
        setPage(Number(initialPage))
    }, []);

    const handlePageChange = (page: number) => {
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


    const {data: reviews} = useGetFeedbackQuery(undefined);


    return (
        <div className='container mt-[120px]'>
            <Heading name='Testimonials' style='font-bold text-[40px] leading-[46px] text-[#333333] text-center mb-4' />

            <div className='grid grid-cols-1 gap-10'>
                {
                    reviews?.data?.map((testimonial:any, index:number)=>{
                        return(
                            <div key={index}>
                                <div className={`flex flex-col  ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10`}>
                                    <div className="w-fit mx-auto">
                                        {
                                            testimonial?.user
                                            &&
                                            <Image
                                                alt="Catering"
                                                src={ testimonial?.user?.profile?.startsWith("https") ?  testimonial?.user?.profile : `${imageUrl}${testimonial?.user?.profile}`    }
                                                width={300}
                                                height={300}
                                            />
                                        }
                                    </div>
                                    <div className="w-full">
                                        <Heading name={testimonial?.user?.name} style='font-normal text-[24px] leading-[27px] text-[#333333] mb-4' />
                                        <p className='text-[16px] leading-5 font-normal text-[#767676]'>
                                            {testimonial?.feedback}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='my-6 flex items-center justify-center w-full'>
                <Pagination
                    current={Number(page)}
                    showSizeChanger={false} 
                    total={reviews?.meta?.total}
                    onChange={handlePageChange} 
                    itemRender={itemRender}
                />
            </div>
        </div>
    )
}

export default TestimonialClient
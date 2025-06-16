"use client";
import Heading from '@/components/shared/Heading';
import { Pagination, PaginationProps, Select } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { IoIosInformationCircle } from "react-icons/io";
import Modal from '@/components/shared/Modal';
import {  useFeedbackQuery, usePublishFeedbackMutation } from '@/redux/apiSlices/feedbackSlice';
import moment from 'moment';
import toast from 'react-hot-toast';
import { imageUrl } from '@/redux/api/baseApi';

const TestimonialClient = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1)
    const {data: reviews, refetch} = useFeedbackQuery(page);
    const [publishFeedback] = usePublishFeedbackMutation();
    const [value, setValue] = useState<Record<string, string>>({})

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const handleStatusChange=async(id: string)=>{
        try {
            await publishFeedback(id).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    refetch()
                }
            });
            
        } catch (error: any) {
            toast.error(error.data.message || "An unexpected server error occurred");
        }
    }


    const body=(
        <div>
            <p className='text-[16px] leading-6 font-normal text-[#636363] mb-4'>Answer</p>
            <div className='border border-[#636363] border-opacity-[10%] rounded-lg p-4'>
                <p className='text-[16px] leading-6 font-normal text-[#636363]'>
                    {value?.feedback}
                </p>
            </div>
        </div>
    )


    return (
        <div className=''>
            <div className='flex items-center justify-between p-4'>
                <Heading name='Testimonials' style='font-medium text-[18px] leading-[24px] text-[#333333] text-center' />
                {/* <Input
                    prefix={<GoSearch size={18} color='#5C5C5C' />}
                    placeholder='Search By Date'
                    style={{
                        width: 300,
                        height: 40,
                        border: "1px solid #F6F6F6",
                        boxShadow: "none",
                        outline: "none",
                        color: "#5C5C5C"
                    }} 
                    value={keyword}
                    onChange={(e)=>setKeyword(e.target.value)}
                    suffix={<CgClose onClick={()=> setKeyword("")} style={{display: keyword ? "block" : "none"}} size={18} color='#5C5C5C' />}
                    className='placeholder:text-[#5C5C5C]'
                /> */}
            </div>
            
            <table className="w-full rounded-[5px]">
                <thead>
                    <tr className="text-left w-full bg-[#FEE3B8]">
                        {
                            ["S.no ", "User", "FeedBack", "Date", "Status", "Action"].map((item, index)=>
                            <th key={index} className={`text-[16px] py-2 ${index === 0 ? "pl-4" : "pl-0"} leading-7 text-[#3E3E3E]`}>
                                {item}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        reviews?.data?.map((item:any, index:number)=>
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='h-[50px] pl-4 text-[15px] leading-5 text-[#636363] font-normal'>{index + 1}</td>
                                    <td className='h-[50px] flex items-center gap-1 text-[15px] leading-5 text-[#636363] font-normal'>
                                        {
                                            item?.user?.profile
                                            &&
                                            <Image
                                                alt="Catering"
                                                src={ 
                                                    item?.user?.profile?.startsWith("https") 
                                                    ? 
                                                    item?.user?.profile 
                                                    : 
                                                    `${imageUrl}${item?.user?.profile}` 
                                                }
                                                width={48}
                                                height={48}
                                            />
                                        }
                                        <p>{item?.user?.name}</p>
                                    </td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>{item?.feedback?.slice(0, 100)} {"..."}</td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>{moment(item?.createdAt).format("L")}</td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>
                                        <Select
                                            style={{
                                                width: 160,
                                                height: 48,
                                                background: "transparent",
                                                border: "none",
                                                
                                            }}
                                            value={item?.status}
                                            onChange={()=>handleStatusChange(item?._id)}
                                        >
                                            <Select.Option value="published">Published</Select.Option>
                                            <Select.Option value="Unpublished">UnPublished</Select.Option>
                                        </Select>
                                    </td>
                                    <td className='h-[50px] text-[12px] leading-5 text-[#636363] font-normal'>
                                        <IoIosInformationCircle className='cursor-pointer' onClick={()=>(setOpen(true), setValue(item))} size={24} color='#735571' />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>

            <div className='my-6 flex items-center justify-center w-full'>
                <Pagination onChange={(page)=>setPage(page)} showSizeChanger={false} total={reviews?.pagination?.total} itemRender={itemRender} />
            </div>

            <Modal
                title='FeedBack Details'
                open={open}
                setOpen={setOpen}
                body={body}
            />
        </div>
    )
}

export default TestimonialClient;
"use client";
import Heading from '@/components/shared/Heading';
import { Input, Pagination, PaginationProps, Select } from 'antd';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { GoSearch } from "react-icons/go";
import { IoIosInformationCircle } from "react-icons/io";
import Catering from "@/assets/catering.png";
import Image from 'next/image';
import { useMealTransactionQuery, useMealTransactionUpdateMutation } from '@/redux/apiSlices/transactionSlice';
import toast from 'react-hot-toast';
import Modal from '@/components/shared/Modal';

const MealPlanClient = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const itemsPerPage = 10; 
    const [mealTransactionUpdate] = useMealTransactionUpdateMutation();
    const {data: meals, refetch} = useMealTransactionQuery({page: page});

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
            await mealTransactionUpdate(id).unwrap().then((result)=>{
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
            
        </div>
    )


    return (
        <div className=''>
            <div className='flex items-center justify-between p-4'>
                <Heading name='Meal Plan Transaction' style='font-medium text-[18px] leading-[24px] text-[#333333] text-center' />
                <Input
                    prefix={<GoSearch size={18} color='#5C5C5C' />}
                    placeholder='Search...'
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
                />
            </div>
            
            <table className="w-full rounded-[5px] rounded-table">
                <thead>
                    <tr className="text-left w-full bg-[#FEE3B8] custom-table-row">
                        {
                            ["S.no ", "Name", "Order Type", "OrderDate", "Quantity", "Price", "Action"].map((item, index)=>
                            <th key={index} className={`text-[18px] text-center py-2 leading-7 text-[#3E3E3E]`}>
                                {item}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        [...Array(8)]?.map((item, index)=>
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>{((page - 1) * itemsPerPage) + index + 1}</td>
                                    <td className='h-[50px] flex items-center justify-center gap-3 text-[16px] leading-5 text-[#636363] font-normal'>
                                        <Image
                                            alt="Catering"
                                            src={Catering}
                                            width={48}
                                            height={48}
                                        />
                                        Nadir
                                    </td>
                                    <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>Small Meal</td>
                                    <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>2024-07-10</td>
                                    <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>2024-07-12</td>
                                    <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>$100</td>
                                    <td className='h-[50px] text-center text-[16px] flex items-center justify-center gap-4 leading-5 text-[#636363] font-normal'>
                                        <Select
                                            style={{
                                                width: "120px",
                                                background: "transparent",
                                                border: "none",
                                                
                                            }}
                                            defaultValue={"Pending"}
                                            value={item?.status}
                                            onChange={()=>handleStatusChange(item?._id)}
                                        >
                                            <Select.Option value="pending">Pending</Select.Option>
                                            <Select.Option value="process">Process</Select.Option>
                                            <Select.Option value="delivered">Delivered</Select.Option>
                                        </Select>
                                        <IoIosInformationCircle onClick={()=>setOpen(true)} className='cursor-pointer' size={30} color='#735571' />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>

            <div className='my-6 flex items-center justify-center w-full'>
                <Pagination showSizeChanger={false} total={30} itemRender={itemRender} />
            </div>

            <Modal
                title='Meal Transaction Details'
                open={open}
                setOpen={setOpen}
                body={body}
            />
        </div>
    )
}

export default MealPlanClient
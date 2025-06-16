"use client";
import Heading from '@/components/shared/Heading';
import { Input, Pagination, PaginationProps, Select } from 'antd';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { GoSearch } from "react-icons/go";
import { IoIosInformationCircle } from "react-icons/io";
import Image from 'next/image';
import { useMenuTransactionQuery, useMenuTransactionUpdateMutation } from '@/redux/apiSlices/transactionSlice';
import toast from 'react-hot-toast';
import Modal from '@/components/shared/Modal';
import { imageUrl } from '@/redux/api/baseApi';
import moment from 'moment';


interface Order {
    deliveryCharge: number;
    price: number;
    products: [
        product:{
            image: string;
            name: string;
            price: number;
        }
    ]
}

const MenuTransactions = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState<string>('1');
    const [open, setOpen] = useState(false);
    const {data: menus, refetch} = useMenuTransactionQuery({page: page});
    const [menuTransactionUpdate]= useMenuTransactionUpdateMutation();
    const [value, setValue] = useState<Order | null>(null);


    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const handleStatusChange=async(id:string, status:string)=>{
        try {
            await menuTransactionUpdate({id, status}).unwrap().then((result)=>{
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
            <div className='h-[350px] overflow-y-auto'>
                <div className='grid grid-cols-1'>
                    {
                        value?.products?.map((item:any, index:number)=>{
                            return(
                                <div key={index} className=' w-full p-2 rounded-lg'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <Image
                                                alt='Product'
                                                src={`${imageUrl}${item?.product?.image}`}
                                                width={60}
                                                height={0}
                                                style={{borderRadius: 6}}
                                            />
                                            <div>
                                                <p className='font-medium text-[16px] leading-6 text-[#5C5C5C]'>{item?.product?.name}</p>
                                                <p className='font-medium text-[16px] leading-6 text-[#735571]'>{item?.product?.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-[16px] leading-6 font-normal text-[#565656]'>Delivery Change:</p>
                <p className='text-[16px] leading-6 font-normal text-[#565656]'>${value?.deliveryCharge}</p>
            </div>

            <div className='w-full h-[1px] bg-[#BCBBCC] my-4'  />

            <div className='flex items-center justify-between'>
                <p className='text-[16px] leading-6 font-semibold text-[#3E3E3E]'>Total</p>
                <p className='text-[16px] leading-6 font-semibold text-[#3E3E3E]'>${value?.price}</p>
            </div>
        </div>
    )
    return (
        <div>
            <div className='flex items-center justify-between p-4'>
                    <Heading name='Transaction' style='font-medium text-[18px] leading-[24px] text-[#333333] text-center' />
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
                                ["S.no ", "Name", "Delivery date", "Price", "Total Items", "Action"].map((item, index)=>
                                <th key={index} className={`text-[18px] text-center py-2 leading-7 text-[#3E3E3E]`}>
                                    {item}
                                </th>
                                )
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            menus?.data?.map((item:any, index:number)=>
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'>{index + 1}</td>
                                        <td className='h-[50px] flex items-center justify-center gap-3 text-[16px] leading-5 text-[#636363] font-normal'>
                                            {
                                                item?.user?.profile
                                                &&
                                                <Image
                                                    alt="Catering"
                                                    src={  item?.user?.profile?.startsWith("https") ?  item?.user?.profile : `${imageUrl}${item?.user?.profile} `}
                                                    width={48}
                                                    height={48}
                                                />
                                            }
                                            {item?.user?.name}
                                        </td>
                                        <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'> {moment(item?.createdAt).format("L")} </td>
                                        <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'> {item?.price} </td>
                                        <td className='h-[50px] text-center text-[16px] leading-5 text-[#636363] font-normal'> {item?.totalItems} </td>
                                        <td className='h-[50px] text-center text-[16px] flex items-center justify-center gap-4 leading-5 text-[#636363] font-normal'>
                                            <Select
                                                style={{
                                                    width: "120px",
                                                    background: "transparent",
                                                    border: "none",
                                                    
                                                }}value={item?.status}
                                                onChange={(e)=>handleStatusChange(item?._id, e)}
                                            >
                                                <Select.Option value="packing">Packing</Select.Option>
                                                <Select.Option value="shipping">Shipping</Select.Option>
                                                <Select.Option value="delivered">delivered</Select.Option>
                                            </Select>
                                            <IoIosInformationCircle className='cursor-pointer' onClick={()=>(setOpen(true), setValue(item))} size={30} color='#735571' />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        }
                    </tbody>
                </table>

                <div className='my-6 flex items-center justify-center w-full'>
                    <Pagination onChange={(page) => setPage(page.toString())} current={parseInt(page)} showSizeChanger={false} total={menus?.pagination?.total} itemRender={itemRender} />
                </div>

                <Modal
                    title='Menu Transaction Details'
                    open={open}
                    setOpen={setOpen}
                    body={body}
                />
        </div>
    )
}

export default MenuTransactions
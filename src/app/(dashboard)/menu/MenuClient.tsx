"use client";
import Heading from '@/components/shared/Heading';
import { Button, Input, Pagination, PaginationProps, Select } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { GoSearch } from "react-icons/go";
import { IoIosInformationCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Catering from "@/assets/catering.png";
import Image from 'next/image';
import { useDeleteMenuMutation, useMenuQuery } from '@/redux/apiSlices/menuSlice';
import { imageUrl } from '@/redux/api/baseApi';
import { RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';
const {Option} = Select;

const MenuClient = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [menu, setMenu] = useState(null); // Set initial state to null
    const [meal, setMeal] = useState(null);
    const itemsPerPage = 10; // Adjust this value based on your pagination setup
    const {data: menus, refetch} = useMenuQuery({page: page, searchTerm: keyword, tab: menu, meal: meal});
    const [deleteMenu] = useDeleteMenuMutation();

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    const handleReset = () => {
        setKeyword("");
        setMenu(null);
        setMeal(null);
    };

    const handleDelete=async(id: string)=>{

        try {
            await deleteMenu(id).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    refetch()
                }
            });
            
        } catch (error: any) {
            toast.error(error.data.message || "An unexpected server error occurred");
        }

    }
    return (
        <div className=''>
            <div className='flex items-center justify-between p-4'>
                <Heading name='Menus' style='font-medium text-[18px] leading-[24px] text-[#333333] text-center' />

                <div className='flex items-center gap-6'>
                    <Input
                        prefix={<GoSearch size={18} color='#5C5C5C' />}
                        placeholder='Search By Menu'
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
                    <Select
                        style={{
                            width: 150,
                            height: 42,
                            background: "transparent",
                            border: "none",
                            
                        }}
                        placeholder={<p className='text-black'>Select Menu</p>}
                        value={menu}
                        onChange={(value) => setMenu(value)}
                    >
                        <Select.Option value="Full Menus">Full Menus</Select.Option>
                        <Select.Option value="Entree">Entree</Select.Option>
                        <Select.Option value="Breakfast">Breakfast</Select.Option>
                        <Select.Option value="Snacks">Snacks</Select.Option>
                    </Select>

                    <Select
                        style={{
                            width: 200,
                            height: 42,
                            background: "transparent",
                            border: "none",
                            
                        }}
                        placeholder={<p className='text-black'>Select Meal</p>}
                        value={meal}
                        onChange={(value) => setMeal(value)}
                    >
                        <Select.Option value="Small Meal">Small Meal</Select.Option>
                        <Select.Option value="Small Paleo Meal">Small Paleo Meal</Select.Option>
                        <Select.Option value="Medium Meal">Medium Meal</Select.Option>
                        <Select.Option value="Medium Paleo Meal">Medium Paleo Meal</Select.Option>
                        <Select.Option value="Large Meal">Large Meal</Select.Option>
                        <Select.Option value="Large Paleo Meal">Large Paleo Meal</Select.Option>
                    </Select>

                    <Link href={"/create-menu"}>
                        <Button 
                            style={{
                                background: "#6EA963",
                                color: "white",
                                border: "none",
                                height: 42
                            }}
                            icon={<BiPlus size={24} />}
                        >
                            Create Menu
                        </Button>
                    </Link>
                    <Button 
                        onClick={handleReset}
                        style={{
                            background: "#6EA963",
                            color: "white",
                            border: "none",
                            height: 42,
                            width: 42
                        }}
                        icon={<RefreshCcw size={24} />}
                    />
                </div>
            </div>
            
            <table className="w-full rounded-[5px] rounded-table">
                <thead>
                    <tr className="text-left w-full bg-[#FEE3B8] custom-table-row">
                        {
                            ["S.no ", "Image", "Menu Name", "Meal Plan", "Action"].map((item, index)=>
                            <th key={index} className={`text-[16px] py-2 ${index === 0 ? "pl-4" : "pl-0"} leading-7 text-[#3E3E3E]`}>
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
                                    <td className='h-[50px] pl-4 text-[15px] leading-5 text-[#636363] font-normal'>{((page - 1) * itemsPerPage) + index + 1}</td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>
                                        <Image
                                            alt="Catering"
                                            src={`${imageUrl}${item?.image}`}
                                            width={48}
                                            height={48}
                                        />
                                    </td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>{item?.menu}</td>
                                    <td className='h-[50px] text-[15px] leading-5 text-[#636363] font-normal'>{item?.mealPlan}</td>
                                    <td className='h-[50px] flex items-center gap-3 text-[12px] leading-5 text-[#636363] font-normal'>
                                        <CiEdit size={24} color='#735571' />
                                        <MdDelete style={{cursor: "pointer"}} onClick={()=>handleDelete(item?._id)} size={24} color='#BF757B' />
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>

            <div className='my-6 flex items-center justify-center w-full'>
                <Pagination showSizeChanger={false} total={menus?.meta?.total} onChange={(e)=>setPage(e)} itemRender={itemRender} />
            </div>
        </div>
    )
}

export default MenuClient;
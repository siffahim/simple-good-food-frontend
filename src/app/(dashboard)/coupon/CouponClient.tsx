"use client";
import Heading from '@/components/shared/Heading';
import Modal from '@/components/shared/Modal';
import { useCouponQuery, useCreateCouponMutation, useDeleteCouponMutation } from '@/redux/apiSlices/couponSlice';
import { Button, DatePicker, Form, Input } from 'antd';
import { Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CouponClient = () => {
    const [open, setOpen] = useState(false);
    const {data: coupons, refetch } = useCouponQuery(undefined);
    const [ createCoupon, {isLoading} ] = useCreateCouponMutation()
    const [ deleteCoupon ] = useDeleteCouponMutation();
    const [form] = Form.useForm();

    const handleDelete =async (id: string)=>{
        try {
            await deleteCoupon(id).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    refetch();
                }
            });
            
        } catch (error: any) {
            toast.error(error.data.message || "An unexpected server error occurred");
        }
    }

    const onSubmit = async(values:any)=>{
        try {
            await createCoupon(values).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    form.resetFields();
                    refetch()
                    setOpen(false)
                }
            });
            
        } catch (error: any) {
            console.log(error)
            toast.error(error.data.message || "An unexpected server error occurred");
        }
    }
    

    const body = (
        <div>
            <Form 
                form={form} 
                onFinish={onSubmit} 
                layout="vertical"
            >
                <Form.Item 
                    label="Coupon Code" 
                    name="couponCode"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Coupon Code"
                        }
                    ]}
                >
                    <Input
                        placeholder="Enter Coupon Code"
                        style={{
                            width: "100%",
                            height: 42,
                            background: "transparent",
                            border: "1px solid #DCDDDE",
                            borderRadius: 8,
                            outline: "none",
                            boxShadow:"none"
                        }}
                    />
                </Form.Item>

                <Form.Item 
                    label="Discount" 
                    name="couponDiscount"
                    getValueFromEvent={(event) => Number(event.target.value)}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Dicount Percentage"
                        }
                    ]}
                >
                    <Input
                        placeholder="Discount percentage"
                        style={{
                            width: "100%",
                            height: 42,
                            background: "transparent",
                            border: "1px solid #DCDDDE",
                            borderRadius: 8,
                            outline: "none",
                            boxShadow:"none"
                        }}
                        min={0}
                        type="number"
                    />
                </Form.Item>
                <Form.Item 
                    label="Validity Date" 
                    name="expireDate"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Coupon Expired Date"
                        }
                    ]}
                    valuePropName='expireDate'
                    getValueFromEvent={(value: any) => value.format("YYYY-MM-DD")}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{
                            width: "100%",
                            height: 42,
                            background: "transparent",
                            border: "1px solid #DCDDDE",
                            borderRadius: 8,
                            outline: "none",
                            boxShadow:"none"
                        }}
                    />
                </Form.Item>
                <Form.Item className='flex items-center justify-center'>
                    <Button 
                        htmlType='submit'
                        style={{
                            background: "#6EA963",
                            height: 42,
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow:"none"
                        }} 
                        className="px-10 mx-auto mt-5">{isLoading ? "Loading" : "Create" }</Button>
                </Form.Item>
            </Form>
        </div>
    )

    return (
        <div className='p-4'>
            <div className='flex items-center justify-between mb-6'>
                <Heading name='Coupons' style='font-medium text-[22px] leading-[30px] text-[#333333] text-center' />
                <Button
                    style={{
                        background: "#6EA963",
                        color: "white",
                        height: 40,
                        border: "none",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    icon={<Plus/>}
                    onClick={()=>setOpen(true)}
                >
                    Create Coupon
                </Button>
            </div>


            <table className="w-full rounded-[5px]" style={{borderRadius: "6px 6px 0 0"}}>
                <thead>
                    <tr className="text-left w-full bg-[#FEE3B8] " style={{borderRadius: "6px 6px 0 0"}}>
                        {
                            ["S.no ", "Coupon Code", "Discount", "Validity Date","Action"].map((item, index)=>
                            <th key={index} className={`text-[16px] text-center py-2 leading-7 text-[#3E3E3E]`}>
                                {item}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        coupons?.data?.map((item:any, index:number)=>
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='h-[50px] text-center font-normal text-[14px] leading-5 text-[#636363]'>{index + 1}</td>
                                    <td className='h-[50px] text-center font-normal text-[14px] leading-5 text-[#636363]'>{item?.couponCode}</td>
                                    <td className='h-[50px] text-center font-normal text-[14px] leading-5 text-[#636363]'>{item?.couponDiscount}%</td>
                                    <td className='h-[50px] text-center font-normal text-[14px] leading-5 text-[#636363]'>{item?.expireDate}</td>
                                    <td className='h-[50px] text-center font-normal text-[14px] flex items-center justify-center gap-4 leading-5 text-[#636363]'>
                                        <Trash onClick={()=>handleDelete(item?._id)} size={20} className='cursor-pointer' color='red' /> 
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }
                </tbody>
            </table>
            
            <Modal
                title='Create Coupon'
                body={body}
                open={open}
                setOpen={setOpen}
                form={form}
            />

        </div>
    )
}

export default CouponClient
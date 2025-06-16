"use client";
import Heading from '@/components/shared/Heading';
import Modal from '@/components/shared/Modal';
import { useChargeQuery, useUpdateChargeMutation } from '@/redux/apiSlices/deliverySlice';
import { Button, Form, Input, Spin } from 'antd';
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const DeliveryClient = () => {
    const [open, setOpen] = useState(false)
    const {data: charge, refetch} = useChargeQuery(undefined);
    const [ updateCharge, {isLoading} ] = useUpdateChargeMutation()

    const handleUpdate= async(values: any)=>{
        try {
            await updateCharge({id: charge?.data?._id, updatedData: values}).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    refetch();
                    setOpen(false)
                }
            });
            
        } catch (error: any) {
            toast.error(error?.data?.message ? error?.data?.message : "An unexpected server error occurred");
        }
    }

    const body = (
        <Form
            onFinish={handleUpdate}
            layout='vertical'
            className='mt-4'
        >
            <Form.Item
                name={"charge"}
                rules={[
                    {
                        required: true,
                        message: "Please Enter Delivery Charge"
                    }
                ]}
                label="Charge"
            >
                <Input
                    placeholder='Enter Delivery Charge Amount'
                    style={{
                        width: "100%",
                        height: 42,
                        border: "1px solid #ECECEC",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    type='number'
                />
            </Form.Item>
            <Form.Item className='flex items-center justify-center'>
                <Button
                    htmlType='submit'
                    style={{
                        height: 42,
                        width: 150,
                        background: "#6EA963",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        color: "white"
                    }}
                >
                    { isLoading ? <Spin size='small' /> : "Update" }
                </Button>
            </Form.Item>
        </Form>
    )

    return (
        <div>
            <Heading name='Delivery Charge' style='font-medium mb-3 p-4 text-[18px] leading-[24px] text-[#333333]' />

            <table className="w-full rounded-[5px] rounded-table">
                <thead>
                    <tr className="text-left w-full bg-[#FEE3B8] custom-table-row">
                        {
                            ["S.no ", "Charge", "Action"].map((item, index)=>
                            <th key={index} className={`text-[16px] text-center py-2 leading-7 text-[#3E3E3E]`}>
                                {item}
                            </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='h-[50px] text-center text-[15px] leading-5 text-[#636363] font-normal'>1</td>
                        <td className='h-[50px] text-center text-[15px] leading-5 text-[#636363] font-normal'>{charge?.data?.charge}%</td>
                        <td className='h-[50px] text-center text-[15px] flex items-center justify-center gap-4 leading-5 text-[#636363] font-normal'>
                            <Edit onClick={()=>setOpen(true)} className='cursor-pointer' size={18} color='#735571' />
                        </td>
                    </tr>
                </tbody>
            </table>

            <Modal
                title='Edit Delivery Charge'
                setOpen={setOpen}
                open={open}
                body={body}
            />
        </div>
    )
}

export default DeliveryClient
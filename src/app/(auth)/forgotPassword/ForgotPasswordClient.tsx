"use client"
import Heading from '@/components/shared/Heading';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from '@/redux/apiSlices/authSlice';
import toast from 'react-hot-toast';

const ForgotPasswordClient = () => {
    const [form] = Form.useForm();
    form.setFieldsValue(undefined)
    const router = useRouter();
    const [ forgotPassword, {isLoading} ] = useForgotPasswordMutation();

    const handleSubmit=async(values:any)=>{
        try {
            await forgotPassword(values).unwrap().then((result)=>{
                if (result?.success) {
                    form.resetFields()
                    toast.success(result.message);
                    router.push(`/otp-verify?email=${values?.email}&type=forgot`);
                }
            });
        } catch (error: any) {
            toast.error(error.data.message || "An unexpected server error occurred");
        }
    }
    
    
    return (
        <div className='bg-[#FEFEFE] bg-opacity-[90%] rounded-[16px] p-[50px]'>
            <div>
                <Link href={"/login"}>
                    <FiArrowLeft size={24} color='#3E3E3E' />
                </Link>
            </div>
            <Heading name='Forgot password' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <Form onFinish={handleSubmit} form={form} layout='vertical'>

                <Form.Item
                    name="email"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Email</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email!"
                        }
                    ]}
                >
                    <Input
                        placeholder='Enter Email'
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                        className='poppins placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 150,
                            height: 50,
                            background: "#6EA963",
                            color: "#ffffff"
                        }}
                    >
                        {isLoading? "Sending" : "Send Code"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPasswordClient
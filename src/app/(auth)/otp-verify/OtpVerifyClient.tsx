"use client"
import Heading from '@/components/shared/Heading';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useEmailVerifyMutation } from '@/redux/apiSlices/authSlice';
import toast from 'react-hot-toast';


const OtpVerifyClient = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    form.setFieldsValue(undefined);
    const [ emailVerify, {isLoading} ] = useEmailVerifyMutation();
    const emailParams = useSearchParams()
    const email = emailParams.get('email')
    const type = emailParams.get('type')

    const handleSubmit= async(values:any)=>{

        const otpValue = {
            email: email,
            oneTimeCode: Number(values?.otp)
        }

        try {
            await emailVerify(otpValue).unwrap().then((result)=>{
                if (result?.success) {
                    form.resetFields()
                    toast.success(result.message);
                    if(type === "forgot"){
                        router.push(`/reset-password?token=${result?.data}`);
                    }else{
                        router.push('/login');
                    }
                }
            });
        } catch (error: any) {
            console.log(error)
            toast.error(error.data.message || "An unexpected server error occurred");
        }

    }
    
    return (
        <div className='bg-[#FEFEFE] bg-opacity-[90%] rounded-[16px] p-[50px]'>
            
            <Heading name='Verification code' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <p className="text-[#929394] poppins text-[16px] leading-[25px] font-normal ">
                We sent a reset link to <span className="text-secondary">{email}</span>  enter 5 digit code that
                mentioned in the email
            </p>

            <Form 
                onFinish={handleSubmit} 
                form={form} 
                layout='vertical'
                className='mt-6 otp'
            >

                <Form.Item
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter 5 Digit OTP"
                        }
                    ]}

                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Input.OTP
                        length={4}
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            background: "transparent"
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
                        {isLoading ? "Verifying" : "Code Verify"}
                    </Button>
                </Form.Item>

                <p className="text-[#636363] text-[16px] leading-[21px] font-normal text-center">
                    You have not received the email?
                    <Link className='ml-2' href={"/register"}>
                        <span className='text-[#6EA963] cursor-pointer font-semibold'>Resend</span>
                    </Link> 
                </p>
            </Form>
        </div>
    )
}

export default OtpVerifyClient
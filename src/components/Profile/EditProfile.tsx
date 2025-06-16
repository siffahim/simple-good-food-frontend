"use client"
import { useProfileQuery, useUpdateProfileMutation } from '@/redux/apiSlices/authSlice';
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface IEditProfileProps{
    image: File | null;
    setImage: ( image : null )=> void;
}

const EditProfile: React.FC<IEditProfileProps> = ({image, setImage}) => {
    const {data: profile, isLoading, refetch} = useProfileQuery(undefined);
    const [updateProfile, {isLoading: isUpdateLoading}] = useUpdateProfileMutation();
    const [form] = Form.useForm();

    useEffect(()=>{
        if(profile){
            form.setFieldsValue(profile)
        }
    }, [profile, form]);

    if(isLoading){
        return <p>Loading...</p>
    }

    const handleSubmit=async(values:any)=>{
        const formData = new FormData();

        if(image){
            formData.append("image", image);
        }

        Object.keys(values).forEach((key)=>{
            formData.append(key, values[key]);
        })

        try {
            await updateProfile({ ...values }).unwrap().then((result)=>{
                if (result?.success) {
                    // setImage(null)
                    toast.success(result?.message);
                    refetch()
                }
            });
            
        } catch (error: any) {
            toast.error(error?.data?.message || "An unexpected server error occurred");
        }
        
    }

    return (
        <Form
            onFinish={handleSubmit}
            layout="vertical"
            form={form}
            className='max-w-[481px] mx-auto'
        >
            <Form.Item
                name="name"
                label={<p className="text-[#636363] text-[16px] leading-6 font-normal">User Name</p>}
            >
                <Input
                    style={{
                        width: "100%",
                        height: 48,
                        background: "transparent",
                        border: "1px solid #D6D6D6",
                        borderRadius: "8px",
                        color: "#818181",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    className='text-[16px] leading-5 placeholder:text-[#818181]'
                    placeholder="Enter User Name"
                />
            </Form.Item>

            <Form.Item
                name="email"
                label={<p className="text-[#636363] text-[16px] leading-6 font-normal">Email</p>}
            >
                <Input
                    style={{
                        width: "100%",
                        height: 48,
                        background: "transparent",
                        border: "1px solid #D6D6D6",
                        borderRadius: "8px",
                        color: "#818181",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    className='text-[16px] leading-5 placeholder:text-[#818181]'
                    placeholder='Enter Your Email'
                />
            </Form.Item>

            <Form.Item
                name="contact"
                label={<p className="text-[#636363] text-[16px] leading-6 font-normal">Contact Number</p>}
            >
                <Input
                    style={{
                        width: "100%",
                        height: 48,
                        background: "transparent",
                        border: "1px solid #D6D6D6",
                        borderRadius: "8px",
                        color: "#818181",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    className='text-[16px] leading-5 placeholder:text-[#818181]'
                    placeholder="Enter Contact Number"
                />
            </Form.Item>

            <Form.Item
                name="location"
                label={<p className="text-[#636363] text-[16px] leading-6 font-normal">Location</p>}
            >
                <Input
                    style={{
                        width: "100%",
                        height: 48,
                        background: "transparent",
                        border: "1px solid #D6D6D6",
                        borderRadius: "8px",
                        color: "#818181",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    className='text-[16px] leading-5 placeholder:text-[#818181]'
                    placeholder="Enter Your Location"
                />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Button
                    htmlType="submit"
                    style={{
                        width: 197,
                        height: 48,
                        color: "#FCFCFC",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        background: "#6EA963"
                    }}
                >
                     {isUpdateLoading ? "Updating" : "Save & Changes"}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditProfile
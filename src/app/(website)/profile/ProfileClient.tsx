"use client";
import Heading from '@/components/shared/Heading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from "@/assets/logo.png";
import { CiEdit } from 'react-icons/ci';
import EditProfile from '@/components/Profile/EditProfile';
import OrderHistory from '@/components/Profile/OrderHistory';
import ChangePassword from '@/components/Profile/ChangePassword';
import { useProfileQuery } from '@/redux/apiSlices/authSlice';
import { imageUrl } from '@/redux/api/baseApi';

const ProfileClient = () => {
    const [image, setImage] = useState<File | null>(null);
    const [tab, setTab] = useState("Edit Profile");
    const {data: user, isLoading} = useProfileQuery(undefined);

    useEffect(() => {
        const initialTab = new URLSearchParams(window.location.search).get('tab') || "Edit Profile";
        setTab(initialTab);
    }, []);

    const handleTabChange = (tab: string) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const src = image ? URL?.createObjectURL(image) :  user?.profile?.startsWith("https") ? user?.profile : `${imageUrl}${user?.profile}`;

    if(isLoading){
        return <p>Loading....</p>
    }


    return (
        <div className='container pt-[95px]'>

            {/* header of profile */}
            <div className='bg-[#F9F9F9] py-9 px-10 rounded flex flex-col items-center justify-center gap-6' >
                {/* image container */}
                <div>
                    <input type="file" onChange={handleChange} id='img' style={{ display: "none" }} />
                    <div className='relative w-fit h-fit shadow-lg rounded-full mx-auto'>
                        <Image
                            src={src}
                            alt='Profile'
                            width={120}
                            height={120}
                            className='mx-auto'
                            style={{borderRadius: "100%"}}
                        />

                        {/* image upload controller */}
                        <label
                            htmlFor="img"
                            className={`
                                absolute top-1/2 -right-2 
                                bg-white 
                                rounded-full 
                                w-6 h-6 
                                ${tab === "Edit Profile" ? "flex" : "hidden"} 
                                items-center justify-center 
                                cursor-pointer
                            `}
                        >
                            <CiEdit color='#929394' />
                        </label>
                    </div>

                    {/* user Name */}
                    <Heading name='Simple Foods' style='text-[#333333] text-[32px] leading-[48px] font-medium mb-4' />
                </div>
            </div>



            {/* tab title and tab change controller */}
            <ul className='flex flex-col md:flex-row items-center justify-center gap-6 my-6'>
                {
                    ["Edit Profile", "Order History", "Change Password"].map((item ,index)=>{
                        return(
                            <li 
                                onClick={() => handleTabChange(item)}
                                key={index}
                                className={`
                                    ${item === tab ? "border-secondary text-secondary border-b-2" : "border-b-2 border-transparent"}
                                    pb-2 cursor-pointer text-[16px] leading-6 font-medium  text-[#7E7E7E]
                                `}
                            >
                                {item}
                            </li>
                        )
                    })
                }
            </ul>

            <div className='bg-[#F9F9F9]  rounded py-6 px-6 md:px-0'>
                {/* Title Of the Tab name */}
                <Heading 
                    name={tab}
                    style='text-[#333333] text-[24px] leading-[28px] text-center font-medium mb-6'
                />
                
                
                {/* edit profile section */}
                <div style={{display: tab === "Edit Profile" ? "block" : "none"}}>
                    <EditProfile image={image} setImage={setImage} />
                </div>

                {/* order history section */}
                <div style={{display: tab === "Order History" ? "block" : "none"}}>
                    <OrderHistory />
                </div>

                {/* Change Password section */}
                <div style={{display: tab === "Change Password" ? "block" : "none"}}>
                    <ChangePassword />
                </div>
            </div>

        </div>
    )
}

export default ProfileClient
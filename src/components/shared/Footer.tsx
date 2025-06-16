"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from "@/assets/logo.png";
import Heading from './Heading';
import { Button, Input } from 'antd';

const Footer = () => {
    const [keyword, setKeyword] = useState("");
    const item = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Our Menus",
            path: "/menus"
        },
        {
            label: "Meal Plan",
            path: "/meal"
        },
        {
            label: "Catering",
            path: "/catering"
        }
    ]

    const items = [
        {
            label: "How it works",
            path: "/workflow"
        },
        {
            label: "Testimonials",
            path: "/testimonials"
        },
        {
            label: "FAQ",
            path: "/faq"
        },
    ]
    return (
        <div className='bg-[#F9F9F9] mt-6 md:mt-16'>
            <div className='container grid grid-cols-12 py-[30px] gap-8 md:gap-0'>
                <div className='col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-3 mx-auto sm:mx-0'>
                    <Link href={"/"}>
                        <Image alt='Logo' src={Logo} width={150} height={150} />
                    </Link>
                </div>

                <div className='col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-3 flex flex-col gap-4'>
                    {
                        item.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#555656] 
                                        border-[#D9D9D9]
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='col-span-6 sm:col-span-6  md:col-span-4 lg:col-span-3 flex flex-col gap-4'>
                    {
                        items.map((menu, index) => {
                            return(
                                <Link 
                                    key={index} 
                                    className={`
                                        h-[21px]
                                        font-normal text-[16px] leading-6 
                                        text-[#555656] 
                                        border-[#D9D9D9]
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-3'>
                    <Heading name='Subscribe To Our Email Alerts' style='font-semibold text-[16px] leading-[20px] text-[#575757] mb-2' />
                    <div className='w-full flex md:items-center flex-col md:flex-row gap-4'>
                        <Input
                            placeholder='Enter Your Email'
                            style={{
                                width: "100%",
                                height: 40,
                                border: "1px solid #BBBBBB",
                                boxShadow: "none",
                                outline: "none",
                                color: "#5C5C5C",
                                background:"#FFFFFF"
                            }}
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                            className='placeholder:text-[#5C5C5C]'
                        />

                        <Button 
                            onClick={()=>setKeyword("")}
                            htmlType='submit'
                            style={{
                                background: "#6EA963",
                                color: "white",
                                border: "none",
                                height: 42
                            }}
                        >
                            Subscribe
                        </Button>

                    </div>
                </div>
            </div>

            <div className='bg-black py-3'>
                <p className='text-center text-[#ffffff]'>© All rights reserved by Simply Good Foods</p>
            </div>
        </div>
    )
}

export default Footer
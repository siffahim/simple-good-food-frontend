"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import Logo from "@/assets/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { Menu } from 'lucide-react';
import { Drawer, Input } from 'antd';
import { X } from 'lucide-react';
import Modal from './Modal';
import { UserContext, useUser } from '@/provider/User';
import { imageUrl } from '@/redux/api/baseApi';
import { usePutFeedbackMutation } from '@/redux/apiSlices/feedbackSlice';
import toast from 'react-hot-toast';


const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openFeedBackModal, setOpenFeedBackModal] = useState(false);
    const {user, setUser} = useUser();
    const [feedback, setFeedback] = useState("")
    const [putFeedback, {isLoading}] = usePutFeedbackMutation()
    
    
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
        },
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

    
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]); 

    const handleFeedback = async (user:any)=>{
        try {
            await putFeedback({ feedback: feedback }).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    setOpenFeedBackModal(false)
                }
            });
            
        } catch (error: any) {
            toast.error(error.data.message || "An unexpected server error occurred");
        }
    }

    const body=(
        <div>
            <p className='text-[16px] leading-6 font-normal text-[#636363] mb-2'>Discursive Your FeedBack</p>
            <div>
                <Input.TextArea
                    style={{
                        resize: "none",
                        height: 150,
                        border: "1px solid #DCDDDE",
                        color: "#818181",
                        outline: "none",
                        boxShadow: "none"
                    }}
                    onChange={(e)=>setFeedback(e.target.value)}
                    className='placeholder:text-[#818181] placeholder:text-[14px] placeholder:leading-[20px]'
                    placeholder='Write Your Feedback'
                />
                <button 
                    onClick={()=> handleFeedback(user)} 
                    className='border-none mt-10 font-medium text-[14px] leading-6 bg-primary text-white w-full h-10 rounded-lg'
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </div>
        </div>
    )

    const handleLogout=()=>{
        setUser(null);
        setOpen(false)
        localStorage.removeItem("token")
    }
    
    return (
        <div className='fixed z-10 top-0 w-full left-0 bg-white border-b-[1px] border-[#00000] border-opacity-[40%]'>
            <div className='container relative  flex items-center justify-between h-20'>
                <Link href={"/"}>
                    <Image alt='Logo' src={Logo} width={70} height={70} />
                </Link>

                <div className="hidden  lg:flex items-center">
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
                                        ${index === 0 ? "pr-[19px]" : "px-[19px]"}
                                        ${index === item.length - 1 ? "border-none" : "border-r-[1px] "}
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className='flex items-center gap-6'>
                    <div className={` ${user?._id ? "hidden" : "flex"} items-center gap-6`}>
                        <Link 
                            href={"/login"}
                            className=' font-normal w-[104px] h-10 rounded-lg border border-primary text-primary hidden  lg:flex items-center justify-center text-[16px] leading-6'
                        > 
                            Log in
                        </Link>

                        <Link 
                            href={"/register"} 
                            className='font-normal w-[104px] h-10 rounded-lg bg-primary text-white hidden  lg:flex items-center justify-center text-[16px] leading-6'
                        >
                            Sign up
                        </Link>
                    </div>

                    <Menu onClick={()=>setOpenDrawer(true)} className='block cursor-pointer lg:hidden' size={40} color='#6EA963' />

                    {/* user menu */}
                    <div 
                        onClick={()=>setOpen(true)} 
                        className={`w-10 bg-[#F1F1F1] h-10 cursor-pointer rounded-full ${user?._id ? "flex" : "hidden"} items-center justify-center`}
                    >
                        {
                            user?._id
                            ?
                            <Image
                                src={ user?.profile?.startsWith("https") ? user?.profile : `${imageUrl}${user?.profile}`}
                                alt='profile'
                                width={24}
                                height={24}
                                style={{borderRadius: "100%"}}
                            />
                            :
                            <AiOutlineUser size={24} color='#6EA963'/>
                        }
                    </div>

                    {
                        open &&
                    
                        <div
                            ref={dropdownRef}
                            style={{
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                            }}
                            className='absolute bg-white top-16 right-0 rounded w-[150px]'
                        >
                            <ul className='grid grid-cols-1 gap-1'>
                                <li style={{display: user?._id ? "block" : "none"}} onClick={()=>(setOpen(false), setOpenFeedBackModal(true))} className='text-[#656565]  cursor-pointer transition-all duration-100 text-[14px] rounded-t-sm text-center  hover:bg-primary hover:text-white leading-6 font-normal py-2'>FeedBack</li>
                                <Link href={"/profile"}  style={{display: user?._id ? "block" : "none"}}>
                                    <li onClick={()=>setOpen(false)} className='text-[#656565] transition-all duration-100 text-center hover:bg-primary hover:text-white text-[14px] leading-6 font-normal py-2'>Profile</li>
                                </Link>
                                <Link  href={"/transactions"} style={{display: user?.role === "ADMIN" ? "block" : "none"}}>
                                    <li onClick={()=>setOpen(false)} className='text-[#656565] transition-all duration-100 text-center hover:bg-primary hover:text-white text-[14px] leading-6 font-normal py-2'>Dashboard</li>
                                </Link>
                                <li onClick={handleLogout} className='text-[#656565] cursor-pointer transition-all duration-100 text-center rounded-b-sm hover:bg-primary hover:text-white  text-[14px] leading-6 font-normal py-2'>Log Out</li>
                            </ul>
                        </div>
                    }

                </div>
            </div>
            

            <Drawer
                title={<div className='flex items-center justify-between'>
                    <Link href={"/"}>
                        <Image alt='Logo' src={Logo} width={40} height={40} />
                    </Link>
                    <X onClick={()=>setOpenDrawer(false)} color='black' className='cursor-pointer' size={30} />
                </div>}
                placement={"left"}
                closable={false}
                onClose={()=>setOpenDrawer(false)}
                open={openDrawer}
                key={"left"}
                
            >
                <div className="flex items-start justify-center flex-col gap-6">
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
                                        hover:text-primary
                                    `} 
                                    href={`${menu.path}`}
                                >
                                    {menu.label}
                                </Link>
                            )
                        })
                    }
                </div>
            </Drawer>

            <Modal
                title='Feedback'
                open={openFeedBackModal}
                setOpen={setOpenFeedBackModal}
                body={body}
            />

        </div>
    )
}

export default Navbar
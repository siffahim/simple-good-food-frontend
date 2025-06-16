"use client";
import Heading from '@/components/shared/Heading';
import Image from 'next/image';
import React from 'react';
import Catering from "@/assets/catering.png";
import location from "@/assets/location.png";
import catering from "@/assets/event.png";
import rose from "@/assets/rose.png";
import banner from "@/assets/banner2.png"
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const CateringClient = () => {
    return (
        <>
            <div className='container mt-[100px] mb-[50px] md:mb-[100px]'>
                <Heading name='Our Story' style='font-bold text-[40px] leading-[46px] text-[#333333] mb-6' />

                <div className='grid grid-cols-12 items-center h-full lg:h-[481px] gap-6 md:gap-10 mb-6 md:mb-20'>
                    <div className='col-span-12 lg:col-span-6 order-2 lg:order-1'>
                        <p className='text-[14px] leading-5 font-normal text-[#656565]'>
                            scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. 
                            faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus 
                            Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque 
                            luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, 
                            Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis 
                            convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla 
                            lacus dui. consectetur venenatis placerat. placerat lacus, at viverra 
                        </p>

                        <br />

                        <p className='text-[14px] leading-5 font-normal text-[#656565]'>
                            scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. 
                            faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus 
                            Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque 
                            luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, 
                            Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis 
                            convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla 
                            lacus dui. consectetur venenatis placerat. placerat lacus, at viverra 
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6 h-full lg:h-[481px] relative order-1 lg:order-2">
                        <Image
                            alt="Catering"
                            src={Catering}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <Heading name='Perfect for any occasion' style='font-bold text-center text-[32px] md:text-[40px] leading-[38px] md:leading-[46px] text-[#333333] mb-[20px] md:mb-[60px]' />

                    <div className='w-full lg:w-[876px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
                        <div className='bg-[#F1EEF1] rounded-lg p-6'>
                            <Image
                                alt='location'
                                width={80}
                                height={100}
                                src={location}
                                className='mx-auto'
                            />
                            <p className='font-semibold my-6 text-[24px] text-center leading-[28px] text-[#3E3E3E] mb-3'>Business Catering</p>
                            <p className='font-normal mb-6 text-[14px] leading-4 text-[#000000]'>Catering everyone will love, with convenient delivery and setup included,</p>
                            <ul className='list-disc ml-4'>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000] '>Holiday Parties</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000] '>Office Meetings</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000] '>Employee Appreciation</li>
                            </ul>
                        </div>

                        <div className='bg-[#E9F2E8] rounded-lg p-6'>
                            <Image
                                alt='location'
                                width={80}
                                height={100}
                                src={catering}
                                className='mx-auto'
                            />
                            <p className='font-semibold my-6 text-[24px] text-center leading-[28px] text-[#3E3E3E] mb-3'>Event Catering</p>
                            <p className='font-normal mb-6 text-[14px] leading-4 text-[#000000]'>Celebrate life&apos;s special moments with a meal everyone will love.</p>
                            <ul className='list-disc ml-4'>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Birthday</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Anniversary</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Family & Friends Gathering</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>School Function</li>
                            </ul>
                        </div>

                        <div className='bg-[#F9F1F2] rounded-lg p-6'>
                            <Image
                                alt='location'
                                width={80}
                                height={100}
                                src={rose}
                                className='mx-auto'
                            />
                            <p className='font-semibold my-6 text-[24px] text-center leading-[28px] text-[#3E3E3E] mb-3'>Bridal Category</p>
                            <p className='font-normal mb-6 text-[14px] leading-4 text-[#000000]'>A once in a lifetime moment calls for an unforgettable meal.</p>
                            <ul className='list-disc ml-4'>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Rehearsal Dinner</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Wedding</li>
                                <li  className='font-normal text-[14px] leading-7 text-[#000000]'>Bridal Shower</li>
                            </ul>
                        </div>

                    </div>
            </div>

            
            <div className='grid grid-cols-12 h-full md:h-[429px] pb-10'>
                <div className="col-span-12 md:col-span-6 order-1 sm:order-1 relative">
                    <Image
                        alt="Catering"
                        src={banner}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                
                <div className='col-span-12 md:col-span-6 order-2 sm:order-2 relative bg-[#F4F4F4] py-6'>
                    <div className="ml-0 sm:ml-[46px] bg-[#3E3E3E] h-full flex flex-col items-start justify-center relative z-0">
                        <div className='p-6'>
                            <Heading name='Contact Us' style='font-bold text-[32px] leading-[48px] text-[#FAFAFA] mb-6' />
                            <p className="flex gap-4 mb-6 items-center text-[#F4F4F4] font-normal text-[16px] leading-5">
                                <FaMapMarkerAlt size={16} color='#F4F4F4'/>
                                AAA/7, Area R/A 
                            </p>
                            <p className="flex gap-4  mb-6 items-center text-[#F4F4F4] font-normal text-[16px] leading-5">
                                <FaPhone  size={16} color='#F4F4F4' />
                                +9999999999
                            </p>
                            <p className="flex gap-4 mb-6 items-center text-[#F4F4F4] font-normal text-[16px] leading-5">
                                <FaEnvelope  size={16} color='#F4F4F4' />
                                Ecom@Gmail.Com
                            </p>
                            <p className="flex gap-4 mb-6 items-center text-[#F4F4F4] font-normal text-[16px] leading-5">
                                <FaClock  size={16} color='#F4F4F4' />
                                9:00am - 9:00pm
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CateringClient
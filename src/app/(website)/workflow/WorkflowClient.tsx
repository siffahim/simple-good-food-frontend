"use client";
import Heading from '@/components/shared/Heading';
import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import health from "@/assets/helth.png";
import protein from "@/assets/protein.png";
import variety from "@/assets/varity.png";
import work from "@/assets/work.png";
import weekly from "@/assets/weekly.png";
import cancel from "@/assets/cancel.png";
import pause from "@/assets/pause.png";
import play from "@/assets/play.png";
import Image from 'next/image';
import SimpleFood from '@/components/SimpleFood';
type ContentRef = HTMLDivElement | null;


const WorkflowClient = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<ContentRef[]>([]);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        if (openIndex !== null && contentRefs.current[openIndex]) {
            contentRefs.current[openIndex]!.style.maxHeight = `${contentRefs.current[openIndex]!.scrollHeight}px`;
        }
        contentRefs.current.forEach((ref, index) => {
            if (ref && index !== openIndex) {
                ref.style.maxHeight = '0px';
            }
        });
    }, [openIndex]);

    return (
        <div className='container mt-[120px]'>

            {/* work flow heading */}
            <div className='grid grid-cols-12 gap-6 lg:gap-20'>
                <div className='col-span-12 lg:col-span-6 order-2 lg:order-1'>
                    <Heading name='How it Works' style='font-bold text-[32px] leading-[48px] text-[#000000] mb-6' />
                    <div className='grid grid-cols-1 gap-4'>
                        {
                            [...Array(5)].map((_item: any, index) => {
                                return (
                                    <div onClick={() => toggleAccordion(index)} key={index}
                                        ref={(el) => {
                                            if (el) {
                                            contentRefs.current[index] = el;
                                            }
                                        }}
                                        className='accordion-content overflow-hidden transition-max-height duration-300 ease-in-out p-7 pt-2 rounded-[4px] border border-secondary   border-opacity-[12%] cursor-pointer relative'
                                        style={{
                                            maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px'
                                        }}
                                    >
                                        <MdKeyboardArrowRight color='#FDB64E' className={`bg-[#ECECEC] absolute top-[6px] right-2 border rounded-full text-2xl transition-all ${openIndex === index ? 'rotate-90' : ''} `} />
                                        <p className='text-[16px] leading-6 font-medium text-[#3E3E3E]'>
                                            {
                                                "What are the foods like Steel Yat? How does the mail plan work?"
                                            }
                                        </p>

                                        <div className='text-[16px] leading-6 font-normal text-secondary mt-2'>
                                            {
                                                "Lorem30"
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 h-[300px] md:h-[426px] relative">
                    <Image
                        alt="Catering"
                        src={work}
                        fill
                    />
                </div>
            </div>

            {/* work flow body */}
            <div className='bg-[#F1F1F1] rounded-xl p-10 my-20'>
                <Heading name='How it Works' style='font-bold text-[32px] leading-[48px] text-[#000000] mb-3' />
                <p className='font-normal text-[16px] leading-[24px] text-[#656565]'>Subscribe for free shipping. Just pick your meals, tell us how often you want them, <br /> and then we&apos;ll take care of the rest.</p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[928px] mx-auto mt-10'>
                    <div className='flex gap-6'>
                        <Image
                            src={weekly}
                            alt='icon'
                            width={64}
                            height={40}
                            style={{ objectFit: 'fill' }}
                        />
                        <div>
                            <Heading name='Weekly Delivery' style='font-semibold text-[16px] leading-[21px] text-[#000000] mb-2' />
                            <p className='font-normal text-[14px] leading-[21px] text-[#656565]'>
                                Subscribe for free shipping. Just pick your meals, tell us how often you want them,and then we&apos;ll take care of the rest.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <Image
                            src={cancel}
                            alt='icon'
                            width={64}
                            height={40}
                            style={{ objectFit: 'fill' }}
                        />
                        <div>
                            <Heading name='Cancel Anytime' style='font-semibold text-[16px] leading-[21px] text-[#000000] mb-2' />
                            <p className='font-normal text-[14px] leading-[21px] text-[#656565]'>
                                Subscribe for free shipping. Just pick your meals, tell us how often you want them,and then we&apos;ll take care of the rest.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <Image
                            src={pause}
                            alt='icon'
                            width={64}
                            height={40}
                            style={{ objectFit: 'fill' }}
                        />
                        <div>
                            <Heading name='Pause Anytime' style='font-semibold text-[16px] leading-[21px] text-[#000000] mb-2' />
                            <p className='font-normal text-[14px] leading-[21px] text-[#656565]'>
                                Subscribe for free shipping. Just pick your meals, tell us how often you want them,and then we&apos;ll take care of the rest.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <Image
                            src={play}
                            alt='icon'
                            width={64}
                            height={40}
                            style={{ objectFit: 'fill' }}
                        />
                        <div>
                            <Heading name='Pause Anytime' style='font-semibold text-[16px] leading-[21px] text-[#000000] mb-2' />
                            <p className='font-normal text-[14px] leading-[21px] text-[#656565]'>
                                Subscribe for free shipping. Just pick your meals, tell us how often you want them,and then we&apos;ll take care of the rest.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* aminities */}
            <div>
                <SimpleFood/>
            </div>
        </div>
    )
}

export default WorkflowClient
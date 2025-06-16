"use client"
import Heading from '@/components/shared/Heading';
import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
type ContentRef = HTMLDivElement | null;


const Faq = () => {
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
        <div className='container mt-[120px] grid grid-cols-1 gap-6 mb-16'>
            <Heading name='Popular Frequently Asked Questions' style='font-bold text-[40px] leading-[46px] text-[#333333] text-center mb-4' />
            <p className="text-[#656565] text-[14px] leading-[18px] text-center font-normal">
                <span className="text-primary">Simply Good Food </span> 
                prepares and delivers organically sourced, fresh meals to your door nationwide. 
                Unlike other meal kit delivery services that need preparation and 
                cleaning, our meals are delivered ready to consume. 
                Our mission is to make healthy eating easy and enjoyable 
                while not sacrificing flavor. Do you have a question regarding our shipping service?
            </p>
            <>
                {
                    [...Array(5)].map((_item: any, index) => {
                        return (
                            <div onClick={() => toggleAccordion(index)} key={_item?._id}
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
            </>

        </div>
    )
}

export default Faq;
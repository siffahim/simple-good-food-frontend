import React from 'react'
import Heading from './shared/Heading';
import health from "@/assets/helth.png";
import Image from 'next/image';
import protein from "@/assets/protein.png";
import variety from "@/assets/varity.png";

const SimpleFood = () => {
    return (
        <div className='container mt-16'>
            <Heading name='Why Simply Good Food ' style='font-bold text-[40px] leading-[46px] text-[#333333] text-center mb-10' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
                <div>
                    <Image
                        src={health}
                        alt='icon'
                        width={80}
                        height={80}
                        className='mx-auto'
                    />
                    <Heading name='Health awareness' style='font-medium text-center text-[24px] leading-[28px] text-[#3E3E3E] my-4' />
                    <p className='font-normal text-[14px] leading-[20px] text-[#656565] text-center'>
                        Subscribe for free shipping. Just pick your meals, tell us how often you want them,and then we&apos;ll take care of the rest.
                    </p>
                </div>
                <div>
                    <Image
                        src={protein}
                        alt='icon'
                        width={80}
                        height={80}
                        className='mx-auto'
                    />
                    <Heading name='More Protein' style='font-medium text-center text-[24px] leading-[28px] text-[#3E3E3E] my-4' />
                    <p className='font-normal text-[14px] leading-[20px] text-[#656565] text-center'>
                        Protein-rich meals to FUEL your workouts, improve recuperation, and increase outcomes.
                    </p>
                </div>
                <div>
                    <Image
                        src={variety}
                        alt='icon'
                        width={80}
                        height={80}
                        className='mx-auto'
                    />
                    <Heading name='Unending Variety' style='font-medium text-center text-[24px] leading-[28px] text-[#3E3E3E] my-4' />
                    <p className='font-normal text-[14px] leading-[20px] text-[#656565] text-center'>
                        Select breakfasts, snacks, and bulk proteins/sides. You can change it up at any moment or stick with the same routine.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SimpleFood
"use client"
import React from 'react'
import FaqClient from '../faq/FaqClient'
import SimpleFood from '@/components/SimpleFood'
import FoodBanner from '@/components/Home/FoodBanner'
import Banner from '@/components/Home/Banner'
import NewProduct from '@/components/Home/NewProduct'
const HomeClient = () => {

    return (

        <div className=' mt-[100px] md:mt-[80px]'>
            <Banner/>
            <div className='container mt-[100px] md:mt-[80px] relative'>
                <SimpleFood/>
                <NewProduct/>
                <FoodBanner/>
                <FaqClient/>
            </div>
        </div>
    )
}

export default HomeClient
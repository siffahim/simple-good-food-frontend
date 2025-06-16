import Cart from '@/components/Cart/Cart';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import StripeProvider from '@/provider/StripeProvider';
import React from 'react'


const WebsiteLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='relative'>
            <StripeProvider>
                <Navbar/>
                <Cart/>
                {children}
                <Footer/>
            </StripeProvider>
        </div>
    )
}

export default WebsiteLayout;
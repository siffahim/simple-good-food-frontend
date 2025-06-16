"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "@/assets/logo.png";
import { useUser } from '@/provider/User';
import { imageUrl } from '@/redux/api/baseApi';

const Header = () => {
    const {user} = useUser();
    return (
        <div className='flex items-center justify-between h-16'>
            <Link href={"/"}>
                <Image alt='Logo' src={Logo} width={50} height={50} />
            </Link>
            {
                user?.profile
                &&
                <Image
                    src={ user?.profile?.startsWith("https") ? user?.profile : `${imageUrl}${user?.profile}`}
                    alt='profile'
                    width={50}
                    height={50}
                    style={{borderRadius: "100%"}}
                />
                
            }
        </div>
    )
}

export default Header
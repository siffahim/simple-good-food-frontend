"use client"
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiDiscount1 } from 'react-icons/ci';
import { GrTransaction } from 'react-icons/gr';
import { RiCoupon3Line } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { VscFeedback } from 'react-icons/vsc';

const Sidebar = () => {
    const path = usePathname();
    const [selectedKey, setSelectedKey] = useState("");

    useEffect(() => {
        const selectedItem = menuItems.find((item) => item.key === path);
        if (selectedItem) {
            setSelectedKey(selectedItem.key);
        }
    }, [path]);

    const menuItems = [
        {
            key: "/transactions",
            icon: <GrTransaction size={24} />,
            label: <Link href="/transactions" className="hover:text-white">Transactions</Link>
        },
        {
            key: "/menu",
            icon: <RxDashboard size={24} />,
            label: <Link href="/menu" className="hover:text-white">Menu</Link>
        },
        {
            key: "/testimonial",
            icon: <VscFeedback size={24} />,
            label: <Link href="/testimonial" className="hover:text-white">Testimonial</Link>
        },
        {
            key: "/coupon",
            icon: <RiCoupon3Line size={24} />,
            label: <Link href="/coupon" className="hover:text-white">Coupon</Link>
        },
        {
            key: "/delivery",
            icon: <CiDiscount1 size={24} />,
            label: <Link href="/delivery" className="hover:text-white">Add Delivery Charge</Link>
        }
    ];

    return (
        <div className='px-4'>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ borderRightColor: "transparent" }}
                items={menuItems}
            />
        </div>
    )
}

export default Sidebar;
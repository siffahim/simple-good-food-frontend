"use client";
import React, {  useState } from 'react';
import Logo from "@/assets/logo.png";
import Image from 'next/image';
import { GrClose } from 'react-icons/gr';
import { useCart } from '@/provider/Cart';
import { imageUrl } from '@/redux/api/baseApi';
import { BiMinus, BiPlus } from 'react-icons/bi';
import Modal from './shared/Modal';
import CheckoutModal from './shared/CheckoutModal';

interface ICartProps{
    open: boolean;
    setOpen: (open: boolean) => void;
}


const CartPopUp:React.FC<ICartProps> = ({setOpen}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [count, setCount] = useState(1);

    const { state: { items }, dispatch } = useCart();
    console.log(items)
    const total = items?.reduce((acc, item) => acc + Number(item.quantity) * item.price, 0);

    const products = items?.map((item:any)=> {
        return {
            product: item?.id,
            quantity: item?.quantity
        }
    })

    const orderData={
        products: products,
        price: total,
        totalItems: products?.length,
        deliveryCharge: 5
    }

    return (
        <>
            <div  className='w-[400px] z-20 fixed right-24 top-[84px] h-[400px] bg-white rounded-lg' >
                        <div 
                            className='bg-white overflow-hidden p-3  rounded-lg'
                            style={{
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                            }}
                        >
                            <div className='bg-[#E9F2E8] flex items-center justify-between p-2'>
                                <Image alt='Logo' src={Logo} width={40} height={40} />
                                <GrClose onClick={()=>setOpen(false)} className='cursor-pointer'/>
                            </div>

                            <div className='h-[350px] overflow-y-auto'>
                                <div className='grid grid-cols-1'>
                                        {
                                            items?.map((item:any, index:any)=>{
                                                return(
                                                    <div key={index} className=' w-full p-2 rounded-lg'>
                                                        <div className='flex items-center justify-between'>
                                                            <div className='flex items-center gap-3'>
                                                                <Image
                                                                    alt='Product'
                                                                    src={`${imageUrl}${item?.image}`}
                                                                    width={60}
                                                                    height={70}
                                                                    style={{borderRadius: 6, width: "auto", height: "auto"}}
                                                                />

                                                                <div>
                                                                    <p className='font-medium text-[16px] leading-6 text-[#5C5C5C]'>{item?.name?.slice(0,15)}...</p>
                                                                    <p className='font-medium text-[16px] leading-6 text-[#735571]'>${item?.price}</p>
                                                                </div>
                                                            </div>
                                                            <div 
                                                                className={`
                                                                    bg-[#ECECEC] 
                                                                    flex
                                                                    items-center 
                                                                    rounded-[24px] px-6 w-[100px] h-10 justify-between
                                                                `}
                                                            >
                                                                <button className='text-[#656565]' onClick={()=>setCount(count - 1)} > <BiMinus size={20}/> </button>
                                                                <p className='text-[#656565]' >{count}</p>
                                                                <button className='text-[#656565]' onClick={()=>setCount(count + 1)} ><BiPlus size={20}/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                </div>
                            </div>

                            <div className='bg-[#F4F4F4] rounded flex items-center justify-between p-2'>
                                <p className='text-[#F52B2E] text-[16px] leading-5 font-medium'>Subtotal: <span className='text-[#7E7E7E]'>({items?.length}  Item)</span> </p>
                                <p className='text-[#F52B2E] text-[16px] leading-5 font-bold'>${total}</p>
                            </div>
                            <button onClick={()=>(setModalOpen(true))} className='bg-primary mt-2 text-white rounded-lg h-[48px] w-full font-medium text-[14px] leading-6'>CONFIRM MEALS</button>
                        </div>
            </div>

            <Modal
                title='Confirm Checkout'
                width={1000}
                open={modalOpen}
                setOpen={setModalOpen}
                body={<CheckoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} setOpen={setOpen} orderData={orderData}/>}
            />
        </>

    )
}

export default CartPopUp;
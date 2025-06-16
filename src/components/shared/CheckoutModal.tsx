"use client";
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/provider/Cart';
import { Checkbox, Form, Input, Spin } from 'antd';
import { useUser } from '@/provider/User';
import { useMealOrderMutation, useMenuOrderMutation } from '@/redux/apiSlices/orderSlice';
import toast from 'react-hot-toast';
import { useCouponVerifiedMutation, useMakePaymentMutation } from '@/redux/apiSlices/paymentSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Heading from './Heading';

const options = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
            color: '#C13515'
        }
    }
}

interface ICheckoutModalProps {
    orderData?: any;
    modalOpen: boolean,
    setModalOpen: (modalOpen:boolean)=>void;
    open?: boolean;
    setOpen: (open: boolean)=>void;
    type?:string;
}

const CheckoutModal: React.FC<ICheckoutModalProps> = ({orderData, setOpen, setModalOpen, type}) => {
    const [couponVerified, {isLoading: isCoupon}] = useCouponVerifiedMutation()
    const [makePayment, {isLoading}] = useMakePaymentMutation();
    const [mealOrder, {isLoading: isOrderLoading}] =useMealOrderMutation();
    const [ClientSecret, setClientSecret] = useState<string>("")
    const { user } = useUser();
    const stripe = useStripe();
    const elements = useElements();
    const [checkbox, setCheckbox] = useState(false);
    const [disable, setDisable] = useState(false)
    const [form] = Form.useForm();
    const [menuOrder] = useMenuOrderMutation();
    const [keyword, setKeyword] = useState("")
    const { state: { items }, dispatch } = useCart();
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0)

    useEffect(() => {
        const total= items?.reduce((acc, item) => acc + Number(item.quantity) * item.price, 0);
        if (total > 0 ) {
            setPrice(total);
        }
        if(type === "mealPlan"){
            setPrice(orderData?.price)
        }
    }, [items, type, orderData]);

    const handleSubmit=async()=>{

        try {
            await makePayment({price: Number(price)}).unwrap().then((result)=>{
                if (result?.success) {
                    console.log(result)
                    form.resetFields()
                    toast.success(result.message);
                    setClientSecret(result?.data);
                }
            });
            
        } catch (error: any) {
            toast.error(error?.data?.message ? error?.data?.message : "An unexpected server error occurred");
        }
    }

    useEffect(()=>{
        if( checkbox && user){
            form.setFieldsValue(user)
        }else{
            form.resetFields();
        }
    }, [user, form, checkbox]);


    const stripeCall = useCallback(async () => {
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }

        console.log(ClientSecret)
        // confirm payment 
        const result = await stripe.confirmCardPayment(
            ClientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        phone: user?.phone,
                        address: user?.address
                    },
                },
            },
        );
        return result;
    }, [stripe, elements, ClientSecret, user]);

    // payment function
    const handlePayment = async () => {
        let data;
        if (ClientSecret) {
            data = await stripeCall();
        }

        const { price: newPrice, ...others} = orderData;
        const order ={
            ...others,
            price: price,
            trxId: data?.paymentIntent?.id                        
        }
        if(data?.paymentIntent?.status !== "succeeded"){
            return
        }

        const {price : otherPrice, ...othersMealData} = orderData
        const mealOrderData = {
            ...othersMealData,
            price: price,
            trxId: data?.paymentIntent?.id
        }

        if(type === "mealPlan"){
            try {
                await mealOrder(mealOrderData).unwrap().then((result)=>{
                    if (result?.success) {
                        toast.success(result.message);
                        setOpen(false);
                    }
                });
                
            } catch (error: any) {
                console.log(error)
                toast.error(error.data.message || "An unexpected server error occurred");
            }
        }else{
            try {
                await menuOrder(order).unwrap().then((result)=>{
                    if (result?.success) {
                        form.resetFields()
                        toast.success(result.message);
                        setModalOpen(false)
                        setOpen(false)
                        dispatch({ type: 'CLEAR_CART' });
                        localStorage.removeItem('cart'); 
                    }
                });
            } catch (error: any) {
                toast.error(error?.data?.message ? error?.data?.message : "An unexpected server error occurred");
            }
        }
    }

    const handleCoupon=async()=>{
        try {
            await couponVerified({promo: keyword}).unwrap().then((result)=>{
                if (result?.success) {
                    toast.success(result.message);
                    setKeyword("")
                    setClientSecret(result?.data);
                    const total = price *  Number(result?.data?.discount) / 100;
                    setDiscountPrice(total)
                    const discount = price - price *  Number(result?.data?.discount) / 100;
                    setPrice(discount)
                }
            });
            
        } catch (error: any) {
            toast.error(error?.data?.message ? error?.data?.message : "An unexpected server error occurred");
        }
    }



    return (
        <div className='grid grid-cols-12 rounded-lg'>
            <div className='col-span-6 bg-[#103509] p-6'>
                <Heading name='Shipping Information' style='font-bold text-[16px] leading-[24px] text-[#F6F6F6] mb-6' />
                <div>
                    <Form form={form} layout='vertical' className='grid grid-cols-12 gap-6'>
                        <Form.Item
                            name="name"
                            
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Your Full Name"
                                }
                            ]}
                            style={{marginBottom: 0}}
                            className='col-span-6'
                        >
                            <Input
                                placeholder='Enter Your Full Name'
                                style={{
                                    width: "100%",
                                    height: 50,
                                    boxShadow: "none",
                                    outline: "none",
                                    border: "none",
                                    borderRadius: 24,
                                    background: "#E9F2E8"
                                }}
                                className='poppins placeholder:text-[#838383] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                            />
                        </Form.Item>

                        <Form.Item
                            name="contact"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Phone Number"
                                }
                            ]}
                            style={{marginBottom: 0}}
                            className='col-span-6'
                        >
                            <Input
                                placeholder='Enter Your Phone Number'
                                style={{
                                    width: "100%",
                                    height: 50,
                                    boxShadow: "none",
                                    outline: "none",
                                    border: "none",
                                    borderRadius: 24,
                                    background: "#E9F2E8"
                                }}
                                className='poppins placeholder:text-[#838383] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                            />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Location!"
                                }
                            ]}
                            style={{marginBottom: 0}}
                            className='col-span-12'
                        >
                            <Input
                                placeholder='Enter Your Location'
                                style={{
                                    width: "100%",
                                    height: 50,
                                    boxShadow: "none",
                                    outline: "none",
                                    border: "none",
                                    borderRadius: 24,
                                    background: "#E9F2E8"
                                }}
                                className='poppins placeholder:text-[#838383] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                            />
                        </Form.Item>

                        <div className='my-0 col-span-12 w-full h-[1px] bg-white ' />

                        {/* <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Pick Your Delivery Date"
                                }
                            ]}
                            style={{marginBottom: 0}}
                            className='col-span-12'
                        >
                            <DatePicker
                                placeholder='Picker Your Delivery Date'
                                style={{
                                    width: "100%",
                                    height: 50,
                                    boxShadow: "none",
                                    outline: "none",
                                    border: "none",
                                    borderRadius: 24,
                                    background: "#E9F2E8"
                                }}
                                 className='poppins placeholder:text-[#838383] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                            />
                        </Form.Item> */}

                        <Form.Item name={"account"} className='col-span-6' style={{marginBottom: 0}}>
                            <Checkbox onChange={(e:any)=>setCheckbox(e.target.checked)} className="text-[#818181] text-[12px] leading-[24px] font-medium">Your Profile Address</Checkbox>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className='col-span-6 bg-white p-6'>
                <Heading name='PROCEED TO PAY' style='font-bold text-[16px] leading-[24px] text-[#26235B] mb-6' />

                <div className='flex flex-col gap-4'>

                    <div className='flex items-center justify-between'>
                        <p className='text-[16px] leading-5 text-[#F52B2E] font-medium'>Price :</p>
                        <p className='text-[16px] leading-5 text-[#F52B2E] font-bold'>$  { price}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[16px] leading-5 text-[#565656] font-medium'>Delivery Charge :</p>
                        <p className='text-[16px] leading-5 text-[#565656] font-bold'>$ 5 </p>
                    </div>
                    <div className='w-full h-[1px] bg-[#BCBBCC] ' />

                    <div className='flex items-center justify-between'>
                        <p className='text-[16px] leading-5 text-[#3E3E3E] font-medium'>Discount Price :</p>
                        <p className='text-[16px] leading-5 text-[#3E3E3E] font-bold'>$ {discountPrice}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[16px] leading-5 text-[#3E3E3E] font-medium'>Total :</p>
                        <p className='text-[16px] leading-5 text-[#3E3E3E] font-bold'>$ {price + 5}</p>
                    </div>

                    <div className='flex items-center justify-between mt-4'>
                        <input
                            placeholder='Enter Coupon code'
                            onChange={(e)=>setKeyword(e.target.value)}
                            className='border-none bg-[#3e3e3e] bg-opacity-[20%] outline-none h-10 w-full px-3'
                        />
                        <button onClick={handleCoupon} className='w-[100px] h-[40px] text-white bg-primary text-whie'>{isCoupon ? <Spin size='small'/> : "Apply"} </button>
                    </div>
                    <Checkbox onChange={(e)=>setDisable(e.target.checked)} className="text-[#818181] text-[12px] leading-[24px] font-medium">I agree to <span className='text-[#F52B2E]'>Terms & Conditions, Privacy & Policy and Refund Policy</span></Checkbox>

                    {
                        ClientSecret
                        ?
                        <div className='stripe-card'>
                            <div className='mb-6'>
                                <Image
                                    alt='stripe'
                                    src={"/card.jpg"}
                                    width={200}
                                    height={200}
                                    style={{ margin: "0 auto" }}
                                />
                            </div>

                            <div
                                style={{
                                    padding: '10px 12px', // Padding inside the container
                                    border: '1px solid #ccc', // Border style
                                    borderRadius: '4px', // Rounded corners
                                    backgroundColor: '#f5f5f5', // Background color
                                    maxWidth: '100%', // Width of the container
                                    margin: '0 auto', // Centering the container
                                }}
                            >
                                <CardElement options={options} />
                            </div>

                            <button
                                disabled={!ClientSecret}
                                onClick={handlePayment} 
                                className='bg-primary mt-4 disabled:bg-bg-primary disabled:bg-opacity-[40%] text-white rounded-lg h-[48px] w-full font-normal text-[16px] leading-5'
                            >
                                Pay
                            </button>
                        </div>
                        :
                        <button 
                            disabled={!disable} 
                            onClick={handleSubmit} 
                            className='bg-primary disabled:bg-bg-primary disabled:bg-opacity-[40%] text-white rounded-lg h-[48px] w-full font-normal text-[16px] leading-5'
                        >
                            {isLoading || isOrderLoading ? <Spin size='small'/> : "Confirm"}
                            
                        </button>
                    }


                </div>

            </div>
        </div>
    )
}

export default CheckoutModal
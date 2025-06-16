import React from 'react';

const AuthLayout  = ({children}: {children : React.ReactNode}) => {
    return (
        <div 
            className='flex items-center justify-end'
            style={{
                width: "100%",
                height: "100vh",
                backgroundImage: `url('/assets/banner.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "container",
            }}
        >
            <div className='mr-[170px] w-[543px]'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;
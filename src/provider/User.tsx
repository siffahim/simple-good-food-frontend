"use client";
import { useProfileQuery } from '@/redux/apiSlices/authSlice';
import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface UserContextType {
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode})=>{
    const {data: profile} = useProfileQuery(undefined);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        if(profile){
            setUser(profile);
        }
    }, [profile]);


    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
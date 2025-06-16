import React from 'react';
import { Modal as AntModal } from "antd";

interface IModalProps{
    title: string,
    open: boolean;
    width?: number;
    setOpen:( open: boolean )=> void;
    body: React.ReactElement;
    form?: any;
}

const Modal:React.FC<IModalProps> = ({title, open, body, width, setOpen, form}) => {
    const handleClose=()=>{
        setOpen(false)
        if(form){
            form.resetFields();
        }
    }

    if (!open) {
        return null;
    }
    
    return (
        <AntModal
            centered
            title={title}
            footer={false}
            open={open}
            onCancel={handleClose}
            width={width || 500}
        >
            <div>
                {body}
            </div>
        </AntModal>
    )
}

export default Modal
import React from 'react'

interface IHeadingProps{
    name: string;
    style: string;
}

const Heading:React.FC<IHeadingProps> = ({name, style}) => {
    return (
        <h1 className={` ${style}`}>{name}</h1>
    )
}

export default Heading
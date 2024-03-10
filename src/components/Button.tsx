import React from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: ClassNameValue
    type?: HTMLButtonElement['type']
}

export default function Button({ children, onClick, type = 'button', className }: ButtonProps) {
    return (
        <button className={twMerge('transition-all duration-300 bg-loading-gradient p-2 rounded-2xl shadow-lg text-gray-300 font-medium hover:bg-403-btn-gradient-hover hover:transition-all hover:duration-300', className)} onClick={onClick} type={type}>{children}</button>
    )
}

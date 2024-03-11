import React from 'react'
import { motion } from 'framer-motion'
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: ClassNameValue
    type?: HTMLButtonElement['type']
    isDisabled?: boolean;
}

export default function Button({ isDisabled = false, children, onClick, type = 'button', className }: ButtonProps) {
    return (
        <motion.button disabled={isDisabled} {...(isDisabled ? {} : { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } })} className={twMerge('bg-loading-gradient rounded-2xl shadow-lg text-gray-300 font-medium hover:bg-403-btn-gradient-hover h-10 px-4 w-fit', className)} onClick={onClick} type={type}>{children}</motion.button>
    )
}

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
        <motion.button disabled={isDisabled} {...(isDisabled ? {} : { whileTap: { scale: 0.97 } })} className={twMerge('bg-secondary-ui rounded-2xl shadow-lg text-primary-font font-medium hover:bg-gray-200 h-10 px-4 w-fit', className)} onClick={onClick} type={type}>{children}</motion.button>
    )
}

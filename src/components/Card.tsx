import React from 'react'
import { twMerge, ClassNameValue } from 'tailwind-merge'

interface CardProps {
    children: React.ReactNode
    className?: ClassNameValue
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={twMerge('bg-gray-200 bg-opacity-35 rounded-2xl p-4', className)}>{children}</div>
    )
}

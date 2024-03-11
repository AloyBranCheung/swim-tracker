'use client'
import React from 'react'
import { useFormStatus } from "react-dom";
import Button from './Button';

interface StatusButtonProps {
    isFocused?: boolean;
    children?: React.ReactNode;
}

export default function StatusButton({ isFocused = true, children = "Submit" }: StatusButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button isDisabled={pending} className={isFocused ? '' : 'hidden'} type='submit'>
            {
                pending ? "Loading..." : children
            }
        </Button>
    )
}

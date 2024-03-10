import React from 'react'
import Button from './Button'

interface ConfirmationProps {
    onCancel: () => void;
    onAccept: () => void;
}

export default function Confirmation({ onCancel, onAccept }: ConfirmationProps) {
    return (
        <div className='flex self-end gap-2'>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onAccept}>Submit</Button>
        </div>
    )
}

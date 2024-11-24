import React from 'react'

export const Icon = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='rounded-full border p-2 w-fit'>
            {children}
        </div>
    )
}

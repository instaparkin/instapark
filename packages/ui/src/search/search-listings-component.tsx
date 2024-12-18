"use client"

import * as React from "react"
import { cn } from "../utils/cn"
import { Input } from "../components/input"

interface ISearchListings {
    children: React.ReactNode
    placeholder?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function SearchListingsComponent({ children, placeholder, onChange }: ISearchListings) {
    const [isContentVisible, setIsContentVisible] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIsContentVisible(value.length > 0)
        onChange
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node) && inputRef.current !== e.target) {
            setIsContentVisible(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="relative w-full mx-auto">
            <Input
                className="py-6"
                placeholder={placeholder}
                ref={inputRef}
                onFocus={() => setIsContentVisible(true)}
                onChange={handleInputChange}
            />
            <div
                ref={contentRef}
                className={cn(
                    " absolute left-0 right-0 top-full mt-4 w-[300px] md:w-[428px] h-[421px] overflow-y-scroll no-scrollbar rounded-xl border border-input bg-background shadow-md transition-all",
                    isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                )}
            >
                <div className='grid'>
                    {children}
                </div>
            </div>
        </div>
    )
}


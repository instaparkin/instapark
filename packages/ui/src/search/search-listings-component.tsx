"use client"

import React from "react"
import { cn } from "../utils/cn"
import { AppDispatch, searchListings, useDispatch } from "@instapark/state"
import { useDebouncedValue } from "@mantine/hooks"
import { Search } from 'lucide-react'
import { Button } from "../components/button"
import { Separator } from "../components/separator"

interface SearchListingsProps {
  children: React.ReactNode
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function SearchListingsComponent({ children, onChange }: SearchListingsProps) {
  const [isContentVisible, setIsContentVisible] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [value, setValue] = React.useState("")
  const [debouncedValue] = useDebouncedValue(value, 500)

  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    dispatch(
      searchListings({
        query_by: ["*"],
        collections: [
          {
            q: debouncedValue,
            name: "listing_1",
          },
        ],
      })
    )
    setIsContentVisible(value.length > 0)
    onChange?.(e)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node) && inputRef.current !== e.target) {
      setIsContentVisible(false)
      setActiveSection(null)
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect()
        containerRef.current.classList.toggle("is-sticky", top <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
    setIsContentVisible(true)
  }

  return (
    <div ref={containerRef} className="w-full relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col sm:flex-row items-center py-2 bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow">
          {/* Where Section */}
          <button
            onClick={() => handleSectionClick("where")}
            className={cn(
              "w-full sm:flex-1 min-w-[120px] text-left px-4 sm:px-6 py-2 sm:py-0 rounded-t-lg sm:rounded-l-full sm:rounded-t-none hover:bg-gray-50 transition-colors",
              activeSection === "where" && "bg-gray-50"
            )}
          >
            <div className="text-sm font-medium">Where</div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search destinations"
              className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none focus:outline-none p-0"
              value={value}
              onChange={handleInputChange}
              onFocus={() => handleSectionClick("where")}
            />
          </button>

          <Separator orientation="vertical" className="hidden sm:block h-8" />
          <Separator orientation="horizontal" className="block sm:hidden w-full my-2" />

          {/* Check-in Section */}
          <button
            onClick={() => handleSectionClick("checkin")}
            className={cn(
              "w-full sm:flex-1 min-w-[120px] text-left px-4 sm:px-6 py-2 sm:py-0 hover:bg-gray-50 transition-colors",
              activeSection === "checkin" && "bg-gray-50"
            )}
          >
            <div className="text-sm font-medium">Check in</div>
            <div className="text-sm text-gray-400">Add dates</div>
          </button>

          <Separator orientation="vertical" className="hidden sm:block h-8" />
          <Separator orientation="horizontal" className="block sm:hidden w-full my-2" />

          {/* Check-out Section */}
          <button
            onClick={() => handleSectionClick("checkout")}
            className={cn(
              "w-full sm:flex-1 min-w-[120px] text-left px-4 sm:px-6 py-2 sm:py-0 hover:bg-gray-50 transition-colors",
              activeSection === "checkout" && "bg-gray-50"
            )}
          >
            <div className="text-sm font-medium">Check out</div>
            <div className="text-sm text-gray-400">Add dates</div>
          </button>
        </div>

        {/* Dropdown Content */}
        <div
          ref={contentRef}
          className={cn(
            "no-scrollbar absolute left-0 right-0 z-10 mt-4 mx-4 sm:mx-0 sm:w-full sm:max-w-md overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-200",
            isContentVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="grid p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}


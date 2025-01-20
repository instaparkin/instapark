import { Listing } from '@instapark/types';
import { CircleParking, SquareParking } from 'lucide-react';
import Image from 'next/image'


interface SuggestionItemProps {
  suggestion: Listing
}

export function SearchSuggestion({ suggestion }: SuggestionItemProps) {
  return (
    <div
      className="flex items-center w-full p-3 gap-3 hover:bg-gray-50 transition-colors"
    >
      <div className={` flex justify-center items-center border rounded-md bg-muted`}>
        <CircleParking className='m-2' />
      </div>
      <div className="flex flex-col items-start">
        <div className="text-sm font-medium text-gray-900">
          {suggestion.country}, {suggestion.state}
        </div>
        <div className="text-sm text-gray-500">
          {suggestion.district}
        </div>
      </div>
    </div>
  )
}


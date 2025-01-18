import { Listing } from '@instapark/types';
import Image from 'next/image'
  

interface SuggestionItemProps {
  suggestion: Listing
}

export function SearchSuggestion({ suggestion }: SuggestionItemProps) {
  return (
    <div
      className="flex items-center w-full p-3 gap-3 hover:bg-gray-50 transition-colors"
    >
      <div className={`w-10 h-10 flex-shrink-0`}>
        <Image
          src={suggestion.photos[0]?.url as string}
          alt=""
          width={40}
          height={40}
          className="w-full h-full rounded-sm"
        />
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


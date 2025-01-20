'use client'

import { Star } from 'lucide-react'
import { useConnector } from 'react-instantsearch'
import connectRatingMenu from 'instantsearch.js/es/connectors/rating-menu/connectRatingMenu'
import { useRange } from 'react-instantsearch';
import type {
  RatingMenuConnectorParams,
  RatingMenuWidgetDescription,
} from 'instantsearch.js/es/connectors/rating-menu/connectRatingMenu'
import Link from 'next/link'
import dayjs from "dayjs"
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

export type UseRatingMenuProps = RatingMenuConnectorParams

export function useRatingMenu(props?: UseRatingMenuProps) {
  return useConnector<RatingMenuConnectorParams, RatingMenuWidgetDescription>(
    connectRatingMenu,
    props
  )
}

export function RatingMenu(props: UseRatingMenuProps) {
  const { items, refine, createURL } = useRatingMenu(props);

  const { range, refine: rangeRefine } = useRange({
    attribute: "availableFrom"
  })

  if (range.min) {
    console.log(dayjs.unix(range.min).format("ll"))
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.value}>
          <Link
            href={createURL(item.value)}
            className="flex items-center gap-2 text-sm hover:text-amber-500"
            onClick={(event) => {
              event.preventDefault()
              refine(item.value)
            }}
          >
            <div className="flex">
              {item.stars.map((isFilled, index) => (
                <Star
                  key={index}
                  size={20}
                  className={`${isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                />
              ))}
            </div>
            <span className="">&amp; Up</span>
            <span className="">({item.count})</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}


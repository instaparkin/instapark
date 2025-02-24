import React from 'react'
import { UserMini } from '../components/user-mini'
import { Star } from 'lucide-react'
import { unixSecToMonthYear } from '../utils/dayjs'
import { Text } from '../components/text'

interface HomeListingReviewProps {
  count: number;
  review: string;
  firstName: string;
  lastName: string;
  timeJoined: number;
  reviewDate: number;
}

export const HomeListingReview = ({
  count, review, firstName, lastName, timeJoined, reviewDate }:
  HomeListingReviewProps) => {
  return (
    <div className='max-w-lg space-y-4 border'>
      <UserMini firstName={firstName} lastName={lastName} timeJoined={timeJoined} />
      <div className='flex items-center gap-4 text-sm'>
        {/**Rating */}
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < count ? 'fill-instapark dark:fill-foreground' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
        {/**Date */}
        <Text className='text-pretty' text={unixSecToMonthYear(reviewDate)} />
      </div>
      <div className='line-clamp-3 leading-2'>
        {review}
      </div>
    </div>
  )
}

import { Icon } from '../components/icon'
import { AiOutlinePlus } from "react-icons/ai";
import { SearchInput } from '../components/search-input';
import Link from 'next/link';

export const ListingsTools = () => {
  return (
    <div className='flex items-center gap-4'>
      <SearchInput placeholder='Search Your Listings' />
      <Link href={'/listings/add'}>
        <Icon>
          <AiOutlinePlus className="h-5 w-5" />
        </Icon>
      </Link>
    </div>
  )
}

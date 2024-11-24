import { Icon } from '../components/icon'
import { AiOutlinePlus } from "react-icons/ai";
import {SearchInput} from '../components/search-input';

export const ListingsTools = () => {
  return (
    <div className='flex items-center gap-4'>
      <SearchInput placeholder='Search Your Listings' />
      <Icon>
        <AiOutlinePlus className="h-5 w-5" />
      </Icon>
    </div>
  )
}

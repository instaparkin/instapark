import { Router } from '@instapark/utils';
import {
	createListing,
	updateListing,
	getListings,
} from '../controllers/listings.controller';

const ListingsRouter = Router();

ListingsRouter.post('/', createListing);

ListingsRouter.put('/', updateListing);

ListingsRouter.get('/', getListings);

export { ListingsRouter };

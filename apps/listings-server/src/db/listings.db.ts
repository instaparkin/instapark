import { ListingModel } from '../models/listing.model';

export class ListingsDB {
	static async getListingsFromUserId(userId: string) {
		return await ListingModel.find({ userId }, { _id: 0, __v: 0 });
	}
}

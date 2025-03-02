import { ApiResponse, Listing, PlaceType, Vehicle } from '@instapark/types';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

async function seedListings(amount: number) {
	console.log(`Seeding ${amount} listings...`);

	for (let i = 1; i <= amount; i++) {
		const listingData = {
			userId: uuid(),
			type: PlaceType.House,
			country: 'India',
			state: 'Karnataka',
			district: 'Bengaluru Urban',
			city: 'Bengaluru',
			street: faker.location.streetAddress(),
			pincode: faker.location.zipCode(),
			latitude: faker.location.latitude(),
			longitude: faker.location.longitude(),
			name: 'Elegant 3BHK Villa',
			landmark: 'Near UB City Mall',
			basePrice: faker.commerce.price({ min: 10 }),
			pphbi: faker.commerce.price({ min: 10 }),
			pphcy: faker.commerce.price({ min: 5 }),
			pphcr: faker.commerce.price({ min: 20 }),
			plph: faker.commerce.price({ min: 60 }),
			allowedVehicles: [Vehicle.Car, Vehicle.Bike],
			photos: [
				faker.image.url(),
				faker.image.url(),
				faker.image.url(),
				faker.image.url(),
			],
		};

		try {
			console.log(`📤 Sending request ${i} to create listing...`);
			const response = await axios.post<ApiResponse<Listing>>(
				'http://localhost:8087/listings',
				listingData,
			);
			console.log(`✅ Listing ${i} created successfully:`, response.data.data);
		} catch (error) {
			console.error(`❌ Error creating listing ${i}:`, error || error);
		}
	}

	console.log('🎉 Seeding completed!');
}

seedListings(10);

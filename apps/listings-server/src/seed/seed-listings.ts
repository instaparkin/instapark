import { ListingRequest, PlaceType, Vehicle } from "@instapark/types";
import { axios } from "@instapark/utils";

async function seedScript(data: ListingRequest[]) {
    try {
        data.map(listing => {
            axios.post("http://localhost:8087/listings", listing)
                .then(res =>
                    console.log(res)
                ).catch(error => {
                    console.error(error);
                })
        })
    } catch (error) {
        console.error(error)
    }
}

const sampleData: ListingRequest[] = [
    {
        userId: "c134f7ae-67b5-4dfd-bcd5-91c3a1d4e1fa",
        type: PlaceType.House,
        country: "India",
        state: "Karnataka",
        district: "Bengaluru Urban",
        city: "Bengaluru",
        street: "Church Street",
        pincode: 560001,
        latitude: 12.9715,
        longitude: 77.6094,
        name: "Elegant 3BHK Villa",
        landmark: "Near UB City Mall",
        basePrice: 4500,
        pphbi: 250,
        pphcy: 180,
        pphcr: 120,
        plph: 3000,
        allowedVehicles: [Vehicle.Car, Vehicle.Bike],
        photos: [
            "https://example.com/churchstreetphoto1.jpg",
            "https://example.com/churchstreetphoto2.jpg",
            "https://example.com/churchstreetphoto3.jpg",
            "https://example.com/churchstreetphoto4.jpg"
        ]
    },
    {
        userId: "a934f5ab-27e4-4ccf-bdf9-13c2d7f9c8eb",
        type: PlaceType.Cabin,
        country: "India",
        state: "Karnataka",
        district: "Bengaluru Urban",
        city: "Bengaluru",
        street: "Bannerghatta Road",
        pincode: 560076,
        latitude: 12.8684,
        longitude: 77.6017,
        name: "Stylish 2BHK Flat",
        landmark: "Near IIM Bengaluru",
        basePrice: 4000,
        pphbi: 220,
        pphcy: 170,
        pphcr: 130,
        plph: 2800,
        allowedVehicles: [Vehicle.Car, Vehicle.Cycle],
        photos: [
            "https://example.com/bannerghattaroad1.jpg",
            "https://example.com/bannerghattaroad2.jpg",
            "https://example.com/bannerghattaroad3.jpg",
            "https://example.com/bannerghattaroad4.jpg"
        ]
    },
    {
        userId: "d045f6ac-35c7-4cfa-afe9-91d5c3f9d7ce",
        type: PlaceType.Barn,
        country: "India",
        state: "Karnataka",
        district: "Bengaluru Rural",
        city: "Nelamangala",
        street: "Tumkur Road",
        pincode: 562123,
        latitude: 13.0854,
        longitude: 77.5252,
        name: "Peaceful Barn Retreat",
        landmark: "Near Yelahanaka",
        basePrice: 2200,
        pphbi: 170,
        pphcy: 120,
        pphcr: 90,
        plph: 1500,
        allowedVehicles: [Vehicle.Bike, Vehicle.Cycle],
        photos: [
            "https://example.com/tumkurroad1.jpg",
            "https://example.com/tumkurroad2.jpg",
            "https://example.com/tumkurroad3.jpg",
            "https://example.com/tumkurroad4.jpg"
        ]
    }
];


seedScript(
    sampleData
)




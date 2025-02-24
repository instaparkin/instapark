import { ReviewRequest } from "@instapark/types"
import { ReviewModel } from "../models/review.model"
import { faker } from "@faker-js/faker"
import { v4 as uuid } from "uuid";

const seedReviews = async (count: number) => {
    for (let i = 0; i < count; i++) {
        const review: ReviewRequest = {
            id: faker.lorem.lines({ min: 3, max: 3 }),
            listingId: "086a44c7-1de2-4564-83a5-7a398ef358b5",
            userId: "0c9e666f-9416-4979-9393-82e1b9d29884",
            rating: faker.number.int({ min: 0, max: 5 }),
            location: faker.number.int({ min: 0, max: 5 }),
            cleanliness: faker.number.int({ min: 0, max: 5 }),
            communication: faker.number.int({ min: 0, max: 5 }),
            value: faker.number.int({ min: 0, max: 5 }),
            accuracy: faker.number.int({ min: 0, max: 5 }),
        }
        const response = await ReviewModel.create([
            review
        ])

        console.log(response);
    }
}

seedReviews(5)
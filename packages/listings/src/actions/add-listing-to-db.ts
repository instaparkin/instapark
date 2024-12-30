"use server"

import { listingsDb } from "../db/listings-db"
import { ListingsAddType } from "../forms/listings-add-form"
import { listingsAddSchema } from "../forms/listings-add-schema"

export const addListingToDB = async (formData: ListingsAddType) => {
    const result = await listingsAddSchema.safeParse(formData);

    if (!result.success) {
        throw new Error(result.error.message)
    }

    /**
     * Here the references to listingIds are removed because it is done by prisma
     */
    await listingsDb.listing.create({
        data: {
            userId: formData.userId,
            listingId: formData.listingId,
            place: {
                create: {
                    type: formData.place.type,
                }
            },
            isOpen: formData.isOpen,
            location: {
                create: {
                    latitude: formData.location.latitude,
                    longitude: formData.location.longitude,
                    country: formData.location.country,
                    state: formData.location.state,
                    district: formData.location.district,
                    city: formData.location.city,
                    street: formData.location.street,
                    pincode: formData.location.pincode,
                    name: formData.location.name,
                    landmark: formData.location.landmark,
                    createdAt: formData.createdAt,
                    updatedAt: formData.updatedAt
                },
            },
            photos: {
                createMany: {
                    data: formData.photos.map((photo) => ({
                        photoId: photo.photoId,
                        url: photo.url,
                        createdAt: photo.createdAt,
                        updatedAt: photo.updatedAt
                    }))
                }
            },
            pricing: {
                create: {
                    pphbi: formData.pricing.pphbi,
                    pphcr: formData.pricing.pphcr,
                    pphcy: formData.pricing.pphcy,
                    plph: formData.pricing.plph,
                    basePrice: formData.pricing.basePrice
                }
            },
            allowedVehicles: {
                createMany: {
                    data: formData.allowedVehicles.map((v) => ({
                        id: v.id,
                        vehicle: v.vehicle
                    }))
                }
            },
            createdAt: formData.createdAt,
            updatedAt: formData.updatedAt
        }
    })
}
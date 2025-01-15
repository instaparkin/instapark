import { Request, Response } from "@instapark/utils";
import { listingsDb } from "../db/listings-db-client";
import { Listing } from "@instapark/types";

export const upsertListing = async (req: Request, res: Response) => {
    try {
        const listing: Listing = req.body;

        // Begin transaction
        await listingsDb.query('BEGIN');

        // Upsert Listing
        const upsertListingQuery = `
            INSERT INTO "Listing" (
                "id", "userId", "type", "basePrice", "pphbi", "pphcy", "pphcr", "plph",
                "latitude", "longitude", "country", "state", "district", "city", "street",
                "pincode", "name", "landmark", "naStartDate", "naEndDate"
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8,
                $9, $10, $11, $12, $13, $14, $15, $16,
                $17, $18, $19, $20
            )
            ON CONFLICT ("id") DO UPDATE SET
                "userId" = EXCLUDED."userId",
                "type" = EXCLUDED."type",
                "basePrice" = EXCLUDED."basePrice",
                "pphbi" = EXCLUDED."pphbi",
                "pphcy" = EXCLUDED."pphcy",
                "pphcr" = EXCLUDED."pphcr",
                "plph" = EXCLUDED."plph",
                "latitude" = EXCLUDED."latitude",
                "longitude" = EXCLUDED."longitude",
                "country" = EXCLUDED."country",
                "state" = EXCLUDED."state",
                "district" = EXCLUDED."district",
                "city" = EXCLUDED."city",
                "street" = EXCLUDED."street",
                "pincode" = EXCLUDED."pincode",
                "name" = EXCLUDED."name",
                "landmark" = EXCLUDED."landmark",
                "naStartDate" = EXCLUDED."na_start_date",
                "naEndDate" = EXCLUDED."na_end_date",
                "updatedAt" = CURRENT_TIMESTAMP;
        `;
        await listingsDb.query(upsertListingQuery, Object.values(listing));

        // Upsert Photos
        const upsertPhotosQuery = `
            INSERT INTO "Photos" ("listingId", "url")
            VALUES ($1, unnest($2::text[]))
            ON CONFLICT ("url") DO NOTHING;
        `;
        await listingsDb.query(upsertPhotosQuery, [listing.id, listing.photos]);

        // Delete photos not in the new list
        const deletePhotosQuery = `
            DELETE FROM "Photos"
            WHERE "listingId" = $1 AND "url" != ALL($2::text[]);
        `;
        await listingsDb.query(deletePhotosQuery, [listing.id, listing.photos]);

        // Upsert AllowedVehicles
        const upsertAllowedVehiclesQuery = `
            INSERT INTO "AllowedVehicles" ("listingId", "vehicle")
            VALUES ($1, unnest($2::"VehicleType"[]))
            ON CONFLICT ("listingId", "vehicle") DO NOTHING;
        `;
        await listingsDb.query(upsertAllowedVehiclesQuery, [listing.id, listing.allowedVehicles]);

        // Delete vehicles not in the new list
        const deleteAllowedVehiclesQuery = `
            DELETE FROM "AllowedVehicles"
            WHERE "listingId" = $1 AND "vehicle" != ALL($2::"VehicleType"[]);
        `;
        await listingsDb.query(deleteAllowedVehiclesQuery, [listing.id, listing.allowedVehicles]);

        await listingsDb.query('COMMIT');
        res.status(200).json({ message: 'Listing created or updated successfully.' });
    } catch (error) {
        await listingsDb.query('ROLLBACK');
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
};

export const getListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Fetch the listing details
        const listingQuery = `
            SELECT *
            FROM "Listing"
            WHERE "id" = $1;
        `;
        const listingResult = await listingsDb.query(listingQuery, [id]);

        if (listingResult.rowCount === 0) {
            res.status(404).json({ error: "Listing not found." });
            return;
        }

        const listing = listingResult.rows[0];

        // Fetch the photos for the listing
        const photosQuery = `
            SELECT *
            FROM "Photos"
            WHERE "listingId" = $1;
        `;
        const photosResult = await listingsDb.query(photosQuery, [id]);
        const photos = photosResult.rows.map(row => row.url);

        // Fetch the allowed vehicles for the listing
        const allowedVehiclesQuery = `
            SELECT *
            FROM "AllowedVehicles"
            WHERE "listingId" = $1;
        `;
        const allowedVehiclesResult = await listingsDb.query(allowedVehiclesQuery, [id]);
        const allowedVehicles = allowedVehiclesResult.rows.map(row => row.vehicle);

        // Combine the data into a single response
        const response = {
            ...listing,
            photos,
            allowedVehicles,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to get listing.", details: error });
    }
};


export const deleteListing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Begin transaction
        await listingsDb.query('BEGIN');

        // Delete from Listing
        const deleteListingQuery = `
            DELETE FROM "Listing"
            WHERE "listingId" = $1
            RETURNING *;
        `;
        const result = await listingsDb.query(deleteListingQuery, [id]);

        // If no rows were deleted, listingId does not exist
        if (result.rowCount === 0) {
            throw new Error('Listing not found.');
        }

        // Commit transaction
        await listingsDb.query('COMMIT');

        res.status(200).json({ message: 'Listing and related records deleted successfully.' });
    } catch (error) {
        // Rollback transaction in case of an error
        await listingsDb.query('ROLLBACK');
        console.error('Error deleting listing:', error);
        res.status(500).json({ error: error || 'An error occurred while deleting the listing.' });
    }
};


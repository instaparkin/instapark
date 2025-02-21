import { gql } from "@apollo/client";

export const GET_LISTINGS_FOR_HOST = gql`
query GetListingsForHost($userId: String!) {
  ListingQuery {
    getListingsForHost(userId: $userId) {
      userId
      type
      country
      state
      district
      city
      street
      pincode
      latitude
      longitude
      name
      landmark
      allowedVehicles
      basePrice
      pphbi
      pphcy
      pphcr
      plph
      photos
      id
      isOpen
      rating
      createdAt
      updatedAt
    }
  }
}
`;
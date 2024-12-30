"use client"

import React, { useEffect } from 'react'
import { ListingsAddForm, ListingsAddType } from '@instapark/listings'
import { Page } from '../components/page'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'
import { useSessionContext } from '@instapark/auth'
import { LISTINGS_ADD_FORM_KEY } from '../utils/global-constants'
import toast from 'react-hot-toast'
import uiConfig from "../../ui-config.json"
import { v4 as uuid } from "uuid"

export const ListingsAdd = () => {
  const form = ListingsAddForm();
  const session = useSessionContext();

  if (session.loading) {
    return null;
  }

  const handleSubmit = async (data: ListingsAddType) => {
    const listingId = uuid();
    try {
      const dataWithUUIDs: ListingsAddType = {
        ...data,
        listingId,
        userId: session.userId,
        place: {
          ...data.place,
          placeId: listingId,
        },
        location: {
          ...data.location,
          locationId: listingId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        pricing: {
          ...data.pricing,
          pricingId: listingId,
        },
        photos: data.photos.map(photo => ({
          ...photo,
          listingId
        })),
        allowedVehicles: data.allowedVehicles.map(vehicle => ({
          ...vehicle,
          listingId,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await fetch(uiConfig.routes.LISTING_ADD_ROUTE, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUUIDs),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Error adding listing: ${error instanceof Error ? error.message : String(error)}`);
    }
  };


  return (
    <Page className='pb-32'>
      <MultiStepForm
        form={form}
        steps={listingsAddSteps}
        redisPrefix={session.userId}
        redisSuffix={LISTINGS_ADD_FORM_KEY}
        onSubmit={({ data }) => handleSubmit(data)}
      />
    </Page>
  )
}


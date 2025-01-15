"use client"

import React from 'react'
import { Page } from '../components/page'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'
import { useSessionContext } from '@instapark/auth'
import { LISTINGS_ADD_FORM_KEY } from '../utils/global-constants'
import toast from 'react-hot-toast'
import uiConfig from "../../ui-config.json"
import { v4 as uuid } from "uuid"
import axios from 'axios'
import { Listing } from '@instapark/types'
import { ListingsAddForm } from '@instapark/forms'

export const ListingsAdd = () => {
  const form = ListingsAddForm();
  const session = useSessionContext();

  if (session.loading) {
    return null;
  }

  const handleSubmit = async (data: Listing) => {
    const listingId = uuid();
    try {
      const dataWithUUIDs: Listing = {
        ...data,
        listingId,
        userId: session.userId,
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

      axios.post(uiConfig.routes.LISTING_ADD_ROUTE, dataWithUUIDs)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          throw new Error(`HTTP error! status: ${error}`);
        })

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


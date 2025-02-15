"use client"

import React from 'react'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'
import { LISTINGS_ADD_FORM_KEY } from '../utils/global-constants'
import toast from 'react-hot-toast'
import uiConfig from "../../ui-config.json"
import axios from 'axios'
import { Listing, ListingRequest } from '@instapark/types'
import { useAuth } from '../hooks/use-auth'
import { ListingCreateForm } from '../forms/listing-create-form'

export const ListingsAdd = () => {
  const form = ListingCreateForm();

  const handleSubmit = async (data: ListingRequest) => {
    try {
      axios.post(uiConfig.routes.LISTING_ADD_ROUTE, data)
        .then((res) => {
          console.log(res);
        })
    } catch (error) {
      toast.error(`Error adding listing: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <MultiStepForm
      form={form}
      steps={listingsAddSteps}
      onSubmit={({ data }) => handleSubmit(data)}
    />
  )
}


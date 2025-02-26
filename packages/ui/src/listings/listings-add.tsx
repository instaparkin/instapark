"use client"

import React from 'react'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'
import toast from 'react-hot-toast'
import { ListingRequest } from '@instapark/types'
import { ListingCreateForm } from '../forms/listing-create-form'
import { useMutation } from '@apollo/client'
import { CREATE_LISTING } from '../graphql/create-listing'

export const ListingsAdd = () => {
  const { form } = ListingCreateForm();

  const [createListing, { data: response, loading, error }] = useMutation(CREATE_LISTING);

  const handleSubmit = async (data: ListingRequest) => {
    createListing({ variables: data })
    if (loading) {
      toast.loading("Submitting")
    };

    if (error) {
      toast.error(`Submission error! ${error.message}`)
    }

    if (response) {
      toast.success(response.ListingMutation?.createListing as string)
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


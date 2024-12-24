"use client"

import React, { useEffect } from 'react'
import { ListingsAddForm, ListingsAddType } from '@instapark/listings'
import { Page } from '../components/page'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'
import { useSessionContext } from '@instapark/auth'
import { LISTINGS_ADD_FORM_KEY } from '../utils/global-constants'
import toast from 'react-hot-toast'

export const ListingsAdd = () => {
  const form = ListingsAddForm();
  const session = useSessionContext();

  if (session.loading) {
    return null;
  }

  const handleSubmit = async (data: ListingsAddType) => {
    try {
      const modifiedData: ListingsAddType = { ...data, userId: session.userId }
      const response = await fetch("http://localhost:8087/listings/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData)
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


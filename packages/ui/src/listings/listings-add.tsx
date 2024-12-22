"use client"

import React from 'react'
import { ListingsAddForm } from '@instapark/listings'
import { Page } from '../components/page'
import { MultiStepForm } from '../components/multi-step-form'
import { listingsAddSteps } from './listings-add-steps'

export const ListingsAdd = () => {

  const form = ListingsAddForm();

  return (
    <Page className='pb-32'>
      <MultiStepForm form={form} steps={listingsAddSteps} />
    </Page>
  )
}

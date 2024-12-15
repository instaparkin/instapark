"use client"

import React from 'react'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '../components/form'
import { ListingsAddForm, ListingsAddType } from '@instapark/listings'
import { Page } from '../components/page'
import { MultiStepForm } from './multi-step-form'
import { ListingsAddPlaceType } from './listings-add-place-type'
import { ListingsAddPhotos } from './listings-add-photos'
import { ListingsAddLocation } from './listings-add-location'

export const ListingsAdd = () => {

  const form = ListingsAddForm();

  const onSubmit = async (data: ListingsAddType) => {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Page>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepForm
            form={form}
            steps={[{
              name: "Tell us about your property",
              substeps: [{
                name: "What's you place type?",
                fields: [{
                  name: "place.type",
                  render: () => {
                    return (
                      <FormItem>
                        <FormMessage />
                        <FormControl>
                          <ListingsAddPlaceType form={form} />
                        </FormControl>
                      </FormItem>
                    )
                  }
                }]
              }, {
                name: "Location",
                className: "grid max-w-[630px] mx-auto my-4 [&_Input]:py-8 [&_Input]:my-2",
                children: <ListingsAddLocation form={form} />,
                fields: [{ name: "location.city" }, { name: "location.country" }, { name: "location.state" }, { name: "location.district" }, { name: "location.street" }, { name: "location.pincode" }, { name: "location.house" }, { name: "location.landmark" }, { name: "location.latitude", disabled: true }, { name: "location.longitude", disabled: true }],
              }]
            },
            {
              name: "Photos and Allowed Vehicles",
              substeps: [{
                name: "Photos",
                fields: [{
                  name: "photos", render: () => {
                    return (
                      <FormItem>
                        <FormMessage />
                        <FormControl>
                          <ListingsAddPhotos form={form} />
                        </FormControl>
                      </FormItem>
                    )
                  }
                }]
              }, {
                name: "Allowed Vehicles",
                fields: [{
                  name: "allowedVehicles", render: () => {
                    return (
                      <FormItem>
                        <FormMessage />
                        <FormControl>
                        </FormControl>
                      </FormItem>
                    )
                  }
                }]
              }]
            },
            {
              name: "Pricing",
              substeps: [{
                name: "Is this place open?",
                fields: [{ name: "isOpen" }]
              }, {
                name: "Pricing",
                fields: [{
                  name: "pricing.basePrice",
                }, {
                  name: "pricing.pphbi",
                },
                {
                  name: "pricing.plph"
                },
                {
                  name: "pricing.pphcr"
                }, {
                  name: "pricing.pphcy"
                }]
              }]
            }]}
          />
        </form>
      </Form>
    </Page>
  )
}

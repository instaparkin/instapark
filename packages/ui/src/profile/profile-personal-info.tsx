'use client'

import React from 'react'
import { Input } from "../components/input"
import { Path } from 'react-hook-form'
import { ProfileForm, ProfileFormType } from '../forms/profile-create-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/form'
import { fieldName } from '../utils/field-name'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion"
import { Button } from '../components/button'
import toast from 'react-hot-toast'

interface ProfileField<T extends Record<string, unknown>> {
  name: Path<T>,
  type: React.HTMLInputTypeAttribute
  description?: string
}

export function ProfilePersonalInfo() {

  const personalFields: ProfileField<ProfileFormType>[] = [
    { name: "phoneNumber", type: "number", description: "Add a number so confirmed guests can get in touch" },
    { name: "kyc.uidai", type: "number", description: "UIDAI helps make sure you're really you." },
  ]

  const locationFields: ProfileField<ProfileFormType>[] = [
    { name: "country", type: "text", description: "Add your permanent address" },
    { name: "state", type: "text" },
    { name: "district", type: "text" },
    { name: "city", type: "text" },
    { name: "street", type: "text" },
    { name: "pincode", type: "text" },
    { name: "latitude", type: "number" },
    { name: "longitude", type: "number" },
    { name: "name", type: "text" },
    { name: "landmark", type: "text" },
  ]

  const form = ProfileForm()

  const onSubmit = (data: Partial<ProfileFormType>) => {
    toast.success(JSON.stringify(data))
  }

  return (
    <div className="max-w-2xl mx-auto border  px-10 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Accordion type="single" collapsible>
              {personalFields.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className='py-8'>{fieldName(f.name)}</AccordionTrigger>
                  <AccordionContent className='py-4 space-y-4 pb-8'>
                    <div>{f.description}</div>
                    <FormField
                      name={f.name}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className='py-6' type={f.type} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button size={"lg"} type='submit'>Update</Button>
                  </AccordionContent>
                </AccordionItem>
              ))}

              {/* Grouped Location Fields in One Accordion */}
              <AccordionItem value="location">
                <AccordionTrigger className='py-10'>Location</AccordionTrigger>
                <AccordionContent className='py-4 space-y-4 pb-8'>
                  {locationFields.map((f, i) => (
                    <FormField
                      key={i}
                      name={f.name}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{fieldName(f.name)}</FormLabel>
                          <FormControl>
                            <Input className='py-6' type={f.type} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button size={"lg"} type='submit'>Update Location</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
    </div>
  )
}

'use client'

import React from 'react'
import { Input } from "../components/input"
import { Card, CardContent } from "../components/card"
import { Path } from 'react-hook-form'
import { ProfileForm, ProfileFormType } from '../forms/profile-create-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/form'
import { fieldName } from '../utils/field-name'

interface ProfileField<T extends Record<string, unknown>> {
  name: Path<T>,
  type: React.HTMLInputTypeAttribute
}

export function ProfilePersonalInfo() {

  const fields: ProfileField<ProfileFormType>[] = [
    { name: "phoneNumber", type: "number" },
    { name: "kyc.uidai", type: "number" },
    { name: "country", type: "text" },
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form>
            {
              fields.map((f, i) => (
                <FormField
                  key={i}
                  name={f.name}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName(f.name)}</FormLabel>
                      <FormControl>
                        <Input type={f.type} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


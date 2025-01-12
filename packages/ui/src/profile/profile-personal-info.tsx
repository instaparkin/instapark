'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Card, CardContent } from "../components/card"
import { useSessionContext } from '@instapark/auth'
import { UseFormReturn } from 'react-hook-form'
import { FullnameType, fullnameForm } from "@instapark/forms"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion"
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/form'
import axios from 'axios'

interface ProfileField {
  key: string
  label: string
  value: string
  description?: string
  action: 'edit' | 'add'
}

export function ProfilePersonalInfo() {
  const session = useSessionContext();
  if (session.loading) {
    return null
  }

  const userId = session.userId
  console.log(session);

  const [editingField, setEditingField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: 'Hitish',
    lastName: 'Rao P'
  })

  const [fullname, setFullname] = useState<FullnameType>();

  console.log(fullname);


  useEffect(() => {
    async function getdata() {
      const response = await fetch("http://localhost:8081/auth/userdetails")
      const data = await response.json()
      console.log(data);
    }
    getdata()
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8088/profile/fullname/get/${userId}`)
      .then(res => {
        setFullname(res.data)
      })
      .catch((error) => {
        throw error
      })
  }, [])

  const form = fullnameForm() as UseFormReturn<FullnameType>


  const fields: ProfileField[] = [
    { key: 'legalName', label: 'Legal name', value: `${formData.firstName} ${formData.lastName}`, action: 'edit' },
    { key: 'preferredName', label: 'Preferred name', value: 'Not provided', action: 'add' },
    { key: 'email', label: 'Email address', value: 'h***p@gmail.com', action: 'edit' },
    {
      key: 'phone',
      label: 'Phone numbers',
      value: 'Not provided',
      description: 'Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they\'re used.',
      action: 'add'
    },
    { key: 'governmentId', label: 'Government ID', value: 'Not provided', action: 'add' },
    { key: 'address', label: 'Address', value: 'Not provided', action: 'edit' },
    { key: 'emergency', label: 'Emergency contact', value: 'Not provided', action: 'add' },
  ]

  const onSubmit = async (values: FullnameType) => {
    await fetch("http://localhost:8088/profile/fullname/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div>
                <h2 className="text-lg font-medium">Legal name</h2>
                <div>{"Hitish Rao P"}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {field.name}
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {field.name}
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save</Button>
                </form>
              </Form>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name on ID</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name on ID</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h1 className="text-2xl font-semibold mb-6">Personal info</h1>
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.key} className="border-b border-gray-200 pb-6 last:border-0">
              {editingField === 'legalName' && field.key === 'legalName' ? (
                <div className="space-y-4">
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-base font-medium">{field.label}</h2>
                    <p className="text-gray-600">{field.value}</p>
                    {field.description && (
                      <p className="text-sm text-gray-500">{field.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-gray-600"
                    onClick={() => setEditingField(field.key)}
                  >
                    {field.action === 'edit' ? 'Edit' : 'Add'}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


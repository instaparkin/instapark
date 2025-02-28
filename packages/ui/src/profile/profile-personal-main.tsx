'use client'

import React from 'react'
import { ProfileForm, ProfileFormType } from '../forms/profile-create-form'
import toast from 'react-hot-toast'
import { Group, SidebarForm } from '../components/sidebar-form'
import { useMutation } from '@apollo/client'
import { UPSERT_PROFILE } from '../graphql/upsert-profile'
import { useAuth } from '../hooks/use-auth'

export function ProfilePersonalMain() {
  const { form, verified } = ProfileForm();
  const { userId } = useAuth();
  const groups: Group<ProfileFormType>[] = [
    {
      title: "Personal",
      href: "#personal",
      fields: [
        { name: "firstName", type: "text", description: "Enter your phone number for verification and communication." },
        { name: "lastName", type: "text", description: "Enter your phone number for verification and communication." },
        { name: "emails", type: "text", description: "Enter your phone number for verification and communication." },
        { name: "phoneNumber", type: "text", description: "Enter your phone number for verification and communication." },
      ]
    },
    {
      verified: verified,
      title: "UIDAI",
      href: "#uidai",
      fields: [
        { name: "kyc.uidai", type: "text", description: "Enter your Aadhaar number for identity verification." },
      ]
    },
    {
      title: "Location",
      href: "#location",
      fields: [
        { name: "country", type: "text", description: "Enter your country of residence." },
        { name: "state", type: "text", description: "Enter your state or province." },
        { name: "district", type: "text", description: "Enter your district or region." },
        { name: "city", type: "text", description: "Enter your city or town." },
        { name: "street", type: "text", description: "Enter your street address." },
        { name: "pincode", type: "text", description: "Enter your area's postal code." },
        { name: "latitude", type: "number", description: "Specify the latitude of your location." },
        { name: "longitude", type: "number", description: "Specify the longitude of your location." },
        { name: "name", type: "text", description: "Enter the name associated with this address." },
        { name: "landmark", type: "text", description: "Provide a nearby landmark for reference." },
      ]
    },
  ];

  const [upsertProfile, { data }] = useMutation(UPSERT_PROFILE, {
    onCompleted: () => {
      toast.success(data?.UserMutation?.upsertProfile as string)
    },
    onError: (error) => {
      toast.error(`${error}`);
    }
  });

  return (
    <SidebarForm
      form={form}
      groups={groups}
      onSubmit={(data) => {
        upsertProfile({ variables: { userId, ...data } })
      }} />
  )
}

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
      fields: [
        { name: "firstName", label: "First Name", type: "text", description: "Enter your first name as per official records." },
        { name: "lastName", label: "Last Name", type: "text", description: "Enter your last name or surname." },
        { name: "email", label: "Email", type: "text", readonly: true, description: "Enter your email address for communication and notifications." },
        { name: "phoneNumber", label: "Phone Number", type: "text", description: "Enter your mobile number for verification and contact purposes." },
      ]
    },
    {
      verified: verified,
      title: "UIDAI",
      fields: [
        { name: "kyc.uidai",label: "Aadhar Number", type: "text", description: "Enter your Aadhaar number for identity verification as per UIDAI guidelines. This will be used in future for verification" },
      ]
    },
    {
      title: "Location",
      fields: [
        { name: "country", type: "text", label: "Country", description: "Select the country where you currently reside." },
        { name: "state", type: "text", label: "State", description: "Enter the state or province of your residence." },
        { name: "district", type: "text", label: "District", description: "Enter the district or region of your residence." },
        { name: "city", type: "text", label: "City", description: "Enter the city or town where you live." },
        { name: "street", type: "text", label: "Street", description: "Enter your complete street address." },
        { name: "pincode", type: "text", label: "Pincode", description: "Enter the postal code or ZIP code of your area." },
        { name: "name", type: "text", label: "Name", description: "Enter the name associated with this address, such as the resident's name." },
        { name: "landmark", type: "text", label: "Landmark", description: "Provide a well-known nearby landmark to help locate your address." },
      ]
    },
  ];


  const [upsertProfile] = useMutation(UPSERT_PROFILE, {
    onCompleted: (data) => {
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

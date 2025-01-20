import { Page, ProfileMain } from '@instapark/ui'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title : 'Profile Information'
}

const UserProfilePage = () => {
    return (
        <Page className='pt-8'>
            <ProfileMain />
        </Page>
    )
}

export default UserProfilePage
import { Page, ProfilePersonalMain } from '@instapark/ui'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title : 'Profile Information'
}

const UserProfilePage = () => {
    return (
        <Page className='pt-8'>
            <ProfilePersonalMain />
        </Page>
    )
}

export default UserProfilePage
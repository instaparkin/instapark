import React from 'react'
import { ProfileVerification } from './profile-verification'
import { Page } from '../components/page'
import { ProfilePersonalInfo } from './profile-personal-info'

export const ProfileMain = () => {
    return (
        <Page>
            <ProfilePersonalInfo />
            <ProfileVerification />
        </Page>
    )
}

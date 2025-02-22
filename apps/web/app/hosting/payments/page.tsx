import { Page, PaymentDetailsMain } from '@instapark/ui'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Payment Details - Instapark"
}

const PaymentsPage = () => {
    return (
        <Page title='Payment Details'>
            <PaymentDetailsMain />
        </Page>
    )
}

export default PaymentsPage
"use client"

import { Page, Reserve } from '@instapark/ui'
import React from 'react'
import { useSearchParams, useParams } from 'next/navigation'

const ReservePage = () => {
    const searchParams = useSearchParams();
    const params = useParams()
    const bid = params["id"];
    const oid = searchParams.get("oid");
    const psid = searchParams.get("psid");
    
    return (
        <Page title='Confirm and Pay'>
            <Reserve bookingId={bid as string} orderId={oid as string} paymentSessionId={psid as string} />
        </Page>
  )
}

export default ReservePage
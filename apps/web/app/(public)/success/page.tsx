import { Success } from '@instapark/ui/src/components/success'
import React from 'react'

const SuccessPage = () => {
  return (
    <>
      <Success
        timeout={10000}
        text="Listing details added successfully"
        redirectPath="/hosting/listings"
      />,
    </>
  )
}

export default SuccessPage
import { Result } from '@instapark/ui/src/components/result'
import React from 'react'

const SuccessPage = () => {
  return (
    <>
      <Result
        timeout={10000}
        response="Listing details added successfully"
        redirectPath="/hosting"
      />,
    </>
  )
}

export default SuccessPage
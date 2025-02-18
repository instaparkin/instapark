"use client"

import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '../components/button'

export const Vendor = () => {
    async function handleCreateVendor() {
        axios.post(`https://sandbox.cashfree.com/pg/easy-split/vendors`,
            {
                "vendor_id": "vendortest123",
                "status": "ACTIVE",
                "name": "customer",
                "email": "johndoe@cashfree.com",
                "phone": 9876543210,
                "verify_account": true,
                "dashboard_access": false,
                "schedule_option": 1,
                "bank": {
                    "account_number": 12345678890,
                    "account_holder": "John Doe",
                    "ifsc": "HDFC019345"
                },
                "kyc_details": {
                    "account_type": "INDIVIDUAL",
                    "uidai": 753624181019,
                    "pan": "BIAPA2934N",
                    "passport_number": "L6892603"
                }
            }, {
            headers: {
                "x-api-version": "2023-08-01",
                "x-client-id": "TEST10180324795c6ed369800e535fc242308101",
                "x-client-secret": "cfsk_ma_test_ea216f531ab789cd1bb6c0d98bf6f4a6_179a58b2"
            }
        })
            .then(res => toast.success(res.data))
            .catch(error => toast.error(error.message))
    }

    return (
        <div>
            <Button onClick={handleCreateVendor}>
                Create Vendor
            </Button>
        </div>
    )
}

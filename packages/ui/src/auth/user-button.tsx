"use client"

import { useEffect } from "react"

export const UserButton = () => {
    useEffect(() => {
        const fetchSomething = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/userdetails")
                console.log(await response.json());
            } catch (error) {
                console.error(error)
            }
        }
        fetchSomething();
    }, [])
    return (
        <div>

        </div>
    )
}

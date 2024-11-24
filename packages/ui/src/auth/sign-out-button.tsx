"use client"

import { Button } from '../components/button'
import { signOut } from "@instapark/auth";

interface SignOutButtonProps {
  text?: string
}

export const SignOutButton = ({ text = 'Sign out' }: SignOutButtonProps) => {
  return (
    <Button
      onClick={() => signOut()}
      className="w-full mt-4 text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500"
      variant={"outline"}>
      {text}
    </Button>
  )
}

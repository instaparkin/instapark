"use client"

import React from 'react';
import { Button } from '../components/button'
import { signOut } from "@instapark/auth";
import { redirect } from 'next/navigation';

interface SignOutButtonProps {
  text?: string
}

export const SignOutButton = ({ text = 'Sign out' }: SignOutButtonProps) => {

  const handleSignOut = () => {
    signOut();
    redirect("/auth")
  }

  return (
    <Button
      size={"icon"}
      onClick={handleSignOut}
      className="w-full flex pl-2 justify-start text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500"
      variant={"ghost"}>
      {text}
    </Button>
  )
}

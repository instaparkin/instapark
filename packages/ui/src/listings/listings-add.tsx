"use client";

import React, { useState } from "react";
import { MultiStepForm } from "../components/multi-step-form";
import { listingsAddSteps } from "./listings-add-steps";
import { ListingCreateForm, ListingsAddType } from "../forms/listing-create-form";
import { useMutation } from "@apollo/client";
import { CREATE_LISTING } from "../graphql/create-listing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";
import { useAuth } from "../hooks/use-auth";
import { Checkmark } from "../components/checkmark";

export const ListingsAdd = () => {
  const { form } = ListingCreateForm({ defaultValues: false });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<JSX.Element | null>(null);
  const { userId } = useAuth();

  const [createListing] = useMutation(CREATE_LISTING, {
    onCompleted: () => {
      setDialogMessage(
        <div className="flex flex-col items-center gap-2">
          <Checkmark size={80} color="green" />
          <DialogDescription className="text-center text-green-600">
            Listing created successfully!
          </DialogDescription>
        </div>
      );
      setIsDialogOpen(true);
    },
    onError: (err) => {
      setDialogMessage(
        <DialogDescription className="text-center text-red-600">
          Error: {err.message}
        </DialogDescription>
      );
      setIsDialogOpen(true);
    },
  });

  const handleSubmit = async (data: ListingsAddType) => {
    setDialogMessage(
      <DialogDescription className="text-center">Submitting...</DialogDescription>
    );
    setIsDialogOpen(true);
    await createListing({ variables: { ...data, userId } });
  };

  return (
    <>
      <MultiStepForm form={form} steps={listingsAddSteps} onSubmit={({ data }) => handleSubmit(data)} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent className="flex flex-col items-center gap-4">
          <DialogHeader className="text-center">
            <DialogTitle className="text-center mb-4">Status</DialogTitle>
            {dialogMessage}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

"use client"

import React, { useState } from "react";
import { MultiStepForm } from "../components/multi-step-form";
import { listingsAddSteps } from "./listings-add-steps";
import toast from "react-hot-toast";
import { ListingRequest } from "@instapark/types";
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

export const ListingsAdd = () => {
  const { form } = ListingCreateForm({ defaultValues: false });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [createListing, { loading, error, data: response }] = useMutation(CREATE_LISTING, {
    onCompleted: (data) => {
      setDialogMessage(data.ListingMutation?.createListing as string);
      setIsDialogOpen(true);
    },
    onError: (err) => {
      setDialogMessage(`Submission error! ${err.message}`);
      setIsDialogOpen(true);
    },
  });

  const handleSubmit = async (data: ListingsAddType) => {
    setDialogMessage("Submitting");
    setIsDialogOpen(true);
    await createListing({ variables: data });
  };

  return (
    <>
      <MultiStepForm form={form} steps={listingsAddSteps} onSubmit={({ data }) => handleSubmit(data)} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="hidden">Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

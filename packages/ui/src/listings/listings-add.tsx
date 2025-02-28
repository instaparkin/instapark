"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

  interface CheckmarkProps {
    size?: number;
    strokeWidth?: number;
    color?: string;
    className?: string;
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.2,
          type: "spring",
          duration: 1.5,
          bounce: 0.2,
          ease: "easeInOut",
        },
        opacity: { delay: i * 0.2, duration: 0.2 },
      },
    }),
  };

  function Checkmark({ size = 100, strokeWidth = 2, color = "green", className = "" }: CheckmarkProps) {
    return (
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        className={className}
      >
        <title>Success</title>
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          variants={draw}
          custom={0}
          style={{
            strokeWidth,
            strokeLinecap: "round",
            fill: "transparent",
          }}
        />
        <motion.path
          d="M30 50L45 65L70 35"
          stroke={color}
          variants={draw}
          custom={1}
          style={{
            strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "transparent",
          }}
        />
      </motion.svg>
    );
  }

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

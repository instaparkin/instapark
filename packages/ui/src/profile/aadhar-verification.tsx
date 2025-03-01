"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormType } from "../forms/profile-create-form";
import { FormControl, FormField, FormItem, FormMessage } from "../components/form";
import { Input } from "../components/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card";

interface AadharVerificationProps {
  verified: boolean;
  form: UseFormReturn<ProfileFormType>;
}

export const AadharVerification = ({ form }: AadharVerificationProps) => {
  return (
    <div>
      <Card>
        <FormField
          control={form.control}
          name="kyc.uidai"
          render={({ field }) => (
            <FormItem>
              <CardHeader>
                <CardTitle>
                  Aadhar UIDAI
                </CardTitle>
              </CardHeader>
              <FormControl>
                <CardContent>
                  <Input
                    type="text"
                    {...field}
                    maxLength={14}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      value = value.slice(0, 12);
                      value = value.replace(/(\d{4})/g, "$1 ").trim();
                      field.onChange(value);
                    }}
                  />
                </CardContent>
              </FormControl>
              <CardFooter>
                <FormMessage />
              </CardFooter>
            </FormItem>
          )}
        />
      </Card>
    </div>
  );
};

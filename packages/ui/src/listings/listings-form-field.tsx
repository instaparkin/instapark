"use client"

import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '../components/form';
import { Label } from '../components/label';
import { Input } from '../components/input';
import { fieldName } from '../utils/field-name';
import { Path, UseFormReturn } from 'react-hook-form';
import { Listing, ListingRequest } from '@instapark/types';

interface IListingsFormField {
  form: UseFormReturn<ListingRequest>;
  name: Path<ListingRequest>;
  value?: string | number
}

export const ListingsFormField = ({ form, name, value }: IListingsFormField) => {
  useEffect(() => {
    async function trigger() {
      await form.watch()
      await form.trigger();
    }
    trigger()
  }, [form.getValues()]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <div className="group relative">
                <Label
                  htmlFor={fieldName(field.name)}
                  className="z-10 origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                >
                  <span className="inline-flex bg-background px-2">{fieldName(field.name)}</span>
                </Label>
                <Input
                  className='py-6'
                  disabled={field.disabled}
                  {...field}
                  value={value}
                  onChange={(e) => {
                    form.setValue(field.name, e.target.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true
                    })
                  }}
                  onBlur={field.onBlur}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

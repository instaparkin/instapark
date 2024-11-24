'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import { createPaymentForm, createPaymentType } from '@instapark/forms'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { createOrder, doPayment } from "@instapark/payments";

export const CreatePayment = () => {
  const form = createPaymentForm()

  const onSubmit = async (values: createPaymentType) => {
    console.log(values);
    createOrder({
      order_amount: 100,
      customer_details: {
        customer_id: Date.now().toString(),
        customer_name: values.firstname,
        customer_email: values.email,
        customer_phone: values.phone
      }
    })
  }


  return (
    <Form {...form}>
      <Button onClick={() => doPayment({ paymentSessionId: "session_2YXNjhf9both-tcQfvIk_1fXcHgSEWt85s5IBiLAW4xB19chjIAwiUEP1yUtFXUcHbah7vd-5GayTlN9J5s4sJ3fzzd_bA83Wzco2MLKBFUW" })}>Pay Now</Button>
      <form onSubmit={form.handleSubmit(onSubmit)} action="">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

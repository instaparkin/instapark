'use client';

import React from 'react';
import { Button } from '../components/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../components/form';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { ContactUsFormType } from '@instapark/schemas';
import { ContactUsForm } from '../forms/contact-us-form';
import { useMutation } from '@apollo/client';
import { CONTACT_US } from '../graphql/contact-us';
import toast from 'react-hot-toast';

export function ContactUs() {
	const { form } = ContactUsForm();
	const [contactUs] = useMutation(CONTACT_US, {
		onCompleted: (data) => {
			toast.success(data.UserMutation?.contactUs as string);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
	});

	function onSubmit(values: ContactUsFormType) {
		contactUs({
			variables: {
				firstName: values.firstname,
				lastName: values.lastname,
				email: values.email,
				message: values.message,
			},
		});
		form.reset();
	}

	return (
		<div className={`flex min-h-screen items-center justify-center p-4`}>
			<div className="bg-background border-border w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
					<p className="text-muted-foreground mt-1">Instapark</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="firstname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="Value" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Value" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Value" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Value"
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

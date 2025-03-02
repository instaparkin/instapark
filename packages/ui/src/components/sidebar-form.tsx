import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import { ControllerRenderProps, Path, UseFormReturn } from 'react-hook-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../components/form';
import { Input } from '../components/input';
import { Button } from './button';
import { Badge } from './badge';
import { InfoIcon } from 'lucide-react';

export type Field<T extends Record<string, unknown>> = {
	name: Path<T>;
	label?: string;
	readonly?: boolean;
	description: string;
	type?: React.HTMLInputTypeAttribute;
	component?: ({
		field,
	}: {
		field: ControllerRenderProps<T, Path<T>>;
	}) => JSX.Element;
};

export type Group<T extends Record<string, unknown>> = {
	title: string;
	component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
	fields: Field<T>[];
	verified?: boolean;
	description?: string;
	singleSubmit?: boolean;
};

export interface SidebarFormProps<T extends Record<string, unknown>> {
	groups: Group<T>[];
	form: UseFormReturn<T>;
	onSubmit?: (data: T) => void;
	defaultValues?: T;
	diableForm?: boolean;
}

export const SidebarForm = <T extends Record<string, unknown>>({
	groups,
	form,
	onSubmit,
	defaultValues,
	diableForm = false,
}: SidebarFormProps<T>) => {
	React.useEffect(() => {
		if (defaultValues) {
			form.reset(defaultValues);
		}
	}, [form]);

	const handleSubmit = (data: T) => {
		if (!diableForm) {
			onSubmit?.(data);
		}
	};

	return (
		<Tabs defaultValue={groups[0]?.title}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<TabsList className="max-w-full space-x-2 overflow-auto overflow-y-hidden">
						{groups.map((g, i) => (
							<TabsTrigger key={i} value={g.title}>
								{g.title}
							</TabsTrigger>
						))}
					</TabsList>
					{groups.map((g, i) => (
						<TabsContent
							key={i}
							value={g.title}
							className="mx-auto max-w-2xl space-y-6"
						>
							<div className="flex items-center justify-between">
								{g.description && (
									<div className="rounded-md border border-blue-500/50 px-4 py-3 text-blue-600">
										<p className="text-sm">
											<InfoIcon
												className="-mt-0.5 me-3 inline-flex opacity-60"
												size={16}
												aria-hidden="true"
											/>
											{g.description}
										</p>
									</div>
								)}
								{g.verified && (
									<div className="flex justify-end">
										<Badge
											variant="outline"
											className="bg-positive gap-1 p-1.5"
										>
											{'Verified'}
										</Badge>
									</div>
								)}
							</div>

							{g.component ? (
								<g.component form={form} />
							) : (
								g.fields.map((f, j) => (
									<Card key={j} id={f.name} className="rounded-sm">
										<FormField
											control={form.control}
											name={f.name}
											render={({ field }) => (
												<FormItem>
													<CardHeader className="pb-2">
														<CardTitle className="text-xl">{f.label}</CardTitle>
														<CardDescription>{f.description}</CardDescription>
													</CardHeader>
													<CardContent>
														<FormControl>
															{f.component ? (
																<f.component field={field} />
															) : (
																<Input
																	className="max-w-xs"
																	type={f.type}
																	{...field}
																	value={field.value as string}
																	readOnly={f.readonly || diableForm}
																/>
															)}
														</FormControl>
														<FormMessage />
													</CardContent>
												</FormItem>
											)}
										/>
										{!g.singleSubmit && !f.readonly && (
											<CardFooter className="flex justify-end border-t px-4 py-3">
												<Button type="submit" disabled={diableForm}>
													Save
												</Button>
											</CardFooter>
										)}
									</Card>
								))
							)}

							{g.singleSubmit && g.fields.some((f) => !f.readonly) && (
								<div className="flex justify-end">
									<Button type="submit" disabled={diableForm}>
										Save
									</Button>
								</div>
							)}
						</TabsContent>
					))}
				</form>
			</Form>
		</Tabs>
	);
};

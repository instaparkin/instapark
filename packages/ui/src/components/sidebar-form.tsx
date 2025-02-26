import React, { HTMLInputTypeAttribute } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { Path, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form';
import { fieldName } from '../utils/field-name';
import { Input } from '../components/input';
import { Button } from './button';

export type Field<T extends Record<string, unknown>> = {
  name: Path<T>;
  disabled?: boolean,
  description: string
  type?: HTMLInputTypeAttribute
}

export type Group<T extends Record<string, unknown>> = {
  title: string;
  href: string;
  component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
  fields: Field<T>[]
}

export interface SidebarFormProps<T extends Record<string, unknown>> {
  groups: Group<T>[]
  form: UseFormReturn<T>
  onSubmit?: (data: T) => void
}

export const SidebarForm = <T extends Record<string, unknown>>({ groups, form, onSubmit }: SidebarFormProps<T>) => {
  return (
    <Tabs defaultValue={groups[0]?.title}>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit((e) => console.log(e.name))}>
          <TabsList className='space-x-2 max-w-full overflow-auto overflow-y-hidden'>
            {
              groups.map((g, i) => (
                <TabsTrigger key={i} value={g.title}>{g.title}</TabsTrigger>
              ))
            }
          </TabsList>
          {
            groups.map((g, i) => (
              <TabsContent key={i} value={g.title} className='max-w-2xl mx-auto space-y-6'>
                {
                  g.component ? <g.component form={form} /> : g.fields.map((f, i) => (
                    <Card key={i} id={f.name} className='rounded-sm'>
                      <FormField
                        key={i}
                        control={form.control}
                        name={f.name}
                        render={({ field }) => (
                          <FormItem>
                            <CardHeader>
                              <FormLabel>
                                <CardTitle className='text-xl'>
                                  {fieldName(f.name)}
                                </CardTitle>
                              </FormLabel>
                              <CardDescription>
                                {f.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <FormControl>
                                <Input className='max-w-xs' type={f.type} {...field} value={field.value as string} />
                              </FormControl>
                              <FormMessage />
                            </CardContent>
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))
                }
                <div className='flex justify-end'>
                  <Button size={"responsive"} type="submit">Edit</Button>
                </div>
              </TabsContent>
            ))
          }
        </form>
      </Form>
    </Tabs >
  )
}

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs"
import { ControllerRenderProps, Path, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../components/form';
import { Input } from '../components/input';
import { Button } from './button';
import { Badge } from './badge';

export type Field<T extends Record<string, unknown>> = {
  name: Path<T>;
  label?: string
  readonly?: boolean,
  description: string
  type?: React.HTMLInputTypeAttribute
  component?: ({ field }: { field: ControllerRenderProps<T, Path<T>> }) => JSX.Element;
}

export type Group<T extends Record<string, unknown>> = {
  title: string;
  component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
  fields: Field<T>[];
  verified?: boolean
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
        <form action="" onSubmit={form.handleSubmit((data) => onSubmit?.(data))}>
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
                  g.verified &&
                  <div className='flex justify-end'>
                    <Badge variant="outline" className="gap-1 bg-positive p-1.5">
                      {"Verified"}
                    </Badge>
                  </div>
                }
                {
                  g.component ? <g.component form={form} /> : g.fields.map((f, i) => (
                    <>
                      <Card key={i} id={f.name} className='rounded-sm'>
                        <FormField
                          key={i}
                          control={form.control}
                          name={f.name}
                          render={({ field }) => (
                            <FormItem>
                              <CardHeader className='pb-2'>
                                <CardTitle className='text-xl'>
                                  {f.label}
                                </CardTitle>
                                <CardDescription>
                                  {f.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className=''>
                                <FormControl>
                                  {
                                    f.component ? <f.component field={field} /> :
                                      <Input className='max-w-xs' type={f.type} {...field} value={field.value as string} readOnly={f.readonly} />
                                  }
                                </FormControl>
                                <FormMessage />
                              </CardContent>
                            </FormItem>
                          )}
                        />
                        <CardFooter className='flex justify-end border-t py-3 px-4'>
                          <Button type="submit">Save</Button>
                        </CardFooter>
                      </Card>
                    </>
                  ))
                }
              </TabsContent>
            ))
          }
        </form>
      </Form>
    </Tabs >
  )
}

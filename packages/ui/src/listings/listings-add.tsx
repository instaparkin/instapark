import React from 'react'
import { ListingsAddForm } from "@instapark/listings"
import { Form } from '../components/form';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { StepProps, UseMultiStepForm } from '../hooks/use-multi-step-form';
import { is } from 'date-fns/locale';

export const ListingsAdd = () => {

  const steps: StepProps[] = [
    {
      title: "Step 1",
      component: <div>Step 1</div>
    },
    {
      title: "Step 2",
      component: <div>Step 2</div>
    },
    {
      title: "Step 3",
      component: <div>Step 3</div>
    },
  ]

  const form = ListingsAddForm();

  const { next, back, isFirstIndex, isLastIndex } = UseMultiStepForm({ steps });

  return (
    <Form {...form}>
      <form action="">
        <Card className="flex-grow">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="flex justify-between max-w-md mx-auto">
            {!isFirstIndex() && (
              <Button type="button" variant="outline" onClick={back}>
                Back
              </Button>
            )}
            <Button onClick={next} type="submit">
              {isLastIndex() ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

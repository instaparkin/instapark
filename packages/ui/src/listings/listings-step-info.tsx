import { Card, CardContent, CardDescription, CardTitle } from "../components//card"
import { Separator } from "../components/separator"
import { Text } from '../components/text'

interface ListingsStepInfoProps {
  stepNumber: number
  title: string
  description: string
}

export function ListingsStepInfo({
  stepNumber,
  title,
  description,
}: ListingsStepInfoProps) { 
  return (
    <Card className="border-none shadow-none h-96 grid lg:grid-cols-2">
      <div className="flex flex-col space-y-4 justify-end">
        <CardDescription>
          <Text text={`Step ${stepNumber}`} className="font-medium text-muted-foreground" />
        </CardDescription>
        <CardTitle>
          <Text text={title} className='text-3xl' />
        </CardTitle>
        <Separator />
        <CardDescription>
          <Text text={description} className="text-base text-wrap" />
        </CardDescription>
      </div>
    </Card>
  )
}


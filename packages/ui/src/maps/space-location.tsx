import { addSpaceForm, AddSpaceType } from '@instapark/forms'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/form'
import { Input } from '../components/input'
import { CountryCombobox } from './country-combobox'
import { Button } from '../components/button'
import { RootState, useSelector } from '@instapark/state'

export const SpaceDetails = () => {

  const form = addSpaceForm();

  const { geoLocations: locations } = useSelector(
    (state: RootState) => state.maps
  );

  const onSubmit = async (values: AddSpaceType) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4 '>
        <FormField
          control={form.control}
          name="country"
          defaultValue={locations[0]?.properties?.country}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <CountryCombobox defaultValue={locations[0]?.properties?.country} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input
                  defaultValue={locations[0]?.properties?.state}
                  type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input defaultValue={locations[0]?.properties?.district} type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/town</FormLabel>
              <FormControl>
                <Input defaultValue={locations[0]?.properties?.city} type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input defaultValue={locations[0]?.properties?.street} type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input defaultValue={locations[0]?.properties?.postcode} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House/Flat</FormLabel>
              <FormControl>
                <Input defaultValue={locations[0]?.properties?.name} type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-fit'>Submit</Button>
      </form>
    </Form>
  )
}

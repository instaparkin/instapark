"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../components/dialog";
import { Card, CardDescription } from "../components/card";
import {
  AppDispatch,
  autoCompleteLocations,
  RootState,
  useDispatch,
  useSelector,
} from "@instapark/state";
import { SearchInput } from "../components/search-input";
import { IoLocationOutline } from "react-icons/io5";
import { useDebouncedValue } from "@mantine/hooks";
import { NoResults } from "../components/no-results";
import { Text } from "../components/text";
import { CiLocationOn } from "react-icons/ci";
import { MapData } from "@instapark/state/src/slices/maps-slice";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MapsSearchProps {
  onLocationClick?: (location: MapData) => void;
}

export const MapsSearch: React.FC<MapsSearchProps> = ({
  onLocationClick = () => { },
}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { autocomplete } = useSelector((state: RootState) => state.maps);
  const [debouncedValue] = useDebouncedValue(value, 1000);

  useEffect(() => {
    if (debouncedValue) {
      dispatch(autoCompleteLocations(debouncedValue));
    }
  }, [debouncedValue]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleLocationClick = (location: MapData) => {
    if (location) {
      setValue(location.location as string);
      setOpen(false);
      onLocationClick(location);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <SearchInput
          defaultValue={autocomplete[0]?.location as string || value}
          placeholder="Search Space"
        />
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search On Maps</DialogTitle>
        </DialogHeader>
        <SearchInput
          className="fixed top-0 left-0 z-10"
          value={value}
          type="text"
          onChange={onValueChange}
          placeholder="Search Space"
        />
        <div className="p-2 grid gap-2 max-h-[85vh] overflow-y-auto pt-10">
          {autocomplete?.length > 0 ? (
            autocomplete?.map((location, index) => {
              return (
                <Card
                  onClick={() =>
                    handleLocationClick(
                      location
                    )
                  }
                  className="p-0 cursor-pointer"
                  key={index}
                >
                  <CardDescription className="flex items-center gap-4 w-full p-4">
                    <div className="border p-4 bg-accent rounded-lg flex items-center justify-center">
                      <IoLocationOutline />
                    </div>
                    <div className="flex flex-wrap gap-1 leading-tight line-clamp-2">
                      <Text text={location.location as string} />
                    </div>
                  </CardDescription>
                </Card>
              );
            })
          ) : (
            <div className="p-2">
              <NoResults
                text="No Results"
                icon={<CiLocationOn className="w-10 h-10" />}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

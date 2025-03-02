'use client';

import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '../components/dialog';
import { Card, CardDescription } from '../components/card';
import {
	AppDispatch,
	autoCompleteLocations,
	RootState,
	useDispatch,
	useSelector,
} from '@instapark/state';
import { SearchInput } from '../components/search-input';
import { IoLocationOutline } from 'react-icons/io5';
import { useDebouncedValue } from '@mantine/hooks';
import { NoResults } from '../components/no-results';
import { Text } from '../components/text';
import { CiLocationOn } from 'react-icons/ci';
import { MapData } from '@instapark/state/src/slices/maps-slice';
import { DialogTitle } from '@radix-ui/react-dialog';

interface MapsSearchProps {
	onLocationClick?: (location: MapData) => void;
}

export const MapsSearch: React.FC<MapsSearchProps> = ({
	onLocationClick = () => {},
}) => {
	const [value, setValue] = useState('');
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
					defaultValue={(autocomplete[0]?.location as string) || value}
					placeholder="Search Space"
				/>
			</DialogTrigger>
			<DialogContent className="p-0">
				<DialogHeader className="sr-only">
					<DialogTitle>Search On Maps</DialogTitle>
				</DialogHeader>
				<SearchInput
					className="fixed left-0 top-0 z-10"
					value={value}
					type="text"
					onChange={onValueChange}
					placeholder="Search Space"
				/>
				<div className="grid max-h-[85vh] gap-2 overflow-y-auto p-2 pt-10">
					{autocomplete?.length > 0 ? (
						autocomplete?.map((location, index) => {
							return (
								<Card
									onClick={() => handleLocationClick(location)}
									className="cursor-pointer p-0"
									key={index}
								>
									<CardDescription className="flex w-full items-center gap-4 p-4">
										<div className="bg-accent flex items-center justify-center rounded-lg border p-4">
											<IoLocationOutline />
										</div>
										<div className="line-clamp-2 flex flex-wrap gap-1 leading-tight">
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
								icon={<CiLocationOn className="h-10 w-10" />}
							/>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

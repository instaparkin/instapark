import { Path, UseFormReturn } from 'react-hook-form';

export type Field<T extends Record<string, unknown>> = {
	name: Path<T>;
	disabled?: boolean;
};

export type SubStep<T extends Record<string, unknown>> = {
	name: string;
	component?: ({ form }: { form: UseFormReturn<T> }) => JSX.Element;
	fields: Field<T>[];
};

export type Step<T extends Record<string, unknown>> = {
	substeps: SubStep<T>[];
};

export type MultiStepFormType<T extends Record<string, unknown>> = {
	form: UseFormReturn<T>;
	steps: Step<T>[];
	onSubmit?: ({ data }: { data: T }) => void;
};

export interface MultiStepNavigationProps<T extends Record<string, unknown>> {
	isFirstStep: boolean;
	isLastStep: boolean;
	isLastSecondStep: boolean;
	currentSubStepIndex: number;
	steps: Step<T>[];
	back: () => void;
	next: () => void;
}

export interface MultiStepProgressProps {
	calculateProgress: () => number[];
}

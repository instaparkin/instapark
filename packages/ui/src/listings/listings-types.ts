import { ReactNode } from "react";
import { ControllerRenderProps, Path, UseFormReturn } from "react-hook-form";

export type Field<T extends Record<string, unknown>> = {
    name: Path<T>;
    disabled?: boolean;
    render?: (props: ControllerRenderProps<T, Path<T>>) => JSX.Element;
}

export type SubStep<T extends Record<string, unknown>> = {
    name: string;
    fields: Field<T>[];
    children?: ReactNode;
    className?: string;
};

export type Step<T extends Record<string, unknown>> = {
    name: string;
    substeps: SubStep<T>[];
};

export type MultiStepFormType<T extends Record<string, unknown>> = {
    form: UseFormReturn<T>;
    steps: Step<T>[];
};
import { HTMLInputTypeAttribute } from "react";
import { Path, UseFormReturn } from "react-hook-form";

export type Field<T extends Record<string, unknown>> = {
    name: Path<T>;
    type: HTMLInputTypeAttribute;
    description: string
}

export type VendorCreateFormElements<T extends Record<string, unknown>> = {
    fields: Field<T>[];
}
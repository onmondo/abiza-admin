import { ReactNode } from "react"

export type ContextProps = {
    children: ReactNode
};

export interface SelectionProps {
    handleOnChange?: (event: any) => void
    handleOnBlur?: (event: any) => void
    value?: string
}

export interface BookingFormProps {
    handleClose?: () => void
    show?: boolean
}

export interface InputFormLabel {
    label?: string
}

export interface InputForm<T> extends InputFormLabel {
    onChange?: (value: T) => void
    onBlur?: (value: T) => void
    value?: string
}

export interface RangeInputForm<T> extends InputForm<T> {
    onChange?: (value: T) => void
    min?: number
    max?: number
}

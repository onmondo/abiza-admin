import { ReactNode } from "react"

export type BookingReportContextProps = {
    children: ReactNode
};

export interface SelectionProps {
    handleOnChange?: (event: any) => void
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
}

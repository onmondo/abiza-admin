import { ReactNode } from "react"

export type BookingReportContextProps = {
    children: ReactNode
};

export interface SelectionProps {
    handleOnChange?: (event: any) => void
    value?: string
}
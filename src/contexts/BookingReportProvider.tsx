import React, { createContext, useContext, useState } from "react";
import { BookingReportContextProps } from "../lib/componentTypes";

interface BookingReportState {
    chosenYear: string
    chosenMonth: string
    isBookingFormOpen: boolean
}

interface BookingReportContextValue {
    state: BookingReportState;
    setState: React.Dispatch<React.SetStateAction<BookingReportState>>;
    updateChosenYear: (chosenYear: string) => void;
    updateChosenMonth: (chosenMonth: string) => void;
    updateBookingForm: (isBookingFormOpen: boolean) => void;
}

const BookingReportContext = createContext<BookingReportContextValue>({
    state: { 
        chosenYear: "", 
        chosenMonth: "",
        isBookingFormOpen: false,
    },
    setState: () => {},
    updateChosenYear: () => {},
    updateChosenMonth: () => {},
    updateBookingForm: () => {},
});

export function useBookingReportContext() {
    return useContext(BookingReportContext);
}

// Provides App level component context
export const BookingReportProvider: React.FC<BookingReportContextProps> = ({ children }) => {
    const [state, setState] = useState<BookingReportState>({ 
        chosenYear: "", 
        chosenMonth: "",
        isBookingFormOpen: false,
    });
  
    const updateChosenYear = (chosenYear: string) => {
        setState({ ...state, chosenYear });
    };

    const updateChosenMonth = (chosenMonth: string) => {
        setState({ ...state, chosenMonth });
    }

    const updateBookingForm = (isBookingFormOpen: boolean) => {
        setState({ ...state, isBookingFormOpen });
    }
  
    // Value object that includes both state and update function
    const value: BookingReportContextValue = {
        state,
        setState,
        updateChosenYear,
        updateChosenMonth,
        updateBookingForm,
    };
  
    return <BookingReportContext.Provider value={value}>{children}</BookingReportContext.Provider>;
}

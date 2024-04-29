import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import { BookingReportContextProps } from "../lib/componentTypes";

interface BookingReportState {
    chosenYear: string
    chosenMonth: string
    chosenBookingId: string
    isBookingFormOpen: boolean
}

interface BookingReportContextValue {
    state: BookingReportState;
    setState: React.Dispatch<React.SetStateAction<BookingReportState>>;
    updateChosenYear: (chosenYear: string) => void;
    updateChosenMonth: (chosenMonth: string) => void;
    updateBookingForm: (isBookingFormOpen: boolean) => void;
    updateChosenBookingId: (chosenBookingId: string) => void;
}

const BookingReportContext = createContext<BookingReportContextValue>({
    state: { 
        chosenYear: moment().year().toString(), 
        chosenMonth: moment().format("MMMM"),
        chosenBookingId: "",
        isBookingFormOpen: false,
    },
    setState: () => {},
    updateChosenYear: () => {},
    updateChosenMonth: () => {},
    updateBookingForm: () => {},
    updateChosenBookingId: () => {},
});

export function useBookingReportContext() {
    return useContext(BookingReportContext);
}

// Provides App level component context
export const BookingReportProvider: React.FC<BookingReportContextProps> = ({ children }) => {
    const [state, setState] = useState<BookingReportState>({ 
        chosenYear: moment().year().toString(), 
        chosenMonth: moment().format("MMMM"),
        chosenBookingId: "",
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

    const updateChosenBookingId = (chosenBookingId: string) => {
        setState({ ...state, chosenBookingId });
    }
  
    // Value object that includes both state and update function
    const value: BookingReportContextValue = {
        state,
        setState,
        updateChosenYear,
        updateChosenMonth,
        updateBookingForm,
        updateChosenBookingId,
    };
  
    return <BookingReportContext.Provider value={value}>{children}</BookingReportContext.Provider>;
}

import React, { createContext, useContext, useState } from "react";
import { BookingReportContextProps } from "../lib/componentTypes";

interface BookingReportState {
    chosenYear: string
    chosenMonth: string
}

interface BookingReportContextValue {
    state: BookingReportState;
    setState: React.Dispatch<React.SetStateAction<BookingReportState>>;
    updateChosenYear: (chosenYear: string) => void;
    updateChosenMonth: (chosenMonth: string) => void;
}

const BookingReportContext = createContext<BookingReportContextValue>({
    state: { 
        chosenYear: "", 
        chosenMonth: "",
    },
    setState: () => {},
    updateChosenYear: () => {},
    updateChosenMonth: () => {},
});

export function useBookingReportContext() {
    return useContext(BookingReportContext);
}

// Provides App level component context
export const BookingReportProvider: React.FC<BookingReportContextProps> = ({ children }) => {
    const [state, setState] = useState<BookingReportState>({ 
        chosenYear: "", 
        chosenMonth: "",
    });
  
    const updateChosenYear = (chosenYear: string) => {
        setState({ ...state, chosenYear });
    };

    const updateChosenMonth = (chosenMonth: string) => {
        setState({ ...state, chosenMonth });
    }
  
    // Value object that includes both state and update function
    const value: BookingReportContextValue = {
        state,
        setState,
        updateChosenYear,
        updateChosenMonth,
    };
  
    return <BookingReportContext.Provider value={value}>{children}</BookingReportContext.Provider>;
}

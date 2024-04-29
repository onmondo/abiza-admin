import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import { ContextProps } from "../lib/componentTypes";

interface BookingReportState {
    chosenYear: string
    chosenMonth: string
    isBookingFormOpen: boolean
    isDeleteModalOpen: boolean
}

interface BookingReportContextValue {
    state: BookingReportState;
    setState: React.Dispatch<React.SetStateAction<BookingReportState>>;
    updateChosenYear: (chosenYear: string) => void;
    updateChosenMonth: (chosenMonth: string) => void;
    updateBookingForm: (isBookingFormOpen: boolean) => void;
    toggleDeleteModal: (isDeleteModalOpen: boolean) => void;
}

const BookingReportContext = createContext<BookingReportContextValue>({
    state: { 
        chosenYear: moment().year().toString(), 
        chosenMonth: moment().format("MMMM"),
        isBookingFormOpen: false,
        isDeleteModalOpen: false,
    },
    setState: () => {},
    updateChosenYear: () => {},
    updateChosenMonth: () => {},
    updateBookingForm: () => {},
    toggleDeleteModal: () => {},
});

export function useBookingReportContext() {
    return useContext(BookingReportContext);
}

// Provides App level component context
export const BookingReportProvider: React.FC<ContextProps> = ({ children }) => {
    const [state, setState] = useState<BookingReportState>({ 
        chosenYear: moment().year().toString(), 
        chosenMonth: moment().format("MMMM"),
        isBookingFormOpen: false,
        isDeleteModalOpen: false,
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

    const toggleDeleteModal = (isDeleteModalOpen: boolean) => {
        setState({ ...state, isDeleteModalOpen })
    }
  
    // Value object that includes both state and update function
    const value: BookingReportContextValue = {
        state,
        setState,
        updateChosenYear,
        updateChosenMonth,
        updateBookingForm,
        toggleDeleteModal,
    };
  
    return <BookingReportContext.Provider value={value}>{children}</BookingReportContext.Provider>;
}

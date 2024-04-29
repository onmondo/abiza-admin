import React, { createContext, useContext, useState } from "react";
import moment from "moment";
import { ContextProps } from "../lib/componentTypes";

interface DeleteBookingState {
    bookingId: string
    // chosenYear: string
    // chosenMonth: string
    // isDeleteModalOpen: boolean
}

interface DeleteBookingContextValue {
    state: DeleteBookingState;
    setState: React.Dispatch<React.SetStateAction<DeleteBookingState>>;
    // updateChosenYear: (chosenYear: string) => void;
    // updateChosenMonth: (chosenMonth: string) => void;
    updateBookingId: (bookingId: string) => void;
    // toggleDeleteModal: (isDeleteModalOpen: boolean) => void;
}

const DeleteBookingContext = createContext<DeleteBookingContextValue>({
    state: { 
        // chosenYear: moment().year().toString(), 
        // chosenMonth: moment().format("MMMM"),
        bookingId: "",
        // isDeleteModalOpen: false,
    },
    setState: () => {},
    // updateChosenYear: () => {},
    // updateChosenMonth: () => {},
    updateBookingId: () => {},
    // toggleDeleteModal: () => {},
});

export function useDeleteBookingContext() {
    return useContext(DeleteBookingContext);
}

// Provides App level component context
export const DeleteBookingProvider: React.FC<ContextProps> = ({ children }) => {
    const [state, setState] = useState<DeleteBookingState>({ 
        // chosenYear: moment().year().toString(), 
        // chosenMonth: moment().format("MMMM"),
        bookingId: "",
        // isDeleteModalOpen: false,
    });
  
    // const updateChosenYear = (chosenYear: string) => {
    //     setState({ ...state, chosenYear });
    // };

    // const updateChosenMonth = (chosenMonth: string) => {
    //     setState({ ...state, chosenMonth });
    // }

    const updateBookingId = (bookingId: string) => {
        setState({ ...state, bookingId });
    }

    // const toggleDeleteModal = (isDeleteModalOpen: boolean) => {
    //     setState({ ...state, isDeleteModalOpen })
    // }
  
    // Value object that includes both state and update function
    const value: DeleteBookingContextValue = {
        state,
        setState,
        // updateChosenYear,
        // updateChosenMonth,
        updateBookingId,
        // toggleDeleteModal,
    };
  
    return <DeleteBookingContext.Provider value={value}>{children}</DeleteBookingContext.Provider>;
}

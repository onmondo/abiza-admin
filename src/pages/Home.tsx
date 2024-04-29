import React from "react"
import { BookingTable } from "../components/BookingTable"
// import { BookingReportProvider } from "../contexts/BookingReportProvider"
import { useBookingReportContext } from "../contexts/BookingReportProvider"
import { BookingForm } from "../components/BookingForm"

export function Home() {
    const { 
        state,
        updateBookingForm,
    } = useBookingReportContext()

    function handleToggleForm() {
        updateBookingForm(!state.isBookingFormOpen)
    }

    return (
        
        <article id="home">
            <header>
                <h1>Bookings</h1>
            </header>
            <BookingTable />
            <BookingForm show={state.isBookingFormOpen} handleClose={handleToggleForm} />
        </article>
    )
}
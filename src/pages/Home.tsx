import React from "react"
// import { BookingTable } from "../features/BookingsPerMonth/BookingTable"
import { BookingReportProvider } from "../contexts/BookingReportProvider"
import { BookingsPerMonth } from "../features/BookingsPerMonth"

export function Home() {
    return (
        <BookingReportProvider>
            <article id="home">
                <header>
                    <h1>Bookings</h1>
                </header>
                <BookingsPerMonth />
            </article>
        </BookingReportProvider>
    )
}
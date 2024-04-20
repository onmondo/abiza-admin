import React from "react"
import { BookingTable } from "../components/BookingTable"
import { BookingReportProvider } from "../contexts/BookingReportProvider"

export function Home() {
    return (
        <BookingReportProvider>
            <article id="home">
                <header>
                    <h1>Bookings</h1>
                </header>
                <BookingTable />
            </article>
        </BookingReportProvider>
    )
}
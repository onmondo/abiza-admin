import React, { useEffect, useState } from "react"
import moment from "moment"
import Table from "react-bootstrap/Table"
import Stack from "react-bootstrap/Stack"
import { fetchAPI } from "../../util/fetchApi"

import { YearSelection } from "../YearSelection"
import { FetchBookingReportParam, FetchParam } from "../../lib/types"
import { MonthSelection } from "../MonthSelection"
import { TableHeader } from "./tableHeader"
import { useBookingReportContext } from "../../contexts/BookingReportProvider"
// import FloatingLabel from "react-bootstrap/FloatingLabel"

export type Booking = {
    _id: string
    checkIn: string
    checkOut: string
    datePaid: string
    from: string
    guestName: string
    modeOfPayment: string
    nightlyPrice: number
    noOfPax: number
    noOfStay: number
    rooms: string[]
    totalPayout: number
    createdAt: string
    updatedAt: string
    remarks: string
}

export function BookingTable() {
    const [currentMonthlyBookings, setCurrentMonthlyBookings] = useState<Booking[]>([])
    const { state, updateChosenMonth, updateChosenYear } = useBookingReportContext()

    async function fetchBookings(dateSelected: FetchBookingReportParam) {
        try {
            const year = dateSelected.chosenYear || moment().year().toString();
            const month = dateSelected.chosenMonth || moment().format("MMMM");
            const defaultPage = 1;
            const defaultLimit = 10;
            const fetchParam: FetchParam = {
                url: `${process.env.ROOT_API}/bookings/${year}/${month}?sort=asc&page=${defaultPage}&limit=${defaultLimit}`
            }
            const { monthlyBookings } = await fetchAPI(fetchParam)
            const { data } = monthlyBookings
            setCurrentMonthlyBookings(data)
        } catch (error) {
            // raise up to redux
        }
    }

    useEffect(() => {
        fetchBookings({ 
            chosenYear: state.chosenYear, 
            chosenMonth: state.chosenMonth
        })
    }, [state.chosenMonth, state.chosenYear])

    function handleMonthSelectionOnChange(event: any) {
        updateChosenMonth(event.target.value);
    }

    function handleYearSelectionOnChange(event: any) {
        updateChosenYear(event.target.value);
    }

    return (
        <section>
        <Stack gap={2} className="mx-auto">
            <Stack direction="horizontal" gap={3}>
                <YearSelection handleOnChange={handleYearSelectionOnChange} value={state.chosenYear}/>
                <MonthSelection handleOnChange={handleMonthSelectionOnChange} value={state.chosenMonth}/>
            </Stack>
            <Table striped>
                <TableHeader />
                <tbody>
                    {currentMonthlyBookings.map(
                        booking => (
                            <tr key={booking._id}>
                                <td>{booking.rooms.map(room => room)}</td>
                                <td>{booking.guestName}</td>
                                <td>{moment(booking.checkIn).format("DD-MMMM-YYYY")}</td>
                                <td>{moment(booking.checkOut).format("DD-MMMM-YYYY")}</td>
                                <td>{booking.noOfPax}</td>
                                <td>{booking.noOfStay}</td>
                                <td>{booking.nightlyPrice}</td>
                                <td>{booking.totalPayout}</td>
                                <td>{booking.from}</td>
                                <td>{booking.modeOfPayment}</td>
                                <td>{moment(booking.datePaid).format("DD-MMMM-YYYY")}</td>
                                <td>{booking.remarks}</td>
                            </tr> 
                        )
                    )}
                </tbody>
            </Table>
        </Stack>
        </section>
    )
}
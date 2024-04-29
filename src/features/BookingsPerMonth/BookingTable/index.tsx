import React, { useEffect, useState } from "react"
import moment from "moment"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Pagination from "react-bootstrap/Pagination"
import { useBookingReportContext } from "../../../contexts/BookingReportProvider"
import { FetchParam, Booking } from "../../../lib/types"
import { fetchAPI } from "../../../util/api"
import { TableHeader } from "./TableHeader"
import { useDeleteBookingContext } from "../../../contexts/DeleteBookingProvider"

export function BookingTable() {
    const DEFAULT_LIMIT = 10;
    const [currentMonthlyBookings, setCurrentMonthlyBookings] = useState<Booking[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    const { 
        state,
        toggleDeleteModal,
    } = useBookingReportContext()

    const { updateBookingId } = useDeleteBookingContext();

    async function fetchBookings() {
        try {
            
            const fetchParam: FetchParam = {
                url: `${process.env.ROOT_API}/bookings/${state.chosenYear}/${state.chosenMonth}?sort=asc&page=${currentPage}&limit=${DEFAULT_LIMIT}`
            }
            const { monthlyBookings } = await fetchAPI(fetchParam)
            const { data } = monthlyBookings
            setCurrentMonthlyBookings(data)
        } catch (error) {
            // raise up to redux
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [state.chosenMonth, state.chosenYear, state.isBookingFormOpen, currentPage, state.isDeleteModalOpen])

    function handleDeleteBooking(bookingId: string | undefined) {
        toggleDeleteModal(!state.isDeleteModalOpen);
        updateBookingId(bookingId || "")

    }

    function handleNextPage() {
        if (currentMonthlyBookings.length >= DEFAULT_LIMIT) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <>
        <Table striped hover>
            <TableHeader />
            <tbody>
                {currentMonthlyBookings.map(
                    (booking, index) => (
                        <tr key={booking._id}>
                            <td>{index += 1}</td>
                            <td>{
                                (booking.rooms && booking.rooms?.length > 0) 
                                    ? booking.rooms.map(room => room)
                                    : <></>
                                }
                            </td>
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
                            <td>
                                {/* <ButtonGroup> */}
                                    {/* <Button 
                                        variant="dark"
                                        onClick={handleToggleForm}>
                                            Edit
                                    </Button> */}
                                    <Button 
                                        variant="danger"
                                        onClick={() => {
                                            handleDeleteBooking(booking._id)
                                        }}>
                                        Delete
                                    </Button>
                                {/* </ButtonGroup> */}
                            </td>
                        </tr> 
                    )
                )}
            </tbody>
        </Table>
        <Pagination>
            {/* <Pagination.First /> */}
            <Pagination.Prev onClick={handlePrevPage} />
            {/* <Pagination.Item>{1}</Pagination.Item> */}
            {/* <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item> */}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {/* <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis /> */}
            {/* <Pagination.Item>{20}</Pagination.Item> */}
            <Pagination.Next onClick={handleNextPage} />
            {/* <Pagination.Last /> */}
        </Pagination>        
        </>

    )
}
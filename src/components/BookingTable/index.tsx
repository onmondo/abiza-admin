import React, { useEffect, useState } from "react"
import moment from "moment"
import Table from "react-bootstrap/Table"
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Pagination from "react-bootstrap/Pagination"
import { useBookingReportContext } from "../../contexts/BookingReportProvider"
import { 
    FetchParam, 
    Booking, 
    DeleteBookingParam 
} from "../../lib/types"
import { deleteData, fetchAPI } from "../../util/api"
import { YearSelection } from "../YearSelection"
import { MonthSelection } from "../MonthSelection"
import { TableHeader } from "./tableHeader"
import { BookingForm } from "../BookingForm"

export function BookingTable() {
    const DEFAULT_LIMIT = 10;
    const [currentMonthlyBookings, setCurrentMonthlyBookings] = useState<Booking[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    // const [totalPage, totalPage] = useState(1)
    // const [page, setPage] = useState(1)

    const { 
        state,
        updateChosenMonth,
        updateChosenYear,
        updateBookingForm,
    } = useBookingReportContext()

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
    }, [state.chosenMonth, state.chosenYear, state.isBookingFormOpen, currentPage])

    function handleMonthSelectionOnChange(event: any) {
        updateChosenMonth(event.target.value);
    }

    function handleYearSelectionOnChange(event: any) {
        updateChosenYear(event.target.value);
    }

    function handleToggleForm() {
        updateBookingForm(!state.isBookingFormOpen)
    }

    async function deleteBooking(deleteBookingParam: DeleteBookingParam) {
        try {
            const year = deleteBookingParam.chosenYear || moment().year().toString();
            const month = deleteBookingParam.chosenMonth || moment().format("MMMM");
            const deleteParam: FetchParam = {
                url: `${process.env.ROOT_API}/bookings/${year}/${month}/${deleteBookingParam.bookingId}`
            }

            await deleteData(deleteParam)

        } catch (error) {
            // raise up to redux
        }
    }

    function handleDeleteBooking(deleteBookingParam: DeleteBookingParam) {
        deleteBooking(deleteBookingParam);
        fetchBookings();
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
        <section>
        <Stack gap={2} className="mx-auto">
            <Stack direction="horizontal" gap={3}>
            <div>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Year</Form.Label>
                    <YearSelection handleOnChange={handleYearSelectionOnChange} value={state.chosenYear}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Month</Form.Label>
                    <MonthSelection handleOnChange={handleMonthSelectionOnChange} value={state.chosenMonth}/>
                    </Form.Group>
                </Row>
            </div>                
            </Stack>
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
                                    <ButtonGroup>
                                        <Button 
                                            variant="dark"
                                            onClick={handleToggleForm}>
                                                Edit
                                        </Button>
                                        <Button 
                                            variant="danger"
                                            onClick={() => {
                                                handleDeleteBooking({
                                                    bookingId: (booking._id || ""),
                                                    chosenMonth: moment(booking.checkIn).format("MMMM"),
                                                    chosenYear: moment(booking.checkIn).format("YYYY")
                                                })
                                            }}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
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
            <Stack direction="horizontal" gap={3}>
                <Button variant="primary" onClick={handleToggleForm}>Adde new booking</Button>{' '}
            </Stack>
        </Stack>
        </section>
        <BookingForm show={state.isBookingFormOpen} handleClose={handleToggleForm} />
        </>

    )
}
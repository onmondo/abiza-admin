import React, { useEffect, useState } from "react"
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { useBookingReportContext } from "../../contexts/BookingReportProvider"
import { YearSelection } from "../../components/YearSelection"
import { MonthSelection } from "../../components/MonthSelection"
import { BookingForm } from "../../components/BookingForm"
import { BookingTable } from "./BookingTable"
import { DeleteBookingModal } from "./DeleteBookingModal"
import { DeleteBookingProvider } from "../../contexts/DeleteBookingProvider"

export function BookingsPerMonth() {
    const { 
        state,
        updateChosenMonth,
        updateChosenYear,
        updateBookingForm,
        toggleDeleteModal,
    } = useBookingReportContext()

    function handleMonthSelectionOnChange(event: any) {
        updateChosenMonth(event.target.value);
    }

    function handleYearSelectionOnChange(event: any) {
        updateChosenYear(event.target.value);
    }

    function handleToggleForm() {
        updateBookingForm(!state.isBookingFormOpen)
    }

    function handleToggleModal() {
        toggleDeleteModal(!state.isDeleteModalOpen)
    }

    return (
        <DeleteBookingProvider>
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
                    <BookingTable />
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="primary" onClick={handleToggleForm}>Adde new booking</Button>{' '}
                    </Stack>
                </Stack>
            </section>
            <BookingForm show={state.isBookingFormOpen} handleClose={handleToggleForm} />
            <DeleteBookingModal show={state.isDeleteModalOpen} toggleModal={handleToggleModal}/>
        </DeleteBookingProvider>
    )
}
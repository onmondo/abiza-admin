import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteData } from "../../util/api"
import { FetchParam } from "../../lib/types";
import { useDeleteBookingContext } from "../../contexts/DeleteBookingProvider";
import { useBookingReportContext } from "../../contexts/BookingReportProvider";
export function DeleteBookingModal({ show, toggleModal }: { show: boolean, toggleModal?: () => void}) {

    const deleteBookingContext = useDeleteBookingContext();
    const bookingSummaryContext = useBookingReportContext();
    const deleteBookingState = deleteBookingContext.state;
    const bookingSummaryState = bookingSummaryContext.state;

    async function deleteBooking() {
        
        try {
            const deleteParam: FetchParam = {
                url: `${process.env.ROOT_API}/bookings/${bookingSummaryState.chosenYear}/${bookingSummaryState.chosenMonth}/${deleteBookingState.bookingId}`
            }

            await deleteData(deleteParam)

        } catch (error) {
            // raise up to redux
        }
    }

    function handleDeleteBooking() {
        deleteBooking();
        bookingSummaryContext.toggleDeleteModal(!bookingSummaryState.isDeleteModalOpen)
    }

    return (
        <Modal show={show} onHide={toggleModal}>
            <Modal.Header closeButton>
            <Modal.Title>Delete booking</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>Are you sure you want to delete the booking?</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>No</Button>
            <Button variant="danger" onClick={handleDeleteBooking}>Confirm</Button>
            </Modal.Footer>
        </Modal>        
    )
}
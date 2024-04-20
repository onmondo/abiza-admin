import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BookingFormProps } from "../../lib/componentTypes";
import { YearSelection } from "../YearSelection";
import { MonthSelection } from "../MonthSelection";
import { DaySelection } from "../DaySelection";
import { NumberSlider } from "./NumberSlider";
import { AmountInput } from "./AmountInput";
import { postData } from "../../util/fetchApi";
import { Booking, DateRequest } from "../../lib/types";
import moment from "moment";
import { CompleteDateInput } from "./CompleteDateInput";

export function BookingForm({ show, handleClose }: BookingFormProps) {

    const [booking, setBooking] = useState<Booking>({})

    function handleGuestNameChange(event: any) {
        setBooking({...booking, guestName: event.target.value})
    }

    function handleBookingFromChange(event: any) {
        setBooking({...booking, from: event.target.value})
    }

    function handleRoomsTakenChange(event: any) {
        const rooms = event.target.value.split(",");        
        setBooking({...booking, rooms})
    }

    function handleCheckInChange(value: DateRequest) {
        setBooking({...booking, checkIn: `${value.year}-${value.month}-${value.day}`});
    }

    function handleCheckOutChange(value: DateRequest) {
        setBooking({...booking, checkOut: `${value.year}-${value.month}-${value.day}`});
    }

    function handlePriceChange (value: number) {
        setBooking({...booking, nightlyPrice: value})
    }

    function handlePaymentOptionChange(event: any) {
        setBooking({...booking, modeOfPayment: event.target.value})
    }

    function handleTotalAmountChange(value: number) {
        setBooking({...booking, totalPayout: value})
    }

    function handleTotalPaxChange(value: number) {
        setBooking({...booking, noOfPax: value})
    }

    function handleTotalStayChange(value: number) {
        setBooking({...booking, noOfStay: value})
    }
    
    function handleDatePaidChange(value: DateRequest) {
        setBooking({...booking, datePaid: `${value.year}-${value.month}-${value.day}`});
    }

    function handleRemarksChange(event: any) {
        setBooking({...booking, remarks: event.target.value})
    }

    function handleSave() {
        console.log(booking);
    }

    async function postBooking() {
        const postOptions = {
            url: `${process.env.ROOT_API}/bookings`,
            requestBody: {}
        }
        await postData(postOptions);
    }

    return (
        <Modal id="bookingform" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>New booking record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Guest name"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="textarea" 
                            placeholder="Name of the guest" 
                            onChange={handleGuestNameChange}
                        />
                    </FloatingLabel>
                    <Row className="mb-3">
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Booking from"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="textarea"
                                    placeholder="Booking from" 
                                    onChange={handleBookingFromChange}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Rooms"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="textarea" 
                                    placeholder="Rooms taken by guest" 
                                    onChange={handleRoomsTakenChange}
                                />
                            </FloatingLabel>
                        </Col>
                        <Form.Text id="passwordHelpBlock" muted>
                        Booking might be from the three(3) booking platforms (e.g. AirBnB, Booking.com, Agoda) or can be a Walk-In.
                        </Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <CompleteDateInput label="Check-In" onChange={handleCheckInChange}/>
                    </Row>
                    <Row className="mb-3">
                        <CompleteDateInput label="Check-Out" onChange={handleCheckOutChange}/>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Mode of Payment</Form.Label>
                            <Form.Control 
                                type="textarea" 
                                placeholder="Mode of payment" 
                                onChange={handlePaymentOptionChange}
                            />
                        </Col>
                        <Col><AmountInput label="Nightly Price" onChange={handlePriceChange} /></Col>
                        <Form.Text id="passwordHelpBlock" muted>
                        Mode of payment can be Cash or any Bank Transfers available (e.g. BPI, BDO etc...)
                        </Form.Text>
                    </Row>

                    <Row className="mb-3">
                        <NumberSlider label="No. of Pax" onChange={handleTotalPaxChange} />
                    </Row>
                    <Row className="mb-3">
                        <NumberSlider label="No. of Stay" onChange={handleTotalStayChange} />
                    </Row>
                    <AmountInput label="Total Payout" onChange={handleTotalAmountChange} />
                    <Row className="mb-3">
                        <CompleteDateInput label="Date Paid" onChange={handleDatePaidChange}/>
                    </Row>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Remarks"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" aria-label="With textarea" onChange={handleRemarksChange} />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
import React, { useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BookingFormProps } from "../../lib/componentTypes";
import { NumberSlider } from "./NumberSlider";
import { AmountInput } from "./AmountInput";
import { postData } from "../../util/api";
import { Booking, DateRequest } from "../../lib/types";
import { CompleteDateInput } from "./CompleteDateInput";

export function BookingForm({ show, handleClose }: BookingFormProps) {
    // these values can also be pulled from an API resource
    const DEFAULT_MIN_PAX = 1
    const DEFAULT_MAX_PAX = 4
    const DEFAULT_MIN_STAY = 1
    const DEFAULT_MAX_STAY = 14
    const DEFAULT_PAX = 2
    const EXTRA_COST = 500

    const [booking, setBooking] = useState<Booking>({ 
        noOfStay: DEFAULT_MIN_STAY, 
        noOfPax: DEFAULT_MIN_PAX,
        checkIn: moment().format("YYYY-MM-DD"),
        nightlyPrice: 0,
        totalPayout: 0
    })

    const [tempTotalPayout, setTempTotalPayout] = useState(0);

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

    function handleCheckInOnBlur() {
        setBooking({...booking, checkOut: booking.checkIn})
    }

    function handleCheckOutChange(value: DateRequest) {
        setBooking({...booking, checkOut: `${value.year}-${value.month}-${value.day}`});
    }

    function handleCheckOutOnBlur() {
        setBooking({...booking, datePaid: booking.checkOut})
    }

    function handlePriceChange (value: number) {
        setBooking({
            ...booking, 
            nightlyPrice: value,
            totalPayout: value
        })
    }

    function handlePaymentOptionChange(event: any) {
        setBooking({...booking, modeOfPayment: event.target.value})
    }

    function handleTotalAmountChange(value: number) {
        setBooking({...booking, totalPayout: value})
    }

    function handleTotalPaxChange(value: number) {
        const totalPayout = booking.nightlyPrice + ((value > 2) ? (value - DEFAULT_PAX) * EXTRA_COST : 0)
        setBooking({
            ...booking, 
            noOfPax: value,
            totalPayout
        })

        setTempTotalPayout(totalPayout)
    }

    function handleTotalStayChange(value: number) {
        setBooking({
            ...booking, 
            noOfStay: value,
            totalPayout: tempTotalPayout * (value) 
        })
    }
    
    function handleDatePaidChange(value: DateRequest) {
        setBooking({...booking, datePaid: `${value.year}-${value.month}-${value.day}`});
    }

    function handleRemarksChange(event: any) {
        setBooking({...booking, remarks: event.target.value})
    }

    function handleSave() {
        postBooking();
    }

    async function postBooking() {
        const postOptions = {
            url: `${process.env.ROOT_API}/bookings`,
            requestBody: booking
        }
        await postData(postOptions);

        if (handleClose) {
            handleClose()
        }
    }

    // console.log(booking);
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
                        <CompleteDateInput label="Check-In" value={booking.checkIn} onChange={handleCheckInChange} onBlur={handleCheckInOnBlur} />
                    </Row>
                    <Row className="mb-3">
                        <CompleteDateInput label="Check-Out" value={booking.checkOut} onChange={handleCheckOutChange} onBlur={handleCheckOutOnBlur} />
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
                        <NumberSlider 
                            label="No. of Pax" 
                            onChange={handleTotalPaxChange} 
                            min={DEFAULT_MIN_PAX} 
                            max={DEFAULT_MAX_PAX} />
                    </Row>
                    <Row className="mb-3">
                        <NumberSlider 
                            label="No. of Stay" 
                            onChange={handleTotalStayChange} 
                            min={DEFAULT_MIN_STAY} 
                            max={DEFAULT_MAX_STAY} />
                    </Row>
                    <AmountInput label="Total Payout" value={booking.totalPayout?.toString()} onChange={handleTotalAmountChange} />
                    <Row className="mb-3">
                        <CompleteDateInput label="Date Paid" value={booking.datePaid} onChange={handleDatePaidChange}/>
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
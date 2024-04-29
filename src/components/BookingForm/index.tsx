import React, { useEffect, useState } from "react";
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
import { fetchAPI, postData } from "../../util/api";
import { Booking, DateRequest, FetchParam } from "../../lib/types";
import { CompleteDateInput } from "./CompleteDateInput";
import { useBookingReportContext } from "../../contexts/BookingReportProvider";

export function BookingForm({ show, handleClose }: BookingFormProps) {
    const { 
        state,
        // updateChosenMonth,
        // updateChosenYear,
        // updateBookingForm,
        // updateChosenBookingId,
    } = useBookingReportContext()
    
    // these values can also be pulled from an API resource
    const DEFAULT_MIN_PAX = 1
    const DEFAULT_MAX_PAX = 4
    const DEFAULT_MIN_STAY = 1
    const DEFAULT_MAX_STAY = 14
    const DEFAULT_PAX = 2
    const EXTRA_COST = 500
    const DEFAULT_BOOKING = { 
        noOfStay: DEFAULT_MIN_STAY, 
        noOfPax: DEFAULT_MIN_PAX,
        checkIn: moment().format("YYYY-MM-DD"),
        nightlyPrice: 0,
        totalPayout: 0
    }

    const [booking, setBooking] = useState<Booking>(DEFAULT_BOOKING)

    // const [tempTotalPayout, setTempTotalPayout] = useState(0);

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

        // setTempTotalPayout(totalPayout)
    }

    function handleTotalStayChange(value: number) {
        setBooking({
            ...booking, 
            noOfStay: value,
            totalPayout: booking.totalPayout * (value) 
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

    // async function updateBooking() {
        
    // }

    async function fetchBooking(bookingId: string) {
        try {
            const fetchParam: FetchParam = {
                url: `${process.env.ROOT_API}/bookings/${bookingId}`
            }
            const { booking } = await fetchAPI(fetchParam)
            console.log(booking)
            setBooking(booking)
        } catch (error) {
            // raise up to redux
        }
    }

    useEffect(() => {
        if (state.chosenBookingId) {
            fetchBooking(state.chosenBookingId)
        } else {
            setBooking(DEFAULT_BOOKING)
        }
    }, [state.chosenBookingId])

    // console.log(state.chosenBookingId)
    // console.log(booking)
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
                            value={booking.guestName}
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
                                    value={booking.from}
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
                                    value={booking.rooms?.join(", ")}
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
                                value={booking.modeOfPayment}
                                onChange={handlePaymentOptionChange}
                            />
                        </Col>
                        <Col><AmountInput label="Nightly Price" value={booking.nightlyPrice.toString()} onChange={handlePriceChange} /></Col>
                        <Form.Text id="passwordHelpBlock" muted>
                        Mode of payment can be Cash or any Bank Transfers available (e.g. BPI, BDO etc...)
                        </Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <NumberSlider 
                            label="No. of Pax" 
                            onChange={handleTotalPaxChange}
                            value={booking.noOfPax.toString()}
                            min={DEFAULT_MIN_PAX} 
                            max={DEFAULT_MAX_PAX} />
                    </Row>
                    <Row className="mb-3">
                        <NumberSlider 
                            label="No. of Stay" 
                            onChange={handleTotalStayChange} 
                            value={booking.noOfStay.toString()}
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
                        <Form.Control as="textarea" aria-label="With textarea" value={booking.remarks} onChange={handleRemarksChange} />
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
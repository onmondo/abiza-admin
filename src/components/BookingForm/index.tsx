import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { BookingFormProps } from "../../lib/componentTypes";
import { YearSelection } from "../YearSelection";
import { MonthSelection } from "../MonthSelection";
import { DaySelection } from "../DaySelection";
import { NumberSlider } from "./NumberSlider";
import { AmountInput } from "./AmountInput";

export function BookingForm({ show, handleClose }: BookingFormProps) {
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
                        <Form.Control type="textarea" placeholder="Name of the guest" />
                    </FloatingLabel>
                    <Row className="mb-3">
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Booking from"
                                className="mb-3"
                            >
                                <Form.Control type="textarea" placeholder="Booking from" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Rooms"
                                className="mb-3"
                            >
                                <Form.Control type="textarea" placeholder="Rooms taken by guest" />
                            </FloatingLabel>
                        </Col>
                        <Form.Text id="passwordHelpBlock" muted>
                        Booking might be from the three(3) booking platforms (e.g. AirBnB, Booking.com, Agoda) or can be a Walk-In.
                        </Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Check-In</Form.Label>
                        <Col><YearSelection /></Col>
                        <Col><MonthSelection /></Col>
                        <Col><DaySelection /></Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label>Check-Out</Form.Label>
                        <Col><YearSelection /></Col>
                        <Col><MonthSelection /></Col>
                        <Col><DaySelection /></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Check-Out</Form.Label>
                            <Form.Control type="textarea" placeholder="Mode of payment" />
                        </Col>
                        <Col><AmountInput label="Nightly Price" /></Col>
                        <Form.Text id="passwordHelpBlock" muted>
                        Mode of payment can be Cash or any Bank Transfers available (e.g. BPI, BDO etc...)
                        </Form.Text>
                    </Row>

                    <Row className="mb-3">
                        <NumberSlider label="No. of Pax" />
                    </Row>
                    <Row className="mb-3">
                        <NumberSlider label="No. of Stay" />
                    </Row>
                    <AmountInput label="Total Payout" />
                    <Row className="mb-3">
                        <Form.Label>Date Paid</Form.Label>
                        <Col><YearSelection /></Col>
                        <Col><MonthSelection /></Col>
                        <Col><DaySelection /></Col>
                    </Row>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Remarks"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
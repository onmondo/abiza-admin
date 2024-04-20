import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { InputFormLabel } from "../../lib/componentTypes";

export function NumberSlider({ label }: InputFormLabel) {
    const [currentRange, setCurrentRange] = useState(0)

    function handleOnChange(event: any) {
        setCurrentRange(event.target.value)
    }

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Col><Form.Control type="number" value={currentRange} disabled /></Col>
            <Col><Form.Range defaultValue={1} onChange={handleOnChange} /></Col>
        </>
    )
}
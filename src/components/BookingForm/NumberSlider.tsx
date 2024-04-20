import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { InputForm } from "../../lib/componentTypes";

export function NumberSlider({ label, onChange }: InputForm<number>) {
    const [currentRange, setCurrentRange] = useState(1)

    function handleOnChange(event: any) {
        setCurrentRange(event.target.value)
    }

    useEffect(() => {
        if(onChange && currentRange) {
            onChange(currentRange)
        }
    }, [currentRange])

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Col><Form.Control type="number" value={currentRange} readOnly /></Col>
            <Col><Form.Range defaultValue={currentRange} onChange={handleOnChange} /></Col>
        </>
    )
}
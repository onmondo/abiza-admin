import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { InputFormLabel } from "../../lib/componentTypes";

export function AmountInput({ label }: InputFormLabel) {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>₱</InputGroup.Text>
                <Form.Control type="number" aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>        
        </>
    )
}
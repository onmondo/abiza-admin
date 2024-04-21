import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { InputForm } from "../../lib/componentTypes";

export function AmountInput({ label, onChange }: InputForm<number>) {
    const [amount, setAmount] = useState(0)

    function handleAmountChange(event: any) {
        setAmount(parseFloat(event.target.value))
    }

    useEffect(() => {
        if(onChange) {
            onChange(amount)
        }
    }, [amount])

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>₱</InputGroup.Text>
                <Form.Control 
                    className="amount"
                    type="number" 
                    aria-label="Amount (to the nearest peso)" 
                    onChange={handleAmountChange} 
                />
                <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>        
        </>
    )
}
import React, { useEffect, useState } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { InputForm } from "../../lib/componentTypes";
import { DateRequest } from "../../lib/types";
import { YearSelection } from "../YearSelection";
import { MonthSelection } from "../MonthSelection";
import { DaySelection } from "../DaySelection";

export function CompleteDateInput({ label, onChange }: InputForm<DateRequest>) {

    const [currentDate, setCurrentDate] = useState<DateRequest>({});

    function handleYearChange(event: any) {
        const year = moment(event.target.value).format("YYYY")
        setCurrentDate({...currentDate, year})
    }

    function handleMonthChange(event: any) {
        const month = moment(`${currentDate.year}-${event.target.value}`).format("MM")
        setCurrentDate({...currentDate, month})
    }

    function handleDayChange(event: any) {
        setCurrentDate({...currentDate, day: event.target.value})
    }
    
    useEffect(() => {
        if(onChange && currentDate && currentDate.day && currentDate.month && currentDate.year) {
            onChange(currentDate)
        }
    }, [currentDate])

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Col><YearSelection handleOnChange={handleYearChange}/></Col>
            <Col><MonthSelection handleOnChange={handleMonthChange} /></Col>
            <Col><DaySelection handleOnChange={handleDayChange}/></Col>        
        </>
    )
}
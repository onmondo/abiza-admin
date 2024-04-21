import React, { useEffect, useState } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { InputForm } from "../../lib/componentTypes";
import { DateRequest } from "../../lib/types";
import { YearSelection } from "../YearSelection";
import { MonthSelection } from "../MonthSelection";
import { DaySelection } from "../DaySelection";
import { populateMonthOptions } from "../../util/seeds";

export function CompleteDateInput({ label, value, onChange, onBlur }: InputForm<DateRequest>) {

    const [currentDate, setCurrentDate] = useState<DateRequest>({});
    const [currentSelectionMonth, setCurrentSelectionMonth] = useState("");

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

    // set value to be displayed and use by the upper components
    useEffect(() => {
        const dateContents = value?.split("-");
        const year = (dateContents)? dateContents[0]: moment().format("YYYY");
        const month = (dateContents)? dateContents[1]: moment().format("MM")
        const day = (dateContents)? dateContents[2]: moment().format("D")
        setCurrentDate({...currentDate, year, month, day })
    }, [value])

    // set value of the month select input
    useEffect(() => {
        const availableMonths = populateMonthOptions();
        const monthInNumber = (currentDate.month) ? parseInt(currentDate.month) - 1 : 0
        setCurrentSelectionMonth(availableMonths[monthInNumber].value)
    }, [currentDate.month])

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Col><YearSelection value={currentDate.year} handleOnChange={handleYearChange} /></Col>
            <Col><MonthSelection value={currentSelectionMonth} handleOnChange={handleMonthChange} /></Col>
            <Col><DaySelection value={currentDate.day} handleOnChange={handleDayChange} handleOnBlur={onBlur}/></Col>        
        </>
    )
}
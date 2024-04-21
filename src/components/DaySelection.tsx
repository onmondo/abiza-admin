import React from "react"
import moment from "moment";
import Form from "react-bootstrap/Form";
import { populateDayOptions } from "../util/seeds";
import { SelectionProps } from "../lib/componentTypes";

export function DaySelection({ handleOnChange, handleOnBlur, value }: SelectionProps) {
    const currentMonthYear = moment().format("YYYY-MM")
    return (
        <Form.Select 
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={value}>
            <option>Day</option>
            {populateDayOptions(currentMonthYear).map(dayOption => <option key={dayOption.label}>{dayOption.value}</option>)}
        </Form.Select>
    )
}
import React from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { populateYearOptions } from "../util/seeds";
import { SelectionProps } from "../lib/componentTypes";

export function YearSelection({ handleOnChange, value }: SelectionProps) {
    return (
        <Form.Select
            onChange={handleOnChange}
            value={value}>
            <option>Year</option>
            {populateYearOptions(moment().toISOString()).map(yearOption => <option key={yearOption.label}>{yearOption.value}</option>)}
        </Form.Select>
    )
}
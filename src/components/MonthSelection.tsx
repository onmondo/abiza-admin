import React from "react"
import Form from "react-bootstrap/Form";
import { populateMonthOptions } from "../util/seeds";
import { SelectionProps } from "../lib/componentTypes";

export function MonthSelection({ handleOnChange, value }: SelectionProps) {
    return (
        <Form.Select 
            onChange={handleOnChange}
            value={value}>
            <option>Month</option>
            {populateMonthOptions().map(monthOption => <option key={monthOption.label}>{monthOption.value}</option>)}
        </Form.Select>
    )
}
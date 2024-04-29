import React from "react"
import { populateColumnNames } from "../../../util/seeds"

export function TableHeader() {
    return (
        <thead>
            <tr>
                {populateColumnNames().map((columnName: string, index) => <th key={index}>{columnName}</th>)}
            </tr>
        </thead>
    )
}
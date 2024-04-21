import moment from "moment";
import { SelectOption } from "../lib/types";

export const populateYearOptions = (currentYear: string): SelectOption[] => {
    const NUM_OF_YEARS_TO_ADD = 10
    const yearOptionCollection: SelectOption[] = [];
    const targetYear = moment(currentYear).subtract(5, "years").year().toString();
    let year = parseInt(targetYear)
    for(let i = 1; i <= NUM_OF_YEARS_TO_ADD; i++) {
        year += 1
        yearOptionCollection.push({ label: year.toString(), value: year.toString()})
    }
    return yearOptionCollection
}

export const populateMonthOptions = () => {
    const monthOptions: SelectOption[] = moment.months().map(month => {return { label: month, value: month }})
    return monthOptions
}

export const populateDayOptions = (currentMonthYear: string) => {
    const numOfDays: number = parseInt(moment(currentMonthYear).daysInMonth().toString());
    const dayOptionCollection: SelectOption[] = [];
    for(let i = 1; i <= numOfDays; i++) {
        dayOptionCollection.push({ label: i.toString(), value: i.toString()})
    }
    return dayOptionCollection;
}

export const populateColumnNames = (): string[] => {
    return [
        "#",
        "Room Occupied",
        "Guest Name", 
        "Check-In",
        "Check-Out",
        "No. of Pax",
        "No. of Stay",
        "Nightly Price",
        "Total Payout",
        "From",
        "Mode of Payment",
        "Date Paid",
        "Remarks",
        "Actions"
    ]
}
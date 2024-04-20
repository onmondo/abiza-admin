export type SelectOption = {
    label: string
    value: string
}

export type FetchParam = {
    url: string
    accessToken?: string
}

export type Booking = {
    _id: string
    checkIn: string
    checkOut: string
    datePaid: string
    from: string
    guestName: string
    modeOfPayment: string
    nightlyPrice: number
    noOfPax: number
    noOfStay: number
    rooms: string[]
    totalPayout: number
    createdAt: string
    updatedAt: string
    remarks: string
}

export type FetchBookingReportParam = {
    chosenMonth: string,
    chosenYear: string
}
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.scss"
import { BookingReportProvider } from "./contexts/BookingReportProvider";

export function App() {
    return (
        <BookingReportProvider>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BookingReportProvider>
    )
}
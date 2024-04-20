import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.scss"

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
        </Routes>
    )
}
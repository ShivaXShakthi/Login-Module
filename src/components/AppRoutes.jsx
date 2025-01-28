import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Option from "./Option";

const AppRoutes = () => {
    //create routes for login and signup
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/option" element={<Option />} />
        </Routes>


    );

}

export default AppRoutes;
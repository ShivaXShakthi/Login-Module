import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Events from "./Events";
import EventView from "./EventView";
import EventEdit from "./EventEdit";
import EventAdd from "./EventAdd";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/eventview/:eventId" element={<EventView />} />
            <Route path="/eventedit/:eventId" element={<EventEdit />} />
            <Route path="/eventadd" element={<EventAdd />} />
        </Routes>


    );

}

export default AppRoutes;
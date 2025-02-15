import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";
import EventView from "./EventView";
import EventEdit from "./EventEdit";
import EventAdd from "./EventAdd";
import ForgotPassword from "./ForgotPassword";
import YakshaganaDiscover from "./YakshaganaDiscover";
import DefaultImageUpload from "./DefaultImageUpload";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<YakshaganaDiscover />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/eventview/:eventId" element={<EventView />} />
            <Route path="/eventedit/:eventId" element={<EventEdit />} />
            <Route path="/eventadd" element={<EventAdd />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/defaultimageupload" element={<DefaultImageUpload />} />
        </Routes>


    );

}

export default AppRoutes;
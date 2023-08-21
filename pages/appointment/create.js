

import React, { useEffect } from "react";
import { useState } from "react";
import NavbarVertical from "../../components/Dashboard/Layout/NavbarVertical";
import DashboardHeader from "../../components/Dashboard/Layout/DashboardHeader";
import CreateAppointment from "../../components/Common/appointment/appointmentPage";
import { getDoctors, getPatients } from "../../utils/ApiCalls";

function allPatients() {
    const [controlNavbar, setControlNavbar] = useState(false);

    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])

    useEffect(async () => {
        const pats = await getPatients();
        const docs = await getDoctors();
        setPatients(pats);
        setDoctors(docs);
    }, [])

    useEffect(() => { }, [patients, doctors])

    return (
        <>
            <div className={controlNavbar ? "dashboard active" : "dashboard"}>
                <NavbarVertical controlNavbar={controlNavbar} />

                <div className="dash-page-content">
                    <DashboardHeader
                        controlNavbar={controlNavbar}
                        setControlNavbar={setControlNavbar}
                    />

                    <div className="mt-5 px-4 container-fluid">
                        {patients && doctors && <CreateAppointment patients={patients} doctors={doctors} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default allPatients;
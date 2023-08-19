

import React, { useEffect } from "react";
import { useState } from "react";
import NavbarVertical from "../../components/Dashboard/Layout/NavbarVertical";
import DashboardHeader from "../../components/Dashboard/Layout/DashboardHeader";
import CreateAppointment from "../../components/Common/appointment/appointmentPage";
import { getAppointment, getDoctors, getPatients } from "../../utils/ApiCalls";
import { useRouter } from "next/router";
import UpdateAppointment from "../../components/Common/appointment/updateAppointmentPage";

function allPatients() {
    const [controlNavbar, setControlNavbar] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    const loadData = async () => {
        const pats = await getPatients();
        const docs = await getDoctors();
        setPatients(pats);
        setDoctors(docs);
    }

    const loadAppointment = async () => {
        if (id) {
            const app = await getAppointment(id);
            setAppointment(app);
        }
        return () => { }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => { loadAppointment() }, [id])

    useEffect(() => {
    }, [patients, doctors, appointment])


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
                        {patients && doctors && appointment._id && <UpdateAppointment patients={patients} doctors={doctors} appointment={appointment} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default allPatients;
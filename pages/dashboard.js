import React from "react";
import { useState } from "react";
import NavbarVertical from "../components/Dashboard/Layout/NavbarVertical";
import DashboardHeader from "../components/Dashboard/Layout/DashboardHeader";
import DashboardAppointment from "../components/Dashboard/DashboardAppointment";

function dashboard() {
  const [controlNavbar, setControlNavbar] = useState(false);
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
            <DashboardAppointment/>
          </div>
        </div>
      </div>
    </>
  );
}

export default dashboard;

import React from "react";
import { useState } from "react";
import NavbarVertical from "../components/Dashboard/Layout/NavbarVertical";
import DashboardHeader from "../components/Dashboard/Layout/DashboardHeader";
import DashboardCreateSchedule from "../components/Dashboard/DashboardCreateSchedule";

function createSchedule() {
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
            <DashboardCreateSchedule/>
          </div>
        </div>
      </div>
    </>
  );
}

export default createSchedule;

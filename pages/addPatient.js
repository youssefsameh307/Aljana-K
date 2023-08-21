import React from "react";
import { useState } from "react";
import NavbarVertical from "../components/Dashboard/Layout/NavbarVertical";
import menuItemsSecretary from "../components/Dashboard/Layout/routes/menuItems-secretary.json";
import DashboardHeader from "../components/Dashboard/Layout/DashboardHeader";
import DashboardAddPatient from "../components/Dashboard/DashboardAddPatient";

function addPatient() {
    const [controlNavbar, setControlNavbar] = useState(false);
  return (
    <>
      <div className={controlNavbar ? "dashboard active" : "dashboard"}>
        <NavbarVertical
          controlNavbar={controlNavbar}
          menuItems={menuItemsSecretary}
        />

        <div className="dash-page-content">
          <DashboardHeader
            controlNavbar={controlNavbar}
            setControlNavbar={setControlNavbar}
          />

          <div className="mt-5 px-4 container-fluid">
            <DashboardAddPatient />
          </div>
        </div>
      </div>
    </>
  );
}

export default addPatient;

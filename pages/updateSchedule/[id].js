import React from "react";
import { useState } from "react";
import NavbarVertical from "../../components/Dashboard/Layout/NavbarVertical";
import DashboardHeader from "../../components/Dashboard/Layout/DashboardHeader";
import DashboardUpdateSchedule from "../../components/Dashboard/DashboardUpdateSchedule";
import { useRouter } from "next/router";


function updateSchedule() {
  const [controlNavbar, setControlNavbar] = useState(false);
    const router = useRouter();
    
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
            <DashboardUpdateSchedule id={router.query.id}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default updateSchedule;

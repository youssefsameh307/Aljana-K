"use client";

import React from "react";
import { useState } from "react";
import NavbarVertical from "../../../components/Dashboard/Layout/NavbarVertical";
import menuItemsSecretary from "../../../components/Dashboard/Layout/routes/menuItems-secretary.json";
import DashboardHeader from "../../../components/Dashboard/Layout/DashboardHeader";
import DashboardAddPatient from "../../../components/Dashboard/DashboardAddPatient";

function addPatient() {
  const [controlNavbar, setControlNavbar] = useState(false);
  return (
    <>
        <DashboardAddPatient />
    </>
  );
}

export default addPatient;

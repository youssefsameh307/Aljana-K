import React from "react";
import { useState } from "react";
import NavbarVertical from "../../../components/Dashboard/Layout/NavbarVertical";
import DashboardAllPatients from "../../../components/Dashboard/DashboardAllPatientsForDoctors";
import User, { UserModel } from "../../../models/userModel";
import connectMongo from "../../../utils/database";

let patients: UserModel[] = [];
const Page = async () => {
  await connectMongo();
  patients = await User.find({
    role: "patient",
  }).exec();

  return (
    <>
      <DashboardAllPatients patients={JSON.parse(JSON.stringify(patients))} />
    </>
  );
}

export default Page;

import React from "react";
import { useState } from "react";
import NavbarVertical from "../../../components/Dashboard/Layout/NavbarVertical";
import DashboardAllPatients from "../../../components/Dashboard/DashboardAllPatients";
import User, { UserModel } from "../../../models/userModel";
import connectMongo from "../../../utils/database";

let patients: UserModel[] = [];
const Page = async () => {
  await connectMongo();
  patients = await User.find({});

  return (
    <>
      <DashboardAllPatients patients={patients} />
    </>
  );
};

export default Page;

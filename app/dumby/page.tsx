import React from "react";
import Link from "next/navigation";
import {createAppointments,createDoctors, createPatient} from '../../utils/fakeData/CreateDataDB'
import sendMail, {sendNewFeedbackMail} from '../../utils/mail'
// createAppointments(60);
// createDoctors(6);
// createPatient(6);
// sendNewFeedbackMail({to:'kokodumb1@gmail.com'})
const Custom404 = () => {
  
  return (
    <>
      <h1>Dumby</h1>
    </>
  );
};

export default Custom404;

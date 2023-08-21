import React from "react";
import connectMongo from "../../../../utils/database";
import { redirect, useRouter } from "next/navigation";
import Appointments from "../../../../models/appointmentModel";
import { RecurrencePattern } from "../../../../utils/recurrencePatternEnum";
import AppointmentForm from "./createAppointment";
import {
  generateWeeklyDates,
  generateMonthlyDates,
} from "../../../../utils/dateGenerators";
import Appointment from "../../../../models/appointmentModel";
import { cookies } from "next/headers";
import { decodeToken } from "../../../../utils/isAuthenticated";
import AppointmentsView from "./AppointmentsView";
async function PatientAppointments({
  params,
}: {
  params: { patientID: string };
}) {
  const { patientID } = params;
  //#region Get current user
  const tokenCookie = cookies().get("token"); // from the cookies sent get the token
  if (tokenCookie == null) {
    redirect("/sign-in"); // if there is not token redirect to sign in page
  }
  const decoded_token: { userId: string } = decodeToken(tokenCookie.value);
  const { userId } = decoded_token;
  //#endregion

  // get all appointments of this user
  const appointments = await Appointments.find({ patientId: patientID });
  console.log(appointments);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    try {
      console.log("in form submit");
      let time = formData.get("time");
      let recurrencePattern = formData.get("recurrencePattern");
      let recurrencePatternLength = formData.get("numberOfRepeats");
      console.log(time, recurrencePattern, recurrencePatternLength);
      let newAppointments: any[] = [];
      let newAppointmentRequests = [];
      switch (recurrencePattern) {
        case RecurrencePattern.WEEK:
          const weeklyDates = generateWeeklyDates(
            time,
            recurrencePatternLength
          );
          for (const date of weeklyDates) {
            //#region Create appointment
            // Create a new appointment
            const newAppointment = new Appointment({
              patientID,
              Assignee: userId,
              time: date,
            });

            newAppointment.save();
          }
          return {
            newAppointments,
            newAppointmentRequests,
            message: "Appointment Request Sent Successfully",
          };
          break;
        case RecurrencePattern.MONTH:
          const monthlyDates = generateMonthlyDates(
            time,
            recurrencePatternLength
          );
          for (const date of monthlyDates) {
            //#region Create appointment
            // Create a new appointment
            const newAppointment = new Appointment({
              patientID,
              Assignee: userId,
              time: date,
            });
            await newAppointment.save();
            newAppointments.push(newAppointment);
            //#endregion
          }
          return {
            newAppointments,
            newAppointmentRequests,
            message: "Appointment Request Sent Successfully",
          };
          break;
        case RecurrencePattern.NONE:
          //#region Create appointment
          // Create a new appointment
          const newAppointment = new Appointment({
            patientID,
            Assignee: userId,
            time: time,
          });
          await newAppointment.save();

          return {
            newAppointment: newAppointment,
            message: "Appointment Request Sent Successfully",
          };
          //#endregion
          break;
        default:
          return {
            error: true,
            errorUserMessage:
              "An error occurred while creating your appointment",
          };
          break;
      }
    } catch (error) {
      console.error(error);
      return {
        error: true,
        errorUserMessage:
          "Invalid form make sure you filled all the required fields",
      };
    }
  };
  return (
    <>
      <h1>patient appointemnts</h1>
      {/* <AppointmentsView appointments={appointments} /> */}
      <AppointmentForm handleSubmit={handleSubmit} />
    </>
  );
}

export default PatientAppointments;

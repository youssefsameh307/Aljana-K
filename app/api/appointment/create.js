// registrationHandler.js

import Appointment from "../../../models/appointmentModel";
import AppointmentRequest from "../../../models/appointmentRequestModel";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";
import {
  checkRequiredFields,
  missingFields,
} from "../../../utils/checkRequiredFields";
import { RecurrencePattern } from "../../../utils/recurrencePatternEnum";
import {
  generateWeeklyDates,
  generateMonthlyDates,
} from "../../../utils/dateGenerators";
export default isAuthenticated(async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      // Check that all required fields to create are present
      if (!checkRequiredFields(req, Appointment)) {
        let fields = missingFields(req, Appointment);
        return res.status(400).json({ message: `${fields} is required` });
      }

      const {
        patient,
        doctor,
        time,
        reference,
        recurrencePattern,
        recurrencePatternLength,
      } = req.body;

      //#region Appointments handeling recuring
      let newAppointments = [];
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
              patient,
              doctor,
              time,
              reference,
            });

            await newAppointment.save();
            newAppointments.push(newAppointment);
          }
          res.status(201).json({
            newAppointments,
            // newAppointmentRequests,
            message: "Appointment Request Sent Successfully",
          });
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
              patient,
              doctor,
              time: date,
              reference,
            });
            await newAppointment.save();
            newAppointments.push(newAppointment);

            // Create a new appointment request
            // const newAppointmentRequest = new AppointmentRequest({
            //   patient: req.user.userId, // Assuming the patient is the authenticated user
            //   appointment: newAppointment._id,
            // });
            // await newAppointmentRequest.save();
            // newAppointmentRequests.push(newAppointmentRequest);
            //#endregion
          }
          res.status(201).json({
            newAppointments,
            // newAppointmentRequests,
            message: "Appointment Request Sent Successfully",
          });
          break;
        case RecurrencePattern.NONE:
          //#region Create appointment
          // Create a new appointment
          const newAppointment = new Appointment({
            patient,
            doctor,
            time: date,
            reference,
          });
          await newAppointment.save();

          // Create a new appointment request
          // const newAppointmentRequest = new AppointmentRequest({
          //   patient: req.user.userId, // Assuming the patient is the authenticated user
          //   appointment: newAppointment._id,
          // });
          // await newAppointmentRequest.save();

          res.status(201).json({
            newAppointment,
            // newAppointmentRequest,
            message: "Appointment Request Sent Successfully",
          });
          //#endregion
          break;
        default:
          res.status(400).json({ message: "Invalid recurrence pattern" });
          break;
      }
      //#endregion
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

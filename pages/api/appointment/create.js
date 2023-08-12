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
          const weeklyDates = generateWeeklyDates(time, recurrencePatternLength);
          for (const date of weeklyDates) {
            //#region Create appointment
            // Create a new appointment
            const newAppointment = new Appointment({
              patient,
              doctor,
              time,
              reference
            });

            try {
              const val = await newAppointment.validate();
              if (val)
                await newAppointment.save();
              newAppointments.push(newAppointment);
            } catch (err) {
              return res.status(400).json({
                message: Object.values(err.errors)[0].properties.message ?? "error saving the appointments",
              });
            }


          }
          res.status(201).json({
            newAppointments,
            // newAppointmentRequests,
            message: "Appointment Request Sent Successfully",
          });
          break;
        case RecurrencePattern.MONTH:
          const monthlyDates = generateMonthlyDates(time, recurrencePatternLength);
          for (const date of monthlyDates) {
            //#region Create appointment
            // Create a new appointment
            const newAppointment = new Appointment({
              patient,
              doctor,
              time,
              reference
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
            time,
            reference
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

function generateWeeklyDates(startDate, numWeeks) {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numWeeks; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return dates;
}

function generateMonthlyDates(startDate, numMonths) {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numMonths; i++) {
    dates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
}

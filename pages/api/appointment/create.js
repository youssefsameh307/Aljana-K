// registrationHandler.js

import Appointment from "../../../models/appointmentModel";
import AppointmentRequest from "../../../models/appointmentRequestModel";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";
import {checkRequiredFields, missingFields} from "../../../utils/checkRequiredFields";
export default isAuthenticated(async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {

      // Check that all required fields to create are present
      if (!checkRequiredFields(req, Appointment)) {
        let fields = missingFields(req, Appointment);
        return res.status(400).json({ message: `${fields} is required` });
      }

      const { name, email, phone, time, age, date } = req.body;

      // Create a new appointment
      const newAppointment = new Appointment({
        name,
        email,
        phone,
        age,
        time,
        date,
      });
      await newAppointment.save();

      // Create a new appointment request
      const newAppointmentRequest = new AppointmentRequest({
        patient: req.user.userId, // Assuming the patient is the authenticated user
        appointment: newAppointment._id,
      });
      await newAppointmentRequest.save();

      res.status(201).json({
        newAppointment,
        newAppointmentRequest,
        message: "Appointment Request Sent Successfully",
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

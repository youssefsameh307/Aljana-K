import Appointment from "../../../models/appointmentModel";
import AppointmentRequest from "../../../models/appointmentRequestModel";
import authorizeRole from "../../../utils/authorizeRole";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";



export default isAuthenticated(authorizeRole(["secretary", "doctor"])(async function handler(req, res) {
  try {
    await connectMongo();
    const { id } = req.query;

    if (req.method === "GET") {
      console.log("id server side");
      console.log(id);
      const patientAppointment = await Appointment.findById(id)
      res.status(200).json({
        patientAppointment
      });
    }
    else if (req.method === "DELETE") {
      await Appointment.findByIdAndDelete(id).then((e) => {
        res.status(200).json({
          messsage: "Deleted succefully"
        });
      }).catch((e) => {
        res.status(500).json({
          messsage: e
        });
      });
    }
    else if (req.method === "PATCH") {
      const {
        patient,
        doctor,
        time,
        reference,
      } = req.body;

      await Appointment.findByIdAndUpdate(id, { patient, doctor, time, reference }).then((e) => {
        res.status(200).json({
          messsage: "updated succefully",
          ...e
        });
      }).catch((e) => {
        res.status(500).json({
          messsage: e
        });
      });
    }
    else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
)
)
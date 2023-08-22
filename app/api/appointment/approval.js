import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";
import authorizeRole from "../../../utils/authorizeRole";
import Appointment from "../../../models/appointmentModel";

export default isAuthenticated(authorizeRole(["secretary"])(async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "PATCH") {
      const { requestId, status } = req.body;

      // Find the appointment request by ID
      const appointment = await Appointment.findById(requestId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment Request not found" });
      }

      // Update the status of the appointment request
      appointment.status = status;
      await appointment.save();

      res.status(200).json({
        appointment,
        message: "Appointment Request updated successfully",
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));

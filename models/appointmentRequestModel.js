import mongoose from "mongoose";

const appointmentRequestSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    appointment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }
  });

const AppointmentRequest =
  mongoose.models.AppointmentRequest ||
  mongoose.model("AppointmentRequest", appointmentRequestSchema);

export default AppointmentRequest;
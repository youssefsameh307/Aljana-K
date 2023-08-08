import mongoose from "mongoose";
import { Date } from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter the phone number"],
    },
    age: {
      type: Number,
      required: [true, "Please enter the age"],
    },

    time: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;

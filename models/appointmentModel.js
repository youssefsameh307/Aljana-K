import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      validate: {
        validator: async (v) => {
          const user = await User.findOne(v);
          if (user && user.role === "patient")
            return true;
          else
            return false
        },
        message: props => `this is not a valid patient`
      },
    },
    time: {
      type: Date,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      validate: {
        validator: async (v) => {
          const user = await User.findOne(v);
          if (user && user.role === "doctor")
            return true;
          else
            return false
        },
        message: props => `this is not a valid doctor`
      },
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

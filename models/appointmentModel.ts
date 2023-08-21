import mongoose, { Schema, Document, Model } from "mongoose";
import User, { UserDocument } from "./userModel"; // Make sure to import User and its types

export interface Appointment {
  patient: UserDocument["_id"];
  time: Date;
  reference: string;
  doctor: UserDocument["_id"];
  status: "pending" | "rejected" | "approved";
}

export interface AppointmentDocument extends Appointment, Document {}

export interface AppointmentModel extends Model<AppointmentDocument> {}

const appointmentSchema = new mongoose.Schema<AppointmentDocument>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      validate: {
        validator: async (v) => {
          const user = await User.findOne(v);
          if (user && user.role === "patient") return true;
          else return false;
        },
        message: (props) => `This is not a valid patient`,
      },
    },
    time: {
      type: Date,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      validate: {
        validator: async (v) => {
          const user = await User.findOne(v);
          if (user && user.role === "doctor") return true;
          else return false;
        },
        message: (props) => `This is not a valid doctor`,
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

const AppointmentModel: AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument, AppointmentModel>(
    "Appointment",
    appointmentSchema
  );

export default AppointmentModel;

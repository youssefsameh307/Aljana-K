import mongoose, { Schema, Document, Model } from "mongoose";

interface IRecord extends Document {
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  note: string;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const recordSchema: Schema<IRecord> = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Doctor model
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Patient model
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Record: Model<IRecord> =
  mongoose.models.Record || mongoose.model < IRecord > ("Record", recordSchema);

export default Record;

import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.models.Record || mongoose.model("Record", recordSchema);

export default Record;

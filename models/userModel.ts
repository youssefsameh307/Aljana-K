import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter the first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please enter the phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["patient", "secretary", "doctor"],
    default: "patient",
  },
  image: {
    type: String,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Create indexes for frequently searched fields
userSchema.index({
  firstName: "text",
  lastName: "text",
  email: "text",
  phone: "text",
  role: "text",
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;

// Infer types from the schema for document and model
type UserDocument = Document & typeof userSchema;
type UserModel = Model<UserDocument>;

export type { UserDocument, UserModel };

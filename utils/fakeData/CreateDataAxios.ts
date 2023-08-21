import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import User from "../../models/userModel";
import connectMongo from "../database";
import Appointment from "../../models/appointmentModel";
import { RecurrencePattern } from "../recurrencePatternEnum";
import axiosInstance from "../axios/axiosInstance";
import { saveAppointment } from "../ApiCalls";

export const createAppointments = async (count: number) => {
  await connectMongo();
  const doctors = await User.find({ role: "doctor" });
  const patients = await User.find({ role: "patient" });

  

  for (let i = 0; i < count; i++) {
    const randomDoctorIndex = Math.floor(Math.random() * doctors.length);
    const randomPatientIndex = Math.floor(Math.random() * patients.length);
    const doctor = doctors[randomDoctorIndex];
    const patient = patients[randomPatientIndex];

    let requestData = {
      doctor: doctor._id,
      patient: patient._id,
      time: faker.date.future(),
      reference: faker.word.words(),
      recurrencePattern: getRandomEnumValue(RecurrencePattern),
      recurrencePatternLength: faker.datatype.number({ min: 1, max: 10 }),
    };
    
    // await saveAppointment(requestData)
  }
};

const getRandomEnumValue = (enumeration) => {
    const values = Object.values(enumeration);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
};

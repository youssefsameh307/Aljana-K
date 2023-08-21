import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import User from "../../models/userModel";
import connectMongo from "../database";
import AppointmentModel from "../../models/appointmentModel";
import { RecurrencePattern } from "../recurrencePatternEnum";
// ... (Your schema definition and other code)

// Function to generate random doctors and save them
export const createDoctors = async (count:number) => {
    await connectMongo();
  const doctors = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const password = faker.internet.password(); // Generate a random password
    const role = "doctor"; // Set role to doctor

    // Create a new doctor object
    const doctor = new User({
      firstName,
      lastName,
      email,
      phone,
      password:'pass',
      role,
    });

    await doctor.save();
  }
};

// Function to generate random doctors and save them
export const createPatient= async (count:number) => {
    await connectMongo();
  const doctors = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const password = faker.internet.password(); // Generate a random password
    const role = "patient"; // Set role to doctor

    // Create a new doctor object
    const doctor = new User({
      firstName,
      lastName,
      email,
      phone,
      password:'pass',
      role,
    });

    await doctor.save();
  }
};

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
      time: faker.date.soon({days:10}),
      reference: faker.word.words(),
      recurrencePattern: getRandomEnumValue(RecurrencePattern),
      recurrencePatternLength: faker.number.int({ min: 1, max: 10 }),
    };

    let new_appoinetment= new AppointmentModel(requestData);
    await new_appoinetment.save();
  }
};

const getRandomEnumValue = (enumeration) => {
  const values = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};

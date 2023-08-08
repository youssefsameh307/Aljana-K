// registrationHandler.js

import User from "../../../models/userModel";
import connectMongo from "../../../utils/database";


export default async function handler(req, res) {

  try {
    await connectMongo()
    if (req.method === 'POST') {

      // Check if any of the required fields are missing or empty
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
      for (const field of requiredFields) {
        if (!(req.body?.[field] || false)) {
          return res.status(400).json({ message: `${field} is required` });
        }
      }

      // Create a new instance of the User model with the user data
      const userFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req?.body?.role || "patient",
      };

      const user = new User(userFields);

      // Save the user in the database
      const registeredUser = await user.save();

      res.status(201).json({
        registeredUser,
      });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

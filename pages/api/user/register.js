// registrationHandler.js

import User from "../../../models/userModel";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";
import authorizeRole from "../../../utils/authorizeRole";
import { checkRequiredFields, missingFields } from "../../../utils/checkRequiredFields";
import multer from "multer";
import path from "path";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    await connectMongo();
    if (req.method === "POST") {
      console.log(req.body['firstName']);


      // Check that all required fields to create are present
      if (!checkRequiredFields(req, User)) {
        let fields = missingFields(req, User)
        return res.status(400).json({ message: `${fields} is required` });
      }


      // Create a new instance of the User model with the user data
      const userFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: "doctor",
      };

      // If an image was uploaded, upload it to Cloudinary and get the URL
      if (req.file) {
        const imageResult = await cloudinary.v2.uploader.upload(req.file.path);
        userFields.image = imageResult.secure_url;
      } else {
        // put default user pic 
        userFields.image = "https://res.cloudinary.com/aljana-k/image/upload/v1647392394/default_user_pic_zqzq9r.png";
      }

      const user = new User(userFields);

      // Save the user in the database
      const registeredUser = await user.save();

      res.status(201).json({
        registeredUser,
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

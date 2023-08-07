// registrationHandler.js

import User from "../../../models/userModel";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";
import authorizeRole from "../../../utils/authorizeRole";
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
    console.log(req, req.body);
    if (req.method === "POST") {
      // Check if any of the required fields are missing or empty
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
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
        role: req.body.role,
      };

      // If an image was uploaded, upload it to Cloudinary and get the URL
      if (req.file) {
        const imageResult = await cloudinary.v2.uploader.upload(req.file.path);
        userFields.image = imageResult.secure_url;
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

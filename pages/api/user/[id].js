import User from "../../../models/userModel";
import connectMongo from "../../../utils/database";
import cloudinary from 'cloudinary';
import multer from "multer";
import path from "path";
import isAuthenticated from "../../../utils/isAuthenticated";
import authorizeRole from "../../../utils/authorizeRole";

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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage }).single('image');
export const config = {
  api: {
    bodyParser: false,
  },
};
export default isAuthenticated(
  authorizeRole(['doctor', 'secretary'])( async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "GET") {
      const id = req.query.id; // Extract user ID from the query parameter

      // Find the user by userId
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the user data
      res.status(200).json({ user });
    } else if (req.method === "PUT") {
      upload(req, res, async function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error uploading the image' });
        }

        const userId = req.query.id; // Extract user ID from the query parameter

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Update the user object with the provided data
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }
        if (req.body.email) {
          user.email = req.body.email;
        }
        if (req.body.phone) {
          user.phone = req.body.phone;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.role) {
          user.role = req.body.role;
        }

        // If an image was uploaded, upload it to Cloudinary and get the URL
        if (req.file) {
          const imageResult = await cloudinary.v2.uploader.upload(req.file.path);
          user.image = imageResult.secure_url;
        }

        // Save the updated user in the database
        const updatedUser = await user.save();

        res
          .status(200)
          .json({ message: "User updated successfully", user: updatedUser });
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
)
);

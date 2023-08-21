import User from "../../../models/userModel";
import connectMongo from "../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      // Extract user credentials from the request body
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email }).select('+password');;

      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the password is provided
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Check if the user's password exists and is a valid string
      if (!user.password || typeof user.password !== "string") {
        return res.status(500).json({ message: "Invalid password stored in the database" });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Invalid password
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role }, // Include the role in the token payload
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      // Store the token in a cookie
      const cookieOptions = {
        httpOnly: true, // Ensures the cookie is only accessible through HTTP(S) requests
        maxAge: 3600, // Expiration time in seconds (1 hour in this case)
        secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
        sameSite: "strict", // Ensure the cookie is only sent for same-site requests
        path: "/", // Specify the root path where the cookie is valid
      };

      res.setHeader("Set-Cookie", serialize("token", token, cookieOptions));
      res.status(200).json({
        user,
        message: "Login successful"
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

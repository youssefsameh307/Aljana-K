import jwt from "jsonwebtoken";
import connectMongo from "../../utils/dbConnect";
import User from "../../models/userModel";
// TO GET THE DATA OF THE CURRENT USER VIA THE JWT
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, "your-jwt-secret-key");
    const userId = decodedToken.userId;

    await connectMongo();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

import isAuthenticated from "../../../utils/isAuthenticated";
import User from "../../../models/userModel";

export default isAuthenticated(async function handler(req, res) {
  try {
    const userId = req.user.userId; // Use 'userId' instead of 'id' to match the token payload

    // Retrieve the user profile from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

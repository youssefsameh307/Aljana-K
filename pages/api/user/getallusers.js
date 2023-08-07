import User from "../../../models/userModel";
import authorizeRole from "../../../utils/authorizeRole";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";

export default isAuthenticated(
  authorizeRole(["secretary", "doctor"])(
    async function handler(req, res) {
      try {
        await connectMongo();
    
        if (req.method === "GET") {
          // Fetch all users from the database
          const users = await User.find();
    
          res.status(200).json({ users });
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

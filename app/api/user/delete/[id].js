import User from "../../../../models/userModel";
import connectMongo from "../../../../utils/database";


export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "DELETE") {
      const { id } = req.query;

      // Delete the user from the database
      await User.findByIdAndDelete(id);

      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
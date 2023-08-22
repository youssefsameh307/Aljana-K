import Shedule from "../../../../models/sheduleModel";
import authorizeRole from "../../../../utils/authorizeRole";
import connectMongo from "../../../../utils/database";
import isAuthenticated from "../../../../utils/isAuthenticated";


export default isAuthenticated(authorizeRole(["secretary"])(async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "DELETE") {
      const { id } = req.query;

      const existingSchedule = await Shedule.findByIdAndDelete(id);

      if (!existingSchedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }

      

      res.status(200).json({ message: "Schedule deleted successfully" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}));

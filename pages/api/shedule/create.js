import Shedule from "../../../models/sheduleModel";
import authorizeRole from "../../../utils/authorizeRole";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";


export default isAuthenticated(authorizeRole(["secretary"])(async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      const { day, startTime, endTime } = req.body;

      const existingSchedule = await Shedule.findOne({ day });

      if (existingSchedule) {
        return res.status(409).json({ error: "Schedule already exists" });
      }

      const newSchedule = new Shedule({
        day,
        startTime,
        endTime,
      });

      await newSchedule.save();

      res.status(201).json({
        newSchedule,
        message: "Schedule created successfully",
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
)

import Schedule from "../../../models/sheduleModel";
import authorizeRole from "../../../utils/authorizeRole";
import connectMongo from "../../../utils/database";
import isAuthenticated from "../../../utils/isAuthenticated";

export default isAuthenticated(
  authorizeRole(["secretary"])(async function handler(req, res) {
    try {
      await connectMongo();

      if (req.method === "GET") {
        const { id } = req.query;

        const existingSchedule = await Schedule.findById(id);

        if (!existingSchedule) {
          return res.status(404).json({ error: "Schedule not found" });
        }

        res.status(200).json({
          existingSchedule,
          message: "Schedule retrieved successfully",
        });
      } else if (req.method === "PUT") {
        const { day, startTime, endTime } = req.body;
        const { id } = req.query;

        const existingSchedule = await Schedule.findById(id);

        if (!existingSchedule) {
          return res.status(404).json({ error: "Schedule not found" });
        }

        existingSchedule.day = day;
        existingSchedule.startTime = startTime;
        existingSchedule.endTime = endTime;

        await existingSchedule.save();

        res.status(200).json({
          existingSchedule,
          message: "Schedule updated successfully",
        });
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

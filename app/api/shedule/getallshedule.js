import Shedule from "../../../models/sheduleModel";
import connectMongo from "../../../utils/database";


export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "GET") {
      const schedules = await Shedule.find();
      res.status(200).json(schedules);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

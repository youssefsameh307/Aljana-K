import authorizeRole from "../../../../utils/authorizeRole";
import connectMongo from "../../../../utils/database";
import isAuthenticated from "../../../../utils/isAuthenticated";
import Record from "../../../../models/recordModule";
import {sendNewFeedbackMailByID} from "../../../../utils/mail";

export default isAuthenticated(
  authorizeRole(["doctor"])(async function handler(req, res) {
    try {
      await connectMongo();
      const { patientID, doctorID } = req.query;

      if (req.method === "GET") {
        let records = await Record.find({
          patient: patientID,
          doctor: doctorID,
        });
        res.status(200).json(records);
      }
      
      if (req.method === "POST") {
        let record = new Record(req.body);
        console.log('body:',req.body);
        await record.save();
                
        res.status(201).json(record);
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

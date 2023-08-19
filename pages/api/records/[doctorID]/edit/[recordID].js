import authorizeRole from "../../../../../utils/authorizeRole";
import connectMongo from "../../../../../utils/database";
import isAuthenticated from "../../../../../utils/isAuthenticated";
import Record from "../../../../../models/recordModule";

export default isAuthenticated(
  authorizeRole(["doctor"])(async function handler(req, res) {
    try {
      await connectMongo();
      const { patientID, doctorID } = req.query;

      if (req.method === "PUT") {
        let {doctor:doctorID, recordID, note, visible} = req.body;
        //#region edit record in the database 
        const filter = { _id: recordID };

        // Check if the record exists
        const existingRecord = await Record.findById(recordID);
        if (!existingRecord) {
          res.status(404).json({ error: "Record not found" });
          return; 
        }

        // Check if the provided doctorID matches the existing record's doctor
        let user_is_admin = req.user.role=='admin'
        if (existingRecord.doctor.toString() !== doctorID && !user_is_admin) {
          res.status(403).json({ error: "Doctor mismatch" });
          return;
        }

        const update = { note, visible }; // Update the note value

        // Use findOneAndUpdate to update the record
        const updatedRecord = await Record.findOneAndUpdate(filter, update, {
          new: true,
        });

        if (updatedRecord) {
          res.status(200).json(updatedRecord);
        } else {
          res.status(500).json({ error: "Failed to update record" });
        }
        //#endregion
        
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

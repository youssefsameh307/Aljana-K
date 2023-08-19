import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";
import Record from "../../models/recordModule";
import connectMongo from "../../utils/database";
//UI/UX imports
import TopHeader from "../../components/_App/TopHeader";
import Navbar from "../../components/_App/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/_App/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import RecordsViewer from "./RecordsViewer";
import axios from "axios";

const feedbackPatient = ({
  patientData,
  currentUserData: currentUser,
  recordsData,
  error,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [newRecord, setNewRecord] = useState("");

  const handleAddRecord = async () => {
    // Update the URL query parameter and trigger SSR
    await axios.post(
      `http://localhost:3000/api/records/${currentUser.id}/${patientData.id}`,
      {
        patient: patientData._id,
        doctor: currentUser._id,
        note: newRecord,
      }
    );

    // trigger server side rendering refresh without full page refresh
    router.reload();
  };

  const handleEditRecord = async (recordID, updatedRecord, updatedVisibility) => {
    console.log(`updating record ${recordID} to ${updatedRecord}`);
    await axios.put(
      `http://localhost:3000/api/records/${currentUser.id}/edit/${recordID}`,
      {
        doctor: currentUser._id,
        recordID: recordID,
        note: updatedRecord,
        visible: updatedVisibility,
      }
    );
    // refresh page
    router.reload();
  };

  

  return (
    <div>
      <>
        <TopHeader />

        <Navbar />

        <PageBanner
          pageTitle="FAQ's"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Faq"
          bgImage="page-title-one"
        />

        <RecordsViewer
          records={recordsData}
          handleEditRecord={handleEditRecord}
        />

        <h1>Add Record</h1>
        <input
          type="text"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
        />
        <button onClick={handleAddRecord}>Submit</button>

        <Footer />
      </>

      <div>
        {currentUser ? (
          <h1>
            {"currentUser"}
            {JSON.stringify(currentUser)}
          </h1>
        ) : (
          "Not logged in"
        )}
      </div>
    </div>
  );
};

//#region Fetch Data
async function fetchCurrentDoctorData({ req }) {
  try {
    const token = req.cookies.token; // Assuming the JWT token is stored in a cookie named "jwt"

    // Decode the JWT token to get user information
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
    const user = await User.findById(decodedToken.userId);
    return user;
  } catch (error) {
    throw {
      message: error.message,
      location: "fetchData1", // You can customize this based on your needs
    };
  }
}
async function fetchPatientData({ params }) {
  try {
    const { id } = params;
    const user = await User.findById(id); // Assuming you have a method like findById in your User model
    return user;
  } catch (error) {
    throw {
      message: error.message,
      location: "fetchData2", // You can customize this based on your needs
    };
  }
}
async function fetchRecordsData({ params, req }) {
  try {
    const { id: patientId } = params;
    const token = req.cookies.token; // Assuming the JWT token is stored in a cookie named "jwt"

    // Decode the JWT token to get user information
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
    const { userId: doctorId } = decodedToken;

    // Get all feedback from this doctor to this patient
    const records = await Record.find({
      doctor: doctorId,
      patient: patientId,
    });
    return records;
  } catch (error) {
    throw {
      message: error.message,
      location: "fetchData3", // You can customize this based on your needs
    };
  }
}
//#endregion
export async function getServerSideProps(context) {
  try {
    await connectMongo();
    // Run the three asynchronous functions in parallel
    const [currentUserData, patientData, recordsData] = await Promise.all([
      fetchCurrentDoctorData(context), // current user data
      fetchPatientData(context), // get patient data
      fetchRecordsData(context), // get all records between them
    ]);

    // Return the props if all three functions complete successfully
    return {
      props: {
        currentUserData: JSON.parse(JSON.stringify(currentUserData)),
        patientData: JSON.parse(JSON.stringify(patientData)),
        recordsData: JSON.parse(JSON.stringify(recordsData)),
      },
    };
  } catch (error) {
    // Handle errors and return appropriate error message and location
    return {
      props: {
        error: {
          message: error.message || null,
          location: error.location || null, // You can customize this based on your needs
        },
      },
    };
  }
}

export default feedbackPatient;

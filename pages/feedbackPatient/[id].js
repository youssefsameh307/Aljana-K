import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import currentUserData from "../../utils/currentUserData";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../../models/userModel"

const feedbackPatient = ({patientData, currentUserData:currentUser}) => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <div>
      {currentUser ? (
        <h1>
          current user{" "}
          {`${currentUser.role}: ${currentUser.firstName} ${currentUser.lastName}`}
        </h1>
      ) : (
        "not yet"
      )}
      <h1>Feedback Patient {JSON.stringify(patientData)}</h1>
    </div>
  );
};

// Server Side Rendering 

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token; // Retrieve the JWT token from the cookie
  console.log(token)
  let user = null;

  if (token) {
    try {
      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      user = decodedToken;
    } catch (error) {
      console.error("JWT token verification failed:", error);
    }
  }

  if (!user) {
    // Handle unauthorized access or redirect if needed
  }

  // Fetch user-specific data based on userId
  const currentUserData = user;

  // Get the patient data
  let { id } = context.params;
  // console.log(id)
  // Find the user by userId
  const patientData = await User.findById(id);

  if (!user) {
    console.log('not found')
    // TODO ? Route back to login page
  }

   
  // Get the feedback data
  console.log(currentUserData, patientData)
  return {
    props: {
      currentUserData,
      patientData,
    },
  };
}


export default feedbackPatient;

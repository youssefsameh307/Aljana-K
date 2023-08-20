import React from "react";
import Link, { redirect } from "next/navigation";
import Record from "../../../models/recordModule";
import connectMongo from "../../../utils/database";
import { cookies } from "next/headers";
import { decodeToken } from "../../../utils/isAuthenticated";
import RecordsViewer from "../../../components/Dashboard/RecordsViewer";
let recordsData: any[] = [];

const Page = async () => {
  //#region Get current user ID
  const tokenCookie = cookies().get("token"); // from the cookies sent get the token
  if (tokenCookie == null) {
    redirect("/sign-in"); // if there is not token redirect to sign in page
  }
  const decoded_token: { userId: string } = decodeToken(tokenCookie.value);
  const { userId } = decoded_token;
  //#endregion
  await connectMongo();

  recordsData = await Record.find({ patient: userId, visible: true }).exec();
  return (
    <>
      <h1>Patient Feedbacks</h1>
      <RecordsViewer
              records={JSON.parse(JSON.stringify(recordsData))}
              editable={false} 
                   />
    </>
  );
};

export default Page;

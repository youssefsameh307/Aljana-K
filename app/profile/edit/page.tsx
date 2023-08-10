import React from "react";
import SignUpForm from "../../../components/authentication/SignUpForm";
import Link from "next/link";
import { cookies } from "next/headers";
import { decodeToken } from "../../../utils/isAuthenticated";
import User from "../../../models/userModel";
import { redirect } from "next/navigation";
import connectMongo from "../../../utils/database";
import { revalidatePath } from "next/cache";
import EditUserDataForm from "./EditUserDataForm";
const ProfileForm = async (context) => {
  // Runs server Side
  await connectMongo(); // connect to database
  const tokenCookie = cookies().get("token"); // from the cookies sent get the token
  if (tokenCookie == null) {
    redirect("/sign-in"); // if there is not token redirect to sign in page
  }
  const decoded_token: { userId: string } = decodeToken(tokenCookie.value); // decode token
  let old_data_user = await User.findById(decoded_token.userId); // get user from database


  async function handleSubmit(formData: FormData) {
    "use server";
    await connectMongo();
    //#region update user in DB
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: decoded_token.userId }, // Find user by ID
        {
          $set: {
            firstName: formData.get("firstName") || old_data_user.firstName,
            lastName: formData.get("lastName") || old_data_user.lastName,
            email: formData.get("email") || old_data_user.email,
            phone: formData.get("phone") || old_data_user.phone,
            image: formData.get("image") || old_data_user.image,
          },
        },
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        console.error(
          `'User not found' from this decoded token: ${decoded_token}`
        );
        redirect("/sign-in");
      }
      console.log("User updated and saved:", updatedUser);
      revalidatePath("/profile");
      return {
        error:false, 
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        error: true, 
        errorMessage: error.message,
        errorUserMessage: "An error occurred while updating your profile",
      }
    }
    //#endregion
  }

  return (
    <EditUserDataForm
      formSubmitHandler={handleSubmit}
      userData={JSON.parse(JSON.stringify(old_data_user))}
    />
  );
};

export default ProfileForm;

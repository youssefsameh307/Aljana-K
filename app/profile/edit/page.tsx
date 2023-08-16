import React from "react";
import SignUpForm from "../../../components/authentication/SignUpForm";
import UserAvatar from "../../../components/Profile/userAvatar";
import Link from "next/link";
import { cookies } from "next/headers";
import { decodeToken } from "../../../utils/isAuthenticated";
import User from "../../../models/userModel";
import { redirect } from "next/navigation";
import connectMongo from "../../../utils/database";
import { revalidatePath } from "next/cache";
import EditUserDataForm from "../../../components/Profile/EditUserDataForm";
import * as Yup from "yup";
import cloudinary from "cloudinary";
import multer from "multer";
import path from "path";
import { writeFile } from "fs/promises";

//#region Image upload Config
// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateFilePath(file_name) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const originalName = path.basename(file_name);
  const fileNameWithSuffix = uniqueSuffix + "-" + originalName;
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "tmp",
    fileNameWithSuffix
  );
  return filePath;
}

//#endregion

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
    console.log(formData.get("image"));

    //#region Validate User inputs server side and resend user errors client side
    try {
      const schema = Yup.object({
        firstName: Yup.string().matches(
          /^[^\d]*$/,
          "First name should not contain numbers"
        ),
        lastName: Yup.string().matches(
          /^[^\d]*$/,
          "Last name should not contain numbers"
        ),
        email: Yup.string()
          .email("Invalid email")
          .test(
            "test-mail-is-unique",
            "This email is already used by another user",
            async (email) => {
              console.log("from inside the email verifiable");
              // check if this email is already used by another user
              const user = await User.findOne({ email: email });
              if (user) {
                return false;
              }
              return true;
            }
          ),
        phone: Yup.string().matches(
          /^(?:\+\d{1,3}\d{6,14})?$/,
          "Phone number should be in global format for example +02 000 12345678"
        ),
        // Add more fields and validation rules as needed
      });

      const form_data_to_object = Object.fromEntries(formData);

      await schema.validate(form_data_to_object, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (validationErrors) {
      // Validation failed
      const errors = {};
      let errorUserMessage = "";
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
        errorUserMessage += `${error.message} \n`;
      });
      console.log("validation failed", errorUserMessage);
      return {
        error: true,
        errorMessage: errors,
        errorUserMessage: errorUserMessage,
      };
    }
    //#endregion

    //#region update user in DB
    //#region Upload picture
    let image = formData.get("image");
    console.log("image", image);
    if (image) {
      const file: File | null = image as unknown as File;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = generateFilePath(file.name);
      await writeFile(path, buffer);

      const imageResult = await cloudinary.v2.uploader.upload(path);
      console.log(`successfully uploaded file to cloudinary from ${path}`);
      formData.set("image", imageResult.secure_url);
    }

    //#endregion
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
        error: false,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        error: true,
        errorMessage: error.message,
        errorUserMessage: "An error occurred while updating your profile",
      };
    }
    //#endregion
  }
  interface ValidationResult {
    error: boolean;
    errorMessage: { [key: string]: string };
    errorUserMessage: string | null;
  }

  return (
    <>
      <EditUserDataForm
        formSubmitHandler={handleSubmit}
        userData={JSON.parse(JSON.stringify(old_data_user))}
      />
    </>
  );
};

export default ProfileForm;

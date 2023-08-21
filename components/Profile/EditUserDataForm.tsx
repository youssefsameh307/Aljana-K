"use client";
import { useState } from "react";
import DashboardUpdatePatient from "../Dashboard/DashboardUpdatePatient";
import UserAvatar from "./userAvatar";

const EditUserDataForm = ({ formSubmitHandler, userData }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState<string|null>(null);
  async function handleSubmit(formData: FormData) {
    console.log(formData.get("image"));
    const { error, errorMessage, errorUserMessage } = await formSubmitHandler(
      formData
    );
    if (error) {
      setErrorMessage(errorUserMessage);
      setSuccessMessage(null)
    } else {
      setErrorMessage(null);
      setSuccessMessage("Your profile updated successfully");
    }
  }
  return (
    <div>
      <div className="dashboard_apppointment">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="signup-item" style={{ maxWidth: "none" }}>
                <div className="signup-head">
                  <h2>Edit info</h2>
                  <p>Edit your account Information</p>
                </div>
                <div className="signup-form">
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <UserAvatar
                            username={"john"}
                            imageUrl={userData.image}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userData.firstName}
                            name="firstName"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userData.lastName}
                            name="lastName"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={userData.phone}
                            name="phone"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder={userData.email}
                            name="email"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            className="form-control form-control-lg"
                            id="formFileLg"
                            name="image"
                            type="file"
                            style={{ height: "auto" }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn signup-btn"
                            formAction={handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      {errorMessage && (
                        <div className="col-lg-12">
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        </div>
                      )}
                      {successMessage && (
                      <div className="col-lg-12">
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      </div>
                    )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserDataForm;

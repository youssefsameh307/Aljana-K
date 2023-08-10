"use client";
import { useState } from "react";

const EditUserDataForm = ({ formSubmitHandler, userData }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  async function handleSubmit(formData: FormData) {
    const { error, errorMessage, errorUserMessage } = await formSubmitHandler(
      formData
    );
    if (error) {
      setErrorMessage(errorUserMessage);
    } else {
      setErrorMessage(null);
    }
  }
  return (
    <div>
      <div className="signup-area ptb-100">
        <h2>{JSON.stringify(userData)}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0"></div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>Sign Up Here</h2>
                  <p>Edit your account Information</p>
                </div>

                <div className="signup-form">
                  <form>
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
                            defaultValue={"tooy"}
                          />
                        </div>
                      </div>

                      {/* {errorMessage && (
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
                    )} */}

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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default EditUserDataForm;

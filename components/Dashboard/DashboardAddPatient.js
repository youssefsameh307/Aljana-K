import React, { useState } from "react";
import axios from "axios";

function DashboardAddPatient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("image", imageFile);

      const response = await axios.post("/api/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setSuccessMessage("Patient added successfully!");
      // ... Handle further actions after successful registration ...
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setImageFile(null);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error adding patient. Please try again.");
      console.error(error);
    }
  }

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">Add Patient</h3>
        <div className="signup-area mt-5">
          <div className="">
            <div className="row">
              <div className="col-lg-12">
                <div className="signup-item" style={{ maxWidth: "none" }}>
                  <div className="signup-form">
                    <form>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <select
                              className="form-control"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            >
                              <option value="">Select Role</option>
                              <option value="doctor">Doctor</option>
                              <option value="patient">Patient</option>
                              <option value="secretary">Secretary</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="form-control form-control-lg"
                              id="formFileLg"
                              type="file"
                              style={{ height: "auto" }}
                              onChange={(e) => setImageFile(e.target.files[0])}
                            />
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

                        <div className="col-lg-12">
                          <div className="col-lg-6 m-auto">
                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn signup-btn"
                                disabled={loading}
                                onClick={handleSubmit}
                              >
                                {loading ? "Loading..." : "Add Patient"}
                              </button>
                            </div>
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
      </div>
    </>
  );
}

export default DashboardAddPatient;

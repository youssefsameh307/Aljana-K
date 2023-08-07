import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardUpdatePatient({ id }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch user data by ID when the component mounts
    fetchUserById(id);
  }, [id]);

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);

      const { user } = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch user data");
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("role", role);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(`/api/user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">Update Patient</h3>
        <div className="signup-area mt-5">
          <div className="">
            <div className="row">
              <div className="col-lg-12">
                <div className="signup-item" style={{ maxWidth: "none" }}>
                  <div className="signup-form">
                    <form onSubmit={handleSubmit}>
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
                              onChange={handleImageChange}
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
                              >
                                {loading ? "Loading..." : "Update Patient"}
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

export default DashboardUpdatePatient;

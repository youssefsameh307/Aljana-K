import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function DashboardAllPatients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/user/getallusers"); // Adjust the endpoint URL as needed
      setPatients(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/delete/${userId}`); // Adjust the endpoint URL as needed
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient._id !== userId)
      );
      setSuccessMessage("User deleted successfully");
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Error deleting user. Please try again later.");
      setSuccessMessage("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">All Patients</h3>

        <div className="mt-5">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                  <th>ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient._id}>
                    <td>{patient._id}</td>
                    <td>
                        {patient.image && (
                          <img
                            src={patient.image}
                            alt={`${patient.firstName} ${patient.lastName}`}
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          />
                        )}
                      </td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>{patient.role}</td>
                      <td>
                        <div className="actions">
                          <button>
                          <Link style={{color: "white"}} href={`/updatePatient/${patient._id}`}>
                          <i className="icofont-ui-edit"></i>
                          </Link>
                            
                          </button>
                          <button onClick={() => handleDelete(patient._id)}>
                            <i className="icofont-ui-delete"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardAllPatients;

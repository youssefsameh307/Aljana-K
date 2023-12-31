"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function DashboardAllPatients({ patients }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/user/delete/${userId}`); // Adjust the endpoint URL as needed
      // setPatients((prevPatients) =>
      //   prevPatients.filter((patient) => patient._id !== userId)
      // );
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

  const searchFilter = (myQuery, questions = []) => {
    //increase search capabilities, extend to category and tags
    if (myQuery) {
      const result = questions.filter((item) => {
        const { _id, __v, ...rest } = item;
        return Object.values(rest).some((x) => String(x).toLowerCase().includes(myQuery.toLowerCase()));
      });
      return result;
    } else return questions;
  };

  const filteredPatients = searchFilter(query, patients)

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">All Patients</h3>

        <input
          placeholder="search..."
          className="tw-w-full tw-p-3 tw-drop-shadow-md tw-bg-white tw-rounded tw-border-gray-800 tw-border-2 tw-mt-6"
          onChange={(x) => setQuery(x.target.value)}
        ></input>

        {/* <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="filled-basic" label="Search..." variant="filled" onChange={(x) => setQuery(x.target.value)} className='tw-w-full'>
        </TextField> */}

        <div className="mt-4">
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

          {
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
                  {filteredPatients.map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient._id}</td>
                      <td>
                        {patient.image && (
                          <img
                            src={patient.image}
                            alt={`${patient.firstName} ${patient.lastName}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
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
                            <Link href={`/recordsOfPatient/${patient._id}`}>
                              <i className="fa fa-address-book"></i>
                            </Link>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default DashboardAllPatients;

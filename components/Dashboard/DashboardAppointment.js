"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

function DashboardAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/appointment/getPatientAppointment");
        setAppointments(response.data.patientAppointment);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  
  
    return `${formattedDate}`;
  };
  

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axios.patch("/api/appointment/approval", { requestId, status });
      // Update the status in the appointments list
      setAppointments((prevAppointments) => {
        return prevAppointments.map((appointment) => {
          if (appointment._id === requestId) {
            return { ...appointment, appointment: { ...appointment.appointment, status } };
          }
          return appointment;
        });
      });
      setUpdateMessage("Appointment updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">Appointment</h3>

        <div className="mt-5">
          {updateMessage && <div className="alert alert-success">{updateMessage}</div>}
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                  <th scope="col">user Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                      <td>
                          {appointment.patient ? appointment.patient._id : ""}
                        </td>
                        <td>
                          {appointment.appointment ? appointment.appointment.name : ""}
                        </td>
                        <td>
                          {appointment.appointment ? appointment.appointment.email : ""}
                        </td>
                        <td>
                          {appointment.appointment ? appointment.appointment.phone : ""}
                        </td>
                        
                        <td>{formatDate(appointment.appointment.date)}</td>
                        <td>{appointment.appointment.time}</td>
                        <td>{appointment.appointment.status}</td>
                        <td>
                          <div className="actions">
                            <button
                              onClick={() => handleUpdateStatus(appointment.appointment._id, "approved")}
                            >
                              <i className="icofont-tick-mark"></i>
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(appointment.appointment._id, "rejected")}
                            >
                              <i className="icofont-close"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardAppointment;

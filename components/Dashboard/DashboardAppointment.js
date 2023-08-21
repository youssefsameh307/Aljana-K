import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useRouter } from "next/router"

function DashboardAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");
  const router = useRouter()

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance
        .get("/appointment/getPatientAppointment")

      setAppointments(response.data.patientAppointment);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  const formatDate = (dateString) => {
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);


    return `${formattedDate}`;
  };

  const handleUpdate = (id) => {
    router.push(`/appointment/${id}`)
  }

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/appointment/${id}`).then(() => {
      setAppointments((old) => old.filter((candidate) => candidate._id !== id))
    })
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await axiosInstance.patch("/appointment/approval", { requestId, status });
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {

  }, [appointments])

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
                    <th scope="col">Patient</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Time</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>
                          {`${appointment?.patient.firstName} ${appointment?.patient.firstName}` || ""}
                        </td>
                        <td>
                          {`${appointment?.doctor.firstName} ${appointment?.doctor.firstName}` || ""}
                        </td>
                        <td>
                          {appointment?.status || ""}
                        </td>
                        <td>{formatDate(appointment.time)}</td>
                        <td>
                          <div className="actions">
                            <button
                              onClick={() => handleUpdate(appointment._id)}
                            >
                              <i className="icofont-tick-mark"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(appointment._id)}
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

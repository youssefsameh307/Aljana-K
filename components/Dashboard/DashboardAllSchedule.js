import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function DashboardAllSchedule() {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("/api/shedule/getallshedule"); // Adjust the endpoint URL as needed
      setSchedules(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shedule/delete/${id}`); // Adjust the endpoint URL as needed
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== id)
      );
      setSuccessMessage("Schedule deleted successfully");
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting schedule:", error);
      setErrorMessage("Error deleting schedule. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="dashboard_apppointment">
      <h3 className="mb-0">All Schedules</h3>

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
                  <th scope="col">Day</th>
                  <th scope="col">Start time</th>
                  <th scope="col">End time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule._id}>
                    <td>{schedule.day}</td>
                    <td>{schedule.startTime}</td>
                    <td>{schedule.endTime}</td>
                    <td>
                      <div className="actions">
                    
                      <button>
                      <Link style={{color: "white"}} href={`updateSchedule/${schedule._id}`}>
                          <i className="icofont-ui-edit"></i>
                          </Link>
                        </button>
                      
                        
                        <button onClick={() => handleDelete(schedule._id)}>
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
  );
}

export default DashboardAllSchedule;

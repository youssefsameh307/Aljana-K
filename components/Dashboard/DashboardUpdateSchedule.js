import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardUpdateSchedule({ id }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [existingSchedule, setExistingSchedule] = useState(null);

  useEffect(() => {
    if (id) {
      fetchExistingSchedule();
    }
  }, [id]);

  const fetchExistingSchedule = async () => {
    try {
      const response = await axios.get(`/api/shedule/${id}`);
      setExistingSchedule(response.data.existingSchedule);
    } catch (error) {
      console.error('Error fetching existing schedule:', error);
    }
  };

  const handleUpdateSchedule = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const day = formData.get("day");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    try {
      const response = await axios.put(`/api/shedule/${id}`, {
        day,
        startTime,
        endTime,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating schedule:", error);
      setErrorMessage("Error updating schedule. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">Update Schedule</h3>

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

          <div className="row">
            <div className="col-lg-12">
              <div className="signup-item" style={{ maxWidth: "none" }}>
                <div className="signup-form">
                  <form onSubmit={handleUpdateSchedule}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mb-2">Day</label>
                          <select className="form-control" name="day" defaultValue={existingSchedule?.day}>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mb-2">Start time</label>
                          <input
                            type="time"
                            className="form-control"
                            name="startTime"
                            defaultValue={existingSchedule?.startTime}
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mb-2">End time</label>
                          <input
                            type="time"
                            className="form-control"
                            name="endTime"
                            defaultValue={existingSchedule?.endTime}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="col-lg-6 m-auto">
                          <div className="text-center">
                            <button type="submit" className="btn signup-btn">
                              {"Update Schedule"}
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
    </>
  );
}

export default DashboardUpdateSchedule;

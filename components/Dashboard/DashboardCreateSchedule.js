import React, { useState } from "react";
import axios from "axios";

function DashboardCreateSchedule() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const day = form.elements["day"].value;
    const startTime = form.elements["startTime"].value;
    const endTime = form.elements["endTime"].value;

    try {
      const response = await axios.post("/api/shedule/create", {
        day,
        startTime,
        endTime,
      });

      setLoading(false);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="dashboard_apppointment">
        <h3 className="mb-0">Create Schedule</h3>

        <div className="mt-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="signup-item" style={{ maxWidth: "none" }}>
                <div className="signup-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mb-2">Day</label>
                          <select className="form-control" name="day">
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
                              {loading ? "Loading..." : "Create Schedule"}
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

export default DashboardCreateSchedule;

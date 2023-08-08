import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/api/shedule/getallshedule");
        setSchedules(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const appointmentData = {
        name,
        email,
        phone,
        age,
        date,
        time: time, // Include the selectedTime in the appointment data
      };

      const response = await axios.post(
        "/api/appointment/create",
        appointmentData
      );
      setName("");
      setEmail("");
      setAge("");
      setPhone("");
      setDate("");
      setSelectedTime(""); // Clear the selectedTime state after submission

      setLoading(false);
      setSuccessMessage("Appointment request sent successfully.");
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="appointment-area-two ptb-100">
        <div className="container">
          <div className="row align-items-center appointment-wrap-two">
            <div className="col-lg-7">
              <div className="appointment-item appointment-item-two">
                <div className="appointment-shape">
                  <img src="/images/hart-img1.png" alt="Shape" />
                </div>

                <h2>Book your appointment</h2>
                <span>We will confirm your appointment within 2 hours</span>

                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="appointment-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man-alt-1"></i>
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-ui-message"></i>
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-ui-call"></i>
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man"></i>
                          <label>Age</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-calendar"></i>
                          <label>Time</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            placeholder="Time of appointment"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn appointment-btn"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="appointment-item-two-right">
                <div className="appointment-item-content">
                  <h2>Working Hours</h2>
                  <ul>
                    {schedules.map((schedule) => (
                      <li key={schedule._id}>
                        {schedule.day}{" "}
                        <span>
                          {schedule.startTime}PM - {schedule.endTime}AM
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;

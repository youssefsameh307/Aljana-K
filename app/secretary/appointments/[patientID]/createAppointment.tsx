"use client";
import React, { useState } from "react";
import connectMongo from "../../../../utils/database";
import { useRouter } from "next/navigation";
import Appointments from "../../../../models/appointmentModel";
import AppointmentForm from "../../../../components/Appointment/AppointmentForm";
import { RecurrencePattern } from "../../../../utils/recurrencePatternEnum";
const PatientAppointments = ({
  handleSubmit: formSubmitHandler,
}: {
  handleSubmit: any;
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Handel submit
  async function handleSubmit(formData: FormData) {
    const { error, errorMessage, errorUserMessage } = await formSubmitHandler(
      formData
    );
    if (error) {
      setErrorMessage(errorUserMessage);
      setSuccessMessage(null);
    } else {
      setErrorMessage(null);
      setSuccessMessage("Appointment created successfully");
    }
  }
  return (
    <>
      <div className="appointment-area-two ptb-100">
        <div className="container">
          <div className="row align-items-center appointment-wrap-two">
            <div className="col-lg-7">
              <div className="appointment-item appointment-item-two">
                {/* <div className="appointment-shape">
                  <img src="/images/hart-img1.png" alt="Shape" />
                </div> */}

                <h2>Book your appointment</h2>
                <span>We will confirm your appointment within 2 hours</span>

                {successMessage && (
                  <div className="alert alert-success">{successMessage}</div>
                )}

                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <div className="appointment-form">
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man-alt-1"></i>
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
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
                            name="time"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 border border-info border-5 rounded">
                        <div className="row-lg-6">
                          <div className="form-group">
                            <i className="icofont-calendar"></i>
                            <label>Recurring Pattern</label>
                            <select
                              className="form-control"
                              name="recurrencePattern"
                              defaultValue={RecurrencePattern.NONE} // Set "None" as the default value
                            >
                              <option value={RecurrencePattern.NONE}>
                                None
                              </option>
                              <option value={RecurrencePattern.WEEK}>
                                Every week
                              </option>
                              <option value={RecurrencePattern.MONTH}>
                                Every month
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="row-lg-6">
                          <div className="form-group">
                            <i className="icofont-calendar"></i>
                            <label>{"Number of repeats "}</label>
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              max="10"
                              placeholder="Number of recurence"
                              name="numberOfRepeats"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6"></div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn appointment-btn"
                        formAction={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-5">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointments;

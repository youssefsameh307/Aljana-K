// File: pages/signup.js

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setErrorMessage("Please agree to the Terms & Conditions");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("/api/user/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      setLoading(false);
      setSuccessMessage(response.data.message);
      window.location.href = "/sign-in"
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="signup-left">
                <img src="/images/signup-bg.jpg" alt="SignUp" />
              </div>
            </div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>Sign Up Here</h2>
                  <p>
                    Already have an account?{" "}
                    <Link href="/sign-in">Sign In</Link>
                  </p>
                </div>

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
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                              checked={agreeTerms}
                              onChange={(e) =>
                                setAgreeTerms(e.target.checked)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridCheck"
                            >
                              Yes, I agree with all{" "}
                              <Link href="/terms-condition">
                                Terms & Conditions
                              </Link>
                            </label>
                          </div>
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
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn signup-btn"
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Sign Up"}
                          </button>
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
};

export default SignUpForm;

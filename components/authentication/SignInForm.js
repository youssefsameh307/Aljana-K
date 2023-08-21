import React, { useState } from "react";
import Link from "next/link";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Validate form inputs
      if (!email) {
        setErrorMessage("Please enter your email.");
        setLoading(false);
        return;
      }

      if (!password) {
        setErrorMessage("Please enter your password.");
        setLoading(false);
        return;
      }

      // Make the API request to login
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setErrorMessage("");
        localStorage.setItem("user", JSON.stringify({user:true}));
        // Redirect to dashboard or desired page
        window.location.href = "/";
      } else {
        // Login failed
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="login-left">
                <img src="/images/login-bg.jpg" alt="Login" />
              </div>
            </div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>Login Here</h2>
                  <p>
                    Don't have an account yet?{" "}
                    <Link href="/sign-up">Sign Up Here</Link>
                  </p>
                </div>
                <div className="signup-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
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
                      {errorMessage && (
                        <div className="col-lg-12">
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        </div>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="forgot-pass">
                            <Link href="#">Forgot Password?</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn signup-btn"
                            disabled={loading}
                          >
                            {loading ? "Logging in..." : "Login"}
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

export default SignInForm;

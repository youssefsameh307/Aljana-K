"use client"
import React, { useEffect, useState } from "react";
const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [atClient, setAtClient] = useState(false);
  useEffect(() => {
    setAtClient(true)
    // Check if the user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Perform logout logic here
        // Clear user data from localStorage and update isLoggedIn state
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      } else {
        const data = await response.json();

      }
    } catch (error) {
      console.log("An error occurred while logging out:", error);
    }
  };


  return (

    <>
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-8 col-lg-9">
              <div className="header-top-item">

              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="header-top-item">
                <div className="header-top-right">
                  <ul style={{ display: "flex" }} className="lang-list">
                    <li>
                      <a href="/">EN</a>
                    </li>
                    <li>
                      <a href="/ar">AR</a>
                    </li>
                  </ul>

                  <ul style={{ display: "flex" }}>
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="icofont-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="icofont-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="icofont-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="icofont-instagram"></i>
                      </a>
                    </li>
                  </ul>

                  <div className="buttons">
                    {!isLoggedIn && (
                      <>
                        <a href="/sign-in" className="login">
                          Login
                        </a>
                        <a href="/sign-up" className="register">
                          Register
                        </a>
                      </>
                    )}
                    {isLoggedIn && (
                      <a className="register" onClick={handleLogout}>
                        Logout
                      </a>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;

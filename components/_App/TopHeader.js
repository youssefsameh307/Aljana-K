import React, { useEffect, useState } from "react";
const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
        console.log(data.message);
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
                <div className="header-top-left">
                  <ul>
                    <li>
                      <a href="tel:+07554332322">
                        <i className="icofont-ui-call"></i>
                        Call : +07 554 332 322
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@disin.com">
                        <i className="icofont-ui-message"></i>
                        hello@disin.com
                      </a>
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      210-27 Quadra, Canada
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="header-top-item">
                <div className="header-top-right">
                  {/* <ul className="lang-list">
                    <li>
                      <a href="/">EN</a>
                    </li>
                    <li>
                      <a href="/ar">AR</a>
                    </li>
                  </ul> */}

                  {/* <ul>
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
                  </ul> */}

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

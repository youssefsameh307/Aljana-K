import { useRouter } from "next/router";
import React from "react";

function DashboardHeader(props) {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("user");
        router.push('/')
      } else {
        const data = await response.json();

      }
    } catch (error) {
      console.log("An error occurred while logging out:", error);
    }
  };

  return (
    <>
      <div className="dash-header">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div
            className="header-menu"
            onClick={() => props.setControlNavbar(!props.controlNavbar)}
          >
            <img src="/images/menu-icon.svg" alt="menu" />
          </div>
          <button onClick={() => { handleLogout() }} className="header-logout">Logout</button>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;

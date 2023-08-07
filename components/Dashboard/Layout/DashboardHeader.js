import React from "react";

function DashboardHeader(props) {
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
          <div className="header-logout">Logout</div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;

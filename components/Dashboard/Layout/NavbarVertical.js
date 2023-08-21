import { useState } from "react";
import Link from "next/link";
import menuItems from "./routes/menuItems-user.json";
import { useRouter } from "next/navigation";

const NavbarVertical = ({ menuItems, controlNavbar }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [state, setState] = useState({});
  const [activeItem, setActiveItem] = useState("/dashboard"); // Set the initial active item to "/dashboard"

  const handleClick = (item, url) => {
    setState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const renderMenuItem = (children) => {
    if (!children) {
      return null;
    }

    return children.map((subOption) => {
      if (!subOption.children) {
        const isActive = currentPath === subOption.url; // Check against the "url" property

        return (
          <div className="nav-item" key={subOption.name}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              href={subOption.url}
              onClick={() => setActiveItem(subOption.url)}
            >
              <i className={`${subOption.icon} nav-icon me-2`}></i>
              <span className="">{subOption.name}</span>
            </Link>
          </div>
        );
      }

      const isParentActive = subOption.children.some(
        (child) => currentPath === child.url
      );

      return (
        <div className="nav-item" key={subOption.name}>
          <a
            className={`nav-link ${isParentActive ? "active" : ""}`}
            onClick={() => handleClick(subOption.name)}
            style={{ cursor: "pointer" }}
          >
            <i className={`${subOption.icon} nav-icon me-2`}></i>
            {subOption.name}
            {state[subOption.name] ? (
              <i className="icofont-simple-up nav-arrow"></i>
            ) : (
              <i className="icofont-simple-down nav-arrow"></i>
            )}
          </a>
          <div className={`collapse ${state[subOption.name] ? "show" : ""}`}>
            {renderMenuItem(subOption.children)}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h1>{controlNavbar}</h1>
      <div className="navbar-vertical">
        <Link href="/" className="nav-brand">
          <img src="/images/logo.png" alt="logo" />
        </Link>
        <div className="">
          <nav className="nav-list flex-column d-flex">
            {renderMenuItem(menuItems.data)}
          </nav>
        </div>
      </div>
    </>
  );
};

// Default properties 
NavbarVertical.defaultProps = {
  menuItems: menuItems,
  patientAccess: false,
};

export default NavbarVertical;

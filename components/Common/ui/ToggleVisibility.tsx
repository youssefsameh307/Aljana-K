import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ToggleIconProps {
  showEye: boolean;
  colorful: boolean;
}

const ToggleIcon: React.FC<ToggleIconProps> = ({ showEye, colorful }) => {
  const getColor = (): string => {
    if (colorful) {
      return showEye ? "green" : "red";
    }
    return "black";
  };

  return (
    <div>
      <div style={{ color: getColor() }}>
        {showEye ? (
          <FaEye />
        ) : (
         <FaEyeSlash />
        )}
      </div>
    </div>
  );
};

export default ToggleIcon;

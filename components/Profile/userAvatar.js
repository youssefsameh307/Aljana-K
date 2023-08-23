// components/UserAvatar.js
import React from "react";
import styles from "./userAvatar.module.scss"; // Import the CSS module for styling

const UserAvatar = ({ username, imageUrl }) => {
  return (
    <div className={styles["user-avatar"]}>
      <img
        src={imageUrl}
        alt={`${username}'s avatar`}
        className={styles["avatar-image"]}
      />
    </div>
  );
};

export default UserAvatar;

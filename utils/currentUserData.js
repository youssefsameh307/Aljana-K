import axios from "axios";

const currentUserData = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const refreshCurrentUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // TODO! Unfinished should save to local storage the user
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default currentUserData;

const authorizeRole = (roles) => (handler) => async (req, res) => {
  try {
    const userRole = req.user.role; // Assuming the user role is stored in req.user.role
    console.log(req.user)
    console.log(userRole, "user role")
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: `Forbidden as you are ${userRole}` });
    }

    return await handler(req, res); // Await the handler execution
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authorizeRole;

import jwt from "jsonwebtoken";

const isAuthenticated = (handler) => async (req, res) => {
  try {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    req.user = decodedToken;

    return await handler(req, res); // Await the handler execution
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default isAuthenticated;

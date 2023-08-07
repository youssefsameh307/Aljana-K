import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Clear the authentication token by setting an expired cookie
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(0), // Set the cookie to expire immediately
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      };

      res.setHeader("Set-Cookie", serialize("token", "", cookieOptions));
      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

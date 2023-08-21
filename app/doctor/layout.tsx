import DoctorLayout from "./layoutHelper";
import { cookies } from "next/headers";
import { decodeToken } from "../../utils/isAuthenticated";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokenCookie = cookies().get("token");

  if (tokenCookie == null) {
    redirect("/sign-in"); // if there is not token redirect to sign in page
    // router.push(`/sign-in`)
  }

  const decoded_token: { userId: string, role: string } = decodeToken(tokenCookie.value);
  const { userId, role } = decoded_token;

  if (role !== 'doctor') {
    redirect("/");
  }

  return (
    <DoctorLayout children={children} />
  );
}

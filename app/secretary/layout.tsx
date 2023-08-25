
import NavbarVertical from "../../components/Dashboard/Layout/NavbarVertical";
import menuItemsForDoctors from '../../components/Dashboard/Layout/routes/menuItems-doctor.json'
import { decodeToken } from "../../utils/isAuthenticated";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function DoctorLayout({
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

  if (role !== 'secretary') {
    redirect("/");
  }

  return (
    <section>

      <div className='tw-flex tw-flex-row tw-min-w-[250px]'>
        <NavbarVertical menuItems={menuItemsForDoctors} />

        <div className="dash-page-content tw-w-full">
          <div className="mt-5 px-4 container-fluid">{children}</div>
        </div>
      </div>
    </section>
  );
}

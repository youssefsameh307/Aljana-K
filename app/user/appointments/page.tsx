import { revalidatePath } from "next/cache";
// import User, { UserModel } from "../../../models/userModel";
import Appointment, {
  AppointmentDocument,
  AppointmentModel,
} from "../../../models/appointmentModel";
import SeachInputField from "../../../components/Common/ui/search/searchInputField";
import connectMongo from "../../../utils/database";
import AppointmentPage from "../../../components/Common/appointment/appointmentPage";
import Calandar from "../../../components/Dashboard/AppointmentsCalandarView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeToken } from "../../../utils/isAuthenticated";
let data: AppointmentDocument[] = [];
const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const searchQuery = searchParams.search ?? "";
  await connectMongo();
  const tokenCookie = cookies().get("token"); // from the cookies sent get the token
  if (tokenCookie == null) {
    redirect("/sign-in"); // if there is not token redirect to sign in page
  }
  const decoded_token: { userId: string } = decodeToken(tokenCookie.value);
  const { userId } = decoded_token;
  // Get Initial Data
  data = await Appointment.find({ patient: userId }).exec();
  // console.log("data", data);
  // Search Handler

  if (searchQuery.length > 0) {
    console.log("searching for", searchQuery);
    const regexQuery = new RegExp(searchQuery, "i");

    const filteredData = data;
    //   $or: [
    //     { firstname: regexQuery },
    //     { lastname: regexQuery },
    //     { email: regexQuery },
    //     { phone: regexQuery },
    //   ],
    // }).exec();

    data = filteredData;
  } else {
    console.log("searching for all");
    //   users = initialMoviesData ?? [];
  }

  revalidatePath("search-server-params");

  return (
    <div>
      {/* Search */}
      {/* <SeachInputField /> */}

      <Calandar appointments={data} />

      <h3>{JSON.stringify(data)}</h3>
    </div>
  );
};

export default Page;

import { revalidatePath } from "next/cache";
import User, { UserModel } from "../../models/userModel";
import SeachInputField from "./searchInputField";
import connectMongo from "../../utils/database";
import AppointmentPage from '../../components/Common/appointment/appointmentPage'
let users: UserModel[] = [];
const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string }
}) => {
  const searchQuery = searchParams.search ?? "";
  await connectMongo();
  // Get Initial Data
  const initial_data = await User.find({}).exec();
  console.log(initial_data);
  // Search Handler

  if (searchQuery.length > 0) {
    console.log("searching for", searchQuery);
    const regexQuery = new RegExp(searchQuery, "i");

    const filteredData = await User.find({
      $or: [
        { firstname: regexQuery },
        { lastname: regexQuery },
        { email: regexQuery },
        { phone: regexQuery },
      ],
    }).exec();

    users = filteredData ?? [];
  } else {
    console.log("searching for all");
    //   users = initialMoviesData ?? [];
  }

  revalidatePath("search-server-params");



  return (
    <div>
      {/* Search */}
      <SeachInputField />
      {/* Movies */}
      {/* <MoviesList movies={movies} /> */}
      <AppointmentPage doctors={users} />

      <h3>{JSON.stringify(users)}</h3>
    </div>
  );
};

export default Page;

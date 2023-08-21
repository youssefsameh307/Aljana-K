import { revalidatePath } from "next/cache";
import User, { UserModel } from "../../models/userModel";
import SearchServerActions from "./searchInputField";
import connectMongo from "../../utils/database";

let users: UserModel[] = [];
const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const searchQuery = searchParams.search ?? "";
  await connectMongo();
  // Get Initial Data
  const initial_data = await User.find({}).exec();
  console.log(initial_data);
  // Search Handler
  const searchHandler = async (searchQuery: string) => {
    "use server";

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

    revalidatePath("/server/server-actions");
  };

  // Deactivate search
  const deactivateSearch = async () => {
    "use server";
    users = [];
    revalidatePath("/server/server-actions");
  };

  return (
    <div>
      {/* Search */}
      <SearchServerActions
        deactivateSearch={deactivateSearch}
        searchHandler={searchHandler}
      />
      {/* Movies */}
      {/* <MoviesList movies={movies} /> */}
      <h3>{JSON.stringify(users)}</h3>
    </div>
  );
};

export default Page;

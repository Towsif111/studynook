import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyListingPage from "@/components/MyListingPage";

const MyListingsRoute = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Listings
        </h1>
        <p className="mt-2 text-neutral-400">
          Manage the study rooms you have listed.
        </p>

        {!user ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
              🔒
            </div>
            <p className="text-neutral-400">
              Please sign in to view your listings.
            </p>
          </div>
        ) : (
          <MyListingPage userId={user.id} />
        )}
      </div>
    </div>
  );
};

export default MyListingsRoute;

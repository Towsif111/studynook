import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import Image from "next/image";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  let bookings = [];

   if (user) {
     try {
       const res = await fetch(`http://localhost:5000/userId=${user.id}`, {
         cache: "no-store",
       });
       if (res.ok) {
         const data = await res.json();
         bookings = Array.isArray(data) ? data : [];
       }
     } catch (err) {
       console.error("Failed to fetch bookings:", err);
     }
   }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Bookings
        </h1>
        

        {!user ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
              🔒
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-900 text-3xl">
              📅
            </div>
            <p className="text-neutral-400">No bookings yet.</p>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-2xl space-y-5">
            {bookings.map((booking) => {
              return (
                <div
                  key={booking._id}
                  className="flex flex-col gap-5 rounded-3xl border border-neutral-800/60 bg-neutral-900/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:flex-row sm:p-8"
                >
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-36">
                    {booking.imageUrl ? (
                      <Image
                        src={booking.imageUrl}
                        alt={booking.roomName || "Study room"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 60px) 10vw, 144px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-4xl">
                        📚
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">
                          {booking.roomName || "Study Room"}
                        </h1>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-red-500/15 text-red-300"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-emerald-400"
                                : "bg-red-400"
                            }`}
                          />
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : "Cancelled"}
                        </span>
                      </div>
                      <p className="mt-2 text-neutral-400">
                        {booking.date
                          ? new Date(
                              booking.date + "T00:00:00"
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date not set"}
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {booking.startTime != null && booking.endTime != null
                          ? `${String(booking.startTime).padStart(2, "0")}:00 - ${String(booking.endTime).padStart(2, "0")}:00`
                          : ""}
                      </p>
                      <p className="mt-1 text-xs text-neutral-600">
                        ID: {booking._id}
                      </p>
                      <p className="mt-3 text-3xl font-bold text-lime-200">
                        ${Number(booking.totalCost || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <BookingCancelAlert bookingId={booking._id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;

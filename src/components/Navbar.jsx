"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Navbar = () => {
    const router = useRouter();
    const { data: session} = authClient.useSession() 

    const user = session?.user;
    const avatarFallback = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur">
            <div className="mx-auto flex w-full items-center justify-between gap-6 px-6 py-4">
                <Link href="/" className="flex items-center gap-3 text-white">
                    <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-neutral-900">
                        <Image src="/assets/logo.png" alt="StudyNook" width={36} height={36} />
                    </span>
                    <span className="text-xl font-semibold tracking-tight">StudyNook</span>
                </Link>

                <nav className="hidden items-center gap-8 text-lg font-medium text-neutral-300 md:flex">
                    <Link
                        href="/"
                        className="transition hover:text-white"
                    >
                        Home
                    </Link>
                    <Link
                        href="/rooms"
                        className="transition hover:text-white"
                    >
                        Rooms
                    </Link>
                    {user && (
                        <>
                            <Link
                                href="/add-room"
                                className="transition hover:text-white"
                            >
                                Add Room
                            </Link>
                            <Link
                                href="/my-listings"
                                className="transition hover:text-white"
                            >
                                My Listings
                            </Link>
                            <Link
                                href="/my-bookings"
                                className="transition hover:text-white"
                            >
                                My Bookings
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Avatar>
                                <Avatar.Image
                                    referrerPolicy="no-referrer"
                                    alt={user?.name || "User"}
                                    src={user?.image}
                                />
                                <Avatar.Fallback>{avatarFallback}</Avatar.Fallback>
                            </Avatar>
                            <Button
                                size="sm"
                                onClick={handleSignOut}
                                variant="bordered"
                                className="rounded-xl border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-white"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-xl bg-lime-200 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
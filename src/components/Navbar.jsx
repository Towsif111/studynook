"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";


const Navbar = () => {
    const router = useRouter();
    const { data: session} = authClient.useSession() 
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = session?.user;
    const avatarFallback = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

    const navLinks = useMemo(() => {
        const links = [
            { href: "/", label: "Home" },
            { href: "/rooms", label: "Rooms", startsWith: true },
        ];

        if (user) {
            links.push(
                { href: "/add-room", label: "Add Room" },
                { href: "/my-listings", label: "My Listings" },
                { href: "/my-bookings", label: "My Bookings" }
            );
        }

        return links;
    }, [user]);

    const isActiveLink = (link) => {
        if (link.href === "/") {
            return pathname === "/";
        }

        if (link.startsWith) {
            return pathname === link.href || pathname.startsWith(`${link.href}/`);
        }

        return pathname === link.href;
    };

    const getLinkClassName = (link, size = "base") => {
        const active = isActiveLink(link);
        const base = size === "large" ? "text-lg" : "text-base";
        return [
            base,
            "font-medium transition",
            active ? "text-lime-300" : "text-neutral-300 hover:text-white",
        ].join(" ");
    };

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            toast.success("Logout successful.");
            router.push("/");
        } catch (err) {
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur">
            <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-4 md:px-6">
                <Link href="/" className="flex items-center gap-3 text-white">
                    <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-neutral-900">
                        <Image src="/assets/logo.png" alt="StudyNook" width={36} height={36} />
                    </span>
                    <span className="text-xl font-semibold tracking-tight">StudyNook</span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={getLinkClassName(link, "large")}
                        >
                            {link.label}
                        </Link>
                    ))}
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
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 p-2 text-neutral-200 transition hover:border-neutral-700 hover:text-white md:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M6.4 5l12.6 12.6-1.4 1.4L5 6.4 6.4 5zm12.6 1.4L6.4 19l-1.4-1.4L17.6 5l1.4 1.4z"
                                />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="border-t border-neutral-800/80 bg-neutral-950/95 md:hidden">
                    <nav className="mx-auto flex flex-col gap-4 px-6 py-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={getLinkClassName(link)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {!user && (
                            <div className="flex flex-col gap-3 pt-2">
                                <Link
                                    href="/login"
                                    className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-lime-200 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
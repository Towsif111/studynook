import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur">
            <div className="mx-auto flex w-full items-center justify-between gap-6 px-6 py-4">
                <Link href="/" className="flex items-center gap-3 text-white">
                    <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-neutral-900">
                        <Image src="/assests/logo.png" alt="StudyNook" width={36} height={36} />
                    </span>
                    <span className="text-xl font-semibold tracking-tight">StudyNook</span>
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
                    <Link href="/" className="text-lime-200">
                        Home
                    </Link>
                    <Link href="/rooms" className="transition hover:text-white">
                        Rooms
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-lime-200 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-lime-300"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
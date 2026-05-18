import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="mt-auto w-full border-t border-neutral-800/60 bg-neutral-950 text-neutral-300">
			<div className="mx-auto w-full max-w-6xl px-6 py-14">
				<div className="grid gap-10 md:grid-cols-4">
					<div className="space-y-4">
						<Link href="/" className="flex items-center gap-3 text-white">
							<span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-neutral-900">
								<Image src="/assests/logo.png" alt="StudyNook" width={40} height={40} />
							</span>
							<span className="text-xl font-semibold tracking-tight">StudyNook</span>
						</Link>
						<p className="max-w-xs text-sm leading-relaxed text-neutral-400">
							A smarter way to discover, book, and manage library study rooms.
						</p>
					</div>

					<div className="space-y-3 text-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200">
							Navigate
						</p>
						<div className="flex flex-col gap-2 text-neutral-400">
							<Link href="/" className="transition hover:text-white">
								Home
							</Link>
							<Link href="/rooms" className="transition hover:text-white">
								Rooms
							</Link>
							<Link href="/about" className="transition hover:text-white">
								About
							</Link>
						</div>
					</div>

					<div className="space-y-3 text-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200">
							Contact
						</p>
						<div className="flex flex-col gap-2 text-neutral-400">
							<Link href="mailto:hello@studynook.app" className="transition hover:text-white">
								hello@studynook.app
							</Link>
							<span>+1 (555) 012-3456</span>
						</div>
					</div>

					<div className="space-y-3 text-sm">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200">
							Follow Us
						</p>
						<div className="flex items-center gap-3">
							<Link
								href="#"
								aria-label="Follow on Facebook"
								className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-semibold uppercase text-neutral-200 transition hover:border-neutral-600"
							>
								<i className="fa-brands fa-facebook text-base"></i>
							</Link>
							<Link
								href="#"
								aria-label="Follow on X"
								className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-semibold uppercase text-neutral-200 transition hover:border-neutral-600"
							>
								<i className="fa-brands fa-x-twitter text-base"></i>
							</Link>
							<Link
								href="#"
								aria-label="Follow on LinkedIn"
								className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-semibold uppercase text-neutral-200 transition hover:border-neutral-600"
							>
								<i className="fa-brands fa-linkedin text-base"></i>
							</Link>
							<Link
								href="#"
								aria-label="Follow on Instagram"
								className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs font-semibold uppercase text-neutral-200 transition hover:border-neutral-600"
							>
								<i className="fa-brands fa-instagram text-base"></i>
							</Link>
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-neutral-800/60 pt-6 text-center text-xs text-neutral-500">
					© 2026 StudyNook. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;

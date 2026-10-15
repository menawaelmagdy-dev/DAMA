import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-sand-100">
      <div className="u-edge w-full py-32 text-center">
        <p className="t-eyebrow mb-6 text-ink-mute">404</p>
        <h1 className="t-display mx-auto max-w-2xl text-[clamp(2.5rem,8vw,6rem)] text-ink">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm/relaxed text-ink-soft">
          The page you are looking for has moved or no longer exists.
        </p>
        <Link
          href="/"
          data-cursor="hover"
          className="t-eyebrow mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sand-50 transition-colors hover:bg-clay"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

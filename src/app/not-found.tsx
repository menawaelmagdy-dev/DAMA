import Link from "next/link";
import { copy } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper">
      <div className="u-edge w-full py-32 text-center">
        <p className="t-eyebrow mb-6 text-ink-mute">404</p>
        <h1 className="t-display mx-auto max-w-2xl text-[clamp(2.5rem,8vw,6rem)] text-ink">
          {copy.notFound.title}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm/relaxed text-ink-soft">{copy.notFound.body}</p>
        <Link
          href="/"
          data-cursor="hover"
          className="t-eyebrow mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-accent"
        >
          {copy.notFound.cta}
        </Link>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { ArrowLink } from "./ui";
import RemoteCompare from "./RemoteCompare";

const ease = [0.16, 1, 0.3, 1] as const;

const POINTS = [
  "Crew at both ends",
  "Recorded properly, locally",
  "Cut as one conversation",
];

export default function VirtualCallout() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="text-metal-static max-w-md font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight">
            An online podcast doesn&apos;t need to look like a Zoom call.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-text-muted">
            Most online episodes are recorded on a laptop webcam — soft, flat,
            lifeless. We put a real camera, proper light, and clean sound on your
            guest (and your host), wherever they are. Same online format, shot
            like a studio.
          </p>
          <ul className="mt-6 flex flex-col gap-2.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-text-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-faint" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ArrowLink href="/virtual">Learn more</ArrowLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <RemoteCompare />
        </motion.div>
      </div>
    </section>
  );
}

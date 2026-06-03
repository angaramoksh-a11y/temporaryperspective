"use client";

import { motion } from "motion/react";
import { ArrowLink, SectionLabel } from "./ui";
import RemoteCompare from "./RemoteCompare";

const ease = [0.16, 1, 0.3, 1] as const;

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
          <SectionLabel>Remote production</SectionLabel>
          <h2 className="mt-5 max-w-md font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-light leading-[1.12] tracking-tight">
            Your guest is in another city. It shouldn&apos;t look like it.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-text-muted">
            Most remote episodes give away the distance — soft webcam, flat
            sound, a host shrunk into a laptop corner. We put a crew at both
            ends, light and record each room properly, and cut it into one
            conversation that looks like it happened in the same studio.
          </p>
          <div className="mt-8">
            <ArrowLink href="/virtual">See how it works</ArrowLink>
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

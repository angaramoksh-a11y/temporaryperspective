"use client";

import { motion } from "motion/react";
import { ArrowLink } from "./ui";
import RemoteCompare, { REMOTE_SIDES } from "./RemoteCompare";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VirtualCallout({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="relative py-14 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-12 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="text-metal text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            An online podcast doesn&apos;t need to look like a Zoom call.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-text-muted">
            A real camera, proper light, and clean sound on your guest and your
            host, wherever they are.
          </p>
          {showLink && (
            <div className="mt-8">
              <ArrowLink href="/virtual">Learn more</ArrowLink>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <RemoteCompare
            ariaLabel="Compare remote production"
            sides={REMOTE_SIDES}
          />
        </motion.div>
      </div>
    </section>
  );
}

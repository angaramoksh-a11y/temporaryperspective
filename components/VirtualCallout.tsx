"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLink } from "./ui";
import RemoteCompare, { REMOTE_SIDES } from "./RemoteCompare";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VirtualCallout({ showLink = true }: { showLink?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // the compare widget autoplays an ambient episode loop; keep it unmounted
  // until the section is close, so the page doesn't stream video at load
  // (200px: on a laptop the section starts ~1.5 viewports down, so a bigger
  // pre-margin would defeat the gate and mount it on arrival anyway)
  const near = useInView(ref, { once: true, margin: "200px 0px" });
  return (
    <section ref={ref} className="relative py-14 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 lg:w-[86%] lg:grid-cols-2 lg:gap-12 lg:px-0">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
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
              <ArrowLink href="/virtual">How remote production works</ArrowLink>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          {near ? (
            <RemoteCompare
              ariaLabel="Compare remote production"
              sides={REMOTE_SIDES}
            />
          ) : (
            <div
              aria-hidden
              className="aspect-video w-full rounded-2xl border border-line bg-bg-raised/20"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { embed } from "@/lib/work";
import { ArrowLink, EdgeDivider, SectionLabel } from "./ui";
import Thumb from "./Thumb";

const ease = [0.16, 1, 0.3, 1] as const;
const VIDEO = "w-LissfW42g"; // Abhijit Chavda on Bharatvaarta

export default function VirtualCallout() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-24 lg:py-28">
      <EdgeDivider />
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <SectionLabel>Where the guest is</SectionLabel>
          <p className="mt-5 max-w-md font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-light leading-[1.12] tracking-tight">
            Your best guest, wherever they are. We bring the studio to them.
          </p>
          <div className="mt-8">
            <ArrowLink href="/virtual">See how we shoot remote</ArrowLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="chrome-card relative aspect-video w-full"
        >
          {playing ? (
            <iframe
              src={embed(VIDEO, true)}
              title="Abhijit Chavda on Bharatvaarta"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play, Abhijit Chavda on Bharatvaarta"
              className="group relative block h-full w-full"
            >
              <Thumb
                id={VIDEO}
                alt="Abhijit Chavda recorded remotely for Bharatvaarta"
                className="brightness-[0.8] transition-[filter] duration-300 group-hover:brightness-100"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-bg/40 text-lg backdrop-blur transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-110">
                  ▶
                </span>
              </span>
              <span className="absolute bottom-4 left-4 rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-xs text-text-muted backdrop-blur">
                Abhijit Chavda — remote, Bharatvaarta
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

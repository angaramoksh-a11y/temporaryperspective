"use client";

import { useState } from "react";
import { thumb, thumbFallback } from "@/lib/work";

export default function Thumb({
  id,
  alt,
  className = "",
}: {
  id: string;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState(thumb(id));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setSrc(thumbFallback(id))}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

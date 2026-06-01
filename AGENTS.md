<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Reference links (reactbits.dev and similar)

When a reactbits.dev link (or any external codebase/component reference) is shared, it is **inspiration only, NOT a spec to copy verbatim**. Always:

- Adapt, simplify, or reinterpret it to fit our stack, design language, palette, and performance budget. Never a literal port.
- Match the current stack — detect Tailwind vs CSS and JS vs TS from the repo; don't introduce a new styling approach. (Today: Tailwind v4 + CSS, TypeScript, `motion`, `ogl`.)
- Keep it consistent with the existing hero treatment (Silk, grain, blur overlays).
- Respect performance: no heavy/janky animation; honor `prefers-reduced-motion`.
- Don't add new dependencies unless genuinely necessary — say so first.
- Before building, briefly state the adaptation plan, then implement.

If the user pastes the blank "Reference / What I liked / What I want" template, that is them reaffirming this protocol, not a new task.

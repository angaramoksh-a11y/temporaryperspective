"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

type Props = {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  className?: string;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
};

// Flowing "silk" shader. Ported from the react-bits three.js version onto ogl
// (a fullscreen triangle), so it carries no three.js dependency. Drives a
// single time uniform; freezes under reduced-motion.
export default function Silk({
  speed = 5,
  scale = 1,
  color = "#7b7481",
  noiseIntensity = 1.5,
  rotation = 0,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  float pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y +
    cos(3.0 * tex.x + 5.0 * tex.y) +
    0.02 * tOffset) +
    sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}`;

    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: hexToRgb(color) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uRotation: { value: rotation },
      uNoiseIntensity: { value: noiseIntensity },
    };

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex: vert, fragment: frag, uniforms }),
    });

    const resize = () => {
      renderer.dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      uniforms.uTime.value += 0.1 * ((now - last) / 1000);
      last = now;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      renderer.render({ scene: mesh });
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.parentNode?.removeChild(gl.canvas);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none h-full w-full ${className}`.trim()}
    />
  );
}

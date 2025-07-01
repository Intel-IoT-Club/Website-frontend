"use client";
import Hero3D from "@/components/hero-3d";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function BlueDotsAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight * 0.6;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const colors = [
      { fill: "rgba(0, 150, 255, OP)", shadow: "#00b2ff" },
      { fill: "rgba(200, 200, 200, OP)", shadow: "#aaa" },
    ];

    const isMobile = width < 640;
    const minR = isMobile ? 6 : 10;
    const maxR = isMobile ? 14 : 20;

    const dots = Array.from({ length: 10 }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: minR + Math.random() * (maxR - minR),
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        opacity: 0.5 + Math.random() * 0.5,
        color,
      };
    });

    let running = true;

    function animate() {
      if (!running || !ctx) return;

      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < dot.r || dot.x > width - dot.r) dot.dx *= -1;
        if (dot.y < dot.r || dot.y > height - dot.r) dot.dy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color.fill.replace("OP", dot.opacity.toFixed(2));
        ctx.shadowColor = dot.color.shadow;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    }

    animate();
    return () => {
      running = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "60vh",
          display: "block",
          maxHeight: 400,
        }}
      />
    </div>
  );
}

export default function Hero() {
  const [show3D, setShow3D] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScreen = () => {
      // Only show 3D on screens ≥1024px (Tailwind's 'lg')
      setShow3D(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background py-16 lg:py-24 xl:py-32 mb-0 pb-0"
    >
      {show3D ? <Hero3D /> : <BlueDotsAnimation />}

      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
          <img src="/logo.png" alt="IoT Club Logo" className="h-16 w-60" />
        </div>

        <h1
          className="mb-16 lg:mb-24 xl:mb-32 max-w-4xl text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight leading-tight"
          style={
            mounted && resolvedTheme === "dark"
              ? { textShadow: "0 0 4px #000, 0 0 4px #000, 0 0 4px #000" }
              : {}
          }
        >
          Empowering Innovation through Intel IoT
        </h1>

        <p
          className="mb-8 lg:mb-10 max-w-2xl text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed"
          style={
            mounted && resolvedTheme === "dark"
              ? { textShadow: "0 0 2px #000, 0 0 2px #000, 0 0 2px #000" }
              : {}
          }
        >
          Exploring the intersection of hardware, software, and connectivity
        </p>

        <div className="flex flex-col gap-4 sm:flex-row lg:justify-center">
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-primary px-6 py-2 transition-all duration-300 ease-out hover:bg-primary/90 hover:pl-9 hover:opacity-100"
            asChild
          >
            <Link href="/contact">Join the Club</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary/20 px-6 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
            asChild
          >
            <Link href="/projects">Explore Projects</Link>
          </Button>
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-full bg-primary px-6 py-2 transition-all duration-300 ease-out hover:bg-primary/90 hover:pr-9 hover:opacity-100"
            asChild
          >
            <Link href="/hackathon">Hackathon</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 overflow-hidden neon-glow-bg p-8"
    >
      {/* Floating neon bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-400 opacity-20 animate-bubble"
            style={{
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Logo */}
      <img
        src="/amritalogo.png"
        alt="Amrita Logo"
        className="h-36 w-auto mb-12"
      />

      {/* Title */}
      <h1
        className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white neon-glow mb-6"
        style={{
          textShadow: "0 0 8px #0ff, 0 0 16px #0ff33, 0 0 24px #0ff",
        }}
      >
        Intel IoT Club
      </h1>

      {/* Description */}
      <p
        className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-3xl neon-glow"
        style={{
          textShadow: "0 0 4px #0ff, 0 0 8px #0ff66",
        }}
      >
        Empowering Innovation through Intel IoT
      </p>

      <style jsx>{`
        @keyframes bubbleMove {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-50px) translateX(20px); opacity: 0.4; }
          100% { transform: translateY(-100px) translateX(-20px); opacity: 0.2; }
        }
        .animate-bubble {
          animation: bubbleMove 6s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
  {[...Array(15)].map((_, i) => (
    <span
      key={i}
      className="absolute rounded-full opacity-30 bg-cyan-400 animate-glowBubble"
      style={{
        width: `${20 + Math.random() * 50}px`,
        height: `${20 + Math.random() * 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      }}
    />
  ))}
</div>

<style jsx>{`
  @keyframes glowBubble {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.2;
      box-shadow: 0 0 4px #0ff, 0 0 8px #0ff66;
    }
    50% {
      transform: translateY(-50px) translateX(20px) scale(1.2);
      opacity: 0.5;
      box-shadow: 0 0 8px #0ff, 0 0 16px #0ff88;
    }
    100% {
      transform: translateY(-100px) translateX(-20px) scale(1);
      opacity: 0.2;
      box-shadow: 0 0 4px #0ff, 0 0 8px #0ff66;
    }
  }

  .animate-glowBubble {
    animation: glowBubble linear infinite;
  }
`}</style>
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {[...Array(15)].map((_, i) => (
    <span
      key={i}
      className="absolute rounded-full opacity-30 bg-cyan-400 animate-glowBubble"
      style={{
        width: `${20 + Math.random() * 50}px`,
        height: `${20 + Math.random() * 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
      }}
    />
  ))}
</div>

<style jsx>{`
  @keyframes glowBubble {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.2;
      box-shadow: 0 0 4px #0ff, 0 0 8px #0ff66;
    }
    50% {
      transform: translateY(-50px) translateX(20px) scale(1.2);
      opacity: 0.5;
      box-shadow: 0 0 8px #0ff, 0 0 16px #0ff88;
    }
    100% {
      transform: translateY(-100px) translateX(-20px) scale(1);
      opacity: 0.2;
      box-shadow: 0 0 4px rgba(0, 255, 255, 1), 0 0 8px #0ff66;
    }
  }

  .animate-glowBubble {
    animation: glowBubble linear infinite;
  }
`}</style>

    </section>
  );
          
}

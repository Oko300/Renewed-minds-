"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Users } from "lucide-react";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A1A42 0%, #0F2557 55%, #162B6E 100%)",
      }}
    >
      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Romans 12:2 — Impact Team
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight">
              <span className="block">Build.</span>
              <span className="block text-yellow-400">Inspire.</span>
              <span className="block">Influence.</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-blue-100/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Igniting revival, birthing purpose, and unleashing kingdom
              impact—one young life at a time.
            </p>

            {/* Theme Tag */}
            <div className="inline-block bg-white/10 border border-white/20 text-white/90 text-sm italic px-4 py-2 rounded-lg">
              2025 Theme:{" "}
              <span className="text-yellow-400 font-semibold not-italic">
                "God, Glorified in Me"
              </span>{" "}
              — Galatians 1:24
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-2">
              <div className="text-center">
                <p className="text-3xl font-bold font-heading text-yellow-400">40+</p>
                <p className="text-sm text-blue-200/70">Schools Targeted</p>
              </div>
              <div className="w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold font-heading text-yellow-400">3</p>
                <p className="text-sm text-blue-200/70">Ministry Arms</p>
              </div>
              <div className="w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold font-heading text-yellow-400">∞</p>
                <p className="text-sm text-blue-200/70">Kingdom Impact</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => scrollTo("#resources")}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#0F2557] font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-0.5 group"
              >
                <BookOpen size={18} />
                Explore Resources
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:border-yellow-400 hover:text-yellow-400 font-semibold px-7 py-4 rounded-xl transition-all duration-200"
              >
                <Users size={18} />
                Who We Are
              </button>
            </div>
          </div>

          {/* Right — Founder Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-2xl scale-110" />

              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 max-w-xs w-full shadow-2xl">
                {/* Photo */}
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-yellow-400 shadow-xl mb-5">
                  <Image
                    src="/logo/founder.jpeg"
                    alt="Jeremiah E. Chukwuike"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-heading font-bold text-white">
                    Jeremiah E. Chukwuike
                  </h3>
                  <p className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">
                    Coordinator
                  </p>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full mx-auto" />
                  <p className="text-blue-100/70 text-sm leading-relaxed">
                    Renewed Minds International
                    <br />
                    A.K.A Impact Team
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-5 pt-4 border-t border-white/15 space-y-2">
                  <a
                    href="tel:+2348102672966"
                    className="flex items-center gap-2 text-blue-100/70 hover:text-yellow-400 text-xs transition-colors justify-center"
                  >
                    📞 +234-810-267-2966
                  </a>
                  <a
                    href="mailto:feedbackrmi39@gmail.com"
                    className="flex items-center gap-2 text-blue-100/70 hover:text-yellow-400 text-xs transition-colors justify-center"
                  >
                    ✉️ feedbackrmi39@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}

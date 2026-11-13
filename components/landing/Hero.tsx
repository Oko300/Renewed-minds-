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
      {/* Soft ambient accents — kept subtle for a calmer look */}
      <div className="absolute top-24 right-16 w-64 h-64 rounded-full bg-blue-600/8 blur-2xl pointer-events-none" />
      <div className="absolute bottom-24 left-12 w-48 h-48 rounded-full bg-yellow-400/8 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Romans 12:2 Impact Team
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
              impact one young life at a time.
            </p>

            {/* Theme Tag */}
            <div className="inline-block bg-white/10 border border-white/20 text-white/90 text-sm italic px-4 py-2 rounded-lg">
              2025 Theme:{" "}
              <span className="text-yellow-400 font-semibold not-italic">
                "God, Glorified in Me"
              </span>{" "}
              Galatians 1:24
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 flex-wrap">
              <a
                href="https://chat.whatsapp.com/DbZO1iuxIbR6woNlToqUCx?s=cl&p=a&mlu=4&ilr=4&iam=2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-6 py-3.5 rounded-md transition-colors shadow-md"
              >
                Join WhatsApp Community
              </a>
              <button
                onClick={() => scrollTo("#resources")}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#0F2557] font-semibold px-6 py-3.5 rounded-md transition-colors shadow-md group"
              >
                <BookOpen size={18} />
                Explore Resources
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="flex items-center justify-center gap-2 border border-white/50 text-white hover:border-yellow-400 hover:text-yellow-400 font-medium px-6 py-3.5 rounded-md transition-colors"
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
                    Also known as Impact Team
                  </p>
                </div>

                {/* Contact */}
                <div className="mt-5 pt-4 border-t border-white/15 space-y-2">
                  <a
                    href="tel:+2348102672966"
                    className="flex items-center gap-2 text-blue-100/70 hover:text-yellow-400 text-xs transition-colors justify-center"
                  >
                    📞 +234 810 267 2966
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

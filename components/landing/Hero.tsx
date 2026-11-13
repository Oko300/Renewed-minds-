"use client";

import Image from "next/image";
import { BookOpen, Users } from "lucide-react";

const WHATSAPP_COMMUNITY =
  "https://chat.whatsapp.com/DbZO1iuxIbR6woNlToqUCx?s=cl&p=a&mlu=4&ilr=4&iam=2";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 hero-animated-bg"
    >
      {/* Soft animated orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />
      <div className="hero-orb hero-orb-3" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-yellow-400 text-sm font-medium mb-4">
              Romans 12:2 · Impact Team
            </p>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Build. Inspire.{" "}
              <span className="text-yellow-400">Influence.</span>
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-5">
              Igniting revival, birthing purpose, and unleashing kingdom impact
              one young life at a time.
            </p>

            <p className="text-sm text-blue-200/80 mb-8">
              2025 Theme:{" "}
              <span className="text-yellow-400 font-medium">
                &ldquo;God, Glorified in Me&rdquo;
              </span>{" "}
              — Galatians 1:24
            </p>

            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mb-8 text-center lg:text-left">
              <div>
                <p className="text-2xl font-heading font-bold text-yellow-400">40+</p>
                <p className="text-xs text-blue-200/70 mt-0.5">Schools targeted</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-yellow-400">3</p>
                <p className="text-xs text-blue-200/70 mt-0.5">Ministry arms</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-yellow-400">∞</p>
                <p className="text-xs text-blue-200/70 mt-0.5">Kingdom impact</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={WHATSAPP_COMMUNITY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-5 py-2.5 rounded text-sm transition-colors"
              >
                Join WhatsApp Community
              </a>
              <button
                onClick={() => scrollTo("#resources")}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#0F2557] font-medium px-5 py-2.5 rounded text-sm transition-colors"
              >
                <BookOpen size={16} />
                Explore Resources
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:border-yellow-400 hover:text-yellow-400 font-medium px-5 py-2.5 rounded text-sm transition-colors"
              >
                <Users size={16} />
                Who We Are
              </button>
            </div>
          </div>

          {/* Founder card — photo-led layout */}
          <div className="flex justify-center lg:justify-end">
            <div className="founder-card bg-white rounded-xl overflow-hidden max-w-[300px] w-full">
              <div className="relative w-full h-[320px] sm:h-[340px] bg-[#1a1a1a]">
                <Image
                  src="/logo/founder.jpeg"
                  alt="Jeremiah E. Chukwuike, Coordinator"
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                  priority
                />
                {/* Soft bottom fade into content area */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1 bg-yellow-400" />
              </div>
              <div className="px-5 py-4 text-center">
                <h3 className="font-heading font-semibold text-[#0F2557] text-lg leading-tight">
                  Jeremiah E. Chukwuike
                </h3>
                <p className="text-yellow-600 text-xs font-semibold uppercase tracking-wide mt-1">
                  Coordinator
                </p>
                <div className="w-10 h-0.5 bg-yellow-400 mx-auto my-2.5" />
                <p className="text-gray-600 text-sm leading-snug">
                  Renewed Minds International
                  <br />
                  <span className="text-gray-500">Also known as Impact Team</span>
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-sm">
                  <a
                    href="tel:+2348102672966"
                    className="block text-gray-600 hover:text-[#0F2557]"
                  >
                    +234 810 267 2966
                  </a>
                  <a
                    href="mailto:feedbackrmi39@gmail.com"
                    className="block text-gray-600 hover:text-[#0F2557] break-all"
                  >
                    feedbackrmi39@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

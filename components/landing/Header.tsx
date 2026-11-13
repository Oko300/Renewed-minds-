"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const WHATSAPP_COMMUNITY =
  "https://chat.whatsapp.com/DbZO1iuxIbR6woNlToqUCx?s=cl&p=a&mlu=4&ilr=4&iam=2";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision & Values", href: "#values" },
  { label: "Events", href: "#events" },
  { label: "Resources", href: "#resources" },
  { label: "Spotify", href: "#spotify" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled || isOpen
          ? "bg-[#0F2557] shadow-md"
          : "bg-[#0F2557]/95"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white border border-yellow-400/80">
              <Image
                src="/logo/logo.jpeg"
                alt="Renewed Minds International"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-white font-heading font-semibold text-sm">
                Renewed Minds
              </p>
              <p className="text-yellow-400 text-xs">International</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-white/85 hover:text-yellow-400 px-2.5 py-2 text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href={WHATSAPP_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-medium px-3.5 py-1.5 rounded transition-colors"
            >
              WhatsApp Community
            </a>
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#0A1A42] border-t border-white/10">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left text-white/85 hover:text-yellow-400 px-3 py-2.5 text-sm"
              >
                {link.label}
              </button>
            ))}
            <a
              href={WHATSAPP_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-3 py-2.5 rounded text-sm mt-2"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision & Values", href: "#values" },
  { label: "Resources", href: "#resources" },
  { label: "Spotify Streams", href: "#spotify" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F2557] shadow-xl backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/logo/logo.jpeg"
                alt="RMI Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-heading font-bold text-sm leading-tight">
                Renewed Minds
              </p>
              <p className="text-yellow-400 text-xs font-medium leading-tight">
                International
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-white/80 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/admin"
              className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-[#0F2557] font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A1A42] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left text-white/80 hover:text-yellow-400 hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/admin"
              className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-[#0F2557] font-semibold px-4 py-3 rounded-lg text-sm transition-all mt-2"
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

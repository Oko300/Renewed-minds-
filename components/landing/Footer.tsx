import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision & Values", href: "#values" },
  { label: "Resources", href: "#resources" },
  { label: "Spotify Streams", href: "#spotify" },
  { label: "Contact", href: "#contact" },
];

const ministryArms = [
  "Renewed Minds International",
  "Purpose Discovery Academy",
  "JEC Initiatives",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A1A42] text-white">
      {/* CTA Banner */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-black text-[#0F2557] mb-4">
          Ready to Join the Impact?
        </h2>
        <p className="text-[#0F2557]/80 text-lg mb-6 max-w-xl mx-auto">
          Together, we are Renewed Minds International — and God shall be
          glorified in us!
        </p>
        <a
          href="mailto:feedbackrmi39@gmail.com"
          className="inline-block bg-[#0F2557] hover:bg-[#0A1A42] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Get in Touch →
        </a>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
                <Image
                  src="/logo/logo.jpeg"
                  alt="RMI Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-bold text-white leading-tight">
                  Renewed Minds
                </p>
                <p className="text-yellow-400 text-xs font-medium">
                  International
                </p>
              </div>
            </div>
            <p className="text-blue-200/60 text-sm leading-relaxed mb-5">
              A.K.A Impact Team. Igniting revival, birthing purpose, and
              unleashing kingdom impact — one young life at a time.
            </p>
            <div className="text-sm font-medium text-yellow-400 italic">
              "God, Glorified in Me" — Gal. 1:24
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 uppercase tracking-widest text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-200/60 hover:text-yellow-400 text-sm transition-colors duration-200"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry Arms */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 uppercase tracking-widest text-sm">
              Ministry Arms
            </h4>
            <ul className="space-y-3">
              {ministryArms.map((arm) => (
                <li key={arm}>
                  <div className="flex items-start gap-2 text-blue-200/60 text-sm">
                    <span className="text-yellow-400 mt-0.5">✦</span>
                    {arm}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/10">
              <Link
                href="/admin"
                className="text-xs text-blue-300/50 hover:text-yellow-400 transition-colors"
              >
                Admin Dashboard →
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 uppercase tracking-widest text-sm">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:feedbackrmi39@gmail.com"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                  <Mail size={15} className="text-blue-300 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/40 uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-blue-200/70 group-hover:text-yellow-400 transition-colors break-all">
                    feedbackrmi39@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+2348102672966" className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                  <Phone size={15} className="text-blue-300 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/40 uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <p className="text-sm text-blue-200/70 group-hover:text-yellow-400 transition-colors">
                    +234-810-267-2966
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/40 uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-sm text-blue-200/70">
                    Federal University Wukari
                    <br />
                    Taraba State, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-200/40">
          <p>
            © {new Date().getFullYear()} Renewed Minds International. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-red-400 mx-1" /> for
            Kingdom Impact
          </p>
        </div>
      </div>
    </footer>
  );
}

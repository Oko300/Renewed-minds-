import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const WHATSAPP_COMMUNITY =
  "https://chat.whatsapp.com/DbZO1iuxIbR6woNlToqUCx?s=cl&p=a&mlu=4&ilr=4&iam=2";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision & Values", href: "#values" },
  { label: "Events", href: "#events" },
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
      <div className="bg-yellow-500 py-10 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0F2557] mb-2">
          Ready to Join the Impact?
        </h2>
        <p className="text-[#0F2557]/85 mb-5 max-w-lg mx-auto text-sm md:text-base">
          Together we are Renewed Minds International, and God shall be glorified in us.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={WHATSAPP_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-2.5 rounded text-sm transition-colors"
          >
            Join WhatsApp Community
          </a>
          <a
            href="mailto:feedbackrmi39@gmail.com"
            className="inline-block bg-[#0F2557] hover:bg-[#0A1A42] text-white font-medium px-6 py-2.5 rounded text-sm transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-yellow-400">
                <Image
                  src="/logo/logo.jpeg"
                  alt="RMI Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-semibold text-white text-sm leading-tight">
                  Renewed Minds
                </p>
                <p className="text-yellow-400 text-xs">International</p>
              </div>
            </div>
            <p className="text-blue-200/70 text-sm leading-relaxed mb-3">
              Also known as Impact Team. We exist to ignite revival, birth purpose,
              and release kingdom impact in young lives.
            </p>
            <p className="text-sm text-yellow-400/90 italic">
              &ldquo;God, Glorified in Me&rdquo; — Galatians 1:24
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-200/70 hover:text-yellow-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm">
              Ministry Arms
            </h4>
            <ul className="space-y-2">
              {ministryArms.map((arm) => (
                <li key={arm} className="flex items-start gap-2 text-blue-200/70 text-sm">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  {arm}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:feedbackrmi39@gmail.com" className="flex items-start gap-2.5 group">
                <Mail size={15} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200/70 group-hover:text-yellow-400 break-all">
                  feedbackrmi39@gmail.com
                </span>
              </a>
              <a href="tel:+2348102672966" className="flex items-start gap-2.5 group">
                <Phone size={15} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200/70 group-hover:text-yellow-400">
                  +234 810 267 2966
                </span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200/70">
                  Federal University Wukari
                  <br />
                  Taraba State, Nigeria
                </span>
              </div>
              <a
                href={WHATSAPP_COMMUNITY}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group"
              >
                <span className="text-sm mt-0.5" aria-hidden>
                  💬
                </span>
                <span className="text-[#25D366] group-hover:text-[#6ee7a0] font-medium">
                  Join WhatsApp Community
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200/50">
          <p>
            © {new Date().getFullYear()} Renewed Minds International. All rights reserved.
          </p>
          <p>Built for Kingdom Impact</p>
        </div>
      </div>
    </footer>
  );
}

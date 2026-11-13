import { Target, Eye, Users, Flame, BookOpen, Globe } from "lucide-react";

const channels = [
  {
    icon: BookOpen,
    title: "Preaching & Teaching",
    desc: "The Word of God goes forth with clarity and power. Matt 5:1-2, Acts 5:42",
  },
  {
    icon: Flame,
    title: "Evangelistic Outreaches",
    desc: "Taking the Gospel to schools, communities, and the lost. Mark 16:15, John 20:21",
  },
  {
    icon: Globe,
    title: "Ministry of the Holy Spirit",
    desc: "Signs, wonders, and divine manifestations accompany the Word. Mark 16:20, Acts 5:12",
  },
  {
    icon: Users,
    title: "Seminars & Workshops",
    desc: "Equipping young people with knowledge, skill, and spiritual depth.",
  },
  {
    icon: Target,
    title: "Empowerment Programs",
    desc: "Leadership Confluence, Youths on Fire Night, Everyday Revival Prayer (8 to 9pm)",
  },
  {
    icon: Eye,
    title: "Collaborations & Partnerships",
    desc: "Building bridges with churches, institutions, and kingdom-minded organisations.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#0F2557]/70 mb-2">Who we are</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2557] mb-4">
            About Renewed Minds International
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A Kingdom organization with a God-given mandate to build, inspire,
            and positively influence young minds to know Jesus and impact their
            world for good.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="bg-[#0F2557] rounded-lg p-7 text-white">
            <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center mb-4">
              <Eye size={20} className="text-[#0F2557]" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Our Vision</h3>
            <p className="text-blue-100 leading-relaxed">
              To build, inspire and positively influence young minds to know
              Jesus and impact their world for good.
            </p>
          </div>

          <div className="bg-yellow-500 rounded-lg p-7 text-[#0F2557]">
            <div className="w-10 h-10 bg-white/30 rounded flex items-center justify-center mb-4">
              <Users size={20} className="text-[#0F2557]" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-3">Our Focus</h3>
            <p className="mb-4 leading-relaxed">
              We speak to everyone, but we intentionally focus on:
            </p>
            <ul className="space-y-2">
              <li className="bg-white/25 rounded px-4 py-2.5 font-medium">
                Teenagers (13 to 19 years)
              </li>
              <li className="bg-white/25 rounded px-4 py-2.5 font-medium">
                Young Adults (18 to 25 years)
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-heading font-bold text-[#0F2557]">
            How We Fulfill the Vision
          </h3>
          <p className="text-gray-500 mt-1 text-sm">
            Six channels of intentional kingdom work
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {channels.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-[#0F2557]/5 rounded flex items-center justify-center mb-3">
                <item.icon size={18} className="text-[#0F2557]" />
              </div>
              <h4 className="font-heading font-semibold text-[#0F2557] mb-1.5">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

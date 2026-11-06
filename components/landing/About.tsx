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
    desc: "Building bridges with churches, institutions, and kingdom minded organisations.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0F2557] mb-6">
            About Renewed Minds
            <br />
            <span className="text-yellow-500">International</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A Kingdom organization with a God given mandate to build, inspire,
            and positively influence young minds to know Jesus and impact their
            world for good.
          </p>
        </div>

        {/* Two-column: Vision + Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-[#0F2557] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-5">
                <Eye size={24} className="text-[#0F2557]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg italic">
                "To Build, Inspire and Positively influence young minds to know
                Jesus and impact their world for good."
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div
            className="rounded-3xl p-8 text-white relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            }}
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">
                Our Focus
              </h3>
              <p className="text-yellow-50 mb-5 leading-relaxed">
                We speak to everyone, but we intentionally focus on:
              </p>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-xl px-5 py-3 font-semibold text-lg">
                  Teenagers (13 to 19 years)
                </div>
                <div className="bg-white/20 rounded-xl px-5 py-3 font-semibold text-lg">
                  Young Adults (18 to 25 years)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How We Fulfill the Vision */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#0F2557]">
            How We Fulfill the Vision
          </h3>
          <p className="text-gray-500 mt-2">
            Six channels of intentional kingdom work
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-[#0F2557] rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                <item.icon
                  size={22}
                  className="text-[#0F2557] group-hover:text-yellow-400 transition-colors duration-300"
                />
              </div>
              <h4 className="font-heading font-semibold text-[#0F2557] mb-2 text-lg">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

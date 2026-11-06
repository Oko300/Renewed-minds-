import {
  Flame,
  Star,
  HeartHandshake,
  Shield,
  Sparkles,
  TrendingUp,
  Users2,
} from "lucide-react";

const coreValues = [
  {
    icon: Flame,
    title: "Passion for Souls",
    desc: "We live to make Jesus known. Soul winning is our heartbeat.",
    bg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: Star,
    title: "Commitment to Prayer",
    desc: "We birth change through consistent, strategic intercession.",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    icon: HeartHandshake,
    title: "Love & Honor",
    desc: "We value people and treat everyone with dignity and respect.",
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    icon: Shield,
    title: "Integrity & Authenticity",
    desc: "We are genuine, trustworthy, and transparent in all we do.",
    bg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    desc: "We give our very best in everything we do for God's glory.",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    desc: "We pursue development spiritually, mentally, and practically.",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    icon: Users2,
    title: "Unity",
    desc: "We walk together in oneness of heart, purpose, and spirit.",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const teamTraits = [
  "Kingdom Oriented",
  "Purpose Driven",
  "Impact Driven",
  "Believes in No Impossibility",
  "Unstoppable",
  "Loyal and Committed",
  "Bound by Love and Unity",
  "Committed to Prayer and Fasting",
  "Word Based",
  "Spirit Filled",
  "Values and Respects One Another",
  "Committed to Growth",
  "Knowledge Seeking",
  "Global and Eternal Thinking",
  "Real and Authentic",
  "Purpose Maximizing",
];

export default function Values() {
  return (
    <section id="values" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Vision & Values
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0F2557] mb-6">
            Our Core <span className="text-yellow-500">Values</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are not just principles. They are the DNA of who we are as a team.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
          {coreValues.map((val, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${val.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <val.icon size={22} className={val.iconColor} />
              </div>
              <h4 className="font-heading font-bold text-[#0F2557] mb-2">
                {val.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* What Kind of Team Are We */}
        <div className="bg-[#0F2557] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-heading font-bold text-white mb-3">
              What Kind of Team Are We?
            </h3>
            <p className="text-blue-200/70">
              16 defining characteristics of the Renewed Minds Impact Team
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {teamTraits.map((trait, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-xl px-4 py-3 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-[#0F2557] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-white text-sm font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

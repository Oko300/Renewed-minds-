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
  },
  {
    icon: Star,
    title: "Commitment to Prayer",
    desc: "We birth change through consistent, strategic intercession.",
  },
  {
    icon: HeartHandshake,
    title: "Love & Honor",
    desc: "We value people and treat everyone with dignity and respect.",
  },
  {
    icon: Shield,
    title: "Integrity & Authenticity",
    desc: "We are genuine, trustworthy, and transparent in all we do.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    desc: "We give our very best in everything we do for God's glory.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    desc: "We pursue development spiritually, mentally, and practically.",
  },
  {
    icon: Users2,
    title: "Unity",
    desc: "We walk together in oneness of heart, purpose, and spirit.",
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
    <section id="values" className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-yellow-700 mb-2">Vision & values</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2557] mb-3">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            These are not just principles. They are the DNA of who we are as a team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {coreValues.map((val, i) => (
            <div
              key={i}
              className="border border-gray-150 rounded-lg p-5 bg-white"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="w-9 h-9 bg-[#0F2557]/5 rounded flex items-center justify-center mb-3">
                <val.icon size={18} className="text-[#0F2557]" />
              </div>
              <h4 className="font-heading font-semibold text-[#0F2557] mb-1.5 text-sm">
                {val.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0F2557] rounded-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              What Kind of Team Are We?
            </h3>
            <p className="text-blue-200/80 text-sm">
              Defining characteristics of the Renewed Minds Impact Team
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {teamTraits.map((trait, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 rounded px-3 py-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-yellow-400 text-[#0F2557] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-white text-sm">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

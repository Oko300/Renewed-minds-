"use client";

import { useEffect, useState } from "react";
import { Download, FileText, ExternalLink, Loader2, Music } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  filename: string;
  fileUrl: string;        // Supabase Storage public URL
  uploadedAt: string;
}

interface SpotifyItem {
  id: string;
  title: string;
  description: string;
  url: string;
  embedUrl: string;
}

interface ContentData {
  resources: Resource[];
  spotify: SpotifyItem[];
}

export default function Resources() {
  const [content, setContent] = useState<ContentData>({ resources: [], spotify: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── PDF Resources ────────────────────────────────── */}
      <section id="resources" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Resources & Media
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0F2557] mb-5">
              Download <span className="text-yellow-500">Resources</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our orientation documents, vision guides, and kingdom
              materials — free for every member and partner.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={32} className="animate-spin text-[#0F2557]" />
            </div>
          ) : content.resources.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-30" />
              <p>No resources available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.resources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-to-r from-[#0F2557] to-blue-600" />
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F2557] transition-colors duration-300">
                        <FileText size={22} className="text-[#0F2557] group-hover:text-yellow-400 transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-[#0F2557] mb-1 leading-tight">{res.title}</h3>
                        <p className="text-xs text-gray-400">
                          {new Date(res.uploadedAt).toLocaleDateString("en-NG", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{res.description}</p>
                    {res.fileUrl ? (
                      <a
                        href={res.fileUrl}
                        download={res.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#0F2557] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-sm hover:shadow-md"
                      >
                        <Download size={16} />
                        Download PDF
                      </a>
                    ) : (
                      <div className="text-center text-gray-400 text-xs py-3">File unavailable</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Spotify Streams ──────────────────────────────── */}
      <section id="spotify" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-green-600 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Listen & Stream
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0F2557] mb-5">
              Spotify <span className="text-yellow-500">Streams</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Listen to our messages, teachings, and inspirational content wherever you are.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={32} className="animate-spin text-[#0F2557]" />
            </div>
          ) : content.spotify.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Music size={48} className="mx-auto mb-4 opacity-30" />
              <p>No streams available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {content.spotify.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Music size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-[#0F2557] text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md"
                      >
                        <ExternalLink size={15} />
                        Listen on Spotify
                      </a>
                    )}
                  </div>
                  {item.embedUrl && (
                    <div className="mt-5">
                      <iframe
                        src={item.embedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <Music size={18} />
              Open Spotify
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

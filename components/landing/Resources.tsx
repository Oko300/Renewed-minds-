"use client";

import { useEffect, useState } from "react";
import { Download, FileText, ExternalLink, Loader2, Music } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  filename: string;
  file_url: string;
  uploaded_at: string;
}

interface SpotifyItem {
  id: string;
  title: string;
  description: string;
  url: string;
  embed_url: string;
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
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <section id="resources" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[#0F2557]/70 mb-2">Resources & media</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2557] mb-3">
              Download Resources
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Orientation documents, vision guides, and kingdom materials — free for members and partners.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={26} className="animate-spin text-[#0F2557]" />
            </div>
          ) : content.resources.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-lg">
              <FileText size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No resources available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.resources.map((res) => (
                <div
                  key={res.id}
                  className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden"
                >
                  <div className="h-1 bg-[#0F2557]" />
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#0F2557]/5 rounded flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-[#0F2557]" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0F2557] leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(res.uploaded_at).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    {res.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {res.description}
                      </p>
                    )}
                    <a
                      href={res.file_url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#0F2557] hover:bg-[#0A1A42] text-white font-medium py-2.5 px-4 rounded text-sm transition-colors"
                    >
                      <Download size={15} />
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="spotify" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-green-700 mb-2">Listen & stream</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2557] mb-3">
              Spotify Streams
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Messages, teachings, and inspirational content — wherever you are.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={26} className="animate-spin text-[#0F2557]" />
            </div>
          ) : content.spotify.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-lg bg-white">
              <Music size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No streams available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {content.spotify.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-lg p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-11 h-11 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                      <Music size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-[#0F2557]">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mt-0.5">{item.description}</p>
                      )}
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors"
                      >
                        <ExternalLink size={14} />
                        Listen on Spotify
                      </a>
                    )}
                  </div>
                  {item.embed_url && (
                    <div className="mt-4">
                      <iframe
                        src={item.embed_url}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded"
                        title={item.title}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded text-sm transition-colors"
            >
              <Music size={16} />
              Open Spotify
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

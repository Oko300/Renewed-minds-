"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Loader2 } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  logo_url: string;
  created_at?: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data.events ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="events" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-[#0F2557]/70 mb-2">Coming up</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0F2557] mb-3">
            Events
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            Gatherings, outreaches, and moments where we build, inspire, and influence together.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={26} className="animate-spin text-[#0F2557]" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-lg bg-white">
            <Calendar size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No events posted yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <article
                key={event.id}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col shadow-sm"
              >
                {event.logo_url ? (
                  <div className="relative w-full h-40 bg-gray-100">
                    <Image
                      src={event.logo_url}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-24 bg-[#0F2557]/5 flex items-center justify-center">
                    <Calendar size={24} className="text-[#0F2557]/35" />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-heading font-semibold text-[#0F2557] mb-2 leading-snug">
                    {event.title}
                  </h3>
                  {(event.event_date || event.location) && (
                    <div className="space-y-1 mb-2 text-sm text-gray-600">
                      {event.event_date && (
                        <p className="flex items-center gap-2">
                          <Calendar size={13} className="text-yellow-600 flex-shrink-0" />
                          {event.event_date}
                        </p>
                      )}
                      {event.location && (
                        <p className="flex items-center gap-2">
                          <MapPin size={13} className="text-yellow-600 flex-shrink-0" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

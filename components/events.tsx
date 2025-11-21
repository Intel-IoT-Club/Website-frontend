"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Ticket,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const hoverVariants: Variants = {
  hover: {
    y: -8,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

interface Event {
  image: string;
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type?: string;
  attendees?: number;
  status?: "upcoming" | "past" | "ongoing";
}

export default function Events({
  initialEvents = [],
}: {
  initialEvents?: Event[];
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents || []);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Decide once whether we need to fetch from API
  const shouldFetchOnClient = useMemo(
    () => !initialEvents || initialEvents.length === 0,
    [initialEvents]
  );

  const [loading, setLoading] = useState(shouldFetchOnClient);

  useEffect(() => {
    // If we already have events from the server, don't fetch
    if (!shouldFetchOnClient) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        // ⚠️ Make sure this matches your backend route, often `/api/events`
        const res = await api.get("/events");
        if (!cancelled) {
          setEvents(res.data || []);
        }
      } catch (err) {
        console.error("Error loading events:", err);
        if (!cancelled) {
          setError("Failed to load events.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, [shouldFetchOnClient]);

  const eventTypes = ["upcoming", "past", "workshop", "competition"];

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      activeFilter === "all" || event.type === activeFilter;

    const matchesSearch = event.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const EventCard = ({ event, index }: { event: Event; index: number }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <motion.div variants={hoverVariants} className="h-full">
        <Card className="group flex flex-col h-full overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 bg-card/80 backdrop-blur-md rounded-2xl hover:-translate-y-1 relative">
          {event.status && (
            <div
              className={`absolute top-4 right-4 z-10 flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${
                event.status === "upcoming"
                  ? "bg-blue-500/10 text-blue-500"
                  : event.status === "ongoing"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-gray-500/10 text-gray-500"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  event.status === "upcoming"
                    ? "bg-blue-500"
                    : event.status === "ongoing"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              ></div>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </div>
          )}

          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/20">
            <motion.div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src={event.image}
                alt={event.name + " poster"}
                className="max-h-full max-w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                }}
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

            {event.type && (
              <div className="absolute top-4 left-4 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur">
                {event.type}
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
              {event.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <CalendarDays className="h-4 w-4 text-blue-500" />
              <span>{event.date}</span>
            </div>
          </CardHeader>

          <CardContent className="pb-4 flex-grow">
            <p className="text-foreground/80 text-sm mb-4 line-clamp-3 group-hover:text-foreground transition-colors">
              {event.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 text-pink-500" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              {event.attendees && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 text-green-500" />
                  <span>{event.attendees} attending</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id="events"
      className="relative py-20 bg-gradient-to-b from-background to-muted/50 rounded-xl overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> Upcoming Experiences
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Club Events
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us for immersive workshops, competitions, and guest talks that
            expand your IoT horizons.
          </p>
        </motion.div>

        {/*  Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground shadow-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Events
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === type
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setActiveFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Event Grid / States */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">
                Loading exciting events...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : filteredEvents.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id || `event-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-6">
              <Ticket className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {activeFilter === "all"
                ? "Check back soon for upcoming events!"
                : `No ${activeFilter} events scheduled yet.`}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

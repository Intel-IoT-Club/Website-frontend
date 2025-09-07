
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import { CalendarDays, Clock, MapPin, Users, Sparkles, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const hoverVariants: Variants = {
  hover: {
    y: -8,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export default function Events({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState<any[]>(initialEvents || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (!initialEvents || initialEvents.length === 0) {
      setLoading(true);
      api.get("/events")
        .then((res) => { setEvents(res.data); setLoading(false); })
        .catch(() => { setError("Failed to load events."); setLoading(false); });
    }
  }, [initialEvents]);

  const eventTypes = ["upcoming", "past", "workshop", "competition"];
  const filteredEvents = activeFilter === "all" ? events : events.filter(event => event.type === activeFilter);

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

  const EventCard = ({ event, index }: { event: Event; index: number }) => (
    <motion.div variants={itemVariants} whileHover="hover">
      <motion.div variants={hoverVariants} className="h-full">
        <Card className="group flex flex-col h-full overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 bg-card/80 backdrop-blur-md rounded-2xl hover:-translate-y-1 relative">
          {/* Event content goes here... */}
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="events" className="relative py-20 bg-gradient-to-b from-background to-muted/50 rounded-xl overflow-hidden">
      <div className="container relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16 text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> Upcoming Experiences
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Club Events
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us for immersive workshops, competitions, and guest talks that expand your IoT horizons.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function Events({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState<any[]>(initialEvents || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!initialEvents || initialEvents.length === 0) {
      setLoading(true)
      api.get("/events")
        .then(res => {
          setEvents(res.data)
          setLoading(false)
        })
        .catch(() => {
          setError("Failed to load events.")
          setLoading(false)
        })
    }
  }, [initialEvents])

  interface Event {
    image: string
    id: number
    name: string
    date: string
    time: string
    location: string
    description: string
  }

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="group flex flex-col sm:flex-row overflow-hidden border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-0.5 bg-background/80 backdrop-blur-md">
      <div className="h-96 w-full sm:w-[28rem] flex-shrink-0 overflow-hidden flex items-center justify-center p-6">
        <img
          src={event.image}
          alt={event.name + ' poster'}
          className="object-contain h-full w-full max-w-full max-h-full"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <CardHeader className="flex flex-col gap-2 items-start p-6 pb-2">
          <CardTitle className="text-xl font-semibold mb-1">{event.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-base text-muted-foreground">
            <CalendarDays className="h-5 w-5" /> {event.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-base p-6 pt-0">
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-5 w-5" />
            {event.time}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-5 w-5" />
            {event.location}
          </div>
          <p className="text-foreground mt-2">{event.description}</p>
        </CardContent>
      </div>
    </Card>
  )

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-background to-muted rounded-lg">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Club Events
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            Join us for immersive workshops, competitions, and guest talks.
          </p>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="flex flex-col gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

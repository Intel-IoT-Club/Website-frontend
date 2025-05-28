"use client"

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
    <Card className="group overflow-hidden border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-0.5 bg-background/80 backdrop-blur-md">
      <CardHeader className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="h-40 w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <img
            src={event.image}
            alt={event.name + " poster"}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full">
          <CardTitle className="text-lg font-semibold mb-1">{event.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" /> {event.date}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          {event.time}
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          {event.location}
        </div>
        <p className="text-foreground mt-2">{event.description}</p>
      </CardContent>
    </Card>
  )

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-background to-muted">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

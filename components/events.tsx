
import React from "react";

export default function Events() {
  return (
    <section className="container mx-auto py-12">
      <h2 className="section-title neon-glow">Events</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example event card */}
        <article className="card">
          <h3 className="text-lg font-semibold neon-glow">Hackathon Sprint</h3>
          <p className="text-sm text-gray-300 mt-2">
            48-hour build challenge — prototypes, prizes, and mentorship.
          </p>
          <div className="mt-4">
            <a className="text-sm underline hover:text-white" href="#">
              Read more
            </a>
          </div>
        </article>

        {/* Duplicate as placeholder */}
        <article className="card">
          <h3 className="text-lg font-semibold neon-glow">Weekly Workshop</h3>
          <p className="text-sm text-gray-300 mt-2">
            Hands-on sessions: sensors, microcontrollers, and ML on edge.
          </p>
          <div className="mt-4">
            <a className="text-sm underline hover:text-white" href="#">
              Details
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

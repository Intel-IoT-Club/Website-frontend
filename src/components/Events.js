import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your backend
    axios
      .get("http://localhost:5001/api/events") // replace with your backend URL
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section style={{ padding: "80px 20px", background: "#f7f9fc" }}>
      <h2 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "50px" }}>
        Upcoming Events
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px"
      }}>
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card" style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              padding: "20px",
              width: "300px",
              textAlign: "center",
              transition: "transform 0.3s",
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h3 style={{ fontSize: "1.5em", marginBottom: "10px" }}>{event.title}</h3>
              <p style={{ fontSize: "1em", marginBottom: "15px" }}>{event.description}</p>
              <span style={{ fontWeight: "bold", color: "#4facfe" }}>{event.date}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Events;

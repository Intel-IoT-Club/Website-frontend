// app/page.tsx
import Hero from "../components/hero"; // relative import
import Projects from "../components/projects";
import Events from "../components/events";
import Contact from "../components/contact";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-8">
      {/* Hero Section */}
      <Hero />  

      {/* Optional sections below */}
      
      <Events />
      <Contact />
    </main>
  );
}

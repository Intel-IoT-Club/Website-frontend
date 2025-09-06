import Hero from "@/components/Hero";
import Events from "@/components/Events";

// Fetch data on the server and pass as props
export default async function Home() {
  return (
    <main className="flex-1 pb-16 lg:pb-20 xl:pb-24">
      <Hero />
      <Events />
    </main>
  );
}

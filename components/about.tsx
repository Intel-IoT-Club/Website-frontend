import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, Target, Lightbulb, Handshake } from "lucide-react"

export default function About() {
  const goals = [
    {
      id: "item-1",
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Hands-on Learning",
      content:
        "We emphasize experiential learning through real projects, coding sessions, and rapid prototyping workshops.",
    },
    {
      id: "item-2",
      icon: <Handshake className="h-5 w-5 text-primary" />,
      title: "Industry Collaboration",
      content:
        "We partner with Intel and other top tech leaders to offer mentorship, guidance, and real-world IoT challenges.",
    },
    {
      id: "item-3",
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
      title: "Innovation",
      content:
        "We foster a creative environment to brainstorm, build, and test cutting-edge IoT solutions.",
    },
    {
      id: "item-4",
      icon: <Target className="h-5 w-5 text-primary" />,
      title: "Community",
      content:
        "We aim to build a tight-knit community of IoT enthusiasts who collaborate, learn, and grow together.",
    },
  ]

  const stats = [
    { label: "Active Members", value: "100+" },
    { label: "Workshops Conducted", value: "15+" },
    { label: "Projects Built", value: "30+" },
    { label: "Industry Partners", value: "5+" },
  ]

  return (
    <section id="about" className=" bg-gradient-to-b from-background to-muted py-20 rounded-lg">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">About the Intel IoT Club</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            We are a student-led initiative passionate about bridging the physical and digital worlds through Intel’s IoT technology.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl border bg-muted p-6 shadow-sm">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Our History</CardTitle>
              <CardDescription>What drives us</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                The Intel IoT Club at Amrita Vishwa Vidyapeetham is a hub for students passionate about the Internet of Things (IoT) and Artificial Intelligence (AI).<br />
                It's an AI/ML and IoT-based club started way back in Feb 2022 by Deepak Sai Pendyala, who was an Ex-applied scientist intern at Amazon and also a Pi and AI Ambassador.
                <br /><br />
                He started this club to identify and support students who are passionate about working with developer communities. We believe that innovation is at the forefront of academia and forming effective and creative solutions for real-world problems lies in collaboration and knowledge-sharing through an interdisciplinary approach.
                <br /><br />
                We have different wings under our club like AIoT, IoRT, IoT and Technical Support. We also have Dr. Anbazhagan Mahadevan and Dr. Anantha Narayanan V, who constantly support us and provide us with necessary assistance in conducting various events.
                <br /><br />
                That's why we're offering a variety of Events, workshops, industrial training and resources that enable students to deepen their skills and get familiarised with the latest hardware and software solutions provided by Intel.
                </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>Where we’re headed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
Our IoT track in particular is designed to provide students with hands-on experience and help them to develop impactful projects. Small examples of impactful sessions conducted by the Intel IoT club include the Wokwi Simulator Webinar, building an entire game server with RasPi, IoT competitions using Raspberry Pi, building a smart home with Raspberry Pi, Intel oneAPI workshop etc.
<br /><br />
We not only have hands-on sessions but also various quizzes to promote competitive spirit and collaborative learning. We've conducted major events like the Intel AI Hackathon, as a part of Anokha 2024 in Partnership with Intel Corporation.
<br /><br />
We are also conducting a project development and research initiative named “Partner in Project 101”. This event allows for brainstorming innovative ideas to be heard and perfected by members of the Intel IoT Club. You'll also learn to develop solutions that can solve real-life issues. Whether it's your semester projects or a personal project - we will always have your back. And if it can make the best out of other projects - you will also get to present it in Amrita Coimbatore Campus' Tech Fest: Anokha.              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Our Core Pillars</h3>
          <Accordion type="single" collapsible className="w-full">
            {goals.map((goal) => (
              <AccordionItem key={goal.id} value={goal.id}>
                <AccordionTrigger className="flex items-center gap-3 [&>svg:first-child]:rotate-0 [&>svg:first-child]:transition-none">
                  <span className="flex items-center">{goal.icon}</span>
                  <span>{goal.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{goal.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-20 text-center">
          <h4 className="text-2xl font-semibold mb-4">Want to get involved?</h4>
          <p className="mb-6 text-muted-foreground max-w-xl mx-auto">
            Whether you're a beginner or an expert, there's a place for you at Intel IoT Club. Join our community and start building the future.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-white font-medium transition hover:bg-primary/90"
          >
            Join the Club
          </a>
        </div>
      </div>
    </section>
  )
}

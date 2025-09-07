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
import { Handshake, Lightbulb, Target, Users, ChevronRight, Calendar, Award, Code2, Cpu } from "lucide-react"

export default function About() {
  const goals = [
    {
      id: "item-1",
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Hands-on Learning",
      content:
        "We emphasize experiential learning through real projects, coding sessions, and rapid prototyping workshops.",
    },
    {
      id: "item-2",
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "Industry Collaboration",
      content:
        "We partner with Intel and other top tech leaders to offer mentorship, guidance, and real-world IoT challenges.",
    },
    {
      id: "item-3",
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Innovation",
      content:
        "We foster a creative environment to brainstorm, build, and test cutting-edge IoT solutions.",
    },
    {
      id: "item-4",
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Community",
      content:
        "We aim to build a tight-knit community of IoT enthusiasts who collaborate, learn, and grow together.",
    },
  ]

  const stats = [
    { label: "Active Members", value: "100+", icon: <Users className="h-5 w-5" /> },
    { label: "Workshops Conducted", value: "15+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Projects Built", value: "30+", icon: <Code2 className="h-5 w-5" /> },
    { label: "Industry Partners", value: "5+", icon: <Award className="h-5 w-5" /> },
  ]

  const achievements = [
    {
      title: "Intel AI Hackathon 2024",
      description: "Hosted as part of Anokha 2024 in partnership with Intel Corporation"
    },
    {
      title: "Partner in Project 101",
      description: "Project development and research initiative for innovative ideas"
    },
    {
      title: "Wokwi Simulator Webinar",
      description: "Hands-on session on IoT simulation"
    },
    {
      title: "oneAPI Workshop",
      description: "Intel technology training for cross-architecture development"
    }
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 rounded-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-primary/5 -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Cpu className="h-4 w-4 mr-2" /> Internet of Things Community
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            About the Intel IoT Club
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            We are a student-led initiative passionate about bridging the physical and digital worlds through Intel's IoT technology.
          </p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 opacity-20">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* History and Vision cards */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm overflow-hidden group">
            <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Our History
              </CardTitle>
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

          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm overflow-hidden group">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                Our Vision
              </CardTitle>
              <CardDescription>Where we're headed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our IoT track in particular is designed to provide students with hands-on experience and help them to develop impactful projects. Small examples of impactful sessions conducted by the Intel IoT club include the Wokwi Simulator Webinar, building an entire game server with RasPi, IoT competitions using Raspberry Pi, building a smart home with Raspberry Pi, Intel oneAPI workshop etc.
                <br /><br />
                We not only have hands-on sessions but also various quizzes to promote competitive spirit and collaborative learning. We've conducted major events like the Intel AI Hackathon, as a part of Anokha 2024 in Partnership with Intel Corporation.
                <br /><br />
                We are also conducting a project development and research initiative named "Partner in Project 101". This event allows for brainstorming innovative ideas to be heard and perfected by members of the Intel IoT Club. You'll also learn to develop solutions that can solve real-life issues. Whether it's your semester projects or a personal project - we will always have your back. And if it can make the best out of other projects - you will also get to present it in Amrita Coimbatore Campus' Tech Fest: Anokha.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            Key Achievements
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start p-4 rounded-lg border bg-muted/50">
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core pillars */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary" />
            Our Core Pillars
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {goals.map((goal) => (
              <AccordionItem 
                key={goal.id} 
                value={goal.id}
                className="px-4 py-2 rounded-lg mb-2 border data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="flex items-center gap-3 py-4 [&>svg:last-child]:text-primary [&>svg:first-child]:rotate-0 [&>svg:first-child]:transition-none hover:no-underline">
                  <span className="flex items-center p-2 rounded-md bg-primary/10">{goal.icon}</span>
                  <span className="text-left font-semibold">{goal.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-14 pb-4 text-muted-foreground">
                  {goal.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA section */}
        <div className="mt-20 text-center relative">
          <div className="absolute -inset-8 bg-primary/5 rounded-3xl -z-10"></div>
          <h4 className="text-2xl font-semibold mb-4">Ready to build the future with us?</h4>
          <p className="mb-6 text-muted-foreground max-w-xl mx-auto">
            Whether you're a beginner or an expert, there's a place for you at Intel IoT Club. Join our community and start building the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-white font-medium transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              Join the Club
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
            <a
              href="/events"
              className="inline-flex items-center rounded-full border border-primary/20 bg-background px-6 py-3 font-medium transition-all hover:bg-primary/5 hover:shadow-md"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
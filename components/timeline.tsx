'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';

const timelineData = [
  {
    title: 'Openvino Training Session',
    date: '7 FEB 2022',
    description:
      "Intel IoT Club’s first industrial training session on Intel DevCloud and Intel OpenVINO toolkit. Sandeep Rajakrishnan (ML Lead) addressed the development and deployment of deep learning models. Deepak Sai (Head) demonstrated a 'Safety Detection' project, highlighting the benefits of OpenVINO to optimize AI models and test their performance on Intel DevCloud.",
    image: '/timeline/event_1.png',
    firstEventOfBatch: true,
  },
  {
    title: 'Blog-a-thon',
    date: '23 June 2022',
    description:
      'A technical blog competition on AI, ML, Deep Learning, and IoT with entries exceeding 800 words. Out of 30 contenders, 5 emerged victorious providing an excellent platform for students to showcase their writing and technical knowledge in AI and IoT.',
    image: '/timeline/event_2.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Breaking into AI',
    date: '21 MAY 2022',
    description:
      "The Intel IoT Club conducted its first offline event, 'Pie & AI - Amrita: Breaking into AI' with over 500 registrations and 300 attendees. Sessions covered AI, machine learning, and IoT use cases by speakers Deepak (Head), Prem Sundar (AI Lead), Mohan (IoT Lead), and Dr. Anbazhagan (Faculty Coordinator).",
    image: '/timeline/event_3.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Breaking into AIoT',
    date: '15 NOV 2022',
    description:
      'The seminar focused on IoT, AR, ML, and Intel technologies, attracting 600 registrations and over 400 attendees. Mr. Navaneeth Malingan (Founder, Nunnari Labs) shared insights on open source, competitive programming, and entrepreneurship.',
    image: '/timeline/event_4.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Edge AI and HATs of Raspberry Pi',
    date: '15 MAR 2023',
    description:
      'A webinar covering Edge AI and Raspberry Pi HATs, conducted by Mohan V (IoT Team Lead) and Deepak Sai (Head), discussed the benefits of Intel oneAPI and Edge AI applications.',
    image: '/timeline/event_5.png',
    firstEventOfBatch: false,
  },
  {
    title: "IoT Workshop - 'Build your smart home'",
    date: '23 APR 2023',
    description:
      'An IoT workshop where 7 smart home devices were built using Raspberry Pi 3 and Grove Pi kit. Mohan V and Yash Puthalath led the sessions with 50 attendees participating.',
    image: '/timeline/event_6.png',
    firstEventOfBatch: false,
  },
  {
    title: 'IoT Competition',
    date: '19 AUG 2023',
    description:
      'IoT competition led by Mohan V featured projects based on grove pi kit. 20 applications were submitted; winning projects included a coal mine evacuation system and smart agriculture monitoring system.',
    image: '/timeline/event_7.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Intel IoT Club Induction - 2nd Batch',
    date: '2 FEB 2024',
    description:
      'Second induction event with 40 new members. Srinithi (IoT Lead) and Balasuriya (AI/ML Lead) discussed IoT/AI trends. Live demo of entry count system was showcased to 200 attendees.',
    image: '/timeline/event_8.png',
    firstEventOfBatch: true,
  },
  {
    title: 'PiCraft: Build a Game Server with Raspberry PI',
    date: '28 FEB 2024',
    description:
      'An IoT workshop on building a game server with Raspberry Pi was conducted by Dr. Anantha Narayanan and Mohan V. The new IoT team members presented the workshop using Raspberry Pi 3 and grove pi kit. With 60 attendees, the basics of IoT, Raspberry Pi and grove pi kit was taught and a game server was built using Raspberry Pi.',
    image: '/timeline/event_9.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Intel oneAPI Workshop',
    date: '15 MAR 2024',
    description:
      'An Intel oneAPI workshop was conducted with 70 attendees exploring different applications of Intel oneAPI. The Intel oneAPI student ambassadors Balasuriya and Navabharati along with Dilip (PML Engineer at Sivi) presented real-world insights. Participants gained complete understanding of Intel oneAPI along with Intel DevCloud.',
    image: '/timeline/event_10.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Wokwi Simulator: Hands-on Webinar',
    date: '19 MAY 2024',
    description:
      'The Wokwi Simulator Hands-on Webinar had 90 participants who were introduced to Arduino, Raspberry Pi Pico, and ESP32 simulation via hands-on projects. Mangal (Co-head) and the IoT team explored 10 home automation IoT simulations with cloud platform integration.',
    image: '/timeline/event_11.png',
    firstEventOfBatch: false,
  },
  {
    title: 'IoT Simulation Webinar',
    date: '21 JUL 2024',
    description:
      'Part of ESP2LIFE hackathon ideation phase, this webinar had 120 hackathon and non-hackathon participants. Mangal (Head) and Jaidev (IoT Team Lead) showcased IoT project integration using platforms like Thingsspeak, Adafruit, NodeRed for functional IoT simulations.',
    image: '/timeline/event_12.png',
    firstEventOfBatch: true,
  },
  {
    title: 'ESP2THINK: ESP32 AIoT Workshop',
    date: '27 JUL 2024',
    description:
      'The AIoT workshop with 50 participants is a first-of-its-kind event to teach AI and IoT into an application. Ananth (AIoT Team Lead) and AIoT team members demonstrated how to set up and use the ESP32 and MPU-6050 Accelerometer sensor with Edge Impulse for data collection, model training, and deployment in machine learning applications.',
    image: '/timeline/event_13.png',
    firstEventOfBatch: false,
  },
  {
    title: 'ESP2AR: ESP32 AR with IoT Workshop',
    date: '6 AUG 2024',
    description:
      'This AR with IoT workshop guided the 50 participants through the process of gathering sensor data from an IoT platform and displaying it in augmented reality with Unity Engine and BLYNK cloud platform. Jaidev (IoT Team Lead) and IoT Team members explained controlling devices and monitoring data using AR interfaces and ESP32 controllers.',
    image: '/timeline/event_14.png',
    firstEventOfBatch: false,
  },
  {
    title: 'ESP2SYNC: ESP32 Communication Workshop',
    date: '13 AUG 2024',
    description:
      'The ESP32 communication workshop had 30 participants who were introduced about the communication between ESP32 controller using Cloud Platforms Adafruit, ESPNOW protocol, Wi-Fi Communication. Gurukarthi and Gurukumar (IoT team member) presented a mini project on controlling speed of two wheeled robots controlled by communication between ESP32 controller.',
    image: '/timeline/event_15.png',
    firstEventOfBatch: false,
  },
  {
    title: 'ESP2LIFE Hackathon',
    date: '15 MAR 2024',
    description:
      'ESP2LIFE Hackathon is an IoT product hackathon with 50 teams from various colleges explored different applications of ESP32 boards. 4 workshops were conducted in ideation phase including Wokwi simulation, AIoT, AR with IoT, Communication protocols. Top 2 products were awarded and the rest showcased at Anokha Tech Fair.',
    image: '/timeline/event_16.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Edge Fusion Showdown: An ESP32 AIoT Competition',
    date: '18 OCT 2024',
    description:
      'The Artificial Intelligence of Things made into reality by deploying 1D and 2D ML models into edge places with ESP32 microcontroller. With 20 teams in Anokha (National level Techfest) tech competition, models were deployed into ESP32 and ESP32-CAM boards using Edge Impulse platform. For Top 2 applications, prize money was awarded.',
    image: '/timeline/event_17.png',
    firstEventOfBatch: false,
  },
  {
    title: 'Intel IoT Club Induction',
    date: '25 OCT 2024',
    description:
      'New Club head Mangal conducted the 3rd Intel IoT club induction event for the new academic year 2024-2025 with 3rd batch – new 60 members of the club. Jaidev (IoT Lead), Ananth (AIoT Lead), Thomas (IoT Lead) presented on trends of IoT, AI, and Robotics. A Face capture based Entry count system demo impressed 100+ attendees.',
    image: '/timeline/event_18.png',
    firstEventOfBatch: false,
  },
]

function useInViewAnimation(ref: React.RefObject<HTMLDivElement | null>) {
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return controls;
}


export default function Timeline() {
  let batchCount = 0;

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>

      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 z-0" />

        <div className="space-y-40 w-full max-w-6xl">
          {timelineData.map((event, idx) => {
            const isEven = idx % 2 === 0;
            const ref = useRef<HTMLDivElement>(null);
            const controls = useInViewAnimation(ref);

            let batchLabel = '';
            if (event.firstEventOfBatch) {
              batchCount += 1;
              if (batchCount === 1) batchLabel = '1st Batch';
              else if (batchCount === 2) batchLabel = '2nd Batch';
              else if (batchCount === 3) batchLabel = '3rd Batch';
              else batchLabel = `${batchCount}th Batch`;
            }

            return (
              <div key={idx} ref={ref} className="relative">
                {event.firstEventOfBatch && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-green-600 text-white px-4 py-1 rounded-full shadow-lg text-sm font-semibold">
                      {batchLabel}
                    </div>
                  </div>
                )}

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 top-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold shadow-md">
                    {idx + 1}
                  </div>
                </div>

                {/* MOBILE VIEW */}
                <div className="block md:hidden pt-24 px-2">
                  <motion.div
                    className={`flex flex-row items-start gap-3 w-full ${
                      idx % 2 === 1 ? 'flex-row-reverse' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, transition: { duration: 0.8 } },
                      hidden: { opacity: 0 },
                    }}
                  >
                    <div className="w-1/2">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={160}
                        height={100}
                        className="rounded-md shadow-md w-full h-auto"
                      />
                    </div>
                    <div className="w-1/2 relative pt-4 px-2">
                      {/* Blue line with end circle */}
                     <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded mb-2">
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-blue-500 ${
                          idx % 2 === 1 ? 'left-0' : 'right-0'
                        }`}
                      />
                    </div>
                      <div className="pt-2">
                        <h3 className="text-sm font-bold">{event.title}</h3>
                        <p className="text-blue-600 font-medium text-xs">{event.date}</p>
                        <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden md:flex relative flex-col md:flex-row items-center md:items-start min-h-[300px]">
                  <div className="w-full md:w-1/2 px-6 flex justify-center md:justify-end relative">
                    {!isEven ? (
                      <motion.div
                        className="relative text-right md:pr-12 max-w-md pt-10"
                        initial={{ x: -50, opacity: 0 }}
                        animate={controls}
                        variants={{
                          visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                          hidden: { x: -50, opacity: 0 },
                        }}
                      >
                        <div className="hidden md:block absolute top-5 right-[-2.5rem] h-[3px] w-[calc(100%+2.5rem)] bg-blue-400 rounded">
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-blue-500" />
                        </div>
                        <div className="pt-6">
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-blue-600 font-semibold">{event.date}</p>
                          <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">{event.description}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={controls}
                        variants={{
                          visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                          hidden: { x: 0, opacity: 0 },
                        }}
                        className="pt-10"
                      >
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={250}
                          className="rounded-md shadow-md"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-6 flex justify-center md:justify-start relative">
                    {isEven ? (
                      <motion.div
                        className="relative text-left md:pl-12 max-w-md pt-10"
                        initial={{ x: 50, opacity: 0 }}
                        animate={controls}
                        variants={{
                          visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                          hidden: { x: 50, opacity: 0 },
                        }}
                      >
                        <div className="hidden md:block absolute top-5 left-[-2.5rem] h-[3px] w-[calc(100%+2.5rem)] bg-blue-400 rounded">
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-blue-500" />
                        </div>
                        <div className="pt-6">
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-blue-600 font-semibold">{event.date}</p>
                          <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">{event.description}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        animate={controls}
                        variants={{
                          visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                          hidden: { x: 0, opacity: 0 },
                        }}
                        className="pt-10"
                      >
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={250}
                          className="rounded-md shadow-md"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

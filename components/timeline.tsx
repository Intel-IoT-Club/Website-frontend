'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

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
    firstEventOfBatch: true,
  },
  {
    title: 'Breaking into AI',
    date: '21 MAY 2022',
    description:
      "The Intel IoT Club conducted its first offline event, 'Pie & AI - Amrita: Breaking into AI' with over 500 registrations and 300 attendees. Sessions covered AI, machine learning, and IoT use cases by speakers Deepak (Head), Prem Sundar (AI Lead), Mohan (IoT Lead), and Dr. Anbazhagan (Faculty Coordinator).",
    image: '/timeline/event_3.png',
    firstEventOfBatch: true,
  },
  {
    title: 'Breaking into AIoT',
    date: '15 NOV 2022',
    description:
      'The seminar focused on IoT, AR, ML, and Intel technologies, attracting 600 registrations and over 400 attendees. Mr. Navaneeth Malingan (Founder, Nunnari Labs) shared insights on open source, competitive programming, and entrepreneurship.',
    image: '/timeline/event_4.png',
    firstEventOfBatch: true,
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
];

function useInViewAnimation(ref: React.RefObject<HTMLElement>) {
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [ref, controls]);

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
            const ref = useRef(null);
            const controls = useInViewAnimation(ref);
            const initialX = isEven ? -50 : 50;

            let batchLabel = '';
            if (event.firstEventOfBatch) {
              batchCount += 1;
              batchLabel = `${batchCount}st Batch`;
              if (batchCount === 2) batchLabel = '2nd Batch';
              else if (batchCount === 3) batchLabel = '3rd Batch';
              else if (batchCount > 3) batchLabel = `${batchCount}th Batch`;
            }

            return (
              <div
                key={idx}
                ref={ref}
                className="relative flex flex-col md:flex-row items-center md:items-start min-h-[300px]"
              >
                {event.firstEventOfBatch && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-green-600 text-white px-4 py-1 rounded-full shadow-lg text-sm font-semibold">
                      {batchLabel}
                    </div>
                  </div>
                )}

                <div className="w-full md:w-1/2 px-6 flex justify-center md:justify-end relative">
                  {!isEven ? (
                    <motion.div
                      className="relative text-right md:pr-12 max-w-md pt-10"
                      initial={{ x: initialX, opacity: 0 }}
                      animate={controls}
                      variants={{
                        visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                        hidden: { x: initialX, opacity: 0 },
                      }}
                    >
                      <div className="hidden md:block absolute top-5 right-[-2.5rem] h-[3px] w-[calc(100%+2.5rem)] bg-blue-400 rounded" />
                      <div className="pt-6">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="text-blue-600 font-semibold">{event.date}</p>
                        <p className="mt-2 text-gray-700 whitespace-pre-line">{event.description}</p>
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

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 top-0">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold shadow-md">
                    {idx + 1}
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-6 flex justify-center md:justify-start relative">
                  {isEven ? (
                    <motion.div
                      className="relative text-left md:pl-12 max-w-md pt-10"
                      initial={{ x: initialX, opacity: 0 }}
                      animate={controls}
                      variants={{
                        visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
                        hidden: { x: initialX, opacity: 0 },
                      }}
                    >
                      <div className="hidden md:block absolute top-5 left-[-2.5rem] h-[3px] w-[calc(100%+2.5rem)] bg-blue-400 rounded" />
                      <div className="pt-6">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="text-blue-600 font-semibold">{event.date}</p>
                        <p className="mt-2 text-gray-700 whitespace-pre-line">{event.description}</p>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

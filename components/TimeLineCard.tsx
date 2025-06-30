'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useInViewAnimation from '../hooks/use-inview';

type TimelineEvent = {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  isFirst: boolean;
};

type Props = {
  event: TimelineEvent;
  idx: number;
  batchLabel?: string;
};

export default function TimelineCard({ event, idx, batchLabel }: Props) {
  const isEven = idx % 2 === 0;
  const { ref, controls } = useInViewAnimation();

  return (
    <div ref={ref} className="relative">
      {event.isFirst && (
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
          className={`flex flex-row items-start gap-3 w-full ${!isEven ? 'flex-row-reverse' : ''}`}
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
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded mb-2">
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-blue-500 ${
                  !isEven ? 'left-0' : 'right-0'
                }`}
              />
            </div>
            <div className="pt-2">
              <h3 className="text-sm font-bold">{event.title}</h3>
              <p className="text-blue-600 font-medium text-xs">
                {new Date(event.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="mt-1 text-gray-700 text-xs whitespace-pre-line">
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
                <p className="text-blue-600 font-semibold">
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
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
                <p className="text-blue-600 font-semibold">
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="mt-2 text-muted-foreground whitespace-pre-line">{event.description}</p>
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
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Hotel, Home, Utensils, Bus, Mic, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const bookingSlides = [
  {
    id: "hotel",
    title: "Hotel Information",
    subtitle: "Included Hotels, Motels & Lodges",
    description: "Book premium and budget-friendly hotels near Vitthal temple for a comfortable spiritual stay.",
    cta: "Book a Hotel",
    link: "/pandharpur-bookings/hotels",
    image: "/hotel-booking.png",
    icon: "hotel",
    gradient: "from-blue-900/80 via-blue-800/60 to-transparent",
    accent: "#3b82f6",
    badge: "Stay",
  },
  {
    id: "bhaktniwas",
    title: "Bhaktaniwas",
    subtitle: "Affordable Pilgrim Accommodations",
    description: "Traditional pilgrim rest houses offering peaceful, devotional environments at affordable rates.",
    cta: "Book Bhaktaniwas",
    link: "/pandharpur-bookings/bhaktaniwas",
    image: "/bhaktaniwas-booking.png",
    icon: "home",
    gradient: "from-orange-900/80 via-orange-700/60 to-transparent",
    accent: "#f97316",
    badge: "Accommodation",
  },
  {
    id: "restaurant",
    title: "Restaurant",
    subtitle: "Prasad & Maharashtrian Cuisine",
    description: "Savor authentic Maharashtrian thali, pure vegetarian prasad and traditional temple food.",
    cta: "Find Restaurants",
    link: "/pandharpur-bookings/restaurants",
    image: "/restaurant-prasad.png",
    icon: "utensils",
    gradient: "from-green-900/80 via-green-800/60 to-transparent",
    accent: "#22c55e",
    badge: "Dining",
  },
  {
    id: "travel",
    title: "Travel",
    subtitle: "Buses & Taxis to Pandharpur",
    description: "Reliable transport options — buses, shared taxis and private vehicles for your sacred journey.",
    cta: "Book Travel",
    link: "/pandharpur-bookings/travel",
    image: "/travel-pandharpur.png",
    icon: "bus",
    gradient: "from-purple-900/80 via-purple-800/60 to-transparent",
    accent: "#a855f7",
    badge: "Transport",
  },
  {
    id: "kirtankars",
    title: "Kirtankars",
    subtitle: "Sacred Tradition of Kirtan",
    description: "Invite revered kirtankars to your home or event and experience the divine power of devotional singing.",
    cta: "Invite Kirtankars",
    link: "/pandharpur-bookings/kirtankars",
    image: "/kirtankar-pandharpur.png",
    icon: "mic",
    gradient: "from-rose-900/80 via-rose-800/60 to-transparent",
    accent: "#f43f5e",
    badge: "Spiritual",
  },
];

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const ICONS = {
  hotel: Hotel,
  home: Home,
  utensils: Utensils,
  bus: Bus,
  mic: Mic,
};

export default function BookingSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const total = bookingSlides.length;

  const goTo = useCallback(
    (idx, dir) => {
      setDirection(dir);
      setCurrent(((idx % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => next(), 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  const slide = bookingSlides[current];
  const IconComponent = ICONS[slide.icon];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main slider container */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority={current === 0}
            />

            {/* Gradient overlay */}
            <div className={"absolute inset-0 bg-gradient-to-r " + slide.gradient} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              {/* Badge */}
              <motion.div
                custom={0}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="mb-3"
              >
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm border border-white/30"
                  style={{ background: slide.accent + "55" }}
                >
                  <IconComponent className="h-3.5 w-3.5" style={{ color: slide.accent }} />
                  {slide.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-lg"
              >
                {slide.title}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-sm sm:text-base font-medium mt-1 drop-shadow"
                style={{ color: slide.accent }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                custom={3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-white/80 text-xs sm:text-sm mt-2 max-w-md line-clamp-2 drop-shadow"
              >
                {slide.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="mt-4">
                <Link href={slide.link}>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-200 cursor-pointer"
                    style={{ background: slide.accent }}
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators + progress bar */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {bookingSlides.map((s, i) => (
          <button
            key={s.id}
            aria-label={"Go to slide " + (i + 1)}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="relative h-2 rounded-full transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              width: i === current ? "36px" : "8px",
              background: i === current ? slide.accent : "#d1d5db",
            }}
          >
            {i === current && !paused && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.5)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                key={"progress-" + current}
              />
            )}
          </button>
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-4 justify-center">
        {bookingSlides.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-14 w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer"
            style={{
              borderColor: i === current ? slide.accent : "transparent",
              opacity: i === current ? 1 : 0.55,
            }}
            aria-label={"Select " + s.title}
          >
            <Image src={s.image} alt={s.title} fill className="object-cover" sizes="80px" />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-1">
              <span className="text-white text-[9px] font-semibold text-center leading-tight px-1">
                {s.title.split(" ")[0]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

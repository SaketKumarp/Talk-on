"use client";

import { motion } from "motion/react";

const avatars = [
  {
    emoji: "🩵",
    color: "bg-teal-200",
    delay: 0,
  },
  {
    emoji: "🩷",
    color: "bg-pink-200",
    delay: 1.2,
  },
  {
    emoji: "💛",
    color: "bg-amber-200",
    delay: 2.4,
  },
];

export default function CuteAvatars() {
  return (
    <div className="flex items-center justify-center gap-8 py-10">
      {avatars.map((avatar, index) => (
        <motion.div
          key={avatar.emoji}
          className={`relative flex h-24 w-24 items-center justify-center rounded-[2rem] ${avatar.color} text-5xl shadow-lg`}
          animate={{
            y: [0, -10, 0, -4, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3,
            delay: avatar.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.15,
            rotate: index % 2 === 0 ? 10 : -10,
          }}
        >
          {avatar.emoji}

          {/* Blinking eyes */}
          <motion.div
            className="absolute left-7 top-9 h-2 w-2 rounded-full bg-slate-700"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{
              duration: 3,
              delay: avatar.delay + 1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          <motion.div
            className="absolute right-7 top-9 h-2 w-2 rounded-full bg-slate-700"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{
              duration: 3,
              delay: avatar.delay + 1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* Little smile */}
          <div className="absolute bottom-7 h-2 w-4 rounded-b-full border-b-2 border-slate-700" />
        </motion.div>
      ))}
    </div>
  );
}

"use client";
import { motion } from "motion/react";
import { EncryptedText } from "./ui/EncryptedText";
import { Scene3D } from "./ui/Scene3d";
import { MusicPlayer } from "./ui/MusicPlayer";

export default function Hero() {
  return (
    <>
      {/* Music Player - Fixed position */}
      <MusicPlayer />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex min-h-screen min-w-screen flex-col justify-center items-center px-4 relative shadow-2xl shadow-purple-200 inset-shadow-xs inset-shadow-purple-300"
      >
        {/* 3D Model Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D modelPath="/models/cloud_station.glb" />
        </div>

        {/* Text Content - Overlaid on 3D */}
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="mx-auto max-w-lg py-10">
            <EncryptedText
              text="Quack! Im Nori."
              encryptedClassName="text-neutral-300 text-3xl md:text-4xl font-bold"
              revealedClassName="dark:text-white text-white text-3xl md:text-5xl font-bold"
              revealDelayMs={100}
            />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-neutral-200 dark:text-neutral-400 text-lg md:text-xl mt-4"
          >
            Developer • Producer • Creator
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}
"use client";

import { motion } from "motion/react"

import { EncryptedText } from "./ui/EncryptedText";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex min-h-screen min-w-screen max-w-4xl flex-10 justify-center items-center text-center px-4"
    >
      <h1 className="mx-auto max-w-lg py-10 text-left">
        <EncryptedText
          text="Hi! Im Nori."
          encryptedClassName="text-neutral-500 text-4xl"
          revealedClassName="dark:text-white text-black text-4xl"
          revealDelayMs={100}
        />
      </h1>
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "./ParticlesBackground";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="flex flex-col items-center">
      <ParticlesBackground />

      {/* Animated Title with Typing Effect */}
      <div className="flex flex-col items-center text-center gap-12 bg-opacity-50 text-white p-20">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-violet-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TypeAnimation
            sequence={[
              "Trade Smarter.", 1500,
              "Trade Cross-Chain.", 1500,
              "Automate Portfolio Rebalancing.", 1500,
              "Optimize Your Investments.", 1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-3xl font-semibold text-white tracking-wide leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          IntenX leverages AI-driven market analysis to provide automated, real-time portfolio rebalancing across multiple blockchains.
          Powered by <span className="text-violet-400 font-bold">NEAR Intents</span> and <span className="text-violet-400 font-bold">Bitte.ai</span>, we offer a seamless cross-chain trading experience
          with intelligent decision-making, ensuring your investments are optimized at all times without the need for manual intervention.
        </motion.p>

        {/* Call to Action Button*/}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button className="bg-violet-600 hover:bg-violet-700 text-white px-16 py-8 text-2xl rounded-full shadow-lg font-semibold">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react"
import { motion } from "framer-motion"

export default function OnboardingScreen1() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>Welcome to</span>
        <h1 className="mb-0 text-primary">VRBTM</h1>

        <p>
          {
            "We've created this platform with love to help students memorize their studies. Our user-friendly features are designed to support you on your academic journey. We hope our app will be a valuable asset to you."
          }
        </p>
      </motion.div>
    </>
  )
}

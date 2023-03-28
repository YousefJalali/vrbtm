import React from "react"
import { motion } from "framer-motion"

export default function OnboardingScreen3() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="m-0 mb-2">Have fun</h3>
        <p>
          {`We hope that our platform provides you with a fun and engaging way to improve your memorizing skills. Whether you're here to challenge yourself with our difficulty settings, experiment with different writing styles, or simply have fun with language, we're excited to have you on board. Thanks for joining us, and we hope you enjoy using our platform!`}
        </p>
      </motion.div>
    </>
  )
}

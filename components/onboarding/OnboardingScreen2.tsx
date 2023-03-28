import React from "react"
import { motion } from "framer-motion"
import ReactPlayer from "react-player"

export default function OnboardingScreen2() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex w-full flex-col items-start"
      >
        <h3 className="m-0 mb-2">Get started</h3>
        <p className="text-left">
          {`To get started, simply type or paste your text into the editor. If you're looking for an extra challenge, try setting the difficulty level and clicking the `}
          <strong>Random Omit</strong>
          {` button to omit words randomly from your text. You can also manually select and omit specific words by highlighting them and clicking the `}
          <strong>Omit</strong>{" "}
          {`button. And if you want to save your text for later, no problem! Just click the `}
          <strong>Add to Notebook</strong>
          {` button to store it for future reference. Let's get started!`}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ReactPlayer
          url="https://streamable.com/jyyb2r"
          loop
          config={{
            file: {
              attributes: {
                autoPlay: true,
                muted: true,
              },
            },
          }}
        />
      </motion.div>
    </>
  )
}

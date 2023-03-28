import React, { useState } from "react"
import { FaChevronRight } from "react-icons/fa"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Modal from "@/libs/ui/modal/Modal"
import ReactPlayer from "react-player"
import OnboardingScreen1 from "./OnboardingScreen1"
import OnboardingScreen2 from "./OnboardingScreen2"
import OnboardingScreen3 from "./OnboardingScreen3"

export default function Onboarding({
  dismiss,
  isOpen,
}: {
  isOpen: boolean
  dismiss: () => void
}) {
  const [step, setStep] = useState(1)
  return (
    <Modal id="onboarding-modal" dismiss={dismiss} isOpen={isOpen}>
      <div className="prose flex flex-col items-center justify-center text-center">
        {step === 1 && <OnboardingScreen1 />}
        {step === 2 && <OnboardingScreen2 />}
        {step === 3 && <OnboardingScreen3 />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex w-full justify-between"
        >
          <>
            {step < 3 ? (
              <button className="btn-ghost btn" onClick={dismiss}>
                skip
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <button
                  className="btn-outline btn-primary btn"
                  onClick={() => setStep((prevState) => prevState - 1)}
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  className="btn-primary btn"
                  onClick={() => setStep((prevState) => prevState + 1)}
                >
                  Next
                </button>
              ) : (
                <button className="btn-primary btn gap-2" onClick={dismiss}>
                  get started
                  <FaChevronRight />
                </button>
              )}
            </div>
          </>
        </motion.div>
      </div>
    </Modal>
  )
}

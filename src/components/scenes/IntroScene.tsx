"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function IntroScene() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    // Fade out the black and gradually become white to match bg
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <motion.section
            ref={ref}
            style={{ opacity }}
            className="h-screen flex flex-col items-center justify-center   bg-gradient-to-t   /* 방향: 아래→위 (t = top) */
  from-transparent         /* 시작 색 */
  to-black   /* 끝 색 */ relative z-50"
        >
            <div className="text-center font-mono">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-300">Scroll down to explore</h1>
                <div className="mt-8 animate-bounce">
                    <svg
                        className="w-8 h-8 text-gray-400 mx-auto"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </motion.section>
    )
}

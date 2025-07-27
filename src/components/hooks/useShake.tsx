"use client"

import { useAnimation, type MotionValue, useMotionValueEvent } from "framer-motion"

export function useShake(progress: MotionValue<number>, start = 0.25, end = 0.65) {
    const controls = useAnimation()

    useMotionValueEvent(progress, "change", (v) => {
        if (v >= start && v <= end) {
            // More intense shake when boss appears
            const normalizedProgress = (v - start) / (end - start)
            const intensity = Math.sin(normalizedProgress * Math.PI * 12) * (1 - normalizedProgress * 0.2)

            controls.start({
                x: intensity * 4,
                y: intensity * 3,
                rotate: intensity * 1.2,
                transition: {
                    duration: 0.05,
                    ease: "linear",
                },
            })
        } else if (v > end) {
            // Reset to normal position after shake
            controls.start({
                x: 0,
                y: 0,
                rotate: 0,
                transition: { duration: 0.4 },
            })
        }
    })

    return controls
}

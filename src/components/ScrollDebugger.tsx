"use client"

import { motion, type MotionValue } from "framer-motion"

interface ScrollDebuggerProps {
    scrollYProgress: MotionValue<number>
}

export function ScrollDebugger({ scrollYProgress }: ScrollDebuggerProps) {
    return (
        <motion.div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded-lg z-[9999] font-mono text-xs pointer-events-none">
            <div className="flex items-center gap-2">
                <span>Progress:</span>
                <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-400" style={{ width: `${scrollYProgress.get() * 100}%` }} />
                </div>
                <motion.span className="font-bold">{scrollYProgress}</motion.span>
            </div>
        </motion.div>
    )
}

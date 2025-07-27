"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import ruinsBG   from "../../assets/ruins.png"
import leftRing  from "../../assets/left_circle.png"
import rightRing from "../../assets/right_circle.png"
import feather   from "../../assets/feather.png"

/* ✨ 글로우 볼: x 좌표·지연·속도만 지정 */
const LIGHT_MOTES = [
    { size: 100, initialX: "-35vw", delay: 0,  duration: 20 },
    { size: 150, initialX: "15vw",  delay: 4,  duration: 24 },
    { size:  80, initialX: "60vw",  delay: 8,  duration: 18 },
    { size:  45, initialX: "-15vw", delay: 10, duration: 26 },
    { size:  190, initialX: "95vw",  delay: 14, duration: 22 },
    { size:  60, initialX: "82vw",  delay: 14, duration: 22 },
    { size:  80, initialX: "39vw",  delay: 14, duration: 22 },
    { size:  70, initialX: "105vw",  delay: 14, duration: 22 },
]

/* 🪶 깃털 그대로 */
const FLOATING_FEATHERS = [
    { size: 70, initialX: "5vw",  delay: 0,  duration: 20, rotate: [-15, 15] },
    { size: 90, initialX: "25vw", delay: 5,  duration: 25, rotate: [-10, 10] },
    { size: 60, initialX: "45vw", delay: 8,  duration: 18, rotate: [-20, 20, -5] },
    { size: 80, initialX: "65vw", delay: 3,  duration: 22, rotate: [15, -15] },
    { size: 50, initialX: "85vw", delay: 12, duration: 30, rotate: [10, -5, 10] },
]

export default function RuinsFinale() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

    /* ── 공통 모션 값 ── */
    const whiteFade  = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const bgScale    = useTransform(scrollYProgress, [0, 1], [1.2, 1])
    const bgBright   = useTransform(scrollYProgress, [0, 1], [0.7, 1.15])
    const bgFilter   = useTransform(bgBright, v => `brightness(${v})`)
    const titleOp    = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])
    const spacingRaw = useTransform(scrollYProgress, [0.2, 0.4], [80, -2])
    const spacingStr = useTransform(spacingRaw, v => `${v}px`)
    const ringOp     = useTransform(scrollYProgress, [0.15, 0.4], [0, 0.7])
    const ringScale  = useTransform(scrollYProgress, [0.4, 1], [0.8, 1.3])
    const ringRotL   = useTransform(scrollYProgress, [0.4, 1], [0, -30])
    const ringRotR   = useTransform(scrollYProgress, [0.4, 1], [0,  30])
    const vignetteOp = useTransform(scrollYProgress, [0.1, 0.7], [0, 1])
    const titleGlow  = useTransform(scrollYProgress, [0.1, 0.7], [0, 30])
    const titleGlowStr = useTransform(titleGlow, (v) => `0 0 ${v}px rgba(255, 255, 253, 0.7)`)

    return (
        <section ref={ref} className="h-[1500vh] relative bg-black">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* 배경 */}
                <motion.img
                    src={ruinsBG}
                    alt="ruins"
                    style={{ scale: bgScale, filter: bgFilter }}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* 링 */}
                <motion.img
                    src={leftRing}
                    style={{ opacity: ringOp, scale: ringScale, rotate: ringRotL }}
                    className="absolute -left-[30vw] -top-[30vh] w-[130vw] z-10 pointer-events-none"
                />
                <motion.img
                    src={rightRing}
                    style={{ opacity: ringOp, scale: ringScale, rotate: ringRotR }}
                    className="absolute -right-[30vw] -bottom-[30vh] w-[130vw] z-10 pointer-events-none"
                />

                {/* ✨ 글로우 볼 */}
                {LIGHT_MOTES.map(({ size, initialX, delay, duration }, i) => (
                    <motion.div
                        key={`mote-${i}`}
                        style={{ opacity: titleOp }}
                        className="absolute z-20 pointer-events-none"
                        initial={{ y: "110vh", x: initialX }}
                        animate={{ y: "-20vh", x: `calc(${initialX} - 5vw)` }}
                        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
                    >
                        <div
                            style={{ width: size, height: size }}
                            className="rounded-full bg-white/10 shadow-[0_0_20px_8px_rgba(255,255,253,0.6),_inset_0_0_30px_4px_rgba(255,255,253,0.9)]"
                        />
                    </motion.div>
                ))}

                {/* RUINS 타이틀 */}
                <motion.h1
                    style={{ opacity: titleOp, textShadow: titleGlowStr, letterSpacing: spacingStr, fontFamily: '"Inria Serif", serif' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     text-[#FFFDFD] text-[20vw] leading-none select-none z-30"
                >
                    RUINS
                </motion.h1>

                {/* 🪶 깃털 */}
                {FLOATING_FEATHERS.map(({ size, initialX, delay, duration, rotate }, i) => (
                    <motion.div
                        key={`feather-${i}`}
                        style={{ opacity: vignetteOp }}
                        className="absolute z-40 pointer-events-none"
                        initial={{ y: "110vh", x: initialX }}
                        animate={{ y: "-20vh", x: `calc(${initialX} - 5vw)`, rotate }}
                        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
                    >
                        <motion.img src={feather} alt="feather" style={{ width: size, height: size }} className="opacity-70" />
                    </motion.div>
                ))}

                {/* 비네트 */}
                <motion.div
                    style={{ opacity: vignetteOp }}
                    className="absolute inset-0 shadow-[inset_0_0_150px_60px_black] pointer-events-none z-50"
                />

                {/* 흰 페이드 */}
                <motion.div style={{ opacity: whiteFade }} className="absolute inset-0 bg-white z-60" />
            </div>
        </section>
    )
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* 텍스처 파일 */
import rockTex from "../../assets/rock_tile.png"   // 512×512 정도로 seamless 한 이미지를 추천

export default function FallingScene() {
    const ref = useRef<HTMLDivElement>(null)

    /* 0‑1: 1400vh 스크롤 구간 */
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

    /* 배경 텍스처를 progress × 1000px 만큼 위로 이동 → 무한 루프 효과 */
    const bgPosY = useTransform(scrollYProgress, v => `-${v * 100}px`)

    /* 텍스트 투명도( 서서히 사라지기 등 원하는 대로 ) */
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0])

    const vignetteOpacity = useTransform(scrollYProgress, [0, 0.4,0.9,1], [0, 1,0.8,0])
    const darkness        = useTransform(scrollYProgress, [0,0.999, 1], [0, 1,0])


    return (
        <section
            ref={ref}
            className="h-[1400vh] relative overflow-hidden"
            /* Tailwind 로 직접 스타일 인라인 */
            style={{
                backgroundImage: `url(${rockTex})`,
                backgroundRepeat: "repeat-y",
                backgroundSize: "100% 7%",
                backgroundPositionX: "center",
                backgroundPositionY: 0,   // 초기값
            }}
        >
            <motion.div
                style={{
                    opacity: vignetteOpacity,
                    background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0) 1%, rgba(0,0,0,1) 100%)",
                }}
                className="pointer-events-none fixed inset-0 z-999"
            />

            <motion.div
                style={{ opacity: darkness }}
                className="pointer-events-none fixed inset-0 bg-black z-[998]"
            />
            {/* 배경 위치를 motion.div 로 제어 */}
            <motion.div
                style={{ backgroundPositionY: bgPosY }}
                className="absolute inset-0"
            />

            {/* 텍스트 — 화면 중앙 고정 */}
            <motion.h1
                style={{ opacity: textOpacity }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   font-mono text-4xl md:text-6xl font-bold text-white pointer-events-none"
            >
                Fall.
            </motion.h1>
        </section>
    )
}

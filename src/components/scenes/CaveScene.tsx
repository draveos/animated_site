"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import cave from "../../assets/cave.png"   // ⚠️ 경로 확인

export default function CaveScene() {
    /* ───────── basic setup ───────── */
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    /* 1) 초반 암흑 → 0.9 ▶︎ 0 (0 ~ 0.35) */
    const darkness = useTransform(scrollYProgress, [0, 0.35], [0.9, 0])

    /* 2) 카메라 줌‑인 & 전진 */
    const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1.1, 6])
    const posY  = useTransform(scrollYProgress, [0, 1], ["8%", "0%"])
    const posX  = useTransform(scrollYProgress, [0, 0.3, 1], ["0px","0px", "-200px"])

    /* 3) 동굴 밝기 0.4 → 1.2  (완전 까만 0 말고 살짝 보이는 0.4 시작) */
    const brightNum = useTransform(scrollYProgress, [0, 1], [0.4, 1.2])
    const brightStr = useTransform(brightNum, v => `brightness(${v})`)

    /* 4) 바깥 빛: 0.55 → 1 (화이트 레이어) */
    const sunLayer = useTransform(scrollYProgress, [0.55, 1], [0, 1])

    return (
        <section ref={ref} className="h-[2500vh] relative bg-black">
            {/* STICKY WRAPPER → 화면 하나 크기의 ‘가상 뷰포트’ */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* ── (1) 어둠 오버레이 ── */}
                <motion.div
                    style={{ opacity: darkness }}
                    className="absolute inset-0 bg-black pointer-events-none z-30"
                />

                {/* ── (2) 동굴 이미지 (줌‑인 & y 이동 & 밝기) ── */}
                <motion.img
                    src={cave}
                    alt="cave"
                    style={{ scale, y: posY, x: posX, filter: brightStr }}
                    className="absolute inset-0 left-[-50px] w-full h-full object-cover object-center z-20"
                />

                {/* ── (3) 바깥 햇빛 레이어 ── */}
                <motion.div
                    style={{ opacity: sunLayer }}
                    className="absolute inset-0 bg-white mix-blend-screen pointer-events-none z-25"
                />

                {/* ── (4) 눈꺼풀(흰색) : ‘깜빡임’이 필요 없는 경우 opacity 0 고정 ── */}
                {/* <motion.div style={{ opacity: whiteFade }} className="absolute inset-0 bg-white z-40" /> */}
            </div>
        </section>
    )
}

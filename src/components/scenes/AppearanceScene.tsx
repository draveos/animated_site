"use client"

import { useRef } from "react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion"
import { useShake } from "../hooks/useShake"

/* ------------ 이미지 ------------ */
import bg        from "../../assets/intro/bg.png"
import ground    from "../../assets/intro/ground.png"
import bldLeft   from "../../assets/intro/one building.png"
import bldMid    from "../../assets/intro/third building.png"
import bldRight  from "../../assets/intro/second building.png"
import bodyImg   from "../../assets/intro/boss_comp/boss.png"
import bossOpen  from "../../assets/intro/boss_comp/body.png"
import eyeImg    from "../../assets/intro/boss_comp/eye.png"
import coverImg  from "../../assets/intro/boss_comp/cover.png"
import laserImg  from "../../assets/intro/boss_comp/laser.png"
import waveImg   from "../../assets/intro/boss_comp/wave.png"

export default function AppearanceScene() {
    const ref = useRef<HTMLDivElement>(null)

    /* progress 0‑1 */
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

    /* ───────── 기존 빌딩 이동 ───────── */
    const springLeft   = useSpring(useTransform(scrollYProgress, [0, .1], ["150%", "60%"]), { stiffness:120,damping:20 })
    const springMid    = useSpring(useTransform(scrollYProgress, [0, .1], ["140%", "50%"]), { stiffness:120,damping:22 })
    const springRight  = useSpring(useTransform(scrollYProgress, [0, .1], ["160%", "50%"]), { stiffness:120,damping:21 })
    const springGround = useSpring(useTransform(scrollYProgress, [0, .1], ["180%", "80%"]), { stiffness:120,damping:18 })
    const bgOpacity    = useTransform(scrollYProgress, [0,.78,1], [1,1,0])
    const shakeControls= useShake(scrollYProgress, .16, .3)

    /* ───────── 보스 타임라인 ───────── */
    const bossFadeIn   = useTransform(scrollYProgress, [.20,.25], [0,1])   // 검은 구
    const bossActive   = useTransform(scrollYProgress, [.23,.25], [0,1])   // 붉은 링
    const coverActive  = useTransform(scrollYProgress, [.24,.30], [0,.5])
    const coverSlideX  = useTransform(scrollYProgress, [.4,.50,.65], ["0%","-5%","5%"])
    const coverSlideY  = useTransform(scrollYProgress, [.30,.35], ["0%","5%"])
    const eyeOpacity   = useTransform(scrollYProgress, [.35,.40], [0,.7])
    const eyeSlideX  = useTransform(scrollYProgress, [.4,.50,.65], ["32%","10%","55%"])
    const eyeSlideY  = useTransform(scrollYProgress, [.4,.50,.65], ["-1.5%","-1.5%","-1.5%"])

    /* 발사 순간: opacity + scaleX */
    const laserOpacity = useTransform(scrollYProgress, [.50, .53], [0, 1])
    const laserScaleY  = useTransform(scrollYProgress, [.50, .53], [0, 1])

    /* 스캔: position + rotate */
    const laserMoveX   = useTransform(scrollYProgress, [.53,.54,.55,.56,.57,.58,.59,.60, .61,.65], ["-55%","-45%","-33%","-12%","5%","20%","36%","55%","73%", "135%"])
    const laserMoveY   = useTransform(scrollYProgress, [.53,.54,.55,.56,.57,.58,.59, .63,.65], ["-3%","1%" ,"5%","8%","10%","12%","14%","13%","9%"])
    const laserRotate  = useTransform(scrollYProgress, [.53, .65], [10, -60])

    const waveOpacity  = useTransform(scrollYProgress, [.48,.49,.55], [0,1,0])
    const waveScale    = useTransform(scrollYProgress, [.48,.53], [.3,1.4])

    const flashOpacity = useTransform(scrollYProgress, [.49, .50, .52], [0,  1,   0])

    return (
        <section ref={ref} className="relative h-[2400vh] bg-white">
            {/* Global flash overlay */}
            <motion.div
                style={{ opacity: flashOpacity }}
                className="fixed inset-0 bg-white z-[9999] pointer-events-none"
            />
            {/* 배경 */}
            <motion.img src={bg} style={{ opacity: bgOpacity }}
                        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none" />

            {/* ───────── STICKY SCENE ───────── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

                {/* 빌딩 + 땅 */}
                <motion.div animate={shakeControls} className="absolute inset-0 w-full h-full">
                    <motion.img src={bldLeft}  style={{ y: springLeft  }} className="absolute bottom-[65vh] h-[90%] z-10" />
                    <motion.img src={bldMid}   style={{ y: springMid   }} className="absolute bottom-[30vh] left-[10vw] h-[60%] z-0" />
                    <motion.img src={bldRight} style={{ y: springRight }} className="absolute bottom-[50vh] right-0 h-[75%] z-10" />
                </motion.div>
                <motion.img src={ground} style={{ y: springGround }}
                            className="absolute bottom-[340px] left-0 w-full min-w-[1280px] z-30" />

                {/* ───────── 보스 컴포지트 ───────── */}
                <div className="absolute top-[-40vh] left-1/2 -translate-x-1/2 w-[25vw] h-[60vw] z-40">

                    {/* 몸통(검은) */}
                    <motion.img src={bodyImg} style={{ opacity: bossFadeIn }}
                                className="absolute inset-0 w-full h-full object-contain" />

                    {/* 붉은 링 */}
                    <motion.img src={bossOpen} style={{ opacity: bossActive }}
                                className="absolute inset-0 w-full h-full object-contain" />

                    {/* cover(눈꺼풀) */}
                    <motion.img src={coverImg}
                                style={{ y: coverSlideY, opacity: coverActive, x: coverSlideX}}
                                className="absolute inset-0 w-full h-full object-contain mix-blend-screen" />

                    {/* eye(눈동자) */}
                    <motion.img src={eyeImg}
                                style={{ opacity: eyeOpacity, x: eyeSlideX, y: eyeSlideY, scaleX: laserScaleY }}
                                className="absolute inset-0 translate-x-[55px] translate-y-[-10px] w-[60%] h-[110%] object-contain" />

                    {/* ========== Beam Group ========== */}
                        <motion.div
                            style={{
                                opacity: laserOpacity,
                                x:       laserMoveX,    // 스캔
                                y:       laserMoveY,
                                rotate:  laserRotate,
                                originX: 0.05,
                            }}
                            className="absolute left-[-50%] h-[170%] top-[43%] -translate-x-1/2 -translate-y-1/2
                 h-[120vh] origin-left pointer-events-none"
                        >
                            <img src={laserImg} className="h-full" />
                        </motion.div>
                        {/* 웨이브 */}
                        <motion.img src={waveImg}
                                    style={{ opacity: waveOpacity, scale: waveScale ,rotate: -60}}
                                    className="absolute right-[70px] top-[100px] w-[55vw] h-[55vw]" />
                        <motion.img src={waveImg}
                                    style={{ opacity: waveOpacity, scale: waveScale ,rotate: -60}}
                                    className="absolute right-[115px] top-[300px] w-[55vw] h-[35vw]" />

                </div>
            </div>
        </section>
    )
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function EndingCredits() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    /* 크레딧 등장/퇴장 */
    const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0])
    const y       = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [100, 0, 0, -100])

    return (
        <section ref={ref} className="relative h-[250vh] bg-transparent">

            {/* ── 배경 GIF ── */}
            <div className="sticky top-0 h-screen">
                <img
                    src="gif.gif"
                    alt="Cinematic silhouettes"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 반투명 어두움(고정) */}
                <div className="absolute inset-0 bg-black/70" />

                {/* ── 크레딧 텍스트 ── */}
                <motion.div
                    style={{ opacity, y }}
                    className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
                >
                    <h2 className="font-inria-serif text-5xl md:text-7xl mb-8">The&nbsp;End</h2>
                    <p className="text-2xl md:text-3xl text-gray-300 mb-24">Thank you for watching.</p>

                    <div className="space-y-16">
                        <Credit title="Music"     name='"Van Gogh"' />
                        <Credit title="Composer"  name="Virginio Aiello" />
                        <Credit title="Created with" name="Vite • React • TS • Tailwind" />
                        <Credit title="Inspired by"  name="GIF from HDSounDI" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* 작은 헬퍼 컴포넌트 */
function Credit({ title, name }: { title: string; name: string }) {
    return (
        <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-200">{title}</h3>
            <p className="text-xl text-gray-400">{name}</p>
        </div>
    )
}

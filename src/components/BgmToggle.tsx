"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"   // heroicons/react

export default function BgmToggle() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [on, setOn] = useState(false)

    /* 뮤트 ↔ 언뮤트 토글 */
    const toggle = () => setOn(prev => !prev)

    /* 재생 / 일시정지 */
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        on ? audio.play().catch(() => {}) : audio.pause()
    }, [on])

    return (
        <>
            <audio
                ref={audioRef}
                src="/ruins_theme.mp3"
                loop
                preload="auto"
                className="hidden"
            />

            {/* 둥둥 떠있는 작은 버튼 */}
            <motion.button
                onClick={toggle}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="fixed bottom-6 right-6 z-[100] p-3 rounded-full
                   bg-white/20 backdrop-blur-md hover:bg-white/40
                   text-white shadow-lg"
                aria-label={on ? "배경음악 끄기" : "배경음악 켜기"}
            >
                {on ? <HiVolumeUp size={24} /> : <HiVolumeOff size={24} />}
            </motion.button>
        </>
    )
}

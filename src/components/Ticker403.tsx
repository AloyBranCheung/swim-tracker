import React from 'react'
import { motion, Variants } from 'framer-motion';
// utils
import getRandomIntInclusive from '@/utils/random-number';


export default function Ticker403() {
    const variants = (i: number): Variants => {
        return ({
            initial: {
                x: i % 2 === 0 ? 400 : -400,
            },
            hidden: {
                x: i % 2 === 0 ? -400 : 400,
                transition: {
                    duration: getRandomIntInclusive(10, 20),
                    ease: "linear",
                    repeat: Infinity,
                    delay: i * 0.1
                }
            },
        })
    }

    const tickers = new Array(5).fill(0).map((_, i) => (
        <motion.div
            key={i}
            initial="initial"
            animate="hidden"
            variants={variants(i)}
        >
            <h1
                className="text-5xl text-gray-200 opacity-35 text-center"
            >
                Access Denied
            </h1>
        </motion.div>
    )
    )

    return (
        <div className="w-96 h-80 flex flex-col items-center justify-center gap-2 bg-gray-600 bg-opacity-15 rounded-2xl shadow-2xl p-4 overflow-hidden">
            {tickers}
        </div>


    )
}

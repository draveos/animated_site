module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                subtleShake: {
                    "0%,100%": { transform: "translate3d(0,0,0) rotate(0)" },
                    "20%":      { transform: "translate3d(-2px,-2px,0) rotate(-0.2deg)" },
                    "40%":      { transform: "translate3d(2px,-2px,0)  rotate(0.2deg)" },
                    "60%":      { transform: "translate3d(-2px,2px,0)  rotate(-0.15deg)" },
                    "80%":      { transform: "translate3d(2px,2px,0)   rotate(0.15deg)" },
                },
            },
            animation: {
                subtleShake: "subtleShake 0.25s linear",
            },
        },
    },
    plugins: [],
};

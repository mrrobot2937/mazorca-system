import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
            },
            keyframes: {
                'fade-in': {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
};

export default config; 
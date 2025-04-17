import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        input: "#e5e5e5",
        background: "#ffffff",
        primary: {
          DEFAULT: "#171717",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#e5e5e5",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#f5f5f5",
          foreground: "#171717",
        },
        popover: {
          foreground: "#0a0a0a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0a0a0a",
        },
      },
      
    },
  },
} satisfies Config

export default config

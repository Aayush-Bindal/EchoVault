/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0D0A1C", // #0D0A1C
        light: "#E5E5E5", // #E5E5E5
        purple: "#7B61FF", // #7B61FF
        purpleLight: "#B394FF", // #B394FF
        purpleDark: "#6259E8", // #6259E8
        purpleAccent: "#8A68F0", // #8A68F0
        background: "hsl(var(--background))", // dynamic (from CSS variable)
        foreground: "hsl(var(--foreground))", // dynamic (from CSS variable)
        card: {
          DEFAULT: "hsl(var(--card))", // dynamic
          foreground: "hsl(var(--card-foreground))", // dynamic
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // dynamic
          foreground: "hsl(var(--popover-foreground))", // dynamic
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // dynamic
          foreground: "hsl(var(--primary-foreground))", // dynamic
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // dynamic
          foreground: "hsl(var(--secondary-foreground))", // dynamic
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // dynamic
          foreground: "hsl(var(--muted-foreground))", // dynamic
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // dynamic
          foreground: "hsl(var(--accent-foreground))", // dynamic
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // dynamic
          foreground: "hsl(var(--destructive-foreground))", // dynamic
        },
        border: "hsl(var(--border))", // dynamic
        input: "hsl(var(--input))", // dynamic
        ring: "hsl(var(--ring))", // dynamic
        chart: {
          1: "hsl(var(--chart-1))", // dynamic
          2: "hsl(var(--chart-2))", // dynamic
          3: "hsl(var(--chart-3))", // dynamic
          4: "hsl(var(--chart-4))", // dynamic
          5: "hsl(var(--chart-5))", // dynamic
        },
      },
      backgroundImage: {
        "gradient-button": "linear-gradient(to right, #6259E8, #8A68F0)", // #6259E8 → #8A68F0
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

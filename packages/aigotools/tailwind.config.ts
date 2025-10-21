import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

// Summer theme colors - warm, bright, and cheerful
const SummerLightColors = [
  "#FFF8E1", // Warm cream background
  "#FFF3C4", // Light yellow
  "#FFE082", // Soft yellow
  "#FFD54F", // Medium yellow
  "#FFCA28", // Bright yellow
  "#FFC107", // Amber
  "#FF8F00", // Orange
  "#E65100", // Deep orange
  "#BF360C", // Red-orange
  "#3E2723", // Dark brown
];

// Summer dark theme - sunset inspired
const SummerDarkColors = [
  "#1A1A2E", // Deep navy night
  "#16213E", // Dark blue
  "#0F3460", // Medium blue
  "#533A71", // Purple
  "#6A4C93", // Light purple
  "#FF6B6B", // Coral
  "#FFE66D", // Warm yellow
  "#FF8E53", // Orange
  "#FF6B35", // Red-orange
  "#C7CEEA", // Light lavender
];

function stepColor(colors: string[]) {
  return {
    50: colors[0],
    100: colors[1],
    200: colors[2],
    300: colors[3],
    400: colors[4],
    500: colors[5],
    600: colors[6],
    700: colors[7],
    800: colors[8],
    900: colors[9],
  };
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // dev
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: SummerDarkColors[0],
            foreground: SummerDarkColors[9],
            primary: {
              ...stepColor(SummerDarkColors),
              foreground: SummerDarkColors[0],
              DEFAULT: SummerDarkColors[6],
            },
            divider: {
              DEFAULT: SummerDarkColors[4],
            },
          },
        },
        light: {
          extend: "light",
          colors: {
            background: SummerLightColors[0],
            foreground: SummerLightColors[9],
            primary: {
              ...stepColor(SummerLightColors),
              foreground: SummerLightColors[0],
              DEFAULT: SummerLightColors[6],
            },
            divider: {
              DEFAULT: SummerLightColors[4],
            },
          },
        },
      },
    }),
  ],
};

export default config;

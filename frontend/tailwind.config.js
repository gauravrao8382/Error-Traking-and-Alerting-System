export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d",     // brighter red
        secondary: "#7c3aed",   // rich purple
        accent: "#22d3ee",      // cyan highlight

        dark: "#0b0f19",        // deep background
        darker: "#070a12",      // ultra dark
        card: "#111827",        // card bg

        textMain: "#f9fafb",    // main text
        textSoft: "#9ca3af",    // secondary text
      },
    },
  },
  plugins: [],
};
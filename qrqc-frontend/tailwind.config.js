/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Palette officielle du projet QRQC - SEWS MFZ
      colors: {
        primary: "#074784", // Bleu principal (boutons, titres, accents)
        accent: "#0B96B7", // Bleu-cyan (dégradés, éléments décoratifs)
        sidebar: "#052F57", // Bleu foncé (fond du panneau gauche)
        background: "#F8FAFC", // Fond général de l'application
        "text-main": "#1F2937", // Texte principal
        border: "#E5E7EB", // Bordures des champs / séparateurs
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -10px rgba(7, 71, 132, 0.25)",
      },
    },
  },
  plugins: [],
};
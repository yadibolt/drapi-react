module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,php}"],
  theme: {
    extend: {
      colors: {
        success: "var(--color-success)",
        successAccent: "var(--color-success-accent)",
      },
    },
  },
  plugins: [],
};

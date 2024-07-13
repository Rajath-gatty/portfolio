/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                libre: ['"Libre Baskerville"', "sans-serif"],
                inter: ["Inter", "sans-serif"],
                bricolage: ['"Bricolage Grotesque"', "sans-serif"],
            },
            backgroundImage: {
                "light-green": "url('/src/assests/hero-bg.webp')",
            },
            colors: {
                primary: "#05CD77",
            },
        },
    },
    plugins: [],
};

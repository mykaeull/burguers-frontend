/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brown: {
                    700: "#4F372F", // Exemplo de cor marrom
                },
                blackMenu: "#121212",
            },
            boxShadow: {
                custom: "0px 2px 14px 0px #00000024",
            },
        },
    },
    plugins: [],
};

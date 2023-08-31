/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/main.jsx",
    "./src/App.jsx",
    "./src/componentes/component/Nav.jsx",
    "./src/componentes/component/Footer.jsx",
    "./src/componentes/Home.jsx",
    "./src/componentes/AddBook.jsx",
    "./src/componentes/LogIn.jsx",
    "./src/componentes/Contact.jsx",
    "./src/componentes/Member.jsx",
    "./src/componentes/Profile.jsx",
  ],
  theme: {
    extend: {},
    colors:{
      'whiteTail': 'white',
      'mainColor': '#006c74',
      'secondColor': '#2196f38f',
      "yellowColor" : "#ff9800",
    }
  },
  plugins: [],
}


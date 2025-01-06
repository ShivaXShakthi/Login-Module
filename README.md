# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
"# Login-Module"


creating react js app
---------------------
npm create vite@latest
> type project name
> select react
> select javascript
cd client-user-module
npm install
npm run dev

adding tailwind css
-------------------
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

update the file accordingly add .jsx to tailwind.config.css

clear the app.jsx and add your code

clear app.css

clear index.css and paste below code
@tailwind base;
@tailwind components;
@tailwind utilities;

including react router dom 
--------------------------
npm install react-router-dom

wrap <App /> by <BrowserRouter> in main.jsx


git commands
------------
…or create a new repository on the command line
echo "# Login-Module" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ShivaXShakthi/Login-Module.git
git push -u origin main



…or push an existing repository from the command line
git remote add origin https://github.com/ShivaXShakthi/Login-Module.git
git branch -M main
git push -u origin main



# Repository
This boot project is disponible at: https://github.com/HenriqueTegel/front-end-stack.

# Stack
- [Yarn] (https://yarnpkg.com/)
- [Gulp] (https://gulpjs.com/)
- [SASS] (http://sass-lang.com/)
- [GSAP] (https://greensock.com/)
- [Browsersync] (https://www.browsersync.io/)

# Patterns
- [RSCSS] (http://rscss.io/)
- [ITCSS] (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)

# Starting
On MacOS to install Yarn and packages, run:
  - brew install yarn
  - yarn

On Windows, access this link https://yarnpkg.com/pt-BR/docs/install#windows-tab, and follow the presented steps.

# Development
To start a local server, run:
  - gulp

After that, just open http://localhost:3000 on the browser.

# Deploy
To generate a new dist version, run:
  - gulp build

# How it works
After the initial setup, you will be able to start with the local server, running the "gulp" command that will initiate a local Browsersync server, that will be availible at http://localhost:3000.

Gulp will clean main.css and main.js file and then start to compile all the source (SASS, JS) files on the app/src folder.

Running the "gulp build" command will create a dist folder with all the compiled source, with minified CSS/JS and compressed images. Gulp will also change the references main.css and main.js on the index.html file to main.min.css and main.min.js.
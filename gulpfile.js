const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const fileInclude = require('gulp-file-include');
const groupMedia = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const ttf2woff2 = require('gulp-ttf2woff2');
const pxtorem = require('postcss-pxtorem');
const webpack = require('webpack-stream');

// Общая настройка для plumber + notify (только ошибки, без звука)
const errorHandler = (title) => plumber({
  errorHandler: notify.onError({
    title: `Ошибка в ${title}`,
    message: "<%= error.message %>",
    sound: false,
    wait: true
  })
});

// HTML
function html() {
  return src('./src/html/*.html')
    .pipe(errorHandler('HTML'))
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('./dist'));
}

// SCSS
function styles() {
  const plugins = [
    pxtorem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [/^html$/]
    })
  ];

  return src('./src/scss/*.scss')
    .pipe(errorHandler('SCSS'))
    .pipe(sass().on('error', sass.logError))
    .pipe(groupMedia())
    .pipe(postcss(plugins))
    .pipe(dest('./dist/css'));
}

// JavaScript
function scripts() {
  return src('./src/js/*.js')
    .pipe(errorHandler('JavaScript'))
    .pipe(webpack({ mode: 'development', output: { filename: 'main.js' } }))
    .pipe(dest('./dist/js'));
}

// Изображения
function images() {
  return src('./src/img/**/*')
    .pipe(errorHandler('Images'))
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}

// Шрифты
function fonts() {
  return src('./src/fonts/*.ttf')
    .pipe(errorHandler('Fonts'))
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts'));
}

// Очистка dist
function cleanDist() {
  return src('./dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

// Сервер
function serve() {
  return src('./dist')
    .pipe(server({ livereload: true, open: true, port: 3000 }));
}

// Наблюдение
function watchFiles() {
  watch('./src/html/**/*.html', html);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/img/**/*', images);
  watch('./src/fonts/*.ttf', fonts);
}

// Задачи
exports.default = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts),
  parallel(watchFiles, serve)
);

exports.build = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts)
);
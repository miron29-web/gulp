const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const fileInclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const ttf2woff2 = require('gulp-ttf2woff2');
const pxtorem = require('postcss-pxtorem');
const groupMedia = require('gulp-group-css-media-queries');
const webpack = require('webpack-stream');
const postcssFluid = require('postcss-fluid');
const postcssClamp = require('postcss-clamp');

// HTML обработка
function html() {
  return src('./src/html/*.html')
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('./dist'));
}

// Обработка SCSS + Fluid-типографика
function styles() {
  const plugins = [
    pxtorem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [/^html$/]
    }),
    postcssFluid({
      minWidth: 320,  // Минимальная ширина вьюпорта (px)
      maxWidth: 1920, // Максимальная ширина вьюпорта (px)
      unit: 'px'      // Единицы измерения (по умолчанию 'px')
    }),
    postcssClamp()    // Добавляет поддержку clamp()
  ];

  return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(groupMedia())
    .pipe(postcss(plugins))
    .pipe(dest('./dist/css'));
}

// JavaScript обработка
function scripts() {
  return src('./src/js/*.js')
    .pipe(webpack({ 
      mode: 'development', 
      output: { filename: 'main.js' } 
    }))
    .pipe(dest('./dist/js'));
}

// Оптимизация изображений
function images() {
  return src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}

// Конвертация шрифтов
function fonts() {
  return src('./src/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts'));
}

// Очистка dist
function cleanDist() {
  return src('./dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

// Запуск сервера
function serve() {
  return src('./dist')
    .pipe(server({ 
      livereload: true, 
      open: true, 
      port: 3000 
    }));
}

// Наблюдение за файлами
function watchFiles() {
  watch('./src/html/**/*.html', html);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/img/**/*', images);
  watch('./src/fonts/*.ttf', fonts);
}

// Основные задачи
exports.default = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts),
  parallel(watchFiles, serve)
);

exports.build = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts)
);
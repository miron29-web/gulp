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
const svgSprite = require('gulp-svg-sprite');

// HTML обработка
function html() {
  return src('./src/html/*.html')
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('./dist'));
}

// SCSS стили без fluid/clamp
function styles() {
  const plugins = [
    pxtorem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [/^html$/]
    })
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
  return src('./src/img/**/*', '!./src/img/**/*.svg')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}

// Конвертация шрифтов
function fonts() {
  return src('./src/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts'));
}

// MONO спрайт — удаляем fill, stroke, style
function spriteMono() {
  return src('./src/img/icons/mono/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.',
          sprite: 'sprite-mono.svg'
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: ['fill', 'stroke', 'style']
                  }
                },
                {
                  name: 'removeDimensions',
                  active: true
                },
                {
                  name: 'removeViewBox',
                  active: false
                }
              ]
            }
          }
        ]
      }
    }))
    .pipe(dest('./dist/img/icons/sprites'));
}

// MULTI спрайт — сохраняем стили
function spriteMulti() {
  return src('./src/img/icons/multi/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.',
          sprite: 'sprite-multi.svg'
        }
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  name: 'removeDimensions',
                  active: true
                },
                {
                  name: 'removeViewBox',
                  active: false
                }
              ]
            }
          }
        ]
      }
    }))
    .pipe(dest('./dist/img/icons/sprites'));
}

// Очистка dist
function cleanDist() {
  return src('./dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

// Локальный сервер
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
  watch('./src/img/icons/mono/*.svg', spriteMono);
  watch('./src/img/icons/multi/*.svg', spriteMulti);
}

// Общая задача на оба спрайта
const sprite = parallel(spriteMono, spriteMulti);

// Основные таски
exports.default = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts, sprite),
  parallel(watchFiles, serve)
);

exports.build = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts, sprite)
);

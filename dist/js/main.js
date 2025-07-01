/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/mobile_menu.js":
/*!******************************************!*\
  !*** ./src/js/components/mobile_menu.js ***!
  \******************************************/
/***/ (() => {

eval("\r\nconst burgerBtn = document.querySelector('.header__actions-burger');\r\nconst mobileWindow = document.querySelector('.header__inner-mobile');\r\nconst closeBtn = document.querySelector('.header__close-mobile');\r\n\r\nburgerBtn.addEventListener('click', () => {\r\n  mobileWindow.classList.add('is-active');\r\n});\r\n\r\ncloseBtn.addEventListener('click', () => {\r\n  mobileWindow.classList.remove('is-active');\r\n});\r\n\r\n\n\n//# sourceURL=webpack://gulp-project/./src/js/components/mobile_menu.js?");

/***/ }),

/***/ "./src/js/components/slider.js":
/*!*************************************!*\
  !*** ./src/js/components/slider.js ***!
  \*************************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n  const slidesContainer = document.querySelector('.slider__slides');\r\n  const slides = document.querySelectorAll('.slider__slide-image');\r\n  const controlsContainer = document.querySelector('.slider__controls');\r\n\r\n  let currentIndex = 0;\r\n  const slideCount = slides.length;\r\n  const intervalTime = 10000;\r\n  let interval;\r\n\r\n  slides.forEach((_, index) => {\r\n    const btn = document.createElement('span');\r\n    btn.classList.add('slider__controls-btn');\r\n    if(index === 0) btn.classList.add('is-active');\r\n    btn.dataset.slide = index;\r\n    controlsContainer.appendChild(btn);\r\n  });\r\n\r\n  const controlsBtn = document.querySelectorAll('.slider__controls-btn');\r\n\r\n  function goToSlide(index) {\r\n  const allContents = document.querySelectorAll('.slider__content');\r\n  allContents.forEach(content => content.classList.remove('is-active'));\r\n\r\n  setTimeout(() => {\r\n    slidesContainer.style.transform = `translateX(-${index * 100}%)`;\r\n\r\n    controlsBtn.forEach(btn => btn.classList.remove('is-active'));\r\n    controlsBtn[index].classList.add('is-active');\r\n\r\n    const currentSlide = document.querySelectorAll('.slider__slide')[index];\r\n    const content = currentSlide.querySelector('.slider__content');\r\n    content.classList.add('is-active');\r\n\r\n    currentIndex = index;\r\n  }, 600);\r\n}\r\n\r\n controlsBtn.forEach(btn => {\r\n    btn.addEventListener('click', () => {\r\n      const index = parseInt(btn.dataset.slide);\r\n      goToSlide(index);\r\n      resetInterval();\r\n    });\r\n  });\r\n\r\n  function nextSlide() {\r\n    const nextIndex = (currentIndex + 1) % slideCount;\r\n    goToSlide(nextIndex);\r\n  }\r\n\r\n  function startInterval() {\r\n    interval = setInterval(nextSlide, intervalTime);\r\n  }\r\n\r\n  function resetInterval() {\r\n    clearInterval(interval);\r\n    startInterval();\r\n  }\r\n\r\n  // Старт\r\n  startInterval();\r\n\r\n});\n\n//# sourceURL=webpack://gulp-project/./src/js/components/slider.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_mobile_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/mobile_menu */ \"./src/js/components/mobile_menu.js\");\n/* harmony import */ var _components_mobile_menu__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_mobile_menu__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/slider */ \"./src/js/components/slider.js\");\n/* harmony import */ var _components_slider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_slider__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\n\n//# sourceURL=webpack://gulp-project/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;
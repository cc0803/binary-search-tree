/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/insertDelete.js":
/*!*****************************!*\
  !*** ./src/insertDelete.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   insert: () => (/* binding */ insert)
/* harmony export */ });
function insert(node, root) {
	/*
    if root < node && left != null  --> go left
    else if root > node &&  right != null --> go right
    else if root >node && right == null --> root.right = node
    else if root < node && left == null --> root.left = node;
    */
	if (root.data == node.data) {
		return root;
	}

	if (root.data > node.data) {
		if (root.left == null) {
			root.left = node;
			return root;
		} else {
			insert(node, root.left);
		}
	} else if (root.data < node.data) {
		if (root.right == null) {
			root.right = node;
			return root;
		} else {
			insert(node, root.right);
		}
	}

	return root;
}


/***/ }),

/***/ "./src/mergeSort.js":
/*!**************************!*\
  !*** ./src/mergeSort.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeSort)
/* harmony export */ });
// Returns sorted Array
function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	} else {
		let mid = Math.round(array.length / 2);
		let left = array.slice(0, mid);
		let right = array.slice(mid);
		return compareTwo(mergeSort(left), mergeSort(right));
	}
}

function compareTwo(left, right) {
	let array = [];
	while (left.length && right.length) {
		if (left[0] == right[0]) {
			right.splice(0, 1);
		} else if (left[0] > right[0]) {
			array.push(right.shift());
		} else {
			array.push(left.shift());
		}
	}
	return array.concat(left, right);
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mergeSort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeSort.js */ "./src/mergeSort.js");
/* harmony import */ var _insertDelete_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertDelete.js */ "./src/insertDelete.js");



function treeNode(value) {
	let data = value;
	let left = null;
	let right = null;
	return { data, left, right };
}

// takes array as input sorts it and creates BST
function buildBST(arr) {
	let sorted = (0,_mergeSort_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
	return createBST(sorted, sorted[0], sorted[sorted.length - 1]);
}

// Creates BST from sorted Array
function createBST(arr) {
	if (arr.length == 1) return null;

	let mid = Math.floor(arr.length / 2);
	let root = treeNode(arr[mid]);

	let rightPart = arr.splice(mid);
	let leftPart = arr;
	root.left = createBST(leftPart);
	root.right = createBST(rightPart);

	return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let array2 = [
	1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 15, 1234, 1, 4, 63, 23,
];

let tree2 = buildBST(array2);
(0,_insertDelete_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(12), tree2);
(0,_insertDelete_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(23), tree2);

prettyPrint(tree2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDZTtBQUNmO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNJOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0EsY0FBYyx5REFBUztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixPQUFPLEVBQUUseUJBQXlCO0FBQy9EO0FBQ0EsZ0JBQWdCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQzlEO0FBQ0EsNEJBQTRCLE9BQU8sRUFBRSx5QkFBeUI7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUFNO0FBQ04sd0RBQU07O0FBRU4iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5zZXJ0RGVsZXRlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9tZXJnZVNvcnQuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpbnNlcnQobm9kZSwgcm9vdCkge1xuXHQvKlxuICAgIGlmIHJvb3QgPCBub2RlICYmIGxlZnQgIT0gbnVsbCAgLS0+IGdvIGxlZnRcbiAgICBlbHNlIGlmIHJvb3QgPiBub2RlICYmICByaWdodCAhPSBudWxsIC0tPiBnbyByaWdodFxuICAgIGVsc2UgaWYgcm9vdCA+bm9kZSAmJiByaWdodCA9PSBudWxsIC0tPiByb290LnJpZ2h0ID0gbm9kZVxuICAgIGVsc2UgaWYgcm9vdCA8IG5vZGUgJiYgbGVmdCA9PSBudWxsIC0tPiByb290LmxlZnQgPSBub2RlO1xuICAgICovXG5cdGlmIChyb290LmRhdGEgPT0gbm9kZS5kYXRhKSB7XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblxuXHRpZiAocm9vdC5kYXRhID4gbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QubGVmdCA9PSBudWxsKSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlO1xuXHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc2VydChub2RlLCByb290LmxlZnQpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChyb290LmRhdGEgPCBub2RlLmRhdGEpIHtcblx0XHRpZiAocm9vdC5yaWdodCA9PSBudWxsKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5yaWdodCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJvb3Q7XG59XG4iLCIvLyBSZXR1cm5zIHNvcnRlZCBBcnJheVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG5cdGlmIChhcnJheS5sZW5ndGggPD0gMSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fSBlbHNlIHtcblx0XHRsZXQgbWlkID0gTWF0aC5yb3VuZChhcnJheS5sZW5ndGggLyAyKTtcblx0XHRsZXQgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG5cdFx0bGV0IHJpZ2h0ID0gYXJyYXkuc2xpY2UobWlkKTtcblx0XHRyZXR1cm4gY29tcGFyZVR3byhtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUd28obGVmdCwgcmlnaHQpIHtcblx0bGV0IGFycmF5ID0gW107XG5cdHdoaWxlIChsZWZ0Lmxlbmd0aCAmJiByaWdodC5sZW5ndGgpIHtcblx0XHRpZiAobGVmdFswXSA9PSByaWdodFswXSkge1xuXHRcdFx0cmlnaHQuc3BsaWNlKDAsIDEpO1xuXHRcdH0gZWxzZSBpZiAobGVmdFswXSA+IHJpZ2h0WzBdKSB7XG5cdFx0XHRhcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcnJheS5jb25jYXQobGVmdCwgcmlnaHQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gXCIuL21lcmdlU29ydC5qc1wiO1xuaW1wb3J0IHsgaW5zZXJ0IH0gZnJvbSBcIi4vaW5zZXJ0RGVsZXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHRyZWVOb2RlKHZhbHVlKSB7XG5cdGxldCBkYXRhID0gdmFsdWU7XG5cdGxldCBsZWZ0ID0gbnVsbDtcblx0bGV0IHJpZ2h0ID0gbnVsbDtcblx0cmV0dXJuIHsgZGF0YSwgbGVmdCwgcmlnaHQgfTtcbn1cblxuLy8gdGFrZXMgYXJyYXkgYXMgaW5wdXQgc29ydHMgaXQgYW5kIGNyZWF0ZXMgQlNUXG5mdW5jdGlvbiBidWlsZEJTVChhcnIpIHtcblx0bGV0IHNvcnRlZCA9IG1lcmdlU29ydChhcnIpO1xuXHRyZXR1cm4gY3JlYXRlQlNUKHNvcnRlZCwgc29ydGVkWzBdLCBzb3J0ZWRbc29ydGVkLmxlbmd0aCAtIDFdKTtcbn1cblxuLy8gQ3JlYXRlcyBCU1QgZnJvbSBzb3J0ZWQgQXJyYXlcbmZ1bmN0aW9uIGNyZWF0ZUJTVChhcnIpIHtcblx0aWYgKGFyci5sZW5ndGggPT0gMSkgcmV0dXJuIG51bGw7XG5cblx0bGV0IG1pZCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuXHRsZXQgcm9vdCA9IHRyZWVOb2RlKGFyclttaWRdKTtcblxuXHRsZXQgcmlnaHRQYXJ0ID0gYXJyLnNwbGljZShtaWQpO1xuXHRsZXQgbGVmdFBhcnQgPSBhcnI7XG5cdHJvb3QubGVmdCA9IGNyZWF0ZUJTVChsZWZ0UGFydCk7XG5cdHJvb3QucmlnaHQgPSBjcmVhdGVCU1QocmlnaHRQYXJ0KTtcblxuXHRyZXR1cm4gcm9vdDtcbn1cblxuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuXHRpZiAobm9kZSA9PT0gbnVsbCkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG5cdH1cblx0Y29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcblx0aWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuXHR9XG59O1xuXG5sZXQgYXJyYXkgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG5sZXQgYXJyYXkyID0gW1xuXHQxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNCwgMTUsIDEyMzQsIDEsIDQsIDYzLCAyMyxcbl07XG5cbmxldCB0cmVlMiA9IGJ1aWxkQlNUKGFycmF5Mik7XG5pbnNlcnQodHJlZU5vZGUoMTIpLCB0cmVlMik7XG5pbnNlcnQodHJlZU5vZGUoMjMpLCB0cmVlMik7XG5cbnByZXR0eVByaW50KHRyZWUyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
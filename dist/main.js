/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/insertDeleteFind.js":
/*!*********************************!*\
  !*** ./src/insertDeleteFind.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteNode: () => (/* binding */ deleteNode),
/* harmony export */   findNode: () => (/* binding */ findNode),
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

function deleteNode(node, root) {}

function deleteLeafNode(node, root) {}

function findNode(value, root) {
	// while root.data !== value
	// if root.data > value && root.left !== null: root = root.left;
	// else return null
	// if root.data < value && root.right !== null: root = root.right;
	// else return null
	// return root

	while (root.data !== value) {
		if (root == null) {
			return "not found";
		} else if (root.data > value) {
			root = root.left;
			continue;
		} else if (root.data < value) {
			root = root.right;
			continue;
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
/* harmony import */ var _insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertDeleteFind.js */ "./src/insertDeleteFind.js");



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
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(12), tree2);
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(23), tree2);
console.log((0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.findNode)(15, tree2));

prettyPrint(tree2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87O0FBRVA7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFDZTtBQUNmO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNrQjs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBLGNBQWMseURBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsT0FBTyxFQUFFLHlCQUF5QjtBQUMvRDtBQUNBLGdCQUFnQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUM5RDtBQUNBLDRCQUE0QixPQUFPLEVBQUUseUJBQXlCO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBTTtBQUNOLDREQUFNO0FBQ04sWUFBWSw4REFBUTs7QUFFcEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5zZXJ0RGVsZXRlRmluZC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvbWVyZ2VTb3J0LmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0KG5vZGUsIHJvb3QpIHtcblx0LypcbiAgICBpZiByb290IDwgbm9kZSAmJiBsZWZ0ICE9IG51bGwgIC0tPiBnbyBsZWZ0XG4gICAgZWxzZSBpZiByb290ID4gbm9kZSAmJiAgcmlnaHQgIT0gbnVsbCAtLT4gZ28gcmlnaHRcbiAgICBlbHNlIGlmIHJvb3QgPm5vZGUgJiYgcmlnaHQgPT0gbnVsbCAtLT4gcm9vdC5yaWdodCA9IG5vZGVcbiAgICBlbHNlIGlmIHJvb3QgPCBub2RlICYmIGxlZnQgPT0gbnVsbCAtLT4gcm9vdC5sZWZ0ID0gbm9kZTtcbiAgICAqL1xuXHRpZiAocm9vdC5kYXRhID09IG5vZGUuZGF0YSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0aWYgKHJvb3QuZGF0YSA+IG5vZGUuZGF0YSkge1xuXHRcdGlmIChyb290LmxlZnQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5sZWZ0KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QucmlnaHQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gcm9vdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zZXJ0KG5vZGUsIHJvb3QucmlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm9kZShub2RlLCByb290KSB7fVxuXG5mdW5jdGlvbiBkZWxldGVMZWFmTm9kZShub2RlLCByb290KSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gd2hpbGUgcm9vdC5kYXRhICE9PSB2YWx1ZVxuXHQvLyBpZiByb290LmRhdGEgPiB2YWx1ZSAmJiByb290LmxlZnQgIT09IG51bGw6IHJvb3QgPSByb290LmxlZnQ7XG5cdC8vIGVsc2UgcmV0dXJuIG51bGxcblx0Ly8gaWYgcm9vdC5kYXRhIDwgdmFsdWUgJiYgcm9vdC5yaWdodCAhPT0gbnVsbDogcm9vdCA9IHJvb3QucmlnaHQ7XG5cdC8vIGVsc2UgcmV0dXJuIG51bGxcblx0Ly8gcmV0dXJuIHJvb3RcblxuXHR3aGlsZSAocm9vdC5kYXRhICE9PSB2YWx1ZSkge1xuXHRcdGlmIChyb290ID09IG51bGwpIHtcblx0XHRcdHJldHVybiBcIm5vdCBmb3VuZFwiO1xuXHRcdH0gZWxzZSBpZiAocm9vdC5kYXRhID4gdmFsdWUpIHtcblx0XHRcdHJvb3QgPSByb290LmxlZnQ7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IHZhbHVlKSB7XG5cdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cbiIsIi8vIFJldHVybnMgc29ydGVkIEFycmF5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZVNvcnQoYXJyYXkpIHtcblx0aWYgKGFycmF5Lmxlbmd0aCA8PSAxKSB7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9IGVsc2Uge1xuXHRcdGxldCBtaWQgPSBNYXRoLnJvdW5kKGFycmF5Lmxlbmd0aCAvIDIpO1xuXHRcdGxldCBsZWZ0ID0gYXJyYXkuc2xpY2UoMCwgbWlkKTtcblx0XHRsZXQgcmlnaHQgPSBhcnJheS5zbGljZShtaWQpO1xuXHRcdHJldHVybiBjb21wYXJlVHdvKG1lcmdlU29ydChsZWZ0KSwgbWVyZ2VTb3J0KHJpZ2h0KSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZVR3byhsZWZ0LCByaWdodCkge1xuXHRsZXQgYXJyYXkgPSBbXTtcblx0d2hpbGUgKGxlZnQubGVuZ3RoICYmIHJpZ2h0Lmxlbmd0aCkge1xuXHRcdGlmIChsZWZ0WzBdID09IHJpZ2h0WzBdKSB7XG5cdFx0XHRyaWdodC5zcGxpY2UoMCwgMSk7XG5cdFx0fSBlbHNlIGlmIChsZWZ0WzBdID4gcmlnaHRbMF0pIHtcblx0XHRcdGFycmF5LnB1c2gocmlnaHQuc2hpZnQoKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFycmF5LnB1c2gobGVmdC5zaGlmdCgpKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFycmF5LmNvbmNhdChsZWZ0LCByaWdodCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtZXJnZVNvcnQgZnJvbSBcIi4vbWVyZ2VTb3J0LmpzXCI7XG5pbXBvcnQgeyBpbnNlcnQsIGZpbmROb2RlIH0gZnJvbSBcIi4vaW5zZXJ0RGVsZXRlRmluZC5qc1wiO1xuXG5mdW5jdGlvbiB0cmVlTm9kZSh2YWx1ZSkge1xuXHRsZXQgZGF0YSA9IHZhbHVlO1xuXHRsZXQgbGVmdCA9IG51bGw7XG5cdGxldCByaWdodCA9IG51bGw7XG5cdHJldHVybiB7IGRhdGEsIGxlZnQsIHJpZ2h0IH07XG59XG5cbi8vIHRha2VzIGFycmF5IGFzIGlucHV0IHNvcnRzIGl0IGFuZCBjcmVhdGVzIEJTVFxuZnVuY3Rpb24gYnVpbGRCU1QoYXJyKSB7XG5cdGxldCBzb3J0ZWQgPSBtZXJnZVNvcnQoYXJyKTtcblx0cmV0dXJuIGNyZWF0ZUJTVChzb3J0ZWQsIHNvcnRlZFswXSwgc29ydGVkW3NvcnRlZC5sZW5ndGggLSAxXSk7XG59XG5cbi8vIENyZWF0ZXMgQlNUIGZyb20gc29ydGVkIEFycmF5XG5mdW5jdGlvbiBjcmVhdGVCU1QoYXJyKSB7XG5cdGlmIChhcnIubGVuZ3RoID09IDEpIHJldHVybiBudWxsO1xuXG5cdGxldCBtaWQgPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcblx0bGV0IHJvb3QgPSB0cmVlTm9kZShhcnJbbWlkXSk7XG5cblx0bGV0IHJpZ2h0UGFydCA9IGFyci5zcGxpY2UobWlkKTtcblx0bGV0IGxlZnRQYXJ0ID0gYXJyO1xuXHRyb290LmxlZnQgPSBjcmVhdGVCU1QobGVmdFBhcnQpO1xuXHRyb290LnJpZ2h0ID0gY3JlYXRlQlNUKHJpZ2h0UGFydCk7XG5cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcblx0aWYgKG5vZGUgPT09IG51bGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuXHR9XG5cdGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG5cdGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcblx0fVxufTtcblxubGV0IGFycmF5ID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xubGV0IGFycmF5MiA9IFtcblx0MSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDE1LCAxMjM0LCAxLCA0LCA2MywgMjMsXG5dO1xuXG5sZXQgdHJlZTIgPSBidWlsZEJTVChhcnJheTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDEyKSwgdHJlZTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDIzKSwgdHJlZTIpO1xuY29uc29sZS5sb2coZmluZE5vZGUoMTUsIHRyZWUyKSk7XG5cbnByZXR0eVByaW50KHRyZWUyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/heightDepth.js":
/*!****************************!*\
  !*** ./src/heightDepth.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   depth: () => (/* binding */ depth),
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   isBalanced: () => (/* binding */ isBalanced)
/* harmony export */ });
/* harmony import */ var _insertDeleteFind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./insertDeleteFind */ "./src/insertDeleteFind.js");


function depth(value, root) {
	// define iterator
	let iterator = 0;

	// loop until root == node and iterator++
	while (root.data != value) {
		// check if node is in tree
		if (root.data == null) return 0;

		if (root.data > value) {
			root = root.left;
		} else {
			root = root.right;
		}
		iterator++;
	}
	return iterator;
}

/* 
	Function returns height or -1 if value not in tree
*/
function height(value, root) {
	let node = (0,_insertDeleteFind__WEBPACK_IMPORTED_MODULE_0__.findNode)(value, root);

	if (!node) {
		return -1;
	}

	return heightHelper(node);
}

function heightHelper(node) {
	if (node == null) {
		return -1;
	}

	let left = heightHelper(node.left);
	let right = heightHelper(node.right);

	return max(left, right) + 1;
}

function max(n1, n2) {
	if (n1 >= n2) {
		return n1;
	} else {
		return n2;
	}
}

// isBalanced Function

function isBalanced(root) {
	let rightHeight = height(root.right.data, root);
	let leftHeight = height(root.left.data, root);
	let difference = Math.abs(rightHeight - leftHeight);

	if (difference > 1) {
		return false;
	} else {
		return true;
	}
}


/***/ }),

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

function deleteNode(value, root) {
	// check if note is in tree and a number
	let node = findNode(value, root);
	if (node == null || isNaN(value)) {
		return root;
	}

	// Find parent node
	let parent = findParentNode(value, root);

	/* 
	Check how many children a node has and according
	to that remove the type of node there is got
	 */
	if (node.left == null && node.right == null) {
		return deleteLeafNode(value, parent);
	} else if (node.left == null || node.right == null) {
		return deleteNodeOneChild(value, parent);
	} else {
		return deleteNodeMultipleChildren(value, parent);
	}
}

function deleteLeafNode(value, root) {
	// Check if root aka parent does exist
	if (root == null) {
		// if parent node doesn't exist return null;
		return null;
	}
	if (value > root.data) {
		root.right = null;
	} else {
		root.left = null;
	}
	return root;
}

/*
	finds the node for a given value
	RETURN either node or null
*/
function findNode(value, root) {
	while (root.data !== value) {
		if (root == null) {
			return null;
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

function findParentNode(value, root) {
	// check if root is equal value;
	if (root.data == value) {
		return root;
	}
	while (root !== null) {
		if (root.data > value) {
			if (root.left.data == value) {
				return root;
			} else {
				root = root.left;
			}
		} else {
			if (root.right.data == value) {
				return root;
			} else {
				root = root.right;
			}
		}
	}
	return root;
}

function deleteNodeOneChild(value, root) {
	let node = findNode(value, root);

	// Check on which side of the parent the node is
	if (root.right == node) {
		if (node.right == null) {
			root.right = node.left;
		} else {
			root.right = node.right;
		}
		return root;
	} else {
		if (node.left == null) {
			root.left = node.right;
		} else {
			root.left = node.left;
		}
		return root;
	}
}

function deleteNodeMultipleChildren(value, root) {
	let replacement = root.right;
	// ............................................
	// Maybe check if node even has a parent node ?
	if (root.data == value) {
		let parent;
		while (replacement.left !== null) {
			parent = replacement;
			replacement = replacement.left;
		}
		parent.left = replacement.right;
		replacement.right = root.right;
		replacement.left = root.left;

		//return replacement;
	} else {
		// ............................................
		let node = findNode(value, root);

		// Find the replacement node (next bigger)
		replacement = node.right;
		// define the parent node for the replacement;
		let parent;
		while (replacement.left !== null) {
			parent = replacement;
			replacement = replacement.left;
		}

		parent.left = replacement.right;

		// If replacement node has children
		if (replacement.right !== null) {
			let replacementChildren = replacement.right;
			// take parent element
			// put children to original position of replacement node.
			parent.left = replacementChildren;
		}

		replacement.right = node.right;
		replacement.left = node.left;

		// Checke if value is left or right of parent node
		if (root.right.data == value) {
			root.right = replacement;
		} else {
			root.left = replacement;
		}
		return root;
	}
	return replacement;
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


/***/ }),

/***/ "./src/traverse.js":
/*!*************************!*\
  !*** ./src/traverse.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inorder: () => (/* binding */ inorder),
/* harmony export */   levelOrder: () => (/* binding */ levelOrder),
/* harmony export */   postorder: () => (/* binding */ postorder),
/* harmony export */   preorder: () => (/* binding */ preorder)
/* harmony export */ });
function levelOrder(root, callback) {
	let arr = [];
	let queue = [];
	queue.push(root);

	while (queue.length) {
		root = queue[0];
		if (root.left) queue.push(root.left);
		if (root.right) queue.push(root.right);
		arr.push(root.data);
		queue.shift();
	}

	// If no callback return array
	if (!callback) return arr;
}

function inorder(root, arr = []) {
	if (!root) return arr;

	if (root.left) {
		inorder(root.left, arr);
	}

	arr.push(root.data);

	if (root.right) {
		inorder(root.right, arr);
	}

	return arr;
}

function preorder(root, arr = []) {
	if (!root) return arr;
	else {
		arr.push(root.data);
		preorder(root.left, arr);
		preorder(root.right, arr);
	}

	return arr;
}

function postorder(root, arr = []) {
	if (!root) return arr;
	else {
		postorder(root.left, arr);
		postorder(root.right, arr);
		arr.push(root.data);
	}
	return arr;
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prettyPrint: () => (/* binding */ prettyPrint)
/* harmony export */ });
/* harmony import */ var _mergeSort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeSort.js */ "./src/mergeSort.js");
/* harmony import */ var _insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertDeleteFind.js */ "./src/insertDeleteFind.js");
/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./traverse.js */ "./src/traverse.js");
/* harmony import */ var _heightDepth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./heightDepth.js */ "./src/heightDepth.js");





function treeNode(value) {
	let data = value;
	let left = null;
	let right = null;
	return { data, left, right };
}

// takes array as input sorts it and creates BST
function buildBST(arr) {
	let sorted = (0,_mergeSort_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
	return createBST(sorted);
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
// console.log(findNode(15, tree2));

let tree3 = (0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.deleteNode)(15, tree2);
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.levelOrder)(tree3));
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.inorder)(tree3));
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.preorder)(tree3));
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.postorder)(tree3));
console.log((0,_heightDepth_js__WEBPACK_IMPORTED_MODULE_3__.depth)(3, tree3));
console.log((0,_heightDepth_js__WEBPACK_IMPORTED_MODULE_3__.height)(8, tree3));
console.log((0,_heightDepth_js__WEBPACK_IMPORTED_MODULE_3__.isBalanced)(tree3));

prettyPrint(tree3);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qzs7QUFFdkM7QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsWUFBWSwyREFBUTs7QUFFcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5S0E7QUFDZTtBQUNmO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQzhCO0FBQ0k7QUFDWjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBLGNBQWMseURBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsT0FBTyxFQUFFLHlCQUF5QjtBQUMvRDtBQUNBLGdCQUFnQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUM5RDtBQUNBLDRCQUE0QixPQUFPLEVBQUUseUJBQXlCO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBTTtBQUNOLDREQUFNO0FBQ047O0FBRUEsWUFBWSxnRUFBVTtBQUN0QixZQUFZLHdEQUFVO0FBQ3RCLFlBQVkscURBQU87QUFDbkIsWUFBWSxzREFBUTtBQUNwQixZQUFZLHVEQUFTO0FBQ3JCLFlBQVksc0RBQUs7QUFDakIsWUFBWSx1REFBTTtBQUNsQixZQUFZLDJEQUFVOztBQUV0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9oZWlnaHREZXB0aC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5zZXJ0RGVsZXRlRmluZC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvbWVyZ2VTb3J0LmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy90cmF2ZXJzZS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmluZE5vZGUgfSBmcm9tIFwiLi9pbnNlcnREZWxldGVGaW5kXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXB0aCh2YWx1ZSwgcm9vdCkge1xuXHQvLyBkZWZpbmUgaXRlcmF0b3Jcblx0bGV0IGl0ZXJhdG9yID0gMDtcblxuXHQvLyBsb29wIHVudGlsIHJvb3QgPT0gbm9kZSBhbmQgaXRlcmF0b3IrK1xuXHR3aGlsZSAocm9vdC5kYXRhICE9IHZhbHVlKSB7XG5cdFx0Ly8gY2hlY2sgaWYgbm9kZSBpcyBpbiB0cmVlXG5cdFx0aWYgKHJvb3QuZGF0YSA9PSBudWxsKSByZXR1cm4gMDtcblxuXHRcdGlmIChyb290LmRhdGEgPiB2YWx1ZSkge1xuXHRcdFx0cm9vdCA9IHJvb3QubGVmdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdCA9IHJvb3QucmlnaHQ7XG5cdFx0fVxuXHRcdGl0ZXJhdG9yKys7XG5cdH1cblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuXG4vKiBcblx0RnVuY3Rpb24gcmV0dXJucyBoZWlnaHQgb3IgLTEgaWYgdmFsdWUgbm90IGluIHRyZWVcbiovXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0KHZhbHVlLCByb290KSB7XG5cdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdGlmICghbm9kZSkge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdHJldHVybiBoZWlnaHRIZWxwZXIobm9kZSk7XG59XG5cbmZ1bmN0aW9uIGhlaWdodEhlbHBlcihub2RlKSB7XG5cdGlmIChub2RlID09IG51bGwpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRsZXQgbGVmdCA9IGhlaWdodEhlbHBlcihub2RlLmxlZnQpO1xuXHRsZXQgcmlnaHQgPSBoZWlnaHRIZWxwZXIobm9kZS5yaWdodCk7XG5cblx0cmV0dXJuIG1heChsZWZ0LCByaWdodCkgKyAxO1xufVxuXG5mdW5jdGlvbiBtYXgobjEsIG4yKSB7XG5cdGlmIChuMSA+PSBuMikge1xuXHRcdHJldHVybiBuMTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbjI7XG5cdH1cbn1cblxuLy8gaXNCYWxhbmNlZCBGdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gaXNCYWxhbmNlZChyb290KSB7XG5cdGxldCByaWdodEhlaWdodCA9IGhlaWdodChyb290LnJpZ2h0LmRhdGEsIHJvb3QpO1xuXHRsZXQgbGVmdEhlaWdodCA9IGhlaWdodChyb290LmxlZnQuZGF0YSwgcm9vdCk7XG5cdGxldCBkaWZmZXJlbmNlID0gTWF0aC5hYnMocmlnaHRIZWlnaHQgLSBsZWZ0SGVpZ2h0KTtcblxuXHRpZiAoZGlmZmVyZW5jZSA+IDEpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpbnNlcnQobm9kZSwgcm9vdCkge1xuXHRpZiAocm9vdC5kYXRhID09IG5vZGUuZGF0YSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0aWYgKHJvb3QuZGF0YSA+IG5vZGUuZGF0YSkge1xuXHRcdGlmIChyb290LmxlZnQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5sZWZ0KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QucmlnaHQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gcm9vdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zZXJ0KG5vZGUsIHJvb3QucmlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBjaGVjayBpZiBub3RlIGlzIGluIHRyZWUgYW5kIGEgbnVtYmVyXG5cdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXHRpZiAobm9kZSA9PSBudWxsIHx8IGlzTmFOKHZhbHVlKSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0Ly8gRmluZCBwYXJlbnQgbm9kZVxuXHRsZXQgcGFyZW50ID0gZmluZFBhcmVudE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdC8qIFxuXHRDaGVjayBob3cgbWFueSBjaGlsZHJlbiBhIG5vZGUgaGFzIGFuZCBhY2NvcmRpbmdcblx0dG8gdGhhdCByZW1vdmUgdGhlIHR5cGUgb2Ygbm9kZSB0aGVyZSBpcyBnb3Rcblx0ICovXG5cdGlmIChub2RlLmxlZnQgPT0gbnVsbCAmJiBub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRyZXR1cm4gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHBhcmVudCk7XG5cdH0gZWxzZSBpZiAobm9kZS5sZWZ0ID09IG51bGwgfHwgbm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZU5vZGVPbmVDaGlsZCh2YWx1ZSwgcGFyZW50KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZGVsZXRlTm9kZU11bHRpcGxlQ2hpbGRyZW4odmFsdWUsIHBhcmVudCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gQ2hlY2sgaWYgcm9vdCBha2EgcGFyZW50IGRvZXMgZXhpc3Rcblx0aWYgKHJvb3QgPT0gbnVsbCkge1xuXHRcdC8vIGlmIHBhcmVudCBub2RlIGRvZXNuJ3QgZXhpc3QgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKHZhbHVlID4gcm9vdC5kYXRhKSB7XG5cdFx0cm9vdC5yaWdodCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5sZWZ0ID0gbnVsbDtcblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuLypcblx0ZmluZHMgdGhlIG5vZGUgZm9yIGEgZ2l2ZW4gdmFsdWVcblx0UkVUVVJOIGVpdGhlciBub2RlIG9yIG51bGxcbiovXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGUodmFsdWUsIHJvb3QpIHtcblx0d2hpbGUgKHJvb3QuZGF0YSAhPT0gdmFsdWUpIHtcblx0XHRpZiAocm9vdCA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9IGVsc2UgaWYgKHJvb3QuZGF0YSA+IHZhbHVlKSB7XG5cdFx0XHRyb290ID0gcm9vdC5sZWZ0O1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmIChyb290LmRhdGEgPCB2YWx1ZSkge1xuXHRcdFx0cm9vdCA9IHJvb3QucmlnaHQ7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKHZhbHVlLCByb290KSB7XG5cdC8vIGNoZWNrIGlmIHJvb3QgaXMgZXF1YWwgdmFsdWU7XG5cdGlmIChyb290LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRyZXR1cm4gcm9vdDtcblx0fVxuXHR3aGlsZSAocm9vdCAhPT0gbnVsbCkge1xuXHRcdGlmIChyb290LmRhdGEgPiB2YWx1ZSkge1xuXHRcdFx0aWYgKHJvb3QubGVmdC5kYXRhID09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiByb290O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QubGVmdDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHJvb3QucmlnaHQuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gcm9vdDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJvb3QgPSByb290LnJpZ2h0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZU9uZUNoaWxkKHZhbHVlLCByb290KSB7XG5cdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdC8vIENoZWNrIG9uIHdoaWNoIHNpZGUgb2YgdGhlIHBhcmVudCB0aGUgbm9kZSBpc1xuXHRpZiAocm9vdC5yaWdodCA9PSBub2RlKSB7XG5cdFx0aWYgKG5vZGUucmlnaHQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGUubGVmdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGUucmlnaHQ7XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9IGVsc2Uge1xuXHRcdGlmIChub2RlLmxlZnQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZS5yaWdodDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZS5sZWZ0O1xuXHRcdH1cblx0XHRyZXR1cm4gcm9vdDtcblx0fVxufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlTXVsdGlwbGVDaGlsZHJlbih2YWx1ZSwgcm9vdCkge1xuXHRsZXQgcmVwbGFjZW1lbnQgPSByb290LnJpZ2h0O1xuXHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXHQvLyBNYXliZSBjaGVjayBpZiBub2RlIGV2ZW4gaGFzIGEgcGFyZW50IG5vZGUgP1xuXHRpZiAocm9vdC5kYXRhID09IHZhbHVlKSB7XG5cdFx0bGV0IHBhcmVudDtcblx0XHR3aGlsZSAocmVwbGFjZW1lbnQubGVmdCAhPT0gbnVsbCkge1xuXHRcdFx0cGFyZW50ID0gcmVwbGFjZW1lbnQ7XG5cdFx0XHRyZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50LmxlZnQ7XG5cdFx0fVxuXHRcdHBhcmVudC5sZWZ0ID0gcmVwbGFjZW1lbnQucmlnaHQ7XG5cdFx0cmVwbGFjZW1lbnQucmlnaHQgPSByb290LnJpZ2h0O1xuXHRcdHJlcGxhY2VtZW50LmxlZnQgPSByb290LmxlZnQ7XG5cblx0XHQvL3JldHVybiByZXBsYWNlbWVudDtcblx0fSBlbHNlIHtcblx0XHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXHRcdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdFx0Ly8gRmluZCB0aGUgcmVwbGFjZW1lbnQgbm9kZSAobmV4dCBiaWdnZXIpXG5cdFx0cmVwbGFjZW1lbnQgPSBub2RlLnJpZ2h0O1xuXHRcdC8vIGRlZmluZSB0aGUgcGFyZW50IG5vZGUgZm9yIHRoZSByZXBsYWNlbWVudDtcblx0XHRsZXQgcGFyZW50O1xuXHRcdHdoaWxlIChyZXBsYWNlbWVudC5sZWZ0ICE9PSBudWxsKSB7XG5cdFx0XHRwYXJlbnQgPSByZXBsYWNlbWVudDtcblx0XHRcdHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnQubGVmdDtcblx0XHR9XG5cblx0XHRwYXJlbnQubGVmdCA9IHJlcGxhY2VtZW50LnJpZ2h0O1xuXG5cdFx0Ly8gSWYgcmVwbGFjZW1lbnQgbm9kZSBoYXMgY2hpbGRyZW5cblx0XHRpZiAocmVwbGFjZW1lbnQucmlnaHQgIT09IG51bGwpIHtcblx0XHRcdGxldCByZXBsYWNlbWVudENoaWxkcmVuID0gcmVwbGFjZW1lbnQucmlnaHQ7XG5cdFx0XHQvLyB0YWtlIHBhcmVudCBlbGVtZW50XG5cdFx0XHQvLyBwdXQgY2hpbGRyZW4gdG8gb3JpZ2luYWwgcG9zaXRpb24gb2YgcmVwbGFjZW1lbnQgbm9kZS5cblx0XHRcdHBhcmVudC5sZWZ0ID0gcmVwbGFjZW1lbnRDaGlsZHJlbjtcblx0XHR9XG5cblx0XHRyZXBsYWNlbWVudC5yaWdodCA9IG5vZGUucmlnaHQ7XG5cdFx0cmVwbGFjZW1lbnQubGVmdCA9IG5vZGUubGVmdDtcblxuXHRcdC8vIENoZWNrZSBpZiB2YWx1ZSBpcyBsZWZ0IG9yIHJpZ2h0IG9mIHBhcmVudCBub2RlXG5cdFx0aWYgKHJvb3QucmlnaHQuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdFx0cm9vdC5yaWdodCA9IHJlcGxhY2VtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290LmxlZnQgPSByZXBsYWNlbWVudDtcblx0XHR9XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblx0cmV0dXJuIHJlcGxhY2VtZW50O1xufVxuIiwiLy8gUmV0dXJucyBzb3J0ZWQgQXJyYXlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlU29ydChhcnJheSkge1xuXHRpZiAoYXJyYXkubGVuZ3RoIDw9IDEpIHtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdH0gZWxzZSB7XG5cdFx0bGV0IG1pZCA9IE1hdGgucm91bmQoYXJyYXkubGVuZ3RoIC8gMik7XG5cdFx0bGV0IGxlZnQgPSBhcnJheS5zbGljZSgwLCBtaWQpO1xuXHRcdGxldCByaWdodCA9IGFycmF5LnNsaWNlKG1pZCk7XG5cdFx0cmV0dXJuIGNvbXBhcmVUd28obWVyZ2VTb3J0KGxlZnQpLCBtZXJnZVNvcnQocmlnaHQpKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjb21wYXJlVHdvKGxlZnQsIHJpZ2h0KSB7XG5cdGxldCBhcnJheSA9IFtdO1xuXHR3aGlsZSAobGVmdC5sZW5ndGggJiYgcmlnaHQubGVuZ3RoKSB7XG5cdFx0aWYgKGxlZnRbMF0gPT0gcmlnaHRbMF0pIHtcblx0XHRcdHJpZ2h0LnNwbGljZSgwLCAxKTtcblx0XHR9IGVsc2UgaWYgKGxlZnRbMF0gPiByaWdodFswXSkge1xuXHRcdFx0YXJyYXkucHVzaChyaWdodC5zaGlmdCgpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJyYXkucHVzaChsZWZ0LnNoaWZ0KCkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXJyYXkuY29uY2F0KGxlZnQsIHJpZ2h0KTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBsZXZlbE9yZGVyKHJvb3QsIGNhbGxiYWNrKSB7XG5cdGxldCBhcnIgPSBbXTtcblx0bGV0IHF1ZXVlID0gW107XG5cdHF1ZXVlLnB1c2gocm9vdCk7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuXHRcdHJvb3QgPSBxdWV1ZVswXTtcblx0XHRpZiAocm9vdC5sZWZ0KSBxdWV1ZS5wdXNoKHJvb3QubGVmdCk7XG5cdFx0aWYgKHJvb3QucmlnaHQpIHF1ZXVlLnB1c2gocm9vdC5yaWdodCk7XG5cdFx0YXJyLnB1c2gocm9vdC5kYXRhKTtcblx0XHRxdWV1ZS5zaGlmdCgpO1xuXHR9XG5cblx0Ly8gSWYgbm8gY2FsbGJhY2sgcmV0dXJuIGFycmF5XG5cdGlmICghY2FsbGJhY2spIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbm9yZGVyKHJvb3QsIGFyciA9IFtdKSB7XG5cdGlmICghcm9vdCkgcmV0dXJuIGFycjtcblxuXHRpZiAocm9vdC5sZWZ0KSB7XG5cdFx0aW5vcmRlcihyb290LmxlZnQsIGFycik7XG5cdH1cblxuXHRhcnIucHVzaChyb290LmRhdGEpO1xuXG5cdGlmIChyb290LnJpZ2h0KSB7XG5cdFx0aW5vcmRlcihyb290LnJpZ2h0LCBhcnIpO1xuXHR9XG5cblx0cmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZW9yZGVyKHJvb3QsIGFyciA9IFtdKSB7XG5cdGlmICghcm9vdCkgcmV0dXJuIGFycjtcblx0ZWxzZSB7XG5cdFx0YXJyLnB1c2gocm9vdC5kYXRhKTtcblx0XHRwcmVvcmRlcihyb290LmxlZnQsIGFycik7XG5cdFx0cHJlb3JkZXIocm9vdC5yaWdodCwgYXJyKTtcblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0b3JkZXIocm9vdCwgYXJyID0gW10pIHtcblx0aWYgKCFyb290KSByZXR1cm4gYXJyO1xuXHRlbHNlIHtcblx0XHRwb3N0b3JkZXIocm9vdC5sZWZ0LCBhcnIpO1xuXHRcdHBvc3RvcmRlcihyb290LnJpZ2h0LCBhcnIpO1xuXHRcdGFyci5wdXNoKHJvb3QuZGF0YSk7XG5cdH1cblx0cmV0dXJuIGFycjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1lcmdlU29ydCBmcm9tIFwiLi9tZXJnZVNvcnQuanNcIjtcbmltcG9ydCB7IGluc2VydCwgZmluZE5vZGUsIGRlbGV0ZU5vZGUgfSBmcm9tIFwiLi9pbnNlcnREZWxldGVGaW5kLmpzXCI7XG5pbXBvcnQgeyBsZXZlbE9yZGVyLCBpbm9yZGVyLCBwcmVvcmRlciwgcG9zdG9yZGVyIH0gZnJvbSBcIi4vdHJhdmVyc2UuanNcIjtcbmltcG9ydCB7IGRlcHRoLCBoZWlnaHQsIGlzQmFsYW5jZWQgfSBmcm9tIFwiLi9oZWlnaHREZXB0aC5qc1wiO1xuXG5mdW5jdGlvbiB0cmVlTm9kZSh2YWx1ZSkge1xuXHRsZXQgZGF0YSA9IHZhbHVlO1xuXHRsZXQgbGVmdCA9IG51bGw7XG5cdGxldCByaWdodCA9IG51bGw7XG5cdHJldHVybiB7IGRhdGEsIGxlZnQsIHJpZ2h0IH07XG59XG5cbi8vIHRha2VzIGFycmF5IGFzIGlucHV0IHNvcnRzIGl0IGFuZCBjcmVhdGVzIEJTVFxuZnVuY3Rpb24gYnVpbGRCU1QoYXJyKSB7XG5cdGxldCBzb3J0ZWQgPSBtZXJnZVNvcnQoYXJyKTtcblx0cmV0dXJuIGNyZWF0ZUJTVChzb3J0ZWQpO1xufVxuXG4vLyBDcmVhdGVzIEJTVCBmcm9tIHNvcnRlZCBBcnJheVxuZnVuY3Rpb24gY3JlYXRlQlNUKGFycikge1xuXHRpZiAoYXJyLmxlbmd0aCA9PSAxKSByZXR1cm4gbnVsbDtcblxuXHRsZXQgbWlkID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG5cdGxldCByb290ID0gdHJlZU5vZGUoYXJyW21pZF0pO1xuXG5cdGxldCByaWdodFBhcnQgPSBhcnIuc3BsaWNlKG1pZCk7XG5cdGxldCBsZWZ0UGFydCA9IGFycjtcblx0cm9vdC5sZWZ0ID0gY3JlYXRlQlNUKGxlZnRQYXJ0KTtcblx0cm9vdC5yaWdodCA9IGNyZWF0ZUJTVChyaWdodFBhcnQpO1xuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuXHRpZiAobm9kZSA9PT0gbnVsbCkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG5cdH1cblx0Y29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcblx0aWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuXHR9XG59O1xuXG5sZXQgYXJyYXkgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG5sZXQgYXJyYXkyID0gW1xuXHQxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNCwgMTUsIDEyMzQsIDEsIDQsIDYzLCAyMyxcbl07XG5cbmxldCB0cmVlMiA9IGJ1aWxkQlNUKGFycmF5Mik7XG5pbnNlcnQodHJlZU5vZGUoMTIpLCB0cmVlMik7XG5pbnNlcnQodHJlZU5vZGUoMjMpLCB0cmVlMik7XG4vLyBjb25zb2xlLmxvZyhmaW5kTm9kZSgxNSwgdHJlZTIpKTtcblxubGV0IHRyZWUzID0gZGVsZXRlTm9kZSgxNSwgdHJlZTIpO1xuY29uc29sZS5sb2cobGV2ZWxPcmRlcih0cmVlMykpO1xuY29uc29sZS5sb2coaW5vcmRlcih0cmVlMykpO1xuY29uc29sZS5sb2cocHJlb3JkZXIodHJlZTMpKTtcbmNvbnNvbGUubG9nKHBvc3RvcmRlcih0cmVlMykpO1xuY29uc29sZS5sb2coZGVwdGgoMywgdHJlZTMpKTtcbmNvbnNvbGUubG9nKGhlaWdodCg4LCB0cmVlMykpO1xuY29uc29sZS5sb2coaXNCYWxhbmNlZCh0cmVlMykpO1xuXG5wcmV0dHlQcmludCh0cmVlMyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
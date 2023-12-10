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

// Balance unbalanced tree
function balanceTree(root) {
	let arr = (0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.inorder)(root);
	let tree = createBST(arr);
	return tree;
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
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(1), tree2);
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(2), tree2);
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(13), tree2);
(0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.insert)(treeNode(14), tree2);
console.log((0,_heightDepth_js__WEBPACK_IMPORTED_MODULE_3__.isBalanced)(tree2));

prettyPrint(tree3);
prettyPrint(tree2);

prettyPrint(balanceTree(tree2));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qzs7QUFFdkM7QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsWUFBWSwyREFBUTs7QUFFcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM5S0E7QUFDZTtBQUNmO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQzhCO0FBQ0k7QUFDWjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBLGNBQWMseURBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLHFEQUFPO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE9BQU8sRUFBRSx5QkFBeUI7QUFDL0Q7QUFDQSxnQkFBZ0IsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDOUQ7QUFDQSw0QkFBNEIsT0FBTyxFQUFFLHlCQUF5QjtBQUM5RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQU07QUFDTiw0REFBTTtBQUNOOztBQUVBLFlBQVksZ0VBQVU7QUFDdEIsWUFBWSx3REFBVTtBQUN0QixZQUFZLHFEQUFPO0FBQ25CLFlBQVksc0RBQVE7QUFDcEIsWUFBWSx1REFBUztBQUNyQixZQUFZLHNEQUFLO0FBQ2pCLFlBQVksdURBQU07QUFDbEIsNERBQU07QUFDTiw0REFBTTtBQUNOLDREQUFNO0FBQ04sNERBQU07QUFDTixZQUFZLDJEQUFVOztBQUV0QjtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2hlaWdodERlcHRoLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbnNlcnREZWxldGVGaW5kLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9tZXJnZVNvcnQuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL3RyYXZlcnNlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaW5kTm9kZSB9IGZyb20gXCIuL2luc2VydERlbGV0ZUZpbmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlcHRoKHZhbHVlLCByb290KSB7XG5cdC8vIGRlZmluZSBpdGVyYXRvclxuXHRsZXQgaXRlcmF0b3IgPSAwO1xuXG5cdC8vIGxvb3AgdW50aWwgcm9vdCA9PSBub2RlIGFuZCBpdGVyYXRvcisrXG5cdHdoaWxlIChyb290LmRhdGEgIT0gdmFsdWUpIHtcblx0XHQvLyBjaGVjayBpZiBub2RlIGlzIGluIHRyZWVcblx0XHRpZiAocm9vdC5kYXRhID09IG51bGwpIHJldHVybiAwO1xuXG5cdFx0aWYgKHJvb3QuZGF0YSA+IHZhbHVlKSB7XG5cdFx0XHRyb290ID0gcm9vdC5sZWZ0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHR9XG5cdFx0aXRlcmF0b3IrKztcblx0fVxuXHRyZXR1cm4gaXRlcmF0b3I7XG59XG5cbi8qIFxuXHRGdW5jdGlvbiByZXR1cm5zIGhlaWdodCBvciAtMSBpZiB2YWx1ZSBub3QgaW4gdHJlZVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQodmFsdWUsIHJvb3QpIHtcblx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0aWYgKCFub2RlKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0cmV0dXJuIGhlaWdodEhlbHBlcihub2RlKTtcbn1cblxuZnVuY3Rpb24gaGVpZ2h0SGVscGVyKG5vZGUpIHtcblx0aWYgKG5vZGUgPT0gbnVsbCkge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGxldCBsZWZ0ID0gaGVpZ2h0SGVscGVyKG5vZGUubGVmdCk7XG5cdGxldCByaWdodCA9IGhlaWdodEhlbHBlcihub2RlLnJpZ2h0KTtcblxuXHRyZXR1cm4gbWF4KGxlZnQsIHJpZ2h0KSArIDE7XG59XG5cbmZ1bmN0aW9uIG1heChuMSwgbjIpIHtcblx0aWYgKG4xID49IG4yKSB7XG5cdFx0cmV0dXJuIG4xO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBuMjtcblx0fVxufVxuXG4vLyBpc0JhbGFuY2VkIEZ1bmN0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhbGFuY2VkKHJvb3QpIHtcblx0bGV0IHJpZ2h0SGVpZ2h0ID0gaGVpZ2h0KHJvb3QucmlnaHQuZGF0YSwgcm9vdCk7XG5cdGxldCBsZWZ0SGVpZ2h0ID0gaGVpZ2h0KHJvb3QubGVmdC5kYXRhLCByb290KTtcblx0bGV0IGRpZmZlcmVuY2UgPSBNYXRoLmFicyhyaWdodEhlaWdodCAtIGxlZnRIZWlnaHQpO1xuXG5cdGlmIChkaWZmZXJlbmNlID4gMSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGluc2VydChub2RlLCByb290KSB7XG5cdGlmIChyb290LmRhdGEgPT0gbm9kZS5kYXRhKSB7XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblxuXHRpZiAocm9vdC5kYXRhID4gbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QubGVmdCA9PSBudWxsKSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlO1xuXHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc2VydChub2RlLCByb290LmxlZnQpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChyb290LmRhdGEgPCBub2RlLmRhdGEpIHtcblx0XHRpZiAocm9vdC5yaWdodCA9PSBudWxsKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5yaWdodCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVOb2RlKHZhbHVlLCByb290KSB7XG5cdC8vIGNoZWNrIGlmIG5vdGUgaXMgaW4gdHJlZSBhbmQgYSBudW1iZXJcblx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cdGlmIChub2RlID09IG51bGwgfHwgaXNOYU4odmFsdWUpKSB7XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblxuXHQvLyBGaW5kIHBhcmVudCBub2RlXG5cdGxldCBwYXJlbnQgPSBmaW5kUGFyZW50Tm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0LyogXG5cdENoZWNrIGhvdyBtYW55IGNoaWxkcmVuIGEgbm9kZSBoYXMgYW5kIGFjY29yZGluZ1xuXHR0byB0aGF0IHJlbW92ZSB0aGUgdHlwZSBvZiBub2RlIHRoZXJlIGlzIGdvdFxuXHQgKi9cblx0aWYgKG5vZGUubGVmdCA9PSBudWxsICYmIG5vZGUucmlnaHQgPT0gbnVsbCkge1xuXHRcdHJldHVybiBkZWxldGVMZWFmTm9kZSh2YWx1ZSwgcGFyZW50KTtcblx0fSBlbHNlIGlmIChub2RlLmxlZnQgPT0gbnVsbCB8fCBub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRyZXR1cm4gZGVsZXRlTm9kZU9uZUNoaWxkKHZhbHVlLCBwYXJlbnQpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBkZWxldGVOb2RlTXVsdGlwbGVDaGlsZHJlbih2YWx1ZSwgcGFyZW50KTtcblx0fVxufVxuXG5mdW5jdGlvbiBkZWxldGVMZWFmTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBDaGVjayBpZiByb290IGFrYSBwYXJlbnQgZG9lcyBleGlzdFxuXHRpZiAocm9vdCA9PSBudWxsKSB7XG5cdFx0Ly8gaWYgcGFyZW50IG5vZGUgZG9lc24ndCBleGlzdCByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAodmFsdWUgPiByb290LmRhdGEpIHtcblx0XHRyb290LnJpZ2h0ID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRyb290LmxlZnQgPSBudWxsO1xuXHR9XG5cdHJldHVybiByb290O1xufVxuXG4vKlxuXHRmaW5kcyB0aGUgbm9kZSBmb3IgYSBnaXZlbiB2YWx1ZVxuXHRSRVRVUk4gZWl0aGVyIG5vZGUgb3IgbnVsbFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHR3aGlsZSAocm9vdC5kYXRhICE9PSB2YWx1ZSkge1xuXHRcdGlmIChyb290ID09IG51bGwpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0gZWxzZSBpZiAocm9vdC5kYXRhID4gdmFsdWUpIHtcblx0XHRcdHJvb3QgPSByb290LmxlZnQ7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IHZhbHVlKSB7XG5cdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gZmluZFBhcmVudE5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gY2hlY2sgaWYgcm9vdCBpcyBlcXVhbCB2YWx1ZTtcblx0aWYgKHJvb3QuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHdoaWxlIChyb290ICE9PSBudWxsKSB7XG5cdFx0aWYgKHJvb3QuZGF0YSA+IHZhbHVlKSB7XG5cdFx0XHRpZiAocm9vdC5sZWZ0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyb290ID0gcm9vdC5sZWZ0O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocm9vdC5yaWdodC5kYXRhID09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiByb290O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QucmlnaHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlT25lQ2hpbGQodmFsdWUsIHJvb3QpIHtcblx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0Ly8gQ2hlY2sgb24gd2hpY2ggc2lkZSBvZiB0aGUgcGFyZW50IHRoZSBub2RlIGlzXG5cdGlmIChyb290LnJpZ2h0ID09IG5vZGUpIHtcblx0XHRpZiAobm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZS5sZWZ0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZS5yaWdodDtcblx0XHR9XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKG5vZGUubGVmdCA9PSBudWxsKSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlLnJpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlLmxlZnQ7XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVNdWx0aXBsZUNoaWxkcmVuKHZhbHVlLCByb290KSB7XG5cdGxldCByZXBsYWNlbWVudCA9IHJvb3QucmlnaHQ7XG5cdC8vIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdC8vIE1heWJlIGNoZWNrIGlmIG5vZGUgZXZlbiBoYXMgYSBwYXJlbnQgbm9kZSA/XG5cdGlmIChyb290LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRsZXQgcGFyZW50O1xuXHRcdHdoaWxlIChyZXBsYWNlbWVudC5sZWZ0ICE9PSBudWxsKSB7XG5cdFx0XHRwYXJlbnQgPSByZXBsYWNlbWVudDtcblx0XHRcdHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnQubGVmdDtcblx0XHR9XG5cdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudC5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5yaWdodCA9IHJvb3QucmlnaHQ7XG5cdFx0cmVwbGFjZW1lbnQubGVmdCA9IHJvb3QubGVmdDtcblxuXHRcdC8vcmV0dXJuIHJlcGxhY2VtZW50O1xuXHR9IGVsc2Uge1xuXHRcdC8vIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdFx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0XHQvLyBGaW5kIHRoZSByZXBsYWNlbWVudCBub2RlIChuZXh0IGJpZ2dlcilcblx0XHRyZXBsYWNlbWVudCA9IG5vZGUucmlnaHQ7XG5cdFx0Ly8gZGVmaW5lIHRoZSBwYXJlbnQgbm9kZSBmb3IgdGhlIHJlcGxhY2VtZW50O1xuXHRcdGxldCBwYXJlbnQ7XG5cdFx0d2hpbGUgKHJlcGxhY2VtZW50LmxlZnQgIT09IG51bGwpIHtcblx0XHRcdHBhcmVudCA9IHJlcGxhY2VtZW50O1xuXHRcdFx0cmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudC5sZWZ0O1xuXHRcdH1cblxuXHRcdHBhcmVudC5sZWZ0ID0gcmVwbGFjZW1lbnQucmlnaHQ7XG5cblx0XHQvLyBJZiByZXBsYWNlbWVudCBub2RlIGhhcyBjaGlsZHJlblxuXHRcdGlmIChyZXBsYWNlbWVudC5yaWdodCAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IHJlcGxhY2VtZW50Q2hpbGRyZW4gPSByZXBsYWNlbWVudC5yaWdodDtcblx0XHRcdC8vIHRha2UgcGFyZW50IGVsZW1lbnRcblx0XHRcdC8vIHB1dCBjaGlsZHJlbiB0byBvcmlnaW5hbCBwb3NpdGlvbiBvZiByZXBsYWNlbWVudCBub2RlLlxuXHRcdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudENoaWxkcmVuO1xuXHRcdH1cblxuXHRcdHJlcGxhY2VtZW50LnJpZ2h0ID0gbm9kZS5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5sZWZ0ID0gbm9kZS5sZWZ0O1xuXG5cdFx0Ly8gQ2hlY2tlIGlmIHZhbHVlIGlzIGxlZnQgb3IgcmlnaHQgb2YgcGFyZW50IG5vZGVcblx0XHRpZiAocm9vdC5yaWdodC5kYXRhID09IHZhbHVlKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gcmVwbGFjZW1lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QubGVmdCA9IHJlcGxhY2VtZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gcm9vdDtcblx0fVxuXHRyZXR1cm4gcmVwbGFjZW1lbnQ7XG59XG4iLCIvLyBSZXR1cm5zIHNvcnRlZCBBcnJheVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG5cdGlmIChhcnJheS5sZW5ndGggPD0gMSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fSBlbHNlIHtcblx0XHRsZXQgbWlkID0gTWF0aC5yb3VuZChhcnJheS5sZW5ndGggLyAyKTtcblx0XHRsZXQgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG5cdFx0bGV0IHJpZ2h0ID0gYXJyYXkuc2xpY2UobWlkKTtcblx0XHRyZXR1cm4gY29tcGFyZVR3byhtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUd28obGVmdCwgcmlnaHQpIHtcblx0bGV0IGFycmF5ID0gW107XG5cdHdoaWxlIChsZWZ0Lmxlbmd0aCAmJiByaWdodC5sZW5ndGgpIHtcblx0XHRpZiAobGVmdFswXSA9PSByaWdodFswXSkge1xuXHRcdFx0cmlnaHQuc3BsaWNlKDAsIDEpO1xuXHRcdH0gZWxzZSBpZiAobGVmdFswXSA+IHJpZ2h0WzBdKSB7XG5cdFx0XHRhcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcnJheS5jb25jYXQobGVmdCwgcmlnaHQpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGxldmVsT3JkZXIocm9vdCwgY2FsbGJhY2spIHtcblx0bGV0IGFyciA9IFtdO1xuXHRsZXQgcXVldWUgPSBbXTtcblx0cXVldWUucHVzaChyb290KTtcblxuXHR3aGlsZSAocXVldWUubGVuZ3RoKSB7XG5cdFx0cm9vdCA9IHF1ZXVlWzBdO1xuXHRcdGlmIChyb290LmxlZnQpIHF1ZXVlLnB1c2gocm9vdC5sZWZ0KTtcblx0XHRpZiAocm9vdC5yaWdodCkgcXVldWUucHVzaChyb290LnJpZ2h0KTtcblx0XHRhcnIucHVzaChyb290LmRhdGEpO1xuXHRcdHF1ZXVlLnNoaWZ0KCk7XG5cdH1cblxuXHQvLyBJZiBubyBjYWxsYmFjayByZXR1cm4gYXJyYXlcblx0aWYgKCFjYWxsYmFjaykgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlub3JkZXIocm9vdCwgYXJyID0gW10pIHtcblx0aWYgKCFyb290KSByZXR1cm4gYXJyO1xuXG5cdGlmIChyb290LmxlZnQpIHtcblx0XHRpbm9yZGVyKHJvb3QubGVmdCwgYXJyKTtcblx0fVxuXG5cdGFyci5wdXNoKHJvb3QuZGF0YSk7XG5cblx0aWYgKHJvb3QucmlnaHQpIHtcblx0XHRpbm9yZGVyKHJvb3QucmlnaHQsIGFycik7XG5cdH1cblxuXHRyZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlb3JkZXIocm9vdCwgYXJyID0gW10pIHtcblx0aWYgKCFyb290KSByZXR1cm4gYXJyO1xuXHRlbHNlIHtcblx0XHRhcnIucHVzaChyb290LmRhdGEpO1xuXHRcdHByZW9yZGVyKHJvb3QubGVmdCwgYXJyKTtcblx0XHRwcmVvcmRlcihyb290LnJpZ2h0LCBhcnIpO1xuXHR9XG5cblx0cmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc3RvcmRlcihyb290LCBhcnIgPSBbXSkge1xuXHRpZiAoIXJvb3QpIHJldHVybiBhcnI7XG5cdGVsc2Uge1xuXHRcdHBvc3RvcmRlcihyb290LmxlZnQsIGFycik7XG5cdFx0cG9zdG9yZGVyKHJvb3QucmlnaHQsIGFycik7XG5cdFx0YXJyLnB1c2gocm9vdC5kYXRhKTtcblx0fVxuXHRyZXR1cm4gYXJyO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gXCIuL21lcmdlU29ydC5qc1wiO1xuaW1wb3J0IHsgaW5zZXJ0LCBmaW5kTm9kZSwgZGVsZXRlTm9kZSB9IGZyb20gXCIuL2luc2VydERlbGV0ZUZpbmQuanNcIjtcbmltcG9ydCB7IGxldmVsT3JkZXIsIGlub3JkZXIsIHByZW9yZGVyLCBwb3N0b3JkZXIgfSBmcm9tIFwiLi90cmF2ZXJzZS5qc1wiO1xuaW1wb3J0IHsgZGVwdGgsIGhlaWdodCwgaXNCYWxhbmNlZCB9IGZyb20gXCIuL2hlaWdodERlcHRoLmpzXCI7XG5cbmZ1bmN0aW9uIHRyZWVOb2RlKHZhbHVlKSB7XG5cdGxldCBkYXRhID0gdmFsdWU7XG5cdGxldCBsZWZ0ID0gbnVsbDtcblx0bGV0IHJpZ2h0ID0gbnVsbDtcblx0cmV0dXJuIHsgZGF0YSwgbGVmdCwgcmlnaHQgfTtcbn1cblxuLy8gdGFrZXMgYXJyYXkgYXMgaW5wdXQgc29ydHMgaXQgYW5kIGNyZWF0ZXMgQlNUXG5mdW5jdGlvbiBidWlsZEJTVChhcnIpIHtcblx0bGV0IHNvcnRlZCA9IG1lcmdlU29ydChhcnIpO1xuXHRyZXR1cm4gY3JlYXRlQlNUKHNvcnRlZCk7XG59XG5cbi8vIENyZWF0ZXMgQlNUIGZyb20gc29ydGVkIEFycmF5XG5mdW5jdGlvbiBjcmVhdGVCU1QoYXJyKSB7XG5cdGlmIChhcnIubGVuZ3RoID09IDEpIHJldHVybiBudWxsO1xuXG5cdGxldCBtaWQgPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcblx0bGV0IHJvb3QgPSB0cmVlTm9kZShhcnJbbWlkXSk7XG5cblx0bGV0IHJpZ2h0UGFydCA9IGFyci5zcGxpY2UobWlkKTtcblx0bGV0IGxlZnRQYXJ0ID0gYXJyO1xuXHRyb290LmxlZnQgPSBjcmVhdGVCU1QobGVmdFBhcnQpO1xuXHRyb290LnJpZ2h0ID0gY3JlYXRlQlNUKHJpZ2h0UGFydCk7XG5cblx0cmV0dXJuIHJvb3Q7XG59XG5cbi8vIEJhbGFuY2UgdW5iYWxhbmNlZCB0cmVlXG5mdW5jdGlvbiBiYWxhbmNlVHJlZShyb290KSB7XG5cdGxldCBhcnIgPSBpbm9yZGVyKHJvb3QpO1xuXHRsZXQgdHJlZSA9IGNyZWF0ZUJTVChhcnIpO1xuXHRyZXR1cm4gdHJlZTtcbn1cblxuZXhwb3J0IGNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcblx0aWYgKG5vZGUgPT09IG51bGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuXHR9XG5cdGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG5cdGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcblx0fVxufTtcblxubGV0IGFycmF5ID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xubGV0IGFycmF5MiA9IFtcblx0MSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDE1LCAxMjM0LCAxLCA0LCA2MywgMjMsXG5dO1xuXG5sZXQgdHJlZTIgPSBidWlsZEJTVChhcnJheTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDEyKSwgdHJlZTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDIzKSwgdHJlZTIpO1xuLy8gY29uc29sZS5sb2coZmluZE5vZGUoMTUsIHRyZWUyKSk7XG5cbmxldCB0cmVlMyA9IGRlbGV0ZU5vZGUoMTUsIHRyZWUyKTtcbmNvbnNvbGUubG9nKGxldmVsT3JkZXIodHJlZTMpKTtcbmNvbnNvbGUubG9nKGlub3JkZXIodHJlZTMpKTtcbmNvbnNvbGUubG9nKHByZW9yZGVyKHRyZWUzKSk7XG5jb25zb2xlLmxvZyhwb3N0b3JkZXIodHJlZTMpKTtcbmNvbnNvbGUubG9nKGRlcHRoKDMsIHRyZWUzKSk7XG5jb25zb2xlLmxvZyhoZWlnaHQoOCwgdHJlZTMpKTtcbmluc2VydCh0cmVlTm9kZSgxKSwgdHJlZTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDIpLCB0cmVlMik7XG5pbnNlcnQodHJlZU5vZGUoMTMpLCB0cmVlMik7XG5pbnNlcnQodHJlZU5vZGUoMTQpLCB0cmVlMik7XG5jb25zb2xlLmxvZyhpc0JhbGFuY2VkKHRyZWUyKSk7XG5cbnByZXR0eVByaW50KHRyZWUzKTtcbnByZXR0eVByaW50KHRyZWUyKTtcblxucHJldHR5UHJpbnQoYmFsYW5jZVRyZWUodHJlZTIpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
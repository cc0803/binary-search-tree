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
/* harmony export */   height: () => (/* binding */ height)
/* harmony export */ });
function depth(value, root) {
	// define iterator
	let iterator = 1;

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

function height() {}


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

prettyPrint(tree3);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixPQUFPLEVBQUUseUJBQXlCO0FBQy9EO0FBQ0EsZ0JBQWdCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQzlEO0FBQ0EsNEJBQTRCLE9BQU8sRUFBRSx5QkFBeUI7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDREQUFNO0FBQ04sNERBQU07QUFDTjs7QUFFQSxZQUFZLGdFQUFVO0FBQ3RCLFlBQVksd0RBQVU7QUFDdEIsWUFBWSxxREFBTztBQUNuQixZQUFZLHNEQUFRO0FBQ3BCLFlBQVksdURBQVM7QUFDckIsWUFBWSxzREFBSzs7QUFFakIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvaGVpZ2h0RGVwdGguanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2luc2VydERlbGV0ZUZpbmQuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL21lcmdlU29ydC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvLi9zcmMvdHJhdmVyc2UuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBkZXB0aCh2YWx1ZSwgcm9vdCkge1xuXHQvLyBkZWZpbmUgaXRlcmF0b3Jcblx0bGV0IGl0ZXJhdG9yID0gMTtcblxuXHQvLyBsb29wIHVudGlsIHJvb3QgPT0gbm9kZSBhbmQgaXRlcmF0b3IrK1xuXHR3aGlsZSAocm9vdC5kYXRhICE9IHZhbHVlKSB7XG5cdFx0Ly8gY2hlY2sgaWYgbm9kZSBpcyBpbiB0cmVlXG5cdFx0aWYgKHJvb3QuZGF0YSA9PSBudWxsKSByZXR1cm4gMDtcblxuXHRcdGlmIChyb290LmRhdGEgPiB2YWx1ZSkge1xuXHRcdFx0cm9vdCA9IHJvb3QubGVmdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdCA9IHJvb3QucmlnaHQ7XG5cdFx0fVxuXHRcdGl0ZXJhdG9yKys7XG5cdH1cblx0cmV0dXJuIGl0ZXJhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0KCkge31cbiIsImV4cG9ydCBmdW5jdGlvbiBpbnNlcnQobm9kZSwgcm9vdCkge1xuXHRpZiAocm9vdC5kYXRhID09IG5vZGUuZGF0YSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0aWYgKHJvb3QuZGF0YSA+IG5vZGUuZGF0YSkge1xuXHRcdGlmIChyb290LmxlZnQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5sZWZ0KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QucmlnaHQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gcm9vdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zZXJ0KG5vZGUsIHJvb3QucmlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBjaGVjayBpZiBub3RlIGlzIGluIHRyZWUgYW5kIGEgbnVtYmVyXG5cdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXHRpZiAobm9kZSA9PSBudWxsIHx8IGlzTmFOKHZhbHVlKSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0Ly8gRmluZCBwYXJlbnQgbm9kZVxuXHRsZXQgcGFyZW50ID0gZmluZFBhcmVudE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdC8qIFxuXHRDaGVjayBob3cgbWFueSBjaGlsZHJlbiBhIG5vZGUgaGFzIGFuZCBhY2NvcmRpbmdcblx0dG8gdGhhdCByZW1vdmUgdGhlIHR5cGUgb2Ygbm9kZSB0aGVyZSBpcyBnb3Rcblx0ICovXG5cdGlmIChub2RlLmxlZnQgPT0gbnVsbCAmJiBub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRyZXR1cm4gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHBhcmVudCk7XG5cdH0gZWxzZSBpZiAobm9kZS5sZWZ0ID09IG51bGwgfHwgbm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZU5vZGVPbmVDaGlsZCh2YWx1ZSwgcGFyZW50KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZGVsZXRlTm9kZU11bHRpcGxlQ2hpbGRyZW4odmFsdWUsIHBhcmVudCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gQ2hlY2sgaWYgcm9vdCBha2EgcGFyZW50IGRvZXMgZXhpc3Rcblx0aWYgKHJvb3QgPT0gbnVsbCkge1xuXHRcdC8vIGlmIHBhcmVudCBub2RlIGRvZXNuJ3QgZXhpc3QgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKHZhbHVlID4gcm9vdC5kYXRhKSB7XG5cdFx0cm9vdC5yaWdodCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5sZWZ0ID0gbnVsbDtcblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlKHZhbHVlLCByb290KSB7XG5cdHdoaWxlIChyb290LmRhdGEgIT09IHZhbHVlKSB7XG5cdFx0aWYgKHJvb3QgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSBlbHNlIGlmIChyb290LmRhdGEgPiB2YWx1ZSkge1xuXHRcdFx0cm9vdCA9IHJvb3QubGVmdDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgdmFsdWUpIHtcblx0XHRcdHJvb3QgPSByb290LnJpZ2h0O1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiBmaW5kUGFyZW50Tm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBjaGVjayBpZiByb290IGlzIGVxdWFsIHZhbHVlO1xuXHRpZiAocm9vdC5kYXRhID09IHZhbHVlKSB7XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblx0d2hpbGUgKHJvb3QgIT09IG51bGwpIHtcblx0XHRpZiAocm9vdC5kYXRhID4gdmFsdWUpIHtcblx0XHRcdGlmIChyb290LmxlZnQuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gcm9vdDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJvb3QgPSByb290LmxlZnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChyb290LnJpZ2h0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVPbmVDaGlsZCh2YWx1ZSwgcm9vdCkge1xuXHRsZXQgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCByb290KTtcblxuXHQvLyBDaGVjayBvbiB3aGljaCBzaWRlIG9mIHRoZSBwYXJlbnQgdGhlIG5vZGUgaXNcblx0aWYgKHJvb3QucmlnaHQgPT0gbm9kZSkge1xuXHRcdGlmIChub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRcdHJvb3QucmlnaHQgPSBub2RlLmxlZnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QucmlnaHQgPSBub2RlLnJpZ2h0O1xuXHRcdH1cblx0XHRyZXR1cm4gcm9vdDtcblx0fSBlbHNlIHtcblx0XHRpZiAobm9kZS5sZWZ0ID09IG51bGwpIHtcblx0XHRcdHJvb3QubGVmdCA9IG5vZGUucmlnaHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QubGVmdCA9IG5vZGUubGVmdDtcblx0XHR9XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZU11bHRpcGxlQ2hpbGRyZW4odmFsdWUsIHJvb3QpIHtcblx0bGV0IHJlcGxhY2VtZW50ID0gcm9vdC5yaWdodDtcblx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0Ly8gTWF5YmUgY2hlY2sgaWYgbm9kZSBldmVuIGhhcyBhIHBhcmVudCBub2RlID9cblx0aWYgKHJvb3QuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdGxldCBwYXJlbnQ7XG5cdFx0d2hpbGUgKHJlcGxhY2VtZW50LmxlZnQgIT09IG51bGwpIHtcblx0XHRcdHBhcmVudCA9IHJlcGxhY2VtZW50O1xuXHRcdFx0cmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudC5sZWZ0O1xuXHRcdH1cblx0XHRwYXJlbnQubGVmdCA9IHJlcGxhY2VtZW50LnJpZ2h0O1xuXHRcdHJlcGxhY2VtZW50LnJpZ2h0ID0gcm9vdC5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5sZWZ0ID0gcm9vdC5sZWZ0O1xuXG5cdFx0Ly9yZXR1cm4gcmVwbGFjZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0XHRsZXQgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCByb290KTtcblxuXHRcdC8vIEZpbmQgdGhlIHJlcGxhY2VtZW50IG5vZGUgKG5leHQgYmlnZ2VyKVxuXHRcdHJlcGxhY2VtZW50ID0gbm9kZS5yaWdodDtcblx0XHQvLyBkZWZpbmUgdGhlIHBhcmVudCBub2RlIGZvciB0aGUgcmVwbGFjZW1lbnQ7XG5cdFx0bGV0IHBhcmVudDtcblx0XHR3aGlsZSAocmVwbGFjZW1lbnQubGVmdCAhPT0gbnVsbCkge1xuXHRcdFx0cGFyZW50ID0gcmVwbGFjZW1lbnQ7XG5cdFx0XHRyZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50LmxlZnQ7XG5cdFx0fVxuXG5cdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudC5yaWdodDtcblxuXHRcdC8vIElmIHJlcGxhY2VtZW50IG5vZGUgaGFzIGNoaWxkcmVuXG5cdFx0aWYgKHJlcGxhY2VtZW50LnJpZ2h0ICE9PSBudWxsKSB7XG5cdFx0XHRsZXQgcmVwbGFjZW1lbnRDaGlsZHJlbiA9IHJlcGxhY2VtZW50LnJpZ2h0O1xuXHRcdFx0Ly8gdGFrZSBwYXJlbnQgZWxlbWVudFxuXHRcdFx0Ly8gcHV0IGNoaWxkcmVuIHRvIG9yaWdpbmFsIHBvc2l0aW9uIG9mIHJlcGxhY2VtZW50IG5vZGUuXG5cdFx0XHRwYXJlbnQubGVmdCA9IHJlcGxhY2VtZW50Q2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0cmVwbGFjZW1lbnQucmlnaHQgPSBub2RlLnJpZ2h0O1xuXHRcdHJlcGxhY2VtZW50LmxlZnQgPSBub2RlLmxlZnQ7XG5cblx0XHQvLyBDaGVja2UgaWYgdmFsdWUgaXMgbGVmdCBvciByaWdodCBvZiBwYXJlbnQgbm9kZVxuXHRcdGlmIChyb290LnJpZ2h0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdHJvb3QucmlnaHQgPSByZXBsYWNlbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdC5sZWZ0ID0gcmVwbGFjZW1lbnQ7XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHJldHVybiByZXBsYWNlbWVudDtcbn1cbiIsIi8vIFJldHVybnMgc29ydGVkIEFycmF5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZVNvcnQoYXJyYXkpIHtcblx0aWYgKGFycmF5Lmxlbmd0aCA8PSAxKSB7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9IGVsc2Uge1xuXHRcdGxldCBtaWQgPSBNYXRoLnJvdW5kKGFycmF5Lmxlbmd0aCAvIDIpO1xuXHRcdGxldCBsZWZ0ID0gYXJyYXkuc2xpY2UoMCwgbWlkKTtcblx0XHRsZXQgcmlnaHQgPSBhcnJheS5zbGljZShtaWQpO1xuXHRcdHJldHVybiBjb21wYXJlVHdvKG1lcmdlU29ydChsZWZ0KSwgbWVyZ2VTb3J0KHJpZ2h0KSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZVR3byhsZWZ0LCByaWdodCkge1xuXHRsZXQgYXJyYXkgPSBbXTtcblx0d2hpbGUgKGxlZnQubGVuZ3RoICYmIHJpZ2h0Lmxlbmd0aCkge1xuXHRcdGlmIChsZWZ0WzBdID09IHJpZ2h0WzBdKSB7XG5cdFx0XHRyaWdodC5zcGxpY2UoMCwgMSk7XG5cdFx0fSBlbHNlIGlmIChsZWZ0WzBdID4gcmlnaHRbMF0pIHtcblx0XHRcdGFycmF5LnB1c2gocmlnaHQuc2hpZnQoKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFycmF5LnB1c2gobGVmdC5zaGlmdCgpKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFycmF5LmNvbmNhdChsZWZ0LCByaWdodCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gbGV2ZWxPcmRlcihyb290LCBjYWxsYmFjaykge1xuXHRsZXQgYXJyID0gW107XG5cdGxldCBxdWV1ZSA9IFtdO1xuXHRxdWV1ZS5wdXNoKHJvb3QpO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHRyb290ID0gcXVldWVbMF07XG5cdFx0aWYgKHJvb3QubGVmdCkgcXVldWUucHVzaChyb290LmxlZnQpO1xuXHRcdGlmIChyb290LnJpZ2h0KSBxdWV1ZS5wdXNoKHJvb3QucmlnaHQpO1xuXHRcdGFyci5wdXNoKHJvb3QuZGF0YSk7XG5cdFx0cXVldWUuc2hpZnQoKTtcblx0fVxuXG5cdC8vIElmIG5vIGNhbGxiYWNrIHJldHVybiBhcnJheVxuXHRpZiAoIWNhbGxiYWNrKSByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5vcmRlcihyb290LCBhcnIgPSBbXSkge1xuXHRpZiAoIXJvb3QpIHJldHVybiBhcnI7XG5cblx0aWYgKHJvb3QubGVmdCkge1xuXHRcdGlub3JkZXIocm9vdC5sZWZ0LCBhcnIpO1xuXHR9XG5cblx0YXJyLnB1c2gocm9vdC5kYXRhKTtcblxuXHRpZiAocm9vdC5yaWdodCkge1xuXHRcdGlub3JkZXIocm9vdC5yaWdodCwgYXJyKTtcblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVvcmRlcihyb290LCBhcnIgPSBbXSkge1xuXHRpZiAoIXJvb3QpIHJldHVybiBhcnI7XG5cdGVsc2Uge1xuXHRcdGFyci5wdXNoKHJvb3QuZGF0YSk7XG5cdFx0cHJlb3JkZXIocm9vdC5sZWZ0LCBhcnIpO1xuXHRcdHByZW9yZGVyKHJvb3QucmlnaHQsIGFycik7XG5cdH1cblxuXHRyZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdG9yZGVyKHJvb3QsIGFyciA9IFtdKSB7XG5cdGlmICghcm9vdCkgcmV0dXJuIGFycjtcblx0ZWxzZSB7XG5cdFx0cG9zdG9yZGVyKHJvb3QubGVmdCwgYXJyKTtcblx0XHRwb3N0b3JkZXIocm9vdC5yaWdodCwgYXJyKTtcblx0XHRhcnIucHVzaChyb290LmRhdGEpO1xuXHR9XG5cdHJldHVybiBhcnI7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtZXJnZVNvcnQgZnJvbSBcIi4vbWVyZ2VTb3J0LmpzXCI7XG5pbXBvcnQgeyBpbnNlcnQsIGZpbmROb2RlLCBkZWxldGVOb2RlIH0gZnJvbSBcIi4vaW5zZXJ0RGVsZXRlRmluZC5qc1wiO1xuaW1wb3J0IHsgbGV2ZWxPcmRlciwgaW5vcmRlciwgcHJlb3JkZXIsIHBvc3RvcmRlciB9IGZyb20gXCIuL3RyYXZlcnNlLmpzXCI7XG5pbXBvcnQgeyBkZXB0aCB9IGZyb20gXCIuL2hlaWdodERlcHRoLmpzXCI7XG5cbmZ1bmN0aW9uIHRyZWVOb2RlKHZhbHVlKSB7XG5cdGxldCBkYXRhID0gdmFsdWU7XG5cdGxldCBsZWZ0ID0gbnVsbDtcblx0bGV0IHJpZ2h0ID0gbnVsbDtcblx0cmV0dXJuIHsgZGF0YSwgbGVmdCwgcmlnaHQgfTtcbn1cblxuLy8gdGFrZXMgYXJyYXkgYXMgaW5wdXQgc29ydHMgaXQgYW5kIGNyZWF0ZXMgQlNUXG5mdW5jdGlvbiBidWlsZEJTVChhcnIpIHtcblx0bGV0IHNvcnRlZCA9IG1lcmdlU29ydChhcnIpO1xuXHRyZXR1cm4gY3JlYXRlQlNUKHNvcnRlZCk7XG59XG5cbi8vIENyZWF0ZXMgQlNUIGZyb20gc29ydGVkIEFycmF5XG5mdW5jdGlvbiBjcmVhdGVCU1QoYXJyKSB7XG5cdGlmIChhcnIubGVuZ3RoID09IDEpIHJldHVybiBudWxsO1xuXG5cdGxldCBtaWQgPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcblx0bGV0IHJvb3QgPSB0cmVlTm9kZShhcnJbbWlkXSk7XG5cblx0bGV0IHJpZ2h0UGFydCA9IGFyci5zcGxpY2UobWlkKTtcblx0bGV0IGxlZnRQYXJ0ID0gYXJyO1xuXHRyb290LmxlZnQgPSBjcmVhdGVCU1QobGVmdFBhcnQpO1xuXHRyb290LnJpZ2h0ID0gY3JlYXRlQlNUKHJpZ2h0UGFydCk7XG5cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmV4cG9ydCBjb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XG5cdGlmIChub2RlID09PSBudWxsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG5cdFx0cHJldHR5UHJpbnQobm9kZS5yaWdodCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcblx0fVxuXHRjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xuXHRpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG5cdFx0cHJldHR5UHJpbnQobm9kZS5sZWZ0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XG5cdH1cbn07XG5cbmxldCBhcnJheSA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XTtcbmxldCBhcnJheTIgPSBbXG5cdDEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxNSwgMTIzNCwgMSwgNCwgNjMsIDIzLFxuXTtcblxubGV0IHRyZWUyID0gYnVpbGRCU1QoYXJyYXkyKTtcbmluc2VydCh0cmVlTm9kZSgxMiksIHRyZWUyKTtcbmluc2VydCh0cmVlTm9kZSgyMyksIHRyZWUyKTtcbi8vIGNvbnNvbGUubG9nKGZpbmROb2RlKDE1LCB0cmVlMikpO1xuXG5sZXQgdHJlZTMgPSBkZWxldGVOb2RlKDE1LCB0cmVlMik7XG5jb25zb2xlLmxvZyhsZXZlbE9yZGVyKHRyZWUzKSk7XG5jb25zb2xlLmxvZyhpbm9yZGVyKHRyZWUzKSk7XG5jb25zb2xlLmxvZyhwcmVvcmRlcih0cmVlMykpO1xuY29uc29sZS5sb2cocG9zdG9yZGVyKHRyZWUzKSk7XG5jb25zb2xlLmxvZyhkZXB0aCgzLCB0cmVlMykpO1xuXG5wcmV0dHlQcmludCh0cmVlMyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
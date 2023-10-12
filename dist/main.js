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

/***/ "./src/levelOrder.js":
/*!***************************!*\
  !*** ./src/levelOrder.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   levelOrder: () => (/* binding */ levelOrder)
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prettyPrint: () => (/* binding */ prettyPrint)
/* harmony export */ });
/* harmony import */ var _mergeSort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeSort.js */ "./src/mergeSort.js");
/* harmony import */ var _insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertDeleteFind.js */ "./src/insertDeleteFind.js");
/* harmony import */ var _levelOrder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levelOrder.js */ "./src/levelOrder.js");




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
// console.log(findNode(15, tree2));

let tree3 = (0,_insertDeleteFind_js__WEBPACK_IMPORTED_MODULE_1__.deleteNode)(15, tree2);
console.log((0,_levelOrder_js__WEBPACK_IMPORTED_MODULE_2__.levelOrder)(tree3));

prettyPrint(tree3);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLDBEQUFVOztBQUV0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbnNlcnREZWxldGVGaW5kLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9sZXZlbE9yZGVyLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9tZXJnZVNvcnQuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpbnNlcnQobm9kZSwgcm9vdCkge1xuXHRpZiAocm9vdC5kYXRhID09IG5vZGUuZGF0YSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0aWYgKHJvb3QuZGF0YSA+IG5vZGUuZGF0YSkge1xuXHRcdGlmIChyb290LmxlZnQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5sZWZ0ID0gbm9kZTtcblx0XHRcdHJldHVybiByb290O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbnNlcnQobm9kZSwgcm9vdC5sZWZ0KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgbm9kZS5kYXRhKSB7XG5cdFx0aWYgKHJvb3QucmlnaHQgPT0gbnVsbCkge1xuXHRcdFx0cm9vdC5yaWdodCA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gcm9vdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zZXJ0KG5vZGUsIHJvb3QucmlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBjaGVjayBpZiBub3RlIGlzIGluIHRyZWUgYW5kIGEgbnVtYmVyXG5cdGxldCBub2RlID0gZmluZE5vZGUodmFsdWUsIHJvb3QpO1xuXHRpZiAobm9kZSA9PSBudWxsIHx8IGlzTmFOKHZhbHVlKSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cblx0Ly8gRmluZCBwYXJlbnQgbm9kZVxuXHRsZXQgcGFyZW50ID0gZmluZFBhcmVudE5vZGUodmFsdWUsIHJvb3QpO1xuXG5cdC8qIFxuXHRDaGVjayBob3cgbWFueSBjaGlsZHJlbiBhIG5vZGUgaGFzIGFuZCBhY2NvcmRpbmdcblx0dG8gdGhhdCByZW1vdmUgdGhlIHR5cGUgb2Ygbm9kZSB0aGVyZSBpcyBnb3Rcblx0ICovXG5cdGlmIChub2RlLmxlZnQgPT0gbnVsbCAmJiBub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRyZXR1cm4gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHBhcmVudCk7XG5cdH0gZWxzZSBpZiAobm9kZS5sZWZ0ID09IG51bGwgfHwgbm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZU5vZGVPbmVDaGlsZCh2YWx1ZSwgcGFyZW50KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZGVsZXRlTm9kZU11bHRpcGxlQ2hpbGRyZW4odmFsdWUsIHBhcmVudCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlTGVhZk5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gQ2hlY2sgaWYgcm9vdCBha2EgcGFyZW50IGRvZXMgZXhpc3Rcblx0aWYgKHJvb3QgPT0gbnVsbCkge1xuXHRcdC8vIGlmIHBhcmVudCBub2RlIGRvZXNuJ3QgZXhpc3QgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKHZhbHVlID4gcm9vdC5kYXRhKSB7XG5cdFx0cm9vdC5yaWdodCA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5sZWZ0ID0gbnVsbDtcblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlKHZhbHVlLCByb290KSB7XG5cdHdoaWxlIChyb290LmRhdGEgIT09IHZhbHVlKSB7XG5cdFx0aWYgKHJvb3QgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSBlbHNlIGlmIChyb290LmRhdGEgPiB2YWx1ZSkge1xuXHRcdFx0cm9vdCA9IHJvb3QubGVmdDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZiAocm9vdC5kYXRhIDwgdmFsdWUpIHtcblx0XHRcdHJvb3QgPSByb290LnJpZ2h0O1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiBmaW5kUGFyZW50Tm9kZSh2YWx1ZSwgcm9vdCkge1xuXHQvLyBjaGVjayBpZiByb290IGlzIGVxdWFsIHZhbHVlO1xuXHRpZiAocm9vdC5kYXRhID09IHZhbHVlKSB7XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cblx0d2hpbGUgKHJvb3QgIT09IG51bGwpIHtcblx0XHRpZiAocm9vdC5kYXRhID4gdmFsdWUpIHtcblx0XHRcdGlmIChyb290LmxlZnQuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gcm9vdDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJvb3QgPSByb290LmxlZnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChyb290LnJpZ2h0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVPbmVDaGlsZCh2YWx1ZSwgcm9vdCkge1xuXHRsZXQgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCByb290KTtcblxuXHQvLyBDaGVjayBvbiB3aGljaCBzaWRlIG9mIHRoZSBwYXJlbnQgdGhlIG5vZGUgaXNcblx0aWYgKHJvb3QucmlnaHQgPT0gbm9kZSkge1xuXHRcdGlmIChub2RlLnJpZ2h0ID09IG51bGwpIHtcblx0XHRcdHJvb3QucmlnaHQgPSBub2RlLmxlZnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QucmlnaHQgPSBub2RlLnJpZ2h0O1xuXHRcdH1cblx0XHRyZXR1cm4gcm9vdDtcblx0fSBlbHNlIHtcblx0XHRpZiAobm9kZS5sZWZ0ID09IG51bGwpIHtcblx0XHRcdHJvb3QubGVmdCA9IG5vZGUucmlnaHQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QubGVmdCA9IG5vZGUubGVmdDtcblx0XHR9XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZU11bHRpcGxlQ2hpbGRyZW4odmFsdWUsIHJvb3QpIHtcblx0bGV0IHJlcGxhY2VtZW50ID0gcm9vdC5yaWdodDtcblx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0Ly8gTWF5YmUgY2hlY2sgaWYgbm9kZSBldmVuIGhhcyBhIHBhcmVudCBub2RlID9cblx0aWYgKHJvb3QuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdGxldCBwYXJlbnQ7XG5cdFx0d2hpbGUgKHJlcGxhY2VtZW50LmxlZnQgIT09IG51bGwpIHtcblx0XHRcdHBhcmVudCA9IHJlcGxhY2VtZW50O1xuXHRcdFx0cmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudC5sZWZ0O1xuXHRcdH1cblx0XHRwYXJlbnQubGVmdCA9IHJlcGxhY2VtZW50LnJpZ2h0O1xuXHRcdHJlcGxhY2VtZW50LnJpZ2h0ID0gcm9vdC5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5sZWZ0ID0gcm9vdC5sZWZ0O1xuXG5cdFx0Ly9yZXR1cm4gcmVwbGFjZW1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0XHRsZXQgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCByb290KTtcblxuXHRcdC8vIEZpbmQgdGhlIHJlcGxhY2VtZW50IG5vZGUgKG5leHQgYmlnZ2VyKVxuXHRcdHJlcGxhY2VtZW50ID0gbm9kZS5yaWdodDtcblx0XHQvLyBkZWZpbmUgdGhlIHBhcmVudCBub2RlIGZvciB0aGUgcmVwbGFjZW1lbnQ7XG5cdFx0bGV0IHBhcmVudDtcblx0XHR3aGlsZSAocmVwbGFjZW1lbnQubGVmdCAhPT0gbnVsbCkge1xuXHRcdFx0cGFyZW50ID0gcmVwbGFjZW1lbnQ7XG5cdFx0XHRyZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50LmxlZnQ7XG5cdFx0fVxuXG5cdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudC5yaWdodDtcblxuXHRcdC8vIElmIHJlcGxhY2VtZW50IG5vZGUgaGFzIGNoaWxkcmVuXG5cdFx0aWYgKHJlcGxhY2VtZW50LnJpZ2h0ICE9PSBudWxsKSB7XG5cdFx0XHRsZXQgcmVwbGFjZW1lbnRDaGlsZHJlbiA9IHJlcGxhY2VtZW50LnJpZ2h0O1xuXHRcdFx0Ly8gdGFrZSBwYXJlbnQgZWxlbWVudFxuXHRcdFx0Ly8gcHV0IGNoaWxkcmVuIHRvIG9yaWdpbmFsIHBvc2l0aW9uIG9mIHJlcGxhY2VtZW50IG5vZGUuXG5cdFx0XHRwYXJlbnQubGVmdCA9IHJlcGxhY2VtZW50Q2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0cmVwbGFjZW1lbnQucmlnaHQgPSBub2RlLnJpZ2h0O1xuXHRcdHJlcGxhY2VtZW50LmxlZnQgPSBub2RlLmxlZnQ7XG5cblx0XHQvLyBDaGVja2UgaWYgdmFsdWUgaXMgbGVmdCBvciByaWdodCBvZiBwYXJlbnQgbm9kZVxuXHRcdGlmIChyb290LnJpZ2h0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdHJvb3QucmlnaHQgPSByZXBsYWNlbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cm9vdC5sZWZ0ID0gcmVwbGFjZW1lbnQ7XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHJldHVybiByZXBsYWNlbWVudDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBsZXZlbE9yZGVyKHJvb3QsIGNhbGxiYWNrKSB7XG5cdGxldCBhcnIgPSBbXTtcblx0bGV0IHF1ZXVlID0gW107XG5cdHF1ZXVlLnB1c2gocm9vdCk7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuXHRcdHJvb3QgPSBxdWV1ZVswXTtcblx0XHRpZiAocm9vdC5sZWZ0KSBxdWV1ZS5wdXNoKHJvb3QubGVmdCk7XG5cdFx0aWYgKHJvb3QucmlnaHQpIHF1ZXVlLnB1c2gocm9vdC5yaWdodCk7XG5cdFx0YXJyLnB1c2gocm9vdC5kYXRhKTtcblx0XHRxdWV1ZS5zaGlmdCgpO1xuXHR9XG5cblx0Ly8gSWYgbm8gY2FsbGJhY2sgcmV0dXJuIGFycmF5XG5cdGlmICghY2FsbGJhY2spIHJldHVybiBhcnI7XG59XG4iLCIvLyBSZXR1cm5zIHNvcnRlZCBBcnJheVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG5cdGlmIChhcnJheS5sZW5ndGggPD0gMSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fSBlbHNlIHtcblx0XHRsZXQgbWlkID0gTWF0aC5yb3VuZChhcnJheS5sZW5ndGggLyAyKTtcblx0XHRsZXQgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG5cdFx0bGV0IHJpZ2h0ID0gYXJyYXkuc2xpY2UobWlkKTtcblx0XHRyZXR1cm4gY29tcGFyZVR3byhtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUd28obGVmdCwgcmlnaHQpIHtcblx0bGV0IGFycmF5ID0gW107XG5cdHdoaWxlIChsZWZ0Lmxlbmd0aCAmJiByaWdodC5sZW5ndGgpIHtcblx0XHRpZiAobGVmdFswXSA9PSByaWdodFswXSkge1xuXHRcdFx0cmlnaHQuc3BsaWNlKDAsIDEpO1xuXHRcdH0gZWxzZSBpZiAobGVmdFswXSA+IHJpZ2h0WzBdKSB7XG5cdFx0XHRhcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcnJheS5jb25jYXQobGVmdCwgcmlnaHQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbWVyZ2VTb3J0IGZyb20gXCIuL21lcmdlU29ydC5qc1wiO1xuaW1wb3J0IHsgaW5zZXJ0LCBmaW5kTm9kZSwgZGVsZXRlTm9kZSB9IGZyb20gXCIuL2luc2VydERlbGV0ZUZpbmQuanNcIjtcbmltcG9ydCB7IGxldmVsT3JkZXIgfSBmcm9tIFwiLi9sZXZlbE9yZGVyLmpzXCI7XG5cbmZ1bmN0aW9uIHRyZWVOb2RlKHZhbHVlKSB7XG5cdGxldCBkYXRhID0gdmFsdWU7XG5cdGxldCBsZWZ0ID0gbnVsbDtcblx0bGV0IHJpZ2h0ID0gbnVsbDtcblx0cmV0dXJuIHsgZGF0YSwgbGVmdCwgcmlnaHQgfTtcbn1cblxuLy8gdGFrZXMgYXJyYXkgYXMgaW5wdXQgc29ydHMgaXQgYW5kIGNyZWF0ZXMgQlNUXG5mdW5jdGlvbiBidWlsZEJTVChhcnIpIHtcblx0bGV0IHNvcnRlZCA9IG1lcmdlU29ydChhcnIpO1xuXHRyZXR1cm4gY3JlYXRlQlNUKHNvcnRlZCwgc29ydGVkWzBdLCBzb3J0ZWRbc29ydGVkLmxlbmd0aCAtIDFdKTtcbn1cblxuLy8gQ3JlYXRlcyBCU1QgZnJvbSBzb3J0ZWQgQXJyYXlcbmZ1bmN0aW9uIGNyZWF0ZUJTVChhcnIpIHtcblx0aWYgKGFyci5sZW5ndGggPT0gMSkgcmV0dXJuIG51bGw7XG5cblx0bGV0IG1pZCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuXHRsZXQgcm9vdCA9IHRyZWVOb2RlKGFyclttaWRdKTtcblxuXHRsZXQgcmlnaHRQYXJ0ID0gYXJyLnNwbGljZShtaWQpO1xuXHRsZXQgbGVmdFBhcnQgPSBhcnI7XG5cdHJvb3QubGVmdCA9IGNyZWF0ZUJTVChsZWZ0UGFydCk7XG5cdHJvb3QucmlnaHQgPSBjcmVhdGVCU1QocmlnaHRQYXJ0KTtcblxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZXhwb3J0IGNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcblx0aWYgKG5vZGUgPT09IG51bGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLnJpZ2h0LCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xuXHR9XG5cdGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG5cdGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcblx0XHRwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcblx0fVxufTtcblxubGV0IGFycmF5ID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldO1xubGV0IGFycmF5MiA9IFtcblx0MSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDE1LCAxMjM0LCAxLCA0LCA2MywgMjMsXG5dO1xuXG5sZXQgdHJlZTIgPSBidWlsZEJTVChhcnJheTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDEyKSwgdHJlZTIpO1xuaW5zZXJ0KHRyZWVOb2RlKDIzKSwgdHJlZTIpO1xuLy8gY29uc29sZS5sb2coZmluZE5vZGUoMTUsIHRyZWUyKSk7XG5cbmxldCB0cmVlMyA9IGRlbGV0ZU5vZGUoMTUsIHRyZWUyKTtcbmNvbnNvbGUubG9nKGxldmVsT3JkZXIodHJlZTMpKTtcblxucHJldHR5UHJpbnQodHJlZTMpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
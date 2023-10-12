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
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.levelOrder)(tree3));
console.log((0,_traverse_js__WEBPACK_IMPORTED_MODULE_2__.inorder)(tree3));

prettyPrint(tree3);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0EsNERBQU07QUFDTiw0REFBTTtBQUNOOztBQUVBLFlBQVksZ0VBQVU7QUFDdEIsWUFBWSx3REFBVTtBQUN0QixZQUFZLHFEQUFPOztBQUVuQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbnNlcnREZWxldGVGaW5kLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9tZXJnZVNvcnQuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlLy4vc3JjL3RyYXZlcnNlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0KG5vZGUsIHJvb3QpIHtcblx0aWYgKHJvb3QuZGF0YSA9PSBub2RlLmRhdGEpIHtcblx0XHRyZXR1cm4gcm9vdDtcblx0fVxuXG5cdGlmIChyb290LmRhdGEgPiBub2RlLmRhdGEpIHtcblx0XHRpZiAocm9vdC5sZWZ0ID09IG51bGwpIHtcblx0XHRcdHJvb3QubGVmdCA9IG5vZGU7XG5cdFx0XHRyZXR1cm4gcm9vdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW5zZXJ0KG5vZGUsIHJvb3QubGVmdCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IG5vZGUuZGF0YSkge1xuXHRcdGlmIChyb290LnJpZ2h0ID09IG51bGwpIHtcblx0XHRcdHJvb3QucmlnaHQgPSBub2RlO1xuXHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc2VydChub2RlLCByb290LnJpZ2h0KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZU5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gY2hlY2sgaWYgbm90ZSBpcyBpbiB0cmVlIGFuZCBhIG51bWJlclxuXHRsZXQgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCByb290KTtcblx0aWYgKG5vZGUgPT0gbnVsbCB8fCBpc05hTih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gcm9vdDtcblx0fVxuXG5cdC8vIEZpbmQgcGFyZW50IG5vZGVcblx0bGV0IHBhcmVudCA9IGZpbmRQYXJlbnROb2RlKHZhbHVlLCByb290KTtcblxuXHQvKiBcblx0Q2hlY2sgaG93IG1hbnkgY2hpbGRyZW4gYSBub2RlIGhhcyBhbmQgYWNjb3JkaW5nXG5cdHRvIHRoYXQgcmVtb3ZlIHRoZSB0eXBlIG9mIG5vZGUgdGhlcmUgaXMgZ290XG5cdCAqL1xuXHRpZiAobm9kZS5sZWZ0ID09IG51bGwgJiYgbm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZUxlYWZOb2RlKHZhbHVlLCBwYXJlbnQpO1xuXHR9IGVsc2UgaWYgKG5vZGUubGVmdCA9PSBudWxsIHx8IG5vZGUucmlnaHQgPT0gbnVsbCkge1xuXHRcdHJldHVybiBkZWxldGVOb2RlT25lQ2hpbGQodmFsdWUsIHBhcmVudCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGRlbGV0ZU5vZGVNdWx0aXBsZUNoaWxkcmVuKHZhbHVlLCBwYXJlbnQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxlYWZOb2RlKHZhbHVlLCByb290KSB7XG5cdC8vIENoZWNrIGlmIHJvb3QgYWthIHBhcmVudCBkb2VzIGV4aXN0XG5cdGlmIChyb290ID09IG51bGwpIHtcblx0XHQvLyBpZiBwYXJlbnQgbm9kZSBkb2Vzbid0IGV4aXN0IHJldHVybiBudWxsO1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGlmICh2YWx1ZSA+IHJvb3QuZGF0YSkge1xuXHRcdHJvb3QucmlnaHQgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QubGVmdCA9IG51bGw7XG5cdH1cblx0cmV0dXJuIHJvb3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZSh2YWx1ZSwgcm9vdCkge1xuXHR3aGlsZSAocm9vdC5kYXRhICE9PSB2YWx1ZSkge1xuXHRcdGlmIChyb290ID09IG51bGwpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0gZWxzZSBpZiAocm9vdC5kYXRhID4gdmFsdWUpIHtcblx0XHRcdHJvb3QgPSByb290LmxlZnQ7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKHJvb3QuZGF0YSA8IHZhbHVlKSB7XG5cdFx0XHRyb290ID0gcm9vdC5yaWdodDtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gZmluZFBhcmVudE5vZGUodmFsdWUsIHJvb3QpIHtcblx0Ly8gY2hlY2sgaWYgcm9vdCBpcyBlcXVhbCB2YWx1ZTtcblx0aWYgKHJvb3QuZGF0YSA9PSB2YWx1ZSkge1xuXHRcdHJldHVybiByb290O1xuXHR9XG5cdHdoaWxlIChyb290ICE9PSBudWxsKSB7XG5cdFx0aWYgKHJvb3QuZGF0YSA+IHZhbHVlKSB7XG5cdFx0XHRpZiAocm9vdC5sZWZ0LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHJvb3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyb290ID0gcm9vdC5sZWZ0O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocm9vdC5yaWdodC5kYXRhID09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiByb290O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QucmlnaHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlT25lQ2hpbGQodmFsdWUsIHJvb3QpIHtcblx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0Ly8gQ2hlY2sgb24gd2hpY2ggc2lkZSBvZiB0aGUgcGFyZW50IHRoZSBub2RlIGlzXG5cdGlmIChyb290LnJpZ2h0ID09IG5vZGUpIHtcblx0XHRpZiAobm9kZS5yaWdodCA9PSBudWxsKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZS5sZWZ0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gbm9kZS5yaWdodDtcblx0XHR9XG5cdFx0cmV0dXJuIHJvb3Q7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKG5vZGUubGVmdCA9PSBudWxsKSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlLnJpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyb290LmxlZnQgPSBub2RlLmxlZnQ7XG5cdFx0fVxuXHRcdHJldHVybiByb290O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVNdWx0aXBsZUNoaWxkcmVuKHZhbHVlLCByb290KSB7XG5cdGxldCByZXBsYWNlbWVudCA9IHJvb3QucmlnaHQ7XG5cdC8vIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdC8vIE1heWJlIGNoZWNrIGlmIG5vZGUgZXZlbiBoYXMgYSBwYXJlbnQgbm9kZSA/XG5cdGlmIChyb290LmRhdGEgPT0gdmFsdWUpIHtcblx0XHRsZXQgcGFyZW50O1xuXHRcdHdoaWxlIChyZXBsYWNlbWVudC5sZWZ0ICE9PSBudWxsKSB7XG5cdFx0XHRwYXJlbnQgPSByZXBsYWNlbWVudDtcblx0XHRcdHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnQubGVmdDtcblx0XHR9XG5cdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudC5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5yaWdodCA9IHJvb3QucmlnaHQ7XG5cdFx0cmVwbGFjZW1lbnQubGVmdCA9IHJvb3QubGVmdDtcblxuXHRcdC8vcmV0dXJuIHJlcGxhY2VtZW50O1xuXHR9IGVsc2Uge1xuXHRcdC8vIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdFx0bGV0IG5vZGUgPSBmaW5kTm9kZSh2YWx1ZSwgcm9vdCk7XG5cblx0XHQvLyBGaW5kIHRoZSByZXBsYWNlbWVudCBub2RlIChuZXh0IGJpZ2dlcilcblx0XHRyZXBsYWNlbWVudCA9IG5vZGUucmlnaHQ7XG5cdFx0Ly8gZGVmaW5lIHRoZSBwYXJlbnQgbm9kZSBmb3IgdGhlIHJlcGxhY2VtZW50O1xuXHRcdGxldCBwYXJlbnQ7XG5cdFx0d2hpbGUgKHJlcGxhY2VtZW50LmxlZnQgIT09IG51bGwpIHtcblx0XHRcdHBhcmVudCA9IHJlcGxhY2VtZW50O1xuXHRcdFx0cmVwbGFjZW1lbnQgPSByZXBsYWNlbWVudC5sZWZ0O1xuXHRcdH1cblxuXHRcdHBhcmVudC5sZWZ0ID0gcmVwbGFjZW1lbnQucmlnaHQ7XG5cblx0XHQvLyBJZiByZXBsYWNlbWVudCBub2RlIGhhcyBjaGlsZHJlblxuXHRcdGlmIChyZXBsYWNlbWVudC5yaWdodCAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IHJlcGxhY2VtZW50Q2hpbGRyZW4gPSByZXBsYWNlbWVudC5yaWdodDtcblx0XHRcdC8vIHRha2UgcGFyZW50IGVsZW1lbnRcblx0XHRcdC8vIHB1dCBjaGlsZHJlbiB0byBvcmlnaW5hbCBwb3NpdGlvbiBvZiByZXBsYWNlbWVudCBub2RlLlxuXHRcdFx0cGFyZW50LmxlZnQgPSByZXBsYWNlbWVudENoaWxkcmVuO1xuXHRcdH1cblxuXHRcdHJlcGxhY2VtZW50LnJpZ2h0ID0gbm9kZS5yaWdodDtcblx0XHRyZXBsYWNlbWVudC5sZWZ0ID0gbm9kZS5sZWZ0O1xuXG5cdFx0Ly8gQ2hlY2tlIGlmIHZhbHVlIGlzIGxlZnQgb3IgcmlnaHQgb2YgcGFyZW50IG5vZGVcblx0XHRpZiAocm9vdC5yaWdodC5kYXRhID09IHZhbHVlKSB7XG5cdFx0XHRyb290LnJpZ2h0ID0gcmVwbGFjZW1lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJvb3QubGVmdCA9IHJlcGxhY2VtZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gcm9vdDtcblx0fVxuXHRyZXR1cm4gcmVwbGFjZW1lbnQ7XG59XG4iLCIvLyBSZXR1cm5zIHNvcnRlZCBBcnJheVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VTb3J0KGFycmF5KSB7XG5cdGlmIChhcnJheS5sZW5ndGggPD0gMSkge1xuXHRcdHJldHVybiBhcnJheTtcblx0fSBlbHNlIHtcblx0XHRsZXQgbWlkID0gTWF0aC5yb3VuZChhcnJheS5sZW5ndGggLyAyKTtcblx0XHRsZXQgbGVmdCA9IGFycmF5LnNsaWNlKDAsIG1pZCk7XG5cdFx0bGV0IHJpZ2h0ID0gYXJyYXkuc2xpY2UobWlkKTtcblx0XHRyZXR1cm4gY29tcGFyZVR3byhtZXJnZVNvcnQobGVmdCksIG1lcmdlU29ydChyaWdodCkpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUd28obGVmdCwgcmlnaHQpIHtcblx0bGV0IGFycmF5ID0gW107XG5cdHdoaWxlIChsZWZ0Lmxlbmd0aCAmJiByaWdodC5sZW5ndGgpIHtcblx0XHRpZiAobGVmdFswXSA9PSByaWdodFswXSkge1xuXHRcdFx0cmlnaHQuc3BsaWNlKDAsIDEpO1xuXHRcdH0gZWxzZSBpZiAobGVmdFswXSA+IHJpZ2h0WzBdKSB7XG5cdFx0XHRhcnJheS5wdXNoKHJpZ2h0LnNoaWZ0KCkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcnJheS5wdXNoKGxlZnQuc2hpZnQoKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcnJheS5jb25jYXQobGVmdCwgcmlnaHQpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGxldmVsT3JkZXIocm9vdCwgY2FsbGJhY2spIHtcblx0bGV0IGFyciA9IFtdO1xuXHRsZXQgcXVldWUgPSBbXTtcblx0cXVldWUucHVzaChyb290KTtcblxuXHR3aGlsZSAocXVldWUubGVuZ3RoKSB7XG5cdFx0cm9vdCA9IHF1ZXVlWzBdO1xuXHRcdGlmIChyb290LmxlZnQpIHF1ZXVlLnB1c2gocm9vdC5sZWZ0KTtcblx0XHRpZiAocm9vdC5yaWdodCkgcXVldWUucHVzaChyb290LnJpZ2h0KTtcblx0XHRhcnIucHVzaChyb290LmRhdGEpO1xuXHRcdHF1ZXVlLnNoaWZ0KCk7XG5cdH1cblxuXHQvLyBJZiBubyBjYWxsYmFjayByZXR1cm4gYXJyYXlcblx0aWYgKCFjYWxsYmFjaykgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlub3JkZXIocm9vdCwgYXJyID0gW10pIHtcblx0aWYgKCFyb290KSByZXR1cm4gYXJyO1xuXG5cdGlmIChyb290LmxlZnQpIHtcblx0XHRpbm9yZGVyKHJvb3QubGVmdCwgYXJyKTtcblx0fVxuXHRhcnIucHVzaChyb290LmRhdGEpO1xuXG5cdGlmIChyb290LnJpZ2h0KSB7XG5cdFx0aW5vcmRlcihyb290LnJpZ2h0LCBhcnIpO1xuXHR9XG5cblx0cmV0dXJuIGFycjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1lcmdlU29ydCBmcm9tIFwiLi9tZXJnZVNvcnQuanNcIjtcbmltcG9ydCB7IGluc2VydCwgZmluZE5vZGUsIGRlbGV0ZU5vZGUgfSBmcm9tIFwiLi9pbnNlcnREZWxldGVGaW5kLmpzXCI7XG5pbXBvcnQgeyBsZXZlbE9yZGVyLCBpbm9yZGVyIH0gZnJvbSBcIi4vdHJhdmVyc2UuanNcIjtcblxuZnVuY3Rpb24gdHJlZU5vZGUodmFsdWUpIHtcblx0bGV0IGRhdGEgPSB2YWx1ZTtcblx0bGV0IGxlZnQgPSBudWxsO1xuXHRsZXQgcmlnaHQgPSBudWxsO1xuXHRyZXR1cm4geyBkYXRhLCBsZWZ0LCByaWdodCB9O1xufVxuXG4vLyB0YWtlcyBhcnJheSBhcyBpbnB1dCBzb3J0cyBpdCBhbmQgY3JlYXRlcyBCU1RcbmZ1bmN0aW9uIGJ1aWxkQlNUKGFycikge1xuXHRsZXQgc29ydGVkID0gbWVyZ2VTb3J0KGFycik7XG5cdHJldHVybiBjcmVhdGVCU1Qoc29ydGVkLCBzb3J0ZWRbMF0sIHNvcnRlZFtzb3J0ZWQubGVuZ3RoIC0gMV0pO1xufVxuXG4vLyBDcmVhdGVzIEJTVCBmcm9tIHNvcnRlZCBBcnJheVxuZnVuY3Rpb24gY3JlYXRlQlNUKGFycikge1xuXHRpZiAoYXJyLmxlbmd0aCA9PSAxKSByZXR1cm4gbnVsbDtcblxuXHRsZXQgbWlkID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG5cdGxldCByb290ID0gdHJlZU5vZGUoYXJyW21pZF0pO1xuXG5cdGxldCByaWdodFBhcnQgPSBhcnIuc3BsaWNlKG1pZCk7XG5cdGxldCBsZWZ0UGFydCA9IGFycjtcblx0cm9vdC5sZWZ0ID0gY3JlYXRlQlNUKGxlZnRQYXJ0KTtcblx0cm9vdC5yaWdodCA9IGNyZWF0ZUJTVChyaWdodFBhcnQpO1xuXG5cdHJldHVybiByb290O1xufVxuXG5leHBvcnQgY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuXHRpZiAobm9kZSA9PT0gbnVsbCkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XG5cdH1cblx0Y29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcblx0aWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuXHRcdHByZXR0eVByaW50KG5vZGUubGVmdCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xuXHR9XG59O1xuXG5sZXQgYXJyYXkgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG5sZXQgYXJyYXkyID0gW1xuXHQxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNCwgMTUsIDEyMzQsIDEsIDQsIDYzLCAyMyxcbl07XG5cbmxldCB0cmVlMiA9IGJ1aWxkQlNUKGFycmF5Mik7XG5pbnNlcnQodHJlZU5vZGUoMTIpLCB0cmVlMik7XG5pbnNlcnQodHJlZU5vZGUoMjMpLCB0cmVlMik7XG4vLyBjb25zb2xlLmxvZyhmaW5kTm9kZSgxNSwgdHJlZTIpKTtcblxubGV0IHRyZWUzID0gZGVsZXRlTm9kZSgxNSwgdHJlZTIpO1xuY29uc29sZS5sb2cobGV2ZWxPcmRlcih0cmVlMykpO1xuY29uc29sZS5sb2coaW5vcmRlcih0cmVlMykpO1xuXG5wcmV0dHlQcmludCh0cmVlMyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
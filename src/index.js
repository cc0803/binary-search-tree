import mergeSort from "./mergeSort.js";
import { insert, findNode, deleteNode } from "./insertDeleteFind.js";
import { levelOrder, inorder, preorder, postorder } from "./traverse.js";
import { depth, height, isBalanced } from "./heightDepth.js";

function treeNode(value) {
	let data = value;
	let left = null;
	let right = null;
	return { data, left, right };
}

// takes array as input sorts it and creates BST
function buildBST(arr) {
	let sorted = mergeSort(arr);
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
	let arr = inorder(root);
	let tree = createBST(arr);
	return tree;
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
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
insert(treeNode(12), tree2);
insert(treeNode(23), tree2);
// console.log(findNode(15, tree2));

let tree3 = deleteNode(15, tree2);
console.log(levelOrder(tree3));
console.log(inorder(tree3));
console.log(preorder(tree3));
console.log(postorder(tree3));
console.log(depth(3, tree3));
console.log(height(8, tree3));
insert(treeNode(1), tree2);
insert(treeNode(2), tree2);
insert(treeNode(13), tree2);
insert(treeNode(14), tree2);
console.log(isBalanced(tree2));

prettyPrint(tree3);
prettyPrint(tree2);

prettyPrint(balanceTree(tree2));

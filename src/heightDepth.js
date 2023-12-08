import { findNode } from "./insertDeleteFind";

export function depth(value, root) {
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
export function height(value, root) {
	let node = findNode(value, root);

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

export function isBalanced(root) {
	let rightHeight = height(root.right.data, root);
	let leftHeight = height(root.left.data, root);
	let difference = Math.abs(rightHeight - leftHeight);

	if (difference > 1) {
		return false;
	} else {
		return true;
	}
}

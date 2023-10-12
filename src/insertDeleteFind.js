export function insert(node, root) {
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

export function deleteNode(value, root) {
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

export function findNode(value, root) {
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

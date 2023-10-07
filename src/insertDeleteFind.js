export function insert(node, root) {
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

export function deleteNode(node, root) {}

function deleteLeafNode(node, root) {}

export function findNode(value, root) {
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

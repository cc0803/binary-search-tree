export function levelOrder(root, callback) {
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

export function inorder(root, arr = []) {
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

export function preorder(root, arr = []) {
	if (!root) return arr;
	else {
		arr.push(root.data);
		preorder(root.left, arr);
		preorder(root.right, arr);
	}

	return arr;
}

export function postorder(root, arr = []) {
	if (!root) return arr;
	else {
		postorder(root.left, arr);
		postorder(root.right, arr);
		arr.push(root.data);
	}
	return arr;
}

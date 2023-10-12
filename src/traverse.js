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

function treeNode(value) {
	(this.data = value), (this.left = null), (this.right = null);
	return { data, left, right };
}

function createBST(arr, start, end) {
	if (start > end) return null;

	let mid = Math.floor((start + end) / 2);
	let root = treeNode(arr[mid - 1]);

	root.left = createBST(arr, start, mid - 1);
	root.right = createBST(arr, mid + 1, end);

	return root;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let tree = createBST(array, array[0], array[array.length - 1]);

console.log(tree);

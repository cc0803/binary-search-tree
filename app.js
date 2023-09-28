function treeNode(value) {
	(this.data = value), (this.left = null), (this.right = null);
	return { data, left, right };
}

// takes array as input sorts it and creates BST
function buildBST(arr) {
	let sorted = mergeSort(arr);
	return createBST(sorted, sorted[0], sorted[sorted.length - 1]);
}

// Creates BST from sorted Array
function createBST(arr, start, end) {
	if (start > end) return null;

	let mid = Math.floor((start + end) / 2);
	let root = treeNode(arr[mid - 1]);

	root.left = createBST(arr, start, mid - 1);
	root.right = createBST(arr, mid + 1, end);

	return root;
}

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

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let array2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = createBST(array, array[0], array[array.length - 1]);

console.log(tree);

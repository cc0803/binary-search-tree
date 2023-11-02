export function depth(value, root) {
	// define iterator
	let iterator = 1;

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

export function height() {}

// Returns sorted Array
export default function mergeSort(array) {
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

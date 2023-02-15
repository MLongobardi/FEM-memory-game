export function applySettingsChanges(draft, settings) {
	draft = Object.assign(draft, settings);
	return draft;
}

export function newGame(draft) {
	draft.board = generateBoard(draft.gridType);
    return draft;
}

/* Helper functions (don't export these) */
function generateBoard(col) {
    let arr = [...Array(col * col / 2 + 1).keys()].splice(1); // [1, 2, ... , col*col]
    arr = arr.concat(arr);
    arr = breakRows(shuffleArray(arr));
	return arr;
}

function shuffleArray(array) {
    let result = [].concat(array);
	for (let i = result.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function breakRows(array) {
	let maxLen = Math.sqrt(array.length);
	let result = [...Array(maxLen)].map(() => []);
	array.forEach((el, i) => {
		result[Math.floor(i / maxLen)][i % maxLen] = el;
	});
	return result;
}

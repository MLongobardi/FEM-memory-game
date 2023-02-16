export function applySettingsChanges(draft, settings) {
	draft = Object.assign(draft, settings);
	return draft;
}

export function newGame(draft) {
	draft.active = [];
	draft.uncovered = [];
	draft.board = generateBoard(draft.gridType);
	draft.canPlay = true;
	draft.moves = 0;
	draft.currentPlayer = 0;
	draft.playerScores = [0, 0, 0, 0];
	return draft;
}

export function playMove(draft, id, value) {
	if (!draft.canPlay || draft.isVisible(id)) return draft;
	draft.active = [{ id: id, value: value }, ...draft.active];
	if (draft.active.length == 2 && draft.active[0].value == draft.active[1].value) {
		draft.playerScores[draft.currentPlayer]++;
		draft.uncovered = [draft.active[0].id, draft.active[1].id, ...draft.uncovered];
	}
	draft.moves += 0.5;
	draft.canPlay = false;
	setTimeout(() => {
		this.finishMove();
	}, draft.moveDelay);
	return draft;
}

export function finishMove(draft) {
	if (draft.active.length == 2) {
		if (draft.active[0].value != draft.active[1].value) {
			draft.currentPlayer = (draft.currentPlayer + 1) % draft.players;
		}
		draft.active = [];
	}
	draft.canPlay = true;
	return draft;
}

/* Helper functions (don't export these) */
function generateBoard(col) {
	let arr = [...Array((col * col) / 2 + 1).keys()].splice(1); // [1, 2, ... , col*col]
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

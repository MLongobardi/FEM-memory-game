export function applySettingsChanges(draft, settings) {
	draft = Object.assign(draft, settings);
}

export function newGame(draft) {
	draft.active = [];
	draft.uncovered = [];
	draft.board = generateBoard(draft.gridType);
	draft.canPlay = true;
	draft.gameOver = false;
	draft.moves = 0;
	draft.currentPlayer = 0;
	draft.playerScores = [0, 0, 0, 0];
	draft.timer.currentTime = 0;
	draft.timer.deltaTime = 0;
	this.pauseTimer();
}

export function playMove(draft, id, value) {
	if (!draft.canPlay || draft.isVisible(id) || draft.gameOver) return;
	draft.active = [{ id: id, value: value }, ...draft.active];
	if (draft.active.length == 2 && draft.active[0].value == draft.active[1].value) {
		draft.playerScores[draft.currentPlayer]++;
		draft.uncovered = [draft.active[0].id, draft.active[1].id, ...draft.uncovered];
	}
	if (draft.players == 1 && draft.moves == 0) this.startTimer();
	draft.moves += 0.5;
	draft.canPlay = false;
	setTimeout(() => {
		this._finishMove();
	}, draft.moveDelay);
	if (draft.uncovered.length == draft.board.join().split(",").length) {
		draft.gameOver = true;
	}
}

export function _finishMove(draft) {
	if (draft.active.length == 2) {
		if (draft.active[0].value != draft.active[1].value) {
			draft.currentPlayer = (draft.currentPlayer + 1) % draft.players;
		}
		draft.active = [];
	}
	draft.canPlay = true;
}

export function startTimer(draft) {
	if (draft.timer.running) return;
	draft.timer.running = true;
	draft.timer.interval = setInterval(() => {
		draft.timer.deltaTime += draft.timer.tickRate;
		if (draft.timer.deltaTime >= 1000) {
			draft.timer.deltaTime -= 1000;
			this._timerTick();
		}
	}, draft.timer.tickRate);
}

export function pauseTimer(draft) {
	if (!draft.timer.running) return;
	draft.timer.running = false;
	clearInterval(draft.timer.interval);
	draft.timer.interval = "";
}

export function _timerTick(draft) {
	//needs to be its own method, or it won't trigger reactivity (because it wouldn't call the "update" method)
	draft.timer.currentTime++;
}

/* Helper functions (don't export these) */
function generateBoard(col) {
	let arr = [...Array((col * col) / 2 + 1).keys()].splice(1); // [1, 2, ... , col*col]
	arr = arr.concat(arr);
	arr = breakRows(shuffleArray(arr));
	console.log(arr)
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

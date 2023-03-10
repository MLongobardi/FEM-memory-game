import { writable } from "svelte/store";
import initializeStore from "./utility/initializeStore.js";
import * as mainStoreMethods from "./methods/mainStore.js";

const startObject = {
	theme: "numbers",
	players: 1,
	gridType: 4,
	currentPlayer: 1,
	playerScores: [0, 0, 0, 0],
	board: [
		[4, 7, 5, 3],
		[4, 2, 6, 5],
		[2, 8, 1, 6],
		[7, 8, 1, 3],
	],
	uncovered: [],
	active: [],
	canPlay: true,
	gameOver: true,
	moveDelay: 300,
	moves: 0,
	timer: {
		running: false,
		currentTime: 0,
		deltaTime: 0,
		interval: "",
		tickRate: 50,
		get timeString() {
			let h = Math.floor(this.currentTime / 3600);
			let m = Math.floor((this.currentTime % 3600) / 60);
			let s = Math.round(this.currentTime % 60);

			if (m < 10 && h > 0) m = "0" + m;
			m = m.toString();
			if (s < 10) s = "0" + s;
			return [h, m, s].filter((item) => Boolean(item)).join(":");
		},
	},
	isActive(id) {
		return this.active.some((el) => el.id == id);
	},
	isUncovered(id) {
		return this.uncovered.includes(id);
	},
	isVisible(id) {
		return this.isActive(id) || this.isUncovered(id);
	},
};

const mainStore = initializeStore(writable(startObject), mainStoreMethods);
export default mainStore;

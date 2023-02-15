import { writable } from "svelte/store";
import initializeStore from "./utility/initializeStore.js";
import * as mainStoreMethods from "./methods/mainStore.js";

const startObject = {
	theme: "numbers",
	players: 1,
	gridType: 4,
	board: [],
	uncovered: [],
	active: [],
	canPlay: true,
	moveDelay: 400,
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

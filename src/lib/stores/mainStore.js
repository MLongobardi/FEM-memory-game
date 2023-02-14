import { writable } from "svelte/store";
import initializeStore from "./utility/initializeStore.js";
import * as mainStoreMethods from "./methods/mainStore.js";

const storeObject = {
	theme: "numbers",
	players: 1,
	gridType: 4,
	board: [],
};

const mainStore = initializeStore(writable(storeObject), mainStoreMethods);
export default mainStore;

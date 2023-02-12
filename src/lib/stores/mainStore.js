import { writable } from "svelte/store";
import initializeStore from "./utility/initializeStore.js";
import * as mainStoreMethods from "./methods/mainStore.js";

const storeObject = {
	hello: "word",
	testProperty: "testValue",
};

const mainStore = initializeStore(writable(storeObject), mainStoreMethods);
export default mainStore;

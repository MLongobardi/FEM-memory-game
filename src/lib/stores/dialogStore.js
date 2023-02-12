import { writable } from "svelte/store";
import initializeStore from "./utility/initializeStore.js";
import * as dialogStoreMethods from "./methods/dialogStore.js";

const storeObject = {};

const dialogStore = initializeStore(writable(storeObject), dialogStoreMethods);
export default dialogStore;
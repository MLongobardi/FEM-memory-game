import { writable } from "svelte/store";

const cleanState = {
	hello: "word";
};

function createStore() {
	//initialize store
	const tempStore = writable(cleanState);

	//define custom store methods
	tempStore.testMethod = (testArgument) => {
		tempStore.update((draft) => {
			draft.hello = testArgument;
			return draft;
		});
	};

	//remove standard store methods with object destructuring and return store
	//eslint-disable-next-line
	const { set, update, ...returnStore } = tempStore;
	return returnStore; //subscribe and exposed custom store methods
}

const gameStore = createStore();
export default gameStore;

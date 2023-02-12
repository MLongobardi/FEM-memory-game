export default function initializeStore(store, storeMethods) {
	//apply custom methods
	for (const [methodName, method] of Object.entries(storeMethods)) {
		store[methodName] = (...args) => {
			store.update((draft) => {
				return method(draft, ...args);
			});
		};
	}

	//remove reference to standard store methods
	/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
	const { set, update, ...returnStore } = store;

	return returnStore;
}

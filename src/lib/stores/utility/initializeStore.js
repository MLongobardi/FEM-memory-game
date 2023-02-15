export default function initializeStore(store, storeMethods) {
	for (let [methodName, method] of Object.entries(storeMethods)) {
		//lets custom methods use the "this" keyword to refer to the store
		method = method.bind(store);

		//applies the custom methods to the store
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

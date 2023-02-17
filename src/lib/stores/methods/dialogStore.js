export function addInstance(draft, name, instance) {
	draft[name] = {
		reference: instance,
		open() {
			instance.myShowModal();
		},
		close() {
			instance.myClose();
		},
	};
}

export function removeInstance(draft, name) {
	delete draft[name];
}

Store methods must take a copy of the store as the first argument (draft), optionally apply changes to it and then must return it. When you then call the method, skip the draft argument.
Inside a method's code, draft is used to access the store values, and the "this" keyword to access the other store methods.
Example:

```js
export function storeMethodA(draft, firstArgument, secondArgument) {
	draft.valueA = [firstArgument, secondArgument];
	return draft;
}

export function storeMethodB(draft) {
	draft.valueB = helperFunction(20);
	setTimeout(() => {
		this.storeMethodA(3, draft.valueC); //skips the draft argument
	}, 1000);
	return draft;
}

/* Don't export helper functions */
function helperFunction(a) {
	return a * 2;
}
```

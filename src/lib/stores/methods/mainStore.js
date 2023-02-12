/**
 * Store methods take a copy of the store as the first argument, optionally apply changes to it and then return it.
 */

export function testMethod(draft, testArgument) {
    draft.testProperty = testArgument;
    return draft;
}

export function sayHi(draft) {
    console.log("hi");
    return draft;
}
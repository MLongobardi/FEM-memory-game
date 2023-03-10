<script>
	import { onMount, onDestroy } from "svelte";
	import { dialogStore } from "$stores";

	/**
	 * <Dialog name="DIALOG_NAME">
	 *     //dialog content here, all of it must be inside a single div
	 * </Dialog>
	 *
	 * Then, anywhere you need it, import dialogStore and call
	 * $dialogStore.DIALOG_NAME.open()
	 * to show the modal, or
	 * $dialogStore.DIALOG_NAME.close()
	 * to close it
	 *
	 * A Dialog instance won't be added to the dialogStore if it isn't named.
	 *
	 * The dialog backdrop doesn't inherit anything, so it can only use css variables declared in ::backdrop
	 *
	 * border-radius should be applied to the dialog itself, you can target it with:
	 * :global(dialog):has(> .name-of-content-div) {}
	 */

	export let name;
	export let easyClose = false;
	export let startOpen = false;
	export let onOpen = false;
	export let onClose = false;
	export let onEasyClose = easyClose ? onClose : false;

	let dialog;

	onMount(() => {
		//hijack native methods, until they add an on:open event
		dialog.myShowModal = () => {
			if (dialog.open) return;
			if (typeof onOpen == "function") onOpen();
			dialog.showModal();
		};
		dialog.myClose = (mode) => {
			if (!dialog.open) return;
			if (mode == "easy" && typeof onEasyClose == "function") onEasyClose();
			if (mode != "easy" && typeof onClose == "function") onClose();
			dialog.close();
		};

		if (startOpen) dialog.showModal();

		if (name) dialogStore.addInstance(name, dialog);
	});

	onDestroy(() => {
		dialogStore.removeInstance(name);
	});

	function handlePointDown(e) {
		if (!easyClose) return;
		/**
		 * on:pointerdown|self fires when clicking on the backdrop (so long as the dialog has padding: 0),
		 * so clicking inside the dialog, dragging on the backdrop and releasing the click
		 * DOESN'T close the dialog
		 */
		if (e.pointerType == "touch") {
			dialog.addEventListener(
				"touchend",
				(e) => {
					let endTouch = e.changedTouches[0];
					let endTarget = document.elementFromPoint(endTouch.clientX, endTouch.clientY);
					if (endTarget == dialog) dialog.myClose("easy");
				},
				{ once: true }
			);
		} else {
			dialog.addEventListener(
				"pointerup",
				(e) => {
					if (e.target == dialog) dialog.myClose("easy");
				},
				{ once: true }
			);
		}
	}
</script>

<dialog bind:this={dialog} on:pointerdown|self={handlePointDown}>
	<slot {dialog}>
		<div>
			Empty Dialog!
			<button
				on:click={() => {
					dialog.myClose();
				}}>Close</button
			>
		</div>
	</slot>
</dialog>

<style lang="scss">
	dialog {
		padding: 0 !important; /*needed for correct event handling*/
		border: none;
		max-width: unset;
		max-height: unset;
		overflow: visible; //allows, for example, a close button to overflow
		color: inherit;
		background: transparent;
		animation: fade-in 250ms;
	}

	dialog > :global(div) {
		margin: 0 !important; /*needed for correct event handling*/
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		border-radius: inherit;
	}

	:global(body):has(dialog[open]) {
		overflow: hidden;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

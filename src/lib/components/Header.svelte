<script>
	import { dialogStore, mainStore, mediaStore } from "$stores";
	import { Dialog } from "$comps";

	function handleRestart() {
		mainStore.newGame();
		$dialogStore.PAUSE.close();
	}

	function pauseToSettings() {
		$dialogStore.SETTINGS.open();
		$dialogStore.PAUSE.close();
	}
</script>

<header>
	<img src="/images/logo.svg" alt="Memory game logo" />
	<h1>Memory game</h1>
	{#if !$mediaStore.screen.mobile}
		<div class="header-buttons">
			<button on:click={handleRestart}>Restart</button>
			<button on:click={$dialogStore.PAUSE.open}>Pause</button>
			<button on:click={$dialogStore.SETTINGS.open}>New Game</button>
		</div>
	{:else}
		<button on:click={$dialogStore.PAUSE.open}>Menu</button>
	{/if}
	<Dialog name="PAUSE">
		<div class="pause">
			<button on:click={handleRestart}>Restart</button>
			<button on:click={pauseToSettings}>New Game</button>
			<button on:click={$dialogStore.PAUSE.close}>Resume Game</button>
		</div>
	</Dialog>
</header>

<style lang="scss">
	header {
		@extend %container;
		display: flex;
		justify-content: space-between;
		height: minMaxSize(40px, 52px);
	}

	img {
		height: minMaxSize(17px, 26.85px);
		align-self: center;
	}
	h1 {
		@extend %screen-reader-only;
	}

	.header-buttons,
	.pause {
		/* removes whitespace caused by newline for .header-buttons */
		display: flex;
	}

	:global(dialog):has(> .pause) {
		border-radius: 10px;

		&::backdrop {
			background: rgba(0, 0, 0, 0.5);
		}
	}
	.pause {
		flex-direction: column;
		width: minMaxSize(327px, 654px);
		padding: minMaxSize(24px, 56px);
		box-sizing: border-box;
		background: var(--color-5);
	}

	button {
		display: block;
		border-radius: 26px;
		background: #dfe7ec;
		color: var(--color-3);
		padding: 0 minMaxSize(16px, 24px);
		height: 100%;
		font-size: minMaxSize(16px, 20px);
		line-height: 1.25em;
		margin-left: minMaxSize(5px, 16px, 480px, 768px);
	}
	button:hover {
		background: var(--color-7);
		color: var(--color-8);
	}
	.pause button {
		@extend %large-button;
		//width: 100%;
		margin-left: 0;
		margin-top: minMaxSize(16px, 28px);
		//height: minMaxSize(48px,70px);
	}
	button:first-of-type {
		background: var(--color-1);
		color: var(--color-8);
		margin: 0;
		&:hover {
			background: #ffb84a;
		}
	}
</style>

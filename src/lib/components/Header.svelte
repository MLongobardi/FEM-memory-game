<script>
	import { dialogStore, mainStore } from "$stores";
</script>

<header class="container">
	<img src="/images/logo.svg" alt="Memory game logo">
	<h1>Memory game</h1>
	<div>
		<button on:click={mainStore.newGame}>Restart</button>
		<button on:click={$dialogStore.SETTINGS.open}>New Game</button>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
	}

	img {
		object-fit: contain;
	}
	h1 {
		@extend %screen-reader-only;
	}
</style>

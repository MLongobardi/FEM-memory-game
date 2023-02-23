<script>
	import { dialogStore, mainStore } from "$stores";
	import { iconStrings } from "$lib/iconStrings.js";

	function wrappedPlayMove(id, cell) {
		mainStore.playMove(id, cell);

		if ($mainStore.gameOver) {
			setTimeout(() => {
				$dialogStore.GAMEOVER.open();
			}, $mainStore.moveDelay * 2.5);
		}
	}
</script>

<main class:six-cells={$mainStore.gridType == 6}>
	{#each $mainStore.board as row, x}
		{#each row as cell, y}
			{@const id = x + "," + y}
			<button
				class="cell"
				class:active={$mainStore.isActive(id)}
				class:uncovered={$mainStore.isUncovered(id)}
				on:click={() => {
					wrappedPlayMove(id, cell);
				}}
				disabled={!$mainStore.canPlay || $mainStore.isVisible(id)}
			>
				<span>Cell ({id})</span>
				{#if $mainStore.isVisible(id)}
					{#if $mainStore.theme == "icons"}
						<i class={iconStrings[cell - 1]} />
					{:else}
						{cell}
					{/if}
				{:else}
					&nbsp;
				{/if}
			</button>
		{/each}
	{/each}
</main>

<style lang="scss">
	main {
		display: grid;
		--grid-cols: 4;
		--size: #{minMaxSize(327px, 532px)};
		font-size: minMaxSize(40px, 56px);
		line-height: 1.25em;
		width: var(--size);
		height: var(--size);
		grid-template-columns: repeat(var(--grid-cols), 1fr);
		grid-template-rows: repeat(
			var(--grid-cols),
			1fr
		); //a row of uncovered cells gets compressed without this in the Icons version
		gap: calc(var(--size) / (8.3 + 4.575 * var(--grid-cols)));
	}
	main.six-cells {
		--grid-cols: 6;
		--size: #{minMaxSize(327px, 572px)};
		font-size: minMaxSize(24px, 44px);
	}

	.cell {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background: var(--color-3);
		color: var(--color-8);
		border-radius: 50%;

		&:not(.uncovered, .active, :disabled):hover {
			background: var(--color-7);
		}
	}
	.cell.uncovered {
		background: var(--color-2);
	}
	.cell.active {
		background: var(--color-1);
	}
	.cell > span {
		@extend %screen-reader-only;
	}

	i {
		font-size: 0.9em;
	}
</style>

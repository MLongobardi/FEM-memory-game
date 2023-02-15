<script>
	import { mainStore } from "$stores";
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
					mainStore.playMove(id, cell);
				}}
				disabled={!$mainStore.canPlay || $mainStore.isVisible(id)}
			>
				<span>Cell ({id})</span>
				{#if $mainStore.isVisible(id)}
					{cell}
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
		gap: calc(var(--size) / (8.3 + 4.575 * var(--grid-cols)));
	}
	main.six-cells {
		--grid-cols: 6;
		--size: #{minMaxSize(327px, 572px)};
		font-size: minMaxSize(24px, 44px);
	}

	.cell {
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
</style>

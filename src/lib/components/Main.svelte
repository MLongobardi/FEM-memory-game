<script>
	let gridCols = 6;
</script>

<main class:six-cells={gridCols==6}>
	{#each [...Array(gridCols).keys()] as x}
		{#each [...Array(gridCols).keys()] as y}
			<button class="cell">
				<span>Cell ({x},{y})</span>
				{x * gridCols + y + 1}
			</button>
		{/each}
	{/each}
</main>

<style lang="scss">
	main {
		display: grid;
        --grid-cols: 4;
		--size: #{minMaxSize(327px, 532px)};
		width: var(--size);
		height: var(--size);
		grid-template-columns: repeat(var(--grid-cols), 1fr);
		gap: calc(var(--size) / (8.3 + 4.575 * var(--grid-cols)));
	}
    main.six-cells {
        --grid-cols: 6;
        --size: #{minMaxSize(327px, 572px)};
    }

	.cell {
		/*reset button styles*/
		background: none;
		border: none;
		padding: 0;
		/*end reset*/
		width: 100%;
		background: var(--color-3);
		border: none;
		border-radius: 50%;
		padding: 0;
		cursor: pointer;
	}
	.cell > span {
		@extend %screen-reader-only;
	}
</style>

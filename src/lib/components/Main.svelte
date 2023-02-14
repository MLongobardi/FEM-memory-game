<script>
	import { mainStore } from "$stores";
	let canPlay = true;
	let uncovered = [];
	let active = [];

	function playMove(id, value) {
		if (!canPlay || uncovered.concat(active.map((el) => el.id)).includes(id)) return; //in case someone manually removes the disabled attribute
		active = [{ id: id, value: value }, ...active];
		if (active.length == 2 && active[0].value == active[1].value) {
			//increase current player points
			uncovered = [active[0].id, active[1].id, ...uncovered];
		}
		canPlay = false;
		setTimeout(() => {
			if (active.length == 2) active = [];
			canPlay = true;
		}, 350);
	}
</script>

<main class:six-cells={$mainStore.gridType == 6}>
	{#each $mainStore.board as row, x}
		{#each row as cell, y}
			{@const id = x + "," + y}
			<button
				class="cell"
				class:active={active.some((el) => el.id == id)}
				class:uncovered={uncovered.includes(id)}
				on:click={() => {
					playMove(id, cell);
				}}
				disabled={!canPlay || uncovered.concat(active.map((el) => el.id)).includes(id)}
			>
				<span>Cell ({id})</span>
				{#if uncovered.concat(active.map((el) => el.id)).includes(id)}
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
		/*reset button styles*/
		background: none;
		border: none;
		padding: 0;
		/*end reset*/
		width: 100%;
		background: var(--color-3);
		color: var(--color-8);
		border-radius: 50%;
		cursor: pointer;
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

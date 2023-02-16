<script>
	import { FooterCard } from "$comps";
	import { mainStore } from "$stores";
</script>

<footer style:--cards={$mainStore.players}>
	{#if $mainStore.players > 1}
	<!--multiplayer-->
		{#each [...Array($mainStore.players).keys()] as i}
			<FooterCard text="Player {i + 1}" number={$mainStore.playerScores[i]} active={i == $mainStore.currentPlayer} />
		{/each}
	{:else}
	<!--single player-->
		<FooterCard text="Time" number="1:53" />
		<FooterCard text="Moves" number={Math.floor($mainStore.moves)} />
	{/if}
</footer>

<style lang="scss">
	@use "sass:math";

	footer {
		@extend %container;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(64px, 255px);
		justify-content: center;
		/*Known gaps are
			mobile 2 cards: 25px
			mobile 4 cards: 23.66px
			tablet 2 cards: 30px
			tablet 4 cards: 11px
			desktop: 30px
		This eliminates all jumps:
		*/
		--gap-base: #{minMaxSize(25px, 30px)};
		--step: #{minMaxSize(math.div(2px, 3), 9.5px)};
		gap: calc(var(--gap-base) - var(--step) * (var(--cards) - 2));
	}
	:global(.lar-tab) footer {
		--step: #{minMaxSize(9.5px, 0px, 768px, 1440px)};
	}
</style>

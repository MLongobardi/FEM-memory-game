<script>
	import { FooterCard } from "$comps";
	import { mainStore, dialogStore } from "$stores";
	let multiplayer = true;
	let cards = 4;
</script>

<footer class="container" style:--cards={cards}>
	{#if multiplayer}
		{#each [...Array(cards).keys()] as i}
			<FooterCard text="Player {i}" number={5 - i} active={i == 1} />
		{/each}
	{:else}
		<FooterCard text="Time" number="1:53" />
		<FooterCard text="Moves" number="39" />
	{/if}
	<span style="width:100%; background: red; position: fixed; top: 4px; left: 0;">
		TEMP
		<button
			on:click={() => {
				multiplayer = !multiplayer;
			}}
		>
			Toggle multiplayer
		</button>
		<button on:click={$dialogStore.SETTINGS.open}>open SETTINGS dialog</button>
	</span>
</footer>

<style lang="scss">
	@use "sass:math";

	footer {
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
		--step: #{minMaxSize(9.5px, 0px,768px, 1440px)};
	}
</style>

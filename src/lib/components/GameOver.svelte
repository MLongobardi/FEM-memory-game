<script>
	import { dialogStore, mainStore } from "$stores";
	const actualPlayerScores = $mainStore.playerScores.slice(0, $mainStore.players);
	const best = Math.max(...actualPlayerScores);
	const winners = [];
	actualPlayerScores.forEach((score, player) => {
		if (score == best) winners.push(player);
	});

    function handleRestart() {
        mainStore.newGame();
        $dialogStore.GAMEOVER.close();
    }

    function toSettings() {
        $dialogStore.GAMEOVER.close();
		$dialogStore.SETTINGS.open();
    }
</script>

<div class="game-over">
	<span class="title">
		{#if $mainStore.players == 1}
			You did it!
		{:else if winners.length == 1}
			Player {winners[0] + 1} Wins!
		{:else}
			It's a tie!
		{/if}
	</span>
	<span class="subtitle"
		>Game over! Here{$mainStore.players > 1 ? " are the results" : "'s how you got on"}...</span
	>
	{#if $mainStore.players > 1}
		<!-- multiplayer -->
		{#each [...Array($mainStore.players).keys()] as p}
			{@const win = winners.includes(p)}
			<div class="player-card" class:winner={win}>
				<span class="left">Player {p + 1} {win ? "(Winner!)" : ""}</span>
				<span class="right">{actualPlayerScores[p]} Pairs</span>
			</div>
		{/each}
	{:else}
		<!-- single player -->
		<div class="time">
			<span class="left">Time Elapsed</span>
			<span class="right">{$mainStore.timer.timeString}</span>
		</div>
		<div class="moves">
			<span class="left">Moves Taken</span>
			<span class="right">{$mainStore.moves} Moves</span>
		</div>
	{/if}
	<div class="buttons">
		<button on:click={handleRestart}>Restart</button>
		<button on:click={toSettings}>Setup New Game</button>
	</div>
</div>

<style lang="scss">
	.game-over {
		@extend %modal-container;
		padding-top: minMaxSize(32px, 51px);
		padding-bottom: minMaxSize(24px, 69px);
	}

	.title {
		font-size: minMaxSize(24px, 48px);
		line-height: 1.25em;
		color: var(--color-4);
	}

	.subtitle {
		font-size: minMaxSize(14px, 18px);
		line-height: minMaxSize(17px, 22px);
		color: var(--color-6);
		margin-top: minMaxSize(9px, 16px);
		margin-bottom: minMaxSize(16px, 24px);
	}

	.player-card,
	.time,
	.moves {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #dfe7ec;
		border-radius: minMaxSize(5px, 10px);
		width: 100%;
		height: minMaxSize(48px, 72px);
		margin-top: minMaxSize(8px, 16px);
		padding: 0 minMaxSize(16px, 32px);
		box-sizing: border-box;
	}
	.player-card.winner {
		background: var(--color-4);
	}

	.left {
		font-size: minMaxSize(13px, 18px);
		line-height: minMaxSize(16px, 22px);
		color: var(--color-6);
	}

	.right {
		font-size: minMaxSize(20px, 32px);
		line-height: 1.25em;
		color: var(--color-3);
	}

	.winner :is(.left, .right) {
		color: var(--color-8);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		column-gap: 14px;
		row-gap: 16px;
		margin-top: minMaxSize(24px, 56px);
	}

	button {
		height: minMaxSize(48px, 52px);
		border-radius: 26px;
		font-size: minMaxSize(18px, 20px);
		line-height: minMaxSize(22px, 25px);
		background: #dfe7ec;
		color: var(--color-3);
		min-width: 264px;
		flex-basis: 48.7%;
		flex-grow: 999;
	}
	button:first-of-type {
		background: var(--color-1);
		color: var(--color-8);
	}
</style>

<script>
	export let text = "";
	export let number = "";
	export let active = false;
</script>

<div class="card" class:active class:player={text[0] == "P"}>
	<span class="text">{text}</span>
	<span class="number">{number}</span>
</div>

<style lang="scss">
	.card {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		background: #dfe7ec;
		border-radius: 10px;
		padding: minMaxSize(10px, 15px); //TODO
		gap: minMaxSize(2px,5px);
		box-sizing: border-box;

		:global(.tab) & {
			justify-content: space-between;
		}
	}
	:global(.tab) .card:not(.player),
	:global(.des) .card {
		flex-wrap: nowrap;
	}
	.card.active {
		background: var(--color-1);
		position: relative;
	}
	.card.active::before {
		--h: 19px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: calc(-1 * var(--h));
		left: calc(50% - var(--h));
		border-style: solid;
		border-width: 0 var(--h) var(--h) var(--h);
		border-color: transparent transparent var(--color-1) transparent;
	}
	:global(.des) .card.active::after {
		--w: 158px;
		content: "CURRENT TURN";
		width: var(--w);
		position: absolute;
		top: calc(100% + 23px);
		left: calc(50% - var(--w) / 2);
		font-size: 13px;
		line-height: 16px;
		letter-spacing: 5px;
		text-align: center;
		color: var(--color-4);
	}

	.text {
		color: var(--color-6);
		flex-basis: 100%;
		text-align: center;
		font-size: minMaxSize(15px, 18px);
		line-height: minMaxSize(19px, 22px);

		.player & {
			font-size: minMaxSize(15px, 18px, 768px, 1440px);
			line-height: minMaxSize(19px, 22px, 768px, 1440px);
		}
	}
	:global(.tab) .text {
		text-align: unset;
	}

	.number {
		color: var(--color-3);
		font-size: minMaxSize(24px, 32px);
		line-height: minMaxSize(30px, 40px);

		.player & {
			font-size: minMaxSize(24px, 32px, 768px, 1440px);
			line-height: minMaxSize(30px, 40px, 768px, 1440px);
		}
	}

	.active :is(.text, .number) {
		color: var(--color-8);
	}
</style>

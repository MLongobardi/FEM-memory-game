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
		align-content: center;
		background: #dfe7ec;
		border-radius: minMaxSize(5px, 10px);
		height: minMaxSize(70px, 72px);
		row-gap: minMaxSize(2px,5px);
		box-sizing: border-box;

		:global(.tab) &:not(.player) {
			justify-content: space-between;
			flex-wrap: nowrap;
			padding-left: 21px;
			padding-right: 24px;
		}
	}
	.card.player {
		height: minMaxSize(70px, 80px);

		:global(.tab) & {
			justify-content: space-between;
			height: minMaxSize(80px, 72px, 768px, 1440px);
			padding-left: minMaxSize(16px, 21px, 768px, 1440px);
		}
		:global(.des) & {
			flex-wrap: nowrap;
			padding-right: 24px;
		}
	}
	.card.active {
		background: var(--color-1);
		position: relative;
	}
	.card.active::before {
		--h: 20px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: calc(-1 * var(--h) + 1px);
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

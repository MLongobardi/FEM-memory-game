<script>
	export let text = "";
	export let number = "";
	export let active = false;
</script>

<div class="card" class:active>
	<span class="text">{text}</span>
	<span class="number">{number}</span>
</div>

<style lang="scss">
	.card {
		display: flex;
		flex-wrap: wrap; /*temp*/
		justify-content: space-between;
		align-items: center;
		background: #dfe7ec;
		border-radius: 10px;
		padding: minMaxSize(10px, 15px);
		box-sizing: border-box;
	}
	.card.active {
		background: var(--orange);
        position: relative;
	}
	.card.active::before {
		--h: 19px;
		content: '';
		width: 0;
		height: 0;
        position: absolute;
        top: calc(-1 * var(--h));
        left: calc(50% - var(--h));
		border-style: solid;
		border-width: 0 var(--h) var(--h) var(--h);
		border-color: transparent transparent var(--orange) transparent;
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
        color: var(--dark-blue);
    }

	.text {
		color: var(--color-6);
		font-size: minMaxSize(15px, 18px);
		line-height: minMaxSize(19px, 22px);
	}

	.number {
		color: var(--colored-cell);
		font-size: minMaxSize(24px, 32px);
		line-height: minMaxSize(30px, 40px);
	}

	.active :is(.text, .number) {
		color: var(--background-white);
	}
</style>

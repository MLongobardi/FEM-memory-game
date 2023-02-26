<script>
	import { Header, Main, Footer, Loading, Dialog, Settings, GameOver } from "$comps";
	import { dialogStore, mainStore, mediaStore } from "$stores";
	import { onMount } from "svelte";

	let loading = true;

	onMount(() => {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState == "hidden" && $mainStore.timer.running) {
				$dialogStore.PAUSE.open();
			}
		});

		loading = false;
	});
</script>

<svelte:head>
	<link href="/fontawesome/css/fontawesome.css" rel="stylesheet" />
	<link href="/fontawesome/css/regular.css" rel="stylesheet" />
	<link href="/fontawesome/css/solid.css" rel="stylesheet" />
</svelte:head>

<div
	class="media-wrapper {$mediaStore.screenClassList}"
	class:hoverable={$mediaStore.misc.hoverable}
>
	{#if loading}
		<Loading />
	{/if}
	<span class="top-hdr" />
	<Header />
	<span class="hdr-main" />
	<Main />
	<span class="main-ftr" />
	<Footer />
	<span class="ftr-btm" />

	<Dialog name="SETTINGS" startOpen>
		<Settings />
	</Dialog>

	<Dialog name="GAMEOVER" onOpen={mainStore.pauseTimer}>
		<GameOver />
	</Dialog>
</div>

<style lang="scss">
	.media-wrapper {
		/*I can't add classes to the body in svelte*/
		display: contents;
	}

	.top-hdr,
	.ftr-btm {
		/*body is set to flex*/
		flex-basis: 10px;
		flex-grow: 1;
	}
	.hdr-main,
	.main-ftr {
		flex-basis: 25px;
		flex-grow: 3.5;

		:global(.des) & {
			flex-grow: 1.25;
		}
	}
</style>

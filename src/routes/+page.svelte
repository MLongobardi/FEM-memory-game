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

<div class="media-wrapper {$mediaStore.screenClassList}">
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

<style>
	.media-wrapper {
		/*I can't add classes to the body in svelte*/
		display: contents;
	}

	.top-hdr, .hdr-main, .main-ftr, .ftr-btm {
		/*body is set to flex*/
		flex-basis: 10px;
		flex-grow: 1;
	}
	.hdr-main, .main-ftr {
		flex-grow: 3;
	}
</style>

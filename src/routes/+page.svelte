<script>
	import { Header, Main, Footer, Dialog, Settings } from "$comps";
	import { dialogStore, mainStore, mediaStore } from "$stores";
	import { onMount } from "svelte";

	onMount(() => {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState == "hidden" && $mainStore.timer.running) {
				$dialogStore.PAUSE.open();
			}
		});
	});
</script>

<div class="media-wrapper {$mediaStore.screenClassList}">
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

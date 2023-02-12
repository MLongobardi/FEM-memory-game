<script>
	import { Header, Main, Footer, Dialog } from "$comps";
	import { mediaStore } from "$stores";
</script>

<div class="media-wrapper {$mediaStore.screenClassList}">
	<span class="top-hdr" />
	<Header />
	<span class="hdr-main" />
	<Main />
	<span class="main-ftr" />
	<Footer />
	<span class="ftr-btm" />
	<Dialog name="TEST" startOpen/>
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
</style>

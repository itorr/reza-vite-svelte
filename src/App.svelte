<script>
	import Header from "./components/Header.svelte";
	import Router from 'svelte-spa-router'
	import { routes } from "./routes";
	import Player from "./components/Player.svelte";
	
</script>

<main>
	<Player />
	<Header />
	<Router {routes} restoreScrollState={true} />
</main>

<style>
</style>


import Counter from "./views/Counter.svelte";
import Albums from "./views/Albums.svelte";

// https://github.com/ItalyPaleAle/svelte-spa-router
export const routes = {
    '/': Counter,
    '/albums': Albums,
};
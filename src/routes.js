
import Counter from "./views/Counter.svelte";
import Albums from "./views/Albums.svelte";
import Album from "./views/Album.svelte";

// https://github.com/ItalyPaleAle/svelte-spa-router
export const routes = new Map();

routes.set('/', Counter);
routes.set('/albums', Albums);
routes.set('/album/:id', Album);

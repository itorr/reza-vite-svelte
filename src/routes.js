
import Home from "./views/Home.svelte";
import Albums from "./views/Albums.svelte";
import Album from "./views/Album.svelte";

// https://github.com/ItalyPaleAle/svelte-spa-router
export const routes = new Map();

routes.set('/', Home);
routes.set('/albums', Albums);
routes.set('/album/:id', Album);

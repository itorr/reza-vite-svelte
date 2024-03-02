
import Home from "./views/Home.svelte";
import Albums from "./views/Albums.svelte";
import Album from "./views/Album.svelte";
import Playlist from "./views/Playlist.svelte";
import Search from "./views/Search.svelte";
import Me from "./views/Me.svelte";
import NotFound from "./views/NotFound.svelte";

// https://github.com/ItalyPaleAle/svelte-spa-router
export const routes = new Map();

routes.set('/', Home);
routes.set('/albums', Albums);
routes.set('/album/:id', Album);
routes.set('/playlist', Playlist);
routes.set('/search', Search);
routes.set('/me', Me);
routes.set('*', NotFound);

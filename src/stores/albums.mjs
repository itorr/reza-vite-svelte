import { get, writable } from "svelte/store";
import { BASE_MUSIC_URL } from "../functions/config.mjs";
import { fetchJSON } from "../functions/fetch.mjs";

export const albums = writable([]);


export const fetchAlbums = async () => await fetchJSON(`${BASE_MUSIC_URL}albums.json`);


let albumsLoadPromise = null;
const updateAlbums = async () => {
    if(!albumsLoadPromise){
        albumsLoadPromise = fetchAlbums();
    }

    const albumsData = await albumsLoadPromise;
    albums.set(albumsData);
}

updateAlbums();

export const getAlbumById = async (id) => {
    await updateAlbums();

    return get(albums).find( album => album.id === id );
}
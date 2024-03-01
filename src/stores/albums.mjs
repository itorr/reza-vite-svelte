import { get, writable } from "svelte/store";
import { fetchAlbums } from "../functions/fetch.mjs";

export const albums = writable([]);

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
import { get, writable } from "svelte/store";
import { BASE_MUSIC_URL } from "../functions/config.mjs";
import { fetchJSON } from "../functions/fetch.mjs";



export const albums = writable([]);


export const fetchAlbums = async () => {
    let _albums = await fetchJSON(`${BASE_MUSIC_URL}albums.json`);

    _albums = _albums.filter(album=>album.colors);
    _albums.forEach(album=>{
        const texts = [
            album.title
        ];

        if(album.artist){
            album.artist.forEach( artist => texts.push(artist) );
        }

        album.disks.forEach( disk => {
            disk.tracks.forEach( track => texts.push(track.title) );
        });
        album._text = texts.join(' ').toLowerCase();
    });

    return _albums;
}


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


export const getAlbumsByRandom = async (count) => {
    await updateAlbums();

    return get(albums).sort( () => Math.random() - 0.5 ).slice(0, count);
    
}

export const getAlbumByRandom = async () => {
    return (await getAlbumsByRandom(1))[0];
}

import { randArrayByNumberRand100 } from "../functions/random.mjs";

export const getAlbumsByRandomSeed = async (seed,count) => {
    await updateAlbums();
    return randArrayByNumberRand100(get(albums),seed,count);
}

export const getAlbumsByKeyword = async (keyword) => {
    await updateAlbums();

    const keywordLower = keyword.toLowerCase();
    return get(albums).filter( album => {
        return album._text.includes( keywordLower )
    } );
}
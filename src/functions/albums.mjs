import { albumBurnNumber, albumLightNumber, hax2burn, hax2light } from "./colors.mjs";
import { BASE_MUSIC_ALBUMS_URL  } from "./config.mjs"


export const getTrackMediaURL = ( album, track ) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/aac96/${track.fname.replace(/\.[^\.]+$/, '.m4a')}`;
}


export const getAlbumCoverURL = (album) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/cover-w520h520.jpg`;
}


export const getArtistByAlbumTrack = (album, track) => {
    return [...new Set([
        track.artist,
        album.artist
    ].flat().filter(a=>a))].find(v => v && v.length) || 'Reza!';
}




export const setDocumentAlbumColor = (color)=>{
    if(!color) {
        document.documentElement.style.cssText = '';
        return;
    }
    
    document.documentElement.style.setProperty('--album-color', '#'+color);
    document.documentElement.style.setProperty('--album-color-dark', '#'+hax2burn(color,albumBurnNumber));
    document.documentElement.style.setProperty('--album-color-light', '#'+hax2light(color,albumLightNumber));
}



















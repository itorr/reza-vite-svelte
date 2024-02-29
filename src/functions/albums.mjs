import { BASE_MUSIC_ALBUMS_URL  } from "./config.mjs"


export const getTrackMediaURL = ( album, track ) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/aac96/${track.fname.replace(/\.[^\.]+$/, '.m4a')}`;
}


export const getAlbumCoverURL = (album) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/cover-w520h520.jpg`;
}
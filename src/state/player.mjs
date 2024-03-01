import { get, writable } from 'svelte/store';
import { getAlbumCoverURL, getTrackMediaURL } from "../functions/albums.mjs";
import { albumBurnNumber, albumLightNumber, hax2burn, hax2light } from '../functions/colors.mjs';

export const audio = new Audio();
export const playlist = writable([]);
export const current = writable(null);
export const mode = writable('loop');
export const volume = writable(1);
export const paused = writable(true);
export const currentTrackId = writable(null);

current.subscribe((v) => {
    if(v === null) return;

    currentTrackId.set(v.track.id);

    const album = v.album;
    const color = album.colors[0];
    document.documentElement.style.setProperty('--album-color', '#'+color);
    document.documentElement.style.setProperty('--album-color-dark', '#'+hax2burn(album.colors[0],albumBurnNumber));
    document.documentElement.style.setProperty('--album-color-light', '#'+hax2light(album.colors[0],albumLightNumber));
});


export function setPlaylist(_playlist,_current) {
    playlist.set(_playlist);
    current.set(_current);
}


import { setMediaSession } from "../functions/media.mjs";

export function playCurrent(_current) {
    
    current.set(_current);
    const { track, album } = _current;
    audio.src = getTrackMediaURL(album,track);
    audio.play();

    const artist = [...new Set([
        track.artist,
        album.artist
    ].flat().filter(a=>a))].find(v => v && v.length) || 'Reza!';


    setMediaSession({
        title: track.title,
        artist,
        album: album.title,
        coverURL: getAlbumCoverURL(album)
    });
};

export function setPlaylistAndPlay(_playlist,_current) {
    if(!_current) return;

    setPlaylist(_playlist,_current);

    playCurrent(_current);
}

export function seek(time) {
    audio.currentTime = time;
}

export function setVolume(volume) {
    audio.volume = volume;
}

export function getVolume() {   
    return audio.volume;
}

export function getDuration() {
    return audio.duration;
}

export function getCurrentTime() {
    return audio.currentTime;
}

export function pause() {
    audio.pause();
}

export function pauseOrPlay() {
    if(!audio.src) return;
    
    if(audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

export function stop() {
    audio.pause();
    audio.currentTime = 0;
}

export function playItem(item) {
    if(!get(playlist).includes(item)) return;

    current.set(item);
    playCurrent(item);
}

export function playIndex(index) {
    const _playlist = get(playlist);
    if(index < 0 || index >= _playlist.length) return;

    playItem(_playlist[index]);
}


export function next() {

    const _playlist = get(playlist);
    const _current = get(current);
    const _mode = get(mode);
    const index = _playlist.indexOf(_current);

    let nextIndex;
    if(_mode === 'loop') {
        nextIndex = (index + 1) % _playlist.length;
        // current.set(_playlist[(index + 1) % _playlist.length]);
    } else if(_mode === 'random') {
        nextIndex = Math.floor(Math.random() * _playlist.length);
        // current.set(_playlist[Math.floor(Math.random() * _playlist.length)]);
    } else {
        return;
    }
    
    playIndex(nextIndex);
}

export function prev() {
    const _playlist = get(playlist);
    const _current = get(current);
    const _mode = get(mode);
    const index = _playlist.indexOf(_current);

    let prevIndex;
    if(_mode === 'loop') {
        prevIndex = (index - 1 + _playlist.length) % _playlist.length;
        // current.set(_playlist[(index - 1 + _playlist.length) % _playlist.length]);
    } else if(_mode === 'random') {
        prevIndex = Math.floor(Math.random() * _playlist.length);
        // current.set(_playlist[Math.floor(Math.random() * _playlist.length)]);
    } else {
        return;
    }

    playIndex(prevIndex);
}

export function setMode(v) {
    mode.set(v);
}

export function switchMode() {
    const _mode = get(mode);
    if(_mode === 'loop') {
        mode.set('random');
    } else if(_mode === 'random') {
        mode.set('loop');
    }
}

export function addPlaylistItems(v) {
    playlist.update((state) => {
        state.push(...v);
        return state;
    });
}

export function removePlaylistItem(v) {
    playlist.update((state) => {
        const index = state.indexOf(v);
        if(index === -1) return state;

        state.splice(index, 1);
        return state;
    });
}




audio.addEventListener('ended', () => {

    console.log('播放结束，尝试下一首')
    next();

});
audio.addEventListener('pause', () => {
    paused.set(true);
    document.title = '|| ' + get(current).track.title;
});
audio.addEventListener('play', () => {
    paused.set(false);
    document.title = '▶ ' + get(current).track.title;
});
// audio.addEventListener('timeupdate', () => {
//     console.log('timeupdate',audio.currentTime);
// });
audio.addEventListener('error', (e) => {
    console.log('audio error',e)
});
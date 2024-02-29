import { writable } from 'svelte/store';

import { getTrackMediaURL } from "../functions/albums.mjs";

export const audio = new Audio();
export const playlist = writable([]);
export const current = writable(null);
export const mode = writable('loop');
export const volume = writable(1);
export const paused = writable(true);

export function setPlaylist(playlist,current) {
    playlist.set(playlist);
    current.set(current);
}

export function setPlaylistAndPlay(playlist,current) {
    playlist.set(playlist);
    current.set(current);
    audio.src = getTrackMediaURL(current.album,current.track);
    audio.play();
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

export function stop() {
    audio.pause();
    audio.currentTime = 0;
}

export function next() {
    // const index = playlist.indexOf(current);
    // if(mode === 'loop') {
    //     current.set(playlist[(index + 1) % playlist.length]);
    // } else if(mode === 'random') {
    //     current.set(playlist[Math.floor(Math.random() * playlist.length)]);
    // } else if(index < playlist.length - 1) {
    //     current.set(playlist[index + 1]);
    // }
    
}

export function prev() {

    // const index = playlist.indexOf(current);
    // if(mode === 'loop') {
    //     current.set(playlist[(index - 1 + playlist.length) % playlist.length]);
    // } else if(mode === 'random') {
    //     current.set(playlist[Math.floor(Math.random() * playlist.length)]);
    // } else if(index > 0) {
    //     current.set(playlist[index - 1]);
    // }
}

export function setMode(v) {
    mode.set(v);
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
    }
}




audio.addEventListener('ended', () => {
    player.next();
});
audio.addEventListener('pause', () => {
    player.update((state) => {
        state.paused = true;
        return state;
    });
});
audio.addEventListener('play', () => {
    player.update((state) => {
        state.paused = false;
        return state;
    });
});
audio.addEventListener('timeupdate', () => {
    player.update((state) => {
        state.currentTime = audio.currentTime;
        return state;
    });
});
audio.addEventListener('error', (e) => {
    console.log('audio error',e)
});
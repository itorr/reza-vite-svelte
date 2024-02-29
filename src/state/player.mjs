import { get, writable } from 'svelte/store';
import { getTrackMediaURL } from "../functions/albums.mjs";

export const audio = new Audio();
export const playlist = writable([]);
export const current = writable(null);
export const mode = writable('loop');
export const volume = writable(1);
export const paused = writable(true);

export function setPlaylist(_playlist,_current) {
    playlist.set(_playlist);
    current.set(_current);
}

export function setPlaylistAndPlay(_playlist,_current) {
    setPlaylist(_playlist,_current);
    audio.src = getTrackMediaURL(_current.album,_current.track);
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

    current.set(_playlist[nextIndex]);
    audio.src = getTrackMediaURL(_playlist[nextIndex].album,_playlist[nextIndex].track);
    audio.play();
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
    });
}




audio.addEventListener('ended', () => {

    console.log('播放结束，尝试下一首')
    next();
});
audio.addEventListener('pause', () => {
    paused.set(true);
});
audio.addEventListener('play', () => {
    paused.set(false);
});
audio.addEventListener('timeupdate', () => {
    console.log('timeupdate',audio.currentTime);
});
audio.addEventListener('error', (e) => {
    console.log('audio error',e)
});
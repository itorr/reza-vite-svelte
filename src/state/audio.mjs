export const audio = new Audio();

export const play = async (url) => {
    audio.src = url;
    await audio.play();
}

export const pause = () => {
    audio.pause();
}

export const stop = () => {
    audio.pause();
    audio.currentTime = 0;
}

export const seek = (time) => {
    audio.currentTime = time;
}

export const setVolume = (volume) => {
    audio.volume = volume;
}

export const getVolume = () => {
    return audio.volume;
}

export const getDuration = () => {
    return audio.duration;
}

export const getCurrentTime = () => {
    return audio.currentTime;
}   

export const isPlaying = () => {
    return !audio.paused;
}   



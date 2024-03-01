export const fetch = async (url) => {
    const response = await window.fetch(url);
    const data = await response.json();
    return data;
};

// https://n.magiconch.com:8087/music/albums.json
export const fetchAlbums = async () => await fetch('https://n.magiconch.com:8087/music/albums.json');

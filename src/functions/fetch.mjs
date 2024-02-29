export const fetch = async (url) => {
    const response = await window.fetch(url);
    const data = await response.json();
    return data;
};


const Caches = {
    albums: null,
    Albums:{},
};

// https://n.magiconch.com:8087/music/albums.json
export const fetchAlbums = async () => {
    if(Caches.albums) {
        return Caches.albums;
    }

    const albums = await fetch('https://n.magiconch.com:8087/music/albums.json');
    Caches.albums = albums;

    albums.forEach(album => {
        Caches.Albums[album.id] = album;
    });

    return albums
};


export const fetchAlbum = async (id) => {
    if(!Caches.albums) await fetchAlbums();

    Caches.Albums[id] = album;

    return album;
}


export const fetchBashData = async () => {
    await fetchAlbums();
}
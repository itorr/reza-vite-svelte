<script>
    import { fetchAlbums } from "../functions/fetch.mjs";
    let albums = [];


    fetchAlbums().then((data) => {
        albums = data;
    });
    import { getAlbumCoverURL } from '../functions/albums.mjs';
	import { albumBurnNumber, hax2burn } from "../functions/colors.mjs";
	import Cover from "../components/Cover.svelte";

</script>

<div class="reza-albums">
    {#each albums as album (album.id)}
    <a class="reza-album" 
        href={`#/album/${album.id}`}
        style={`color:#${hax2burn(album.colors[0],albumBurnNumber)}`}>
        <Cover src={getAlbumCoverURL(album)} 
            alt={album.title+'封面图'}
            className="album-cover" 
            color="currentColor" />
        <h2 class="album-title">{album.title}</h2>
        <p class="artist-names">{album.artist}</p>
    </a>
    {/each}
</div>
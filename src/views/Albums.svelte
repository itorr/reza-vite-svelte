<script>
    import { albums } from '../stores/albums.mjs';
    import { getAlbumCoverURL } from '../functions/albums.mjs';
	import { albumBurnNumber, hax2burn } from "../functions/colors.mjs";
	import Cover from "../components/Cover.svelte";
</script>

<div class="reza-albums">
    {#each $albums as album (album.id)}
    <div class="reza-album" 
        style={`color:#${hax2burn(album.colors[0],albumBurnNumber)}`}>
        <a class="reza-album-link" href={`#/album/${album.id}`}>
            <Cover src={getAlbumCoverURL(album)} 
                alt={album.title}
                className="album-cover" 
                color="currentColor" />
            <div class="album-title-box">
                <h2 class="album-title">{album.title}</h2>
            </div>
            <div class="artist-names-box">
                <p class="artist-names">{album.artist}</p>
            </div>
        </a>
    </div>
    {/each}
</div>
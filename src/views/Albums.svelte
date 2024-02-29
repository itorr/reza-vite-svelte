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

<style global lang="less">
.reza-albums {
    overflow: hidden;
    padding: 5px;
    .reza-album {
        float: left;
        --album-padding: 5px;
        --cover-width: 260px;

        padding: var(--album-padding);
        width: var(--cover-width);
        height: calc(var(--cover-width) + 100px);
        // :global(.album-cover) {
        // }
        .album-title{
            line-height: 1;
            padding: .5em 0 .2em;
        }
        .artist-names{
            font-size: 12px;
            opacity: 0.5;
        }
    }
    @media (max-width: 768px) {
        .reza-album {
            width: 50%;
            box-sizing: border-box;
            --cover-width: calc( 100vw / 2 - var(--album-padding) * 3 );
            
            font-size: 14px;
        }
    }
}
</style>
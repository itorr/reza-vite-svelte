<script>
    import { fetchAlbums } from "../functions/fetch.mjs";
    let albums = [];


    fetchAlbums().then((data) => {
        albums = data;
    });
    import { getAlbumCoverURL } from '../functions/albums.mjs';
	import { albumBurnNumber, hax2burn } from "../functions/colors.mjs";

</script>

<div class="reza-albums">
    {#each albums as album (album.id)}
    <a class="reza-album" 
        href={`#/album/${album.id}`}
        style={`color:#${hax2burn(album.colors[0],albumBurnNumber)}`}>
        <img src={getAlbumCoverURL(album)} alt={album.title} style={`background-color:#${album.colors[0]}`} />
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
        width: 260px;
        height: 400px;
        padding: 5px;
        img {
            width: 260px;
            height: 260px;
            object-fit: cover;
        }
        .album-title{
            line-height: 1;
            padding: .2em 0;
        }
        .artist-names{
            opacity: 0.5;
        }
    }
}
</style>
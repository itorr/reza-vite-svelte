<script>
    import { albums } from '../stores/albums.mjs';
    import { getAlbumCoverURL } from '../functions/albums.mjs';
	import { albumBurnNumber, hax2burn } from "../functions/colors.mjs";
	import Cover from "../components/Cover.svelte";
	import { querystring } from 'svelte-spa-router';
    
    console.log(querystring)
    querystring.subscribe((value) => {
        console.log('subscribe',value)

        //https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
        const searchParams = new URLSearchParams(value);
        console.log('searchParams',searchParams)
    })
</script>

<div class="reza-albums">
    <!-- <a href="#/albums?page=2">2</a> -->
    <!-- <a href="#/albums?page=2&asd=121332">2</a> -->
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
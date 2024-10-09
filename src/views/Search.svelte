<script>
	import Cover from "@/components/Cover.svelte";
	import { getAlbumCoverURL } from "@/functions/albums.mjs";
	import { albumBurnNumber, hax2burn } from "@/functions/colors.mjs";
	import { setPlaylistByAlbumsAndPlay } from "@/state/player.mjs";
	import { getAlbumsByKeyword } from "@/stores/albums.mjs";


let text = '';

let albums = [];
const submitSearch = async ()=>{
    console.log(text);
    albums = await getAlbumsByKeyword(text);
}


</script>

<h1>Search</h1>

<form on:submit|preventDefault={submitSearch}>
    <input type="search" placeholder="输入搜索关键词" bind:value={text} />
    <button>搜索</button>
</form>

<p>
    一些搜索选项，排序方式
</p>
<!-- if albums.length -->
 {#if albums.length}
    <div class="reza-albums">
        <p>搜索结果：{albums.length} 个专辑</p>
        <button on:click={()=>setPlaylistByAlbumsAndPlay(albums)}>播放所有搜索结果</button>
    </div>
 {/if}

<div class="reza-albums">
    <!-- <a href="#/albums?page=2">2</a> -->
    <!-- <a href="#/albums?page=2&asd=121332">2</a> -->
    {#each albums as album (String(album.id) + album.title)}
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
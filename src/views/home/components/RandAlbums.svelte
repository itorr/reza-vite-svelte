<script>
    import { albums, getAlbumsByRandom, getAlbumsByRandomSeed } from '@/stores/albums.mjs';
    import { getAlbumCoverURL } from '@/functions/albums.mjs';
	import { albumBurnNumber, hax2burn } from "@/functions/colors.mjs";
	import Cover from "@/components/Cover.svelte";
    
    let randAlbums = [];

    const toRandAlbums = async () => {
        randAlbums = await getAlbumsByRandomSeed(Math.floor(+new Date()/(1000*60*60)),6);
    };

    toRandAlbums();
</script>
<div class="rand-albums-box">
    <div class="head">
        <h2>推荐专辑</h2>
        <p>整点更新</p>
    </div>
    <div class="reza-albums">
        {#each randAlbums as album (album.id)}
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
        <!-- <button on:click={toRandAlbums}>Random Album</button> -->
    </div>
</div>

<style lang="less">
    .rand-albums-box{
        .head{
            padding: 0 14px;
            p{
                font-size: 12px;
                opacity: 0.5;
            }
        }
    }
</style>
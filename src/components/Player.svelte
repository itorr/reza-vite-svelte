<script>
    import { getAlbumCoverURL, getTrackMediaURL } from '../functions/albums.mjs';
    import { fetchAlbum } from '../functions/fetch.mjs';
    import { audio, current } from '../state/player.mjs';
    import { albumBurnNumber, hax2burn } from '../functions/colors.mjs';
	import { onDestroy, onMount } from 'svelte';
    
    export let params = {};
    let currentTime = 0;
    let duration = 0;
    let progress = 0;


    const onTimeUpdate = () => {
        currentTime = audio.currentTime;
        duration = audio.duration;
        progress = currentTime / duration;
    }

    onMount(() => {
        audio.addEventListener('timeupdate', onTimeUpdate);
    });
    onDestroy(() => {
        audio.removeEventListener('timeupdate', onTimeUpdate);
    });

</script>

<div class="player-box">
    {#if $current}
    <div class="playing-current-box" style={`color:#${hax2burn($current.album.colors[0],albumBurnNumber)}`}>
        <div class="progress-bar">
            <div class="progress" style={`width:${progress*100}%`}></div>
        </div>
        <img src={getAlbumCoverURL($current.album)} alt="Album cover" class="album-cover">
        <div class="track-info">
            <h3>{$current.track.title}</h3>
            <p>{$current.track.artist || $current.album.artist }</p>
        </div>
    </div>
    {:else}
        <p>No track selected</p>
    {/if}
</div>

<style lang="less">
.player-box{
    overflow: hidden;
    .album-cover{
        float: left;
        width: 130px;
        height: 130px;
    }
    .track-info{
        float: left;
        padding: 5px 10px;
        h3{
            margin: 0;
        }
        p{
            margin: 0;
            opacity: 0.5;
        }
    }
    .progress-bar{
        clear: both;
        position: relative;
        width: 100%;
        height: 5px;
        .progress{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 2px;
            min-width: 2px;
            background-color: currentColor;
        }
    }
}
</style>
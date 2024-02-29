<script>
    import { getAlbumCoverURL, getTrackMediaURL } from '../functions/albums.mjs';
    import { fetchAlbum } from '../functions/fetch.mjs';
    import { audio, current, next, pauseOrPlay, paused, prev } from '../state/player.mjs';
    import { albumBurnNumber, hax2burn } from '../functions/colors.mjs';
	import { onDestroy, onMount } from 'svelte';
	import Cover from './Cover.svelte';

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
        <Cover src={getAlbumCoverURL($current.album)} 
            alt={$current.album.title+'封面图'}
            className="album-cover" 
            color="currentColor" />
        <div class="track-info">
            <h3>{$current.track.title}</h3>
            <p>{$current.track.artist || $current.album.artist }</p>
            <a on:click={pauseOrPlay}>{ $paused ? 'play' : 'pause'}</a>
            <a on:click={prev}>prev</a>
            <a on:click={next}>next</a>
        </div>
    </div>
    {:else}
    <div class="playing-current-box">
        <div class="progress-bar">
            <div class="progress" style={`width:${progress*100}%`}></div>
        </div>
        <Cover src=""
            className="album-cover" 
            color="currentColor" />
        <div class="track-info">
            <h3>Reza!</h3>
            <p>welcome Reza!</p>
        </div>
    </div>
    {/if}
</div>

<style lang="less">
.player-box{
    overflow: hidden;

    position: relative;
    z-index: 0;

    &:after{
        content: '';
        position: absolute;
        bottom:0;
        left: 0;
        right: 0;
        z-index: -1;

        height: 1px;
        background-color: var(--album-dark);
        opacity: .3;

        box-shadow: 
            0 2px 0 0 var(--album-light),
            0 3px 10px -3px var(--album-light);
    }

    :global(.album-cover){
        float: left;
        --cover-width: 80px;
    }
    .track-info{
        float: left;
        padding: 5px 10px;
        h3{
            font-size: 18px;
            margin: 0;
        }
        p{
            margin: 0;
            font-size: 12px;
            opacity: 0.5;
        }
    }
    .progress-bar{
        clear: both;
        position: relative;
        width: 100%;
        height: 5px;
        cursor: pointer;
        .progress{
            pointer-events: none;
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
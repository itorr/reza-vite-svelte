<script>
    import { getAlbumCoverURL, getTrackMediaURL } from '../functions/albums.mjs';
    import { audio, current, next, pauseOrPlay, paused, prev, mode, switchMode } from '../state/player.mjs';
    import { albumBurnNumber, hax2burn } from '../functions/colors.mjs';
    import { second2ms } from '../functions/time.mjs';
	import { onDestroy, onMount } from 'svelte';
	import Cover from './Cover.svelte';
	import CoverDOM from './CoverDOM.svelte';
	import active from 'svelte-spa-router/active';
	import Visualization from './Visualization.svelte';

    // export let params = {};
    let currentTime = 0;
    let duration = 0;
    let progress = 0;

    let currentAlbumCoverImageURL = '';

    current.subscribe(_current => {
        if (!_current) return;
        if (!_current.album ) return;
        currentAlbumCoverImageURL = getAlbumCoverURL(_current.album);
    });

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
        <Visualization />
        <div class="progress-bar">
            <time>
                <span data-text={second2ms(currentTime)}></span>
                /
                <span data-text={second2ms(duration)}></span>
            </time>
            <div class="progress" style={`width:${progress*100}%`}></div>
        </div>

        <div class="track-box">
            <CoverDOM src={currentAlbumCoverImageURL} 
                alt={$current.album.title}
                className="{`album-cover ${$paused?'paused':''}`}" 
                color="var(--album-color-light)"
                on:click={pauseOrPlay} />
            <div class="track-info">
                <h3>{$current.track.title}</h3>
                <p>{$current.track.artist || $current.album.artist }</p>
            </div>
            <div class="ctrl-box">
                <!-- <a on:click={switchMode}>{$mode}</a> -->
                <a on:click={pauseOrPlay}>{ $paused ? 'play' : 'pause'}</a>
                <!-- <a on:click={prev}>prev</a> -->
                <a on:click={next}>next</a>
                <br>
                <a href="#/playlist" use:active>playlist</a>
            </div>
        </div>
    </div>
    {:else}
    <div class="playing-current-box">
        <div class="visualization-box">
            <h2>可视化，还没做</h2>
        </div>
        <div class="progress-bar">
            <div class="progress" style={`width:${progress*100}%`}></div>
        </div>
        <CoverDOM src=""
            className="album-cover" 
            color="currentColor" />
        <div class="track-info">
            <h3>Reza!</h3>
            <p>welcome Reza!</p>
        </div>
    </div>
    {/if}
</div>
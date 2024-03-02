<script>
// @ts-nocheck
    import './album.less';
	import Cover from '../components/Cover.svelte';

    // @ts-nocheck

    import { getAlbumCoverURL, getTrackMediaURL } from '../functions/albums.mjs';
    import { albumBurnNumber, albumLightNumber, hax2burn, hax2light } from '../functions/colors.mjs';
    

    import { currentTrackId, setPlaylistAndPlay } from '../state/player.mjs'
	import { getAlbumById } from '../stores/albums.mjs';

    export let params = {};

    let album = null;
    let albumDetailStyleText = ''; 

    getAlbumById(params.id).then((data) => {
        album = data;

        const color = album.colors[0];

        // 给专辑详情页设置颜色
        albumDetailStyleText = [
            `color:#${hax2burn(color,albumBurnNumber)}`,
            `--album-color-dark:#${hax2burn(color,albumBurnNumber)}`,
            `--album-color-light:#${hax2light(color,albumLightNumber)}`
        ].join(';');
    });


    const playTrackInAlbum = (track) => {
        const playlist = album.disks.map(disk => disk.tracks).flat().map(track =>{
            return {
                album,
                track,
            }
        });

        const current = playlist.find(item => item.track === track);
        setPlaylistAndPlay(playlist, current);
    }


</script>

{#if album}
    <div class="reza-album-detail" style={albumDetailStyleText}>
        <div class="album-info">
            <Cover src={getAlbumCoverURL(album)} 
                alt={album.title}
                className="album-cover" 
                color="var(--album-color-light)" />
            <h2 class="album-title">{album.title}</h2>
            <p class="album-artist-names">{album.artist}</p>
        </div>
        <div class="disk-list">
            {#each album.disks as disk, diskIndex (disk.title + '$' + diskIndex)}
                <div class="disk-item">
                    <h3>{disk.title}</h3>
                    <div class="track-list">
                        {#each disk.tracks as track, trackIndex (track.id)}
                            <div class="track-item" 
                                on:click={playTrackInAlbum(track)}
                                data-active={$currentTrackId === track.id}>
                                <i>{trackIndex + 1}</i>
                                <h4>{track.title}</h4>
                                {#if track.sub}
                                    <p>{track.sub}</p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <!-- <pre>{JSON.stringify(album,0,2)}</pre> -->
{:else}
    <p>loading...</p>
{/if}

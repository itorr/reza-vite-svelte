<script>
// @ts-nocheck

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
                alt={album.title+'封面图'}
                className="album-cover" 
                color="currentColor" />
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
                                class:active={$currentTrackId === track.id}>
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

<style global lang="less">
.reza-album-detail {

    .album-info{
        --album-detail-info-padding: 10px;
        padding: var(--album-detail-info-padding);
        
        --cover-width: 260px;

        padding-left: calc(var(--cover-width) + 24px);
        min-height: var(--cover-width);
        position: relative;

        :global(.album-cover){
            position: absolute;
            top: var(--album-detail-info-padding);
            left: var(--album-detail-info-padding);
        }
        h2{
            margin: 0;
            line-height: 1.2;
        }
        p{
            margin: 0;
            opacity: 0.5;
        }

        @media (max-width: 768px) {
            
            --cover-width: calc( 50vw - 20px );
            font-size: 14px;
        }
    }

    .disk-list{
        pointer-events: none;
        .disk-item{
            padding: 10px 0 30px;
            h3{
                font-size: 14px;
                margin: 0;
                padding: 0 10px;
            }
            .track-list{
                padding: 0;
                margin: 0;
                .track-item{
                    line-height: 20px;
                    padding: 10px 50px 10px 40px;
                    position: relative;
                    cursor: pointer;
                    pointer-events: auto;
                    transition: background-color .3s ease, color .3s ease;
                    i{
                        position: absolute;
                        opacity: 0.5;
                        left: 10px;
                        font-size: 14px;
                        width: 1.2em;
                        padding: 3px 0;
                        text-align: right;
                    }
                    h4{
                        margin: 0;
                        padding: 2px 0;
                    }
                    p{
                        margin: 0;
                        opacity: 0.5;
                        font-size: 12px;
                    }
                    &:hover{
                        background: var(--album-color-light);
                    }
                    &.active{
                        background: currentColor;
                        & > *{
                            color: #FFF;
                        }
                    }
                }
            }
        }

    }
}
</style>
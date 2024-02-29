<script>
    // @ts-nocheck

    import { getAlbumCoverURL, getTrackMediaURL } from '../functions/albums.mjs';
    import { albumBurnNumber, hax2burn } from '../functions/colors.mjs';
    import { fetchAlbum } from '../functions/fetch.mjs';

    import { setPlaylistAndPlay } from '../state/player.mjs'

    export let params = {};

    let album = null;
    console.log(JSON.stringify(params));

    fetchAlbum(params.id).then((data) => {
        album = data;
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
    <div class="reza-album-detail"  style={`color:#${hax2burn(album.colors[0],albumBurnNumber)}`}>
        <img src={getAlbumCoverURL(album)} alt={album.title} />
        <h2>{album.title}</h2>
        <p>{album.artist}</p>
        <div class="disk-list">
            {#each album.disks as disk, diskIndex (disk.title + '$' + diskIndex)}
                <div class="disk-item">
                    <h3>{disk.title}</h3>
                    <ul>
                        {#each disk.tracks as track, trackIndex (track.id)}
                            <li>
                                <i>{trackIndex + 1}</i>
                                <h4>{track.title}</h4>
                                {#if track.sub}
                                    <p>{track.sub}</p>
                                {/if}
                                <button on:click={playTrackInAlbum(track)}>播放</button>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </div>
    <pre>{JSON.stringify(album,0,2)}</pre>
{:else}
    <p>loading...</p>
{/if}

<style global lang="less">
.reza-album-detail {
    padding: 10px;
    img{
        width: 260px;
        height: 260px;
    }
}
</style>
<script>
	import Cover from "@/components/Cover.svelte";
	import { getAlbumCoverURL } from "@/functions/albums.mjs";
	import { albumBurnNumber, hax2burn } from "@/functions/colors.mjs";
	import { currentTrackId, setPlaylistAndPlay, setPlaylistByAlbumsAndPlay } from "@/state/player.mjs";
	import { albums, getAlbums, getAlbumsByKeyword } from "@/stores/albums.mjs";

    import './Tunes.less';
	import { get } from "svelte/store";


    const playTrackInAlbums = (track) => {
        const playlist = get(albums).map(album=>album.disks.map(disk => disk.tracks).flat().map(track =>{
            return {
                album,
                track,
            }
        })).flat();

        const current = playlist.find(item => item.track === track);
        setPlaylistAndPlay(playlist, current);
    }


</script>

<h1>Tunes</h1>

<div class="tunes-albums">
    <!-- <a href="#/albums?page=2">2</a> -->
    <!-- <a href="#/albums?page=2&asd=121332">2</a> -->
    {#each $albums as album (String(album.id) + album.title)}
    <div class="tunes-album" 
        style={`--album-color:#${hax2burn(album.colors[0],albumBurnNumber)}`}>

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
                            <a class="track-item" 
                                on:click={playTrackInAlbums(track)}
                                data-have-fname={!!track.fname}
                                data-active={$currentTrackId === track.id}>
                                <i>{trackIndex + 1}</i>
                                <div class="track-item-info">
                                    <h4>{track.title}</h4>
                                    {#if track.sub}
                                        <p>{track.sub}</p>
                                    {/if}
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        
    </div>
    {/each}
</div>
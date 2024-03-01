<script>
	import { albumBurnNumber, albumLightNumber, hax2burn, hax2light } from "../functions/colors.mjs";
	import { current, playCurrent, playlist, switchMode, mode, clearPlaylistAndStop } from "../state/player.mjs";
	
	import { getAlbumCoverURL } from "../functions/albums.mjs";
	
	import Cover from "../components/Cover.svelte";
	import { second2ms } from "../functions/time.mjs";
	playlist.subscribe(playlist => {
		console.log(playlist);
	});
</script>


<div class="playlist-box">
	<div class="playlist-head">
		<h1>Playlist</h1>
		<div class="ctrl-box">
			
            <a on:click={switchMode}>{$mode}</a>
			<a on:click={clearPlaylistAndStop}>Clear</a>
		</div>
	</div>
	<div class="play-list">
		{#each $playlist as item, itemIndex (item.track.id)}
			<div class="play-item" 
				data-active={$current === item}
				on:click={playCurrent(item)}
				style={`--album-color-dark:${'#'+hax2burn(item.album.colors[0],albumBurnNumber)};--album-color-light:${'#'+hax2light(item.album.colors[0],albumLightNumber)}`}>
				
				<Cover 
					className="album-cover"
					src={getAlbumCoverURL(item.album)} 
					alt={item.album.title} 
					color="var(--album-color-light)" />
				<div class="play-item-info">
					<h4>{item.track.title}</h4>
					<p>
						<span>{item.track.artist || item.album.artist}</span>
						<span>{item.album.title}</span>
						<span>{second2ms(item.track.duration)}</span>
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>


<style lang="less">
	.playlist-box{
		.playlist-head{
			padding: 14px;
		}
		.play-list{
			.play-item{
				display: flex;
				padding: 10px;
				color: var(--album-color-dark);
				cursor: pointer;
				transition: background .3s ease;
				&:hover{
					background: var(--album-color-light);
				}
				&[data-active=true]{
					background-color: var(--album-color-dark);
					color:#FFF;
					cursor: default;
				}
				:global(.album-cover){
					width: 42px;
					height: 42px;
					margin-right: 10px;
				}
				.play-item-info{
					flex: 1;
					h4{
					}
					p{
						font-size: 12px;
						opacity: .5;
						span{
							display: inline-block;
							& + span{
								// opacity: .8;
								&:before{
									content: '-';
									margin-right: 4px;
									opacity: .5;
								}
							}
						}

					}
				}
			}
		}
	}
</style>
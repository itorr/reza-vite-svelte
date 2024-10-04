<script>
import { getAlbumByRandom } from "@/stores/albums.mjs";

const getRandAlbum = async () => {
    const album = await getAlbumByRandom();
    console.log(album);
    location.href = `#/album/${album.id}`;
}
</script>

<h1>Me</h1>

<p>播放统计信息</p>

<p>我喜欢的歌曲列表</p>

<div class="ctrl-box">
    <button>播放我喜欢的音乐</button>
    <button on:click={getRandAlbum}>随机一张碟</button>
</div>
<script>
import active from "svelte-spa-router/active";

</script>

<header class="head-bar">
	<h1>Reza!</h1>
	<nav>
		<a href="#/" use:active>首页</a>
		<a href="#/albums" use:active>专辑列表</a>
	</nav>
</header>

<style lang="less">
.head-bar{
	nav{
		a{
			margin-right: 10px;
			
			// https://stackoverflow.com/questions/68499862/can-i-keep-unused-css-selector
			:global(&.active){
				color:red;
				font-weight: bold;
			}
		}
	}
}
</style>
<script>

const text = '';
const submitSearch = ()=>{

}
</script>

<h1>Search</h1>

<form on:submit|preventDefault={submitSearch()}>
    <input type="search" placeholder="输入搜索关键词">
    <button>搜索</button>
</form>

<p>
    一些搜索选项，排序方式
</p>

<p>搜索结果列表</p>
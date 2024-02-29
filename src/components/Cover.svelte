<script>
	import { onMount } from "svelte";
    import { lazyLoad } from '../functions/lazyLoad.js'

    export let src = '';
    export let alt = '';
    export let className = '';
    export let color = '#EEE';
    export let style = '';
    let loading = true;


    if(!src) color = '#EEE';

    const onLoad = () => {
        loading = false;
    }

    // onMount(() => {
    //     console.log(
    //         `Cover component mounted with src:${src}`
    //     )
    // });
</script>
<div
    class={`ui-cover ${className}`}
    style={`color:${color||'#EEE'};${style}`}
    data-loading={loading}  >
    {#if src}
        <img use:lazyLoad={src} 
            alt={alt||'封面'} 
            on:load={onLoad}>
    {/if}
</div>

<style lang="less">
    :root{
        --cover-width:280px;
    }
    .ui-cover{
        width:var(--cover-width);
        height:var(--cover-width);

        position: relative;
        color: #EEE;
        background: currentColor no-repeat 50% 50%;
        background-size: cover;
        box-shadow: currentColor 0px 10px 30px -20px;
        img{
            display: block;
            width: 100%;
            height:100%;
            opacity: 0;
            transform: scale(1.03);
            transition:opacity .3s ease,transform .3s ease;
        }
        &[data-loading="false"]{
            img{
                transform: scale(1);
                opacity: 1;
            }
        }
    }
</style>
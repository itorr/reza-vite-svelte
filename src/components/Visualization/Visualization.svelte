<script>
	import { audio, getFrequencyData,  } from "@/state/player.mjs";
	import { onDestroy, onMount } from "svelte";

    import { albumColor, albumColorDark, albumColorLight } from '../../functions/albums.mjs';

    import './visualization.less';

    let canvas;
    let ctx;
    let drawVisual;
    
    const row = 40;
    let leftShift;

    const margin = 4;

    function draw() {
        drawVisual = requestAnimationFrame(draw);


        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        const frequencyData = getFrequencyData();
        if(!frequencyData) return;

        ctx.strokeStyle = albumColorDark;
        // ctx.strokeStyle = albumColor;


        const allHeight = canvas.height - margin - margin;

        for (let i = 0; i < row; i++ ) {

            const v = Math.min(128,Math.abs(frequencyData[Math.floor((i / row) * frequencyData.length) ]) / 128);
            const y = v * allHeight / 2;

            
            const leftShift = canvas.width / row / 2;
            const x = i / row * canvas.width + leftShift;


            
            ctx.beginPath();
            // ctx.moveTo( x, allHeight - y );
            // ctx.lineTo( x , allHeight + margin );

            const y1 = allHeight + margin - y;
            ctx.moveTo( x , y1 );
            ctx.lineTo( x , allHeight + margin - y / 2 );

            ctx.stroke();
        }

    }

    onMount(() => {
        canvas.width = 400;
        canvas.height = 100; 
        ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFF';
        ctx.lineWidth = 4;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.strokeStyle = '#000';

        leftShift = canvas.width / row / 2;
        
        draw();
    });

    onDestroy(() => {

        cancelAnimationFrame(drawVisual);


    });
</script>



<div class="visualization-box">
    <!-- <h2>可视化，还没做</h2> -->
    <canvas bind:this={canvas}></canvas>
</div>

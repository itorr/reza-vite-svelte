const defualtTitle = 'Reza!';

export const setDocumentTitle = (title)=>{
    document.title = title || defualtTitle;
}


export const setPlayingTitle = (paused,item)=>{

    const playingText = paused ? '||' : '▶';

    const { track } = item;

    setDocumentTitle(`${playingText} ${track.title}`);
};
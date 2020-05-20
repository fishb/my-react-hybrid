export function resize(){
    let domW = document.documentElement.clientWidth || document.body.clientWidth;
    let doms = document.getElementsByTagName('html')[0];
    if(domW > 640){
        doms.style.fontSize = 64 +'px';
    }
    else{
        doms.style.fontSize = domW / 10 +'px';
    }
}

export default resize;
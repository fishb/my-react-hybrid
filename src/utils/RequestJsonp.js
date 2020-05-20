//axios本版本不支持jsonp 自己拓展一个
export const RequestJsonp = (url,data) => {
    if(!url){
        console.error('Axios.JSONP 至少需要一个url参数!')
        return;
    }
    return new Promise((resolve,reject) => {
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        if(data){
          Object.keys(data).forEach((key,index)=>{
            if(index===0){
              url += `?${key}=${data[key]}`
            }else{
              url += `&${key}=${data[key]}`
            }
          })
        }
        JSONP.src=`${url}`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        window.jsonCallBack =(result) => {
          resolve(result)
        }
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        },500)
    })
  }

  export default RequestJsonp
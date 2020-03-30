
import { getToken } from "./auth"
import { Message } from 'element-ui';
const elMessage=Message

function ExportFile(url,params) {
    const serializeRarams=Object.entries(params?params:{}).map(item=>{return `${item[0]}=${item[1]}`}).join("&");
    url=serializeRarams?`${url}?${serializeRarams}`:url
    var xmlResquest = new XMLHttpRequest();
    xmlResquest.open("GET", url, true);
    xmlResquest.setRequestHeader("Content-type", "application/json");
    xmlResquest.setRequestHeader("token", getToken());
    xmlResquest.timeout =60000;// 超时时间，单位是毫秒
    xmlResquest.responseType = "blob";//该属性必须设置
    xmlResquest.onload = function (oEvent) {
        var content = xmlResquest.response;
        if(oEvent.target.status!=200){
            elMessage({
                type: "error",
                message: "服务器错误",
                offset: 100,
                duration: 2000
            });
            return
        }else if(content.type=="application/json"){
            let fileReader = new FileReader();
            fileReader.readAsText(content)
            fileReader.onload = function (e){
                elMessage({
                    type: "error",
                    message: JSON.parse(fileReader.result).msg,
                    offset: 100,
                    duration: 2000
                });
            };
        }else{
            var blob = new Blob([content]);
            if (xmlResquest.getResponseHeader("content-disposition")) {//判断有没有请求头content-disposition，该请求头在后台文件流导出成功时添加
                var explorer = navigator.userAgent;
                var elink = document.createElement('a');
                var fileName = xmlResquest.getResponseHeader("content-disposition").split(";")[1].split("=")[1];//获取文件名
                //响应头中的内容如果包含中文会出现乱码，需要解码才能正常显示
                if (explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Chrome") >= 0) {  //IE和google浏览器
                    fileName = decodeURIComponent(fileName);
                } else {
                    fileName = decodeURI(escape(fileName));
                }
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = window.URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
                window.URL.revokeObjectURL(url);
            } else {//后台出现异常时的处理
                var r = new FileReader(); 
                r.readAsText(blob, 'utf-8');
            }
        }
    };
    xmlResquest.onerror = function (e) {
        elMessage({
            type: "error",
            message: "服务器错误",
            offset: 100,
            duration: 2000
        });
    }
    // xmlResquest.onsuccess = function(e) {
    //   console.log(e)
    // }
    xmlResquest.send();//发送请求
}
export default ExportFile
// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = ms => new Promise(res => setTimeout(res, ms));

const getConnections = async () => {
    await delay(100);
    var countReqs = window.performance.getEntriesByType("resource").length;
    alert(countReqs.toString() + " requests made by this page!")
}


function grabCookies(){
    let cookies = document.cookie;
    const cArr = decodeURIComponent(cookies).split(';');
    alert("Found " + cArr.length.toString() + " cookies!");
}

function isCanvasFingerprinting(){
    let arr = document.querySelectorAll("canvas");
    if (arr.length > 0){
        alert("Possible canvas fingerprinting!");
    }
}


function showLocalStorage(){
    var _lsTotal = 0,
    _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
    };
    alert("Local Storage = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

function getExternalConnections(){
    var originalUrl = window.location.origin
    var cleanUrl = originalUrl.replace(/^https?:\/\//, '').replace('www\.', '')
    var resourceList = window.performance.getEntries();
    var nExternalConnections = 0 

    for (i = 0; i < resourceList.length; i++)
        {
            if(!resourceList[i].name.includes(cleanUrl)){
                nExternalConnections ++
            }
        }
    alert("N of external connections: " + nExternalConnections)
}


getConnections();
grabCookies();
isCanvasFingerprinting();
showLocalStorage();
getExternalConnections();
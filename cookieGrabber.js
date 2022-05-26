// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
const delay = ms => new Promise(res => setTimeout(res, ms));

const getConnections = async () => {
    await delay(100);
    var countReqs = window.performance.getEntriesByType("resource").length;
    return countReqs;
}


function grabCookies(){
    let cookies = document.cookie;
    const cArr = decodeURIComponent(cookies).split(';');
    return cArr.length;
}

function isCanvasFingerprinting(){
    let arr = document.querySelectorAll("canvas");
    return arr.length;
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
    return (_lsTotal / 1024).toFixed(2);
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
    return (nExternalConnections);
}

const hidePage = `body > :not(.cookie-grabber) {
    display: none;
  }`;

// var conn = getConnections();
var cook = grabCookies();
var canv = isCanvasFingerprinting();
var locs = showLocalStorage();
var conn = getExternalConnections();

// button = document.createElement('div');
// button.style.display = 'absolute';
// button.style.position = ''

const rootCookieGrabber = document.createElement('div');
rootCookieGrabber.classList.add('cookie-grabber');

document.getElementsByTagName("BODY")[0].prepend(rootCookieGrabber);

alert("DEU: cookies=" + cook.toString() + ", possibleCanvas=" + canv.toString() + ", localStorage(KB)=" + locs.toString() + ", externalConnections=" + conn.toString());
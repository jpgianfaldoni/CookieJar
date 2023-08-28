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

function grabCookiesSize(){
    let cookies = document.cookie;
    const cArr = decodeURIComponent(cookies).split(';');
    var _lsTotal = 0,
    _xLen, _x;
    for (_x in cArr) {
        _lsTotal += _x.length*2;
    };
    return (_lsTotal).toFixed(2);
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
    var nExternalJs = 0

    for (i = 0; i < resourceList.length; i++)
        {
            if(!resourceList[i].name.includes(cleanUrl)){
                nExternalConnections ++
                if(resourceList[i].name.slice(-2) == 'js'){
                    nExternalJs ++
                }
            }
        }
    return {nExternalConnections, nExternalJs};
}

const scorePage = async () => {
    await delay(3000);
    var cook = grabCookies();
    var canv = isCanvasFingerprinting();
    var locs = showLocalStorage();
    var conns = getExternalConnections();
    var conn = conns.nExternalConnections;
    var extJs = conns.nExternalJs;
    var csiz = grabCookiesSize(); 
    // var score = calc_score(cook, canv, locs, conn);
    // var color = 'white';
    var cookColor, csizColor, canvColor, locsColor, connColor, extJsColor;
    const GREEN = '#55ff55';
    const YELLOW = '#ffff14';
    const RED = '#e50000';
    if (cook > 30) cookColor = RED; else if (cook > 15) cookColor = YELLOW; else cookColor = GREEN;
    if (csiz > 100) csizColor = RED; else if (csiz > 30) csizColor = YELLOW; else csizColor = GREEN;
    if (canv) canvColor = RED; else canvColor = GREEN;
    if (locs*1000 > 100) locsColor = RED; else if (locs*1000 > 20) locsColor = YELLOW; else locsColor = GREEN;
    if (conn > 10) connColor = RED; else if (conn > 5) connColor = YELLOW; else connColor = GREEN;
    if (extJs > 5) extJsColor = RED; else if (conn > 3) extJsColor = YELLOW; else extJsColor = GREEN;
    
    const rootCookieGrabber = document.createElement('div');
    rootCookieGrabber.innerHTML =   '<div style="display:flex;margin:1rem;justify-content:center;z-index:100000000; position: relative;background-color:black;border-radius:1rem;padding:0.5rem;">'+
                                    '<h3 style="margin: 1rem;background-color:' + cookColor + ';border-radius:1rem;padding:0.5rem;">Cookies: '+ cook +
                                    '<h3 style="margin: 1rem;background-color:' + csizColor + ';border-radius:1rem;padding:0.5rem;">Cookies (Bytes): '+ csiz +
                                    '</h3><h3 style="margin: 1rem;background-color:' + canvColor + ';border-radius:1rem;padding:0.5rem;">Canvas Fingerprinting: '+ Boolean(canv) +
                                    '</h3><h3 style="margin: 1rem;background-color:' + locsColor + ';border-radius:1rem;padding:0.5rem;">Local Storage (KB): '+ locs + 
                                    '</h3><h3 style="margin: 1rem;background-color:' + connColor + ';border-radius:1rem;padding:0.5rem;">External Connections: ' + conn + 
                                    '</h3><h3 style="margin: 1rem;background-color:' + extJsColor + ';border-radius:1rem;padding:0.5rem;">External Scripts: ' + extJs +  
                                    '</div>';

    document.getElementsByTagName("BODY")[0].prepend(rootCookieGrabber);
    // alert("DEU: cookies=" + cook.toString() + ", possibleCanvas=" + canv.toString() + ", localStorage(KB)=" + locs.toString() + ", externalConnections=" + conn.toString());
}

scorePage();
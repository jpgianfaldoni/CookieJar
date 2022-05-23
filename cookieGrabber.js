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


getConnections();
grabCookies();
isCanvasFingerprinting();
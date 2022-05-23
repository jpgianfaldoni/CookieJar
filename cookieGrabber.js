

alert("Grabbing cookies");

console.log("Grabbing cookies...");

let cookies = document.cookie;
const cArr = decodeURIComponent(cookies).split(';');
alert("Found " + cArr.length.toString() + " cookies!");

// cArr.forEach(x => {alert(x);});
// let localCookies, externalCookies;

// cArr.forEach(x => {
    


// });
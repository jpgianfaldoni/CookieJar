// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line

const delay = (ms) => new Promise((res) => setTimeout(res, ms));


/**
 * Get the lenght of cookies array.
 * @constructor
 */
function grabCookies() {
  const cookies = document.cookie;
  const cArr = decodeURIComponent(cookies).split(";");
  return cArr.length;
}

/**
 * Get the total number of cookies.
 * @constructor
 */
function grabCookiesSize() {
  const cookies = document.cookie;
  const cArr = decodeURIComponent(cookies).split(";");
  var _lsTotal = 0,
    _x;
  for (_x in cArr) {
    _lsTotal += _x.length * 2;
  }
  return _lsTotal.toFixed(2);
}
/**
 * Get the canvas fingerprinting array.
 * @constructor
 */
function isCanvasFingerprinting() {
  const arr = document.querySelectorAll("canvas");
  return arr.length;
}

/**
 * Get the local storage size.
 * @constructor
 */
function showLocalStorage() {
  let lsTotal = 0;
  for (const [key, value] of Object.entries(localStorage)) {
    const xLen = (value.length + key.length) * 2;
    lsTotal += xLen;
  }
  return (lsTotal / 1024).toFixed(2);
}


/**
 * Get all the external connections made.
 * @constructor
 */
function getExternalConnections() {
  const originalUrl = window.location.origin;
  const cleanUrl = originalUrl.replace(/^https?:\/\//, "").replace("www.", "");
  const resourceList = window.performance.getEntries();
  let nExternalConnections = 0;
  let nExternalJs = 0;

  for (const resource of resourceList) {
    if (!resource.name.includes(cleanUrl)) {
      nExternalConnections++;
      if (resource.name.endsWith("js")) {
        nExternalJs++;
      }
    }
  }

  return { nExternalConnections, nExternalJs };
}

/**
 * Create the page score and render the HTML.
 * @constructor
 */

const scorePage = async () => {
  await delay(3000);
  const cook = grabCookies();
  const canv = isCanvasFingerprinting();
  const locs = showLocalStorage();
  const conns = getExternalConnections();
  const conn = conns.nExternalConnections;
  const extJs = conns.nExternalJs;
  const csiz = grabCookiesSize();

  var cookColor, csizColor, canvColor, locsColor, connColor, extJsColor;
  const GREEN = "#55ff55";
  const YELLOW = "#ffff14";
  const RED = "#e50000";
  if (cook > 30) cookColor = RED;
  else if (cook > 15) cookColor = YELLOW;
  else cookColor = GREEN;
  if (csiz > 100) csizColor = RED;
  else if (csiz > 30) csizColor = YELLOW;
  else csizColor = GREEN;
  if (canv) canvColor = RED;
  else canvColor = GREEN;
  if (locs * 1000 > 100) locsColor = RED;
  else if (locs * 1000 > 20) locsColor = YELLOW;
  else locsColor = GREEN;
  if (conn > 10) connColor = RED;
  else if (conn > 5) connColor = YELLOW;
  else connColor = GREEN;
  if (extJs > 5) extJsColor = RED;
  else if (conn > 3) extJsColor = YELLOW;
  else extJsColor = GREEN;

  const rootCookieGrabber = document.createElement("div");
  rootCookieGrabber.innerHTML =
    '<div style="display:flex;margin:1rem;justify-content:center;z-index:100000000; position: relative;background-color:black;border-radius:1rem;padding:0.5rem;">' +
    '<h3 style="margin: 1rem;background-color:' +
    cookColor +
    ';border-radius:1rem;padding:0.5rem;">Cookies: ' +
    cook +
    '<h3 style="margin: 1rem;background-color:' +
    csizColor +
    ';border-radius:1rem;padding:0.5rem;">Cookies (Bytes): ' +
    csiz +
    '</h3><h3 style="margin: 1rem;background-color:' +
    canvColor +
    ';border-radius:1rem;padding:0.5rem;">Canvas Fingerprinting: ' +
    Boolean(canv) +
    '</h3><h3 style="margin: 1rem;background-color:' +
    locsColor +
    ';border-radius:1rem;padding:0.5rem;">Local Storage (KB): ' +
    locs +
    '</h3><h3 style="margin: 1rem;background-color:' +
    connColor +
    ';border-radius:1rem;padding:0.5rem;">External Connections: ' +
    conn +
    '</h3><h3 style="margin: 1rem;background-color:' +
    extJsColor +
    ';border-radius:1rem;padding:0.5rem;">External Scripts: ' +
    extJs +
    "</div>";

  document.getElementsByTagName("BODY")[0].prepend(rootCookieGrabber);
};

scorePage();

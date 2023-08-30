// Shows local storage size
var _lsTotal = 0,
  _xLen,
  _x;
for (_x in localStorage) {
  if (!localStorage.hasOwnProperty(_x)) {
    continue;
  }
  _xLen = (localStorage[_x].length + _x.length) * 2;
  _lsTotal += _xLen;
  alert(localStorage[_x]);
}
alert("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

// Shows number of 3rd part domains connections
var originalUrl = window.location.origin;
var cleanUrl = originalUrl.replace(/^https?:\/\//, "").replace("www.", "");
var resourceList = window.performance.getEntries();
var nExternalConnections = 0;

for (i = 0; i < resourceList.length; i++) {
  if (!resourceList[i].name.includes(cleanUrl)) {
    nExternalConnections++;
  }
}
alert(nExternalConnections);

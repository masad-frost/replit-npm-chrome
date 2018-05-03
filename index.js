var params = new URL(document.location).searchParams;
var packageName = params.get('packageName');

var varName = packageName;
// remove invalid chars @ / .
varName = varName.replace('@', '');
varName = varName.replace(/\/|\./g, '-'); // Set it to dash because we'll fix that and camelcase it
varName = varName.replace(/-([a-z])/g, function(cap) {
  return cap[1].toUpperCase();
});

// repl.it
var requireCode = 'const ' + varName + " = require('" + packageName + "');";
var encodedRequireCode = encodeURIComponent(requireCode);

var replitIframeUrl =
  'https://repl.it/languages/babel?lite=true&code=' + encodedRequireCode;
var replitIframe = document.createElement('iframe');
replitIframe.style.width = '100%';
replitIframe.style.height = '100%';
replitIframe.src = replitIframeUrl;
replitIframe.name = 'replit';

var replitContainer = document.getElementById('replit');
replitContainer.appendChild(replitIframe);

// npm
var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'https://www.npmjs.com/package/' + packageName, true);
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // Parse the response document
    var parser = new DOMParser();
    var npmDoc = parser.parseFromString(xhttp.responseText, 'text/html');

    // Get the content as html string
    var npmContentEl = npmDoc.querySelector('[class*=package__container]');
    var npmContentTempEl = document.createElement('div');
    npmContentTempEl.appendChild(npmContentEl);
    var npmContentHtml = npmContentTempEl.innerHTML;

    // Get npm's stylesheets as html string
    var npmStyleSheetElems = npmDoc
      .querySelectorAll('link[href*=css]')
    var npmStyleSheetTempEl = document.createElement('div');

    for (var i = 0; i < npmStyleSheetElems.length; i++) {
      npmStyleSheetTempEl.appendChild(npmStyleSheetElems[i]);
    }
    var npmStyleSheetHtml = npmContentTempEl.innerHTML;


    // // Html string to be used in npm iframe
    var npmHtml =
      '<html><head>' +
      npmStyleSheetHtml +
      '</head><body>' +
      npmContentHtml +
      '</body></html>';

    // We're using iframe because it's easier to isolate stuff (i.e. css)
    var npmIframe = document.createElement('iframe');
    npmIframe.style.width = '100%';
    npmIframe.style.height = '100%';
    npmIframe.name = 'npm';
    npmIframe.setAttribute('id', 'npm-iframe');
    var npmContainer = document.getElementById('npm');
    npmContainer.appendChild(npmIframe);

    // // Write the content html to the iframe
    var npmIframeDoc = document.getElementById('npm-iframe').contentDocument;
    npmIframeDoc.open();
    npmIframeDoc.write(npmHtml);
    npmIframeDoc.close();
  }
};
xhttp.send();


var params = new URL(document.location).searchParams;
var packageName = params.get('packageName');

// repl.it
var requireCode = 'const ' + packageName + " = require('" + packageName + "');";
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
    // Get npm's stylesheet url
    var npmStyleSheetHref = npmDoc
      .querySelector('[href*="/static/css/index.css"]')
      .getAttribute('href');
    // Get content-column as html string
    var npmContentEl = npmDoc.getElementsByClassName('content-column')[0];
    var npmContentTempEl = document.createElement('div');
    npmContentTempEl.appendChild(npmContentEl);
    var npmContentHtml = npmContentTempEl.innerHTML;
    // Html string to be used in npm iframe
    var npmHtml =
      '<html><head><link rel="stylesheet" media="all" href="https://www.npmjs.com' +
      npmStyleSheetHref +
      '"></head><body>' +
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
    // Write the content html to the iframe
    var npmIframeDoc = document.getElementById('npm-iframe').contentDocument;
    npmIframeDoc.open();
    npmIframeDoc.write(npmHtml);
    npmIframeDoc.close();
  }
};
xhttp.send();

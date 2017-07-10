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

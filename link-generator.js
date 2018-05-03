var paths = window.location.pathname.split('/');

var packageName;
if (paths.length === 4) {
  // this means it's a scoped package i.e. /packages/@babel/core
  packageName = paths.slice(2).join('/');
} else {
  packageName = paths[paths.length - 1];
}


var runkitAnchor = document.querySelector('[href*=runkit]');
// Change the text from because it does't specify the runkit
runkitAnchor.innerText = 'Test ' + packageName + ' on runkit';

// This is the <p> node
var runkitContainer = runkitAnchor.parentElement;
var container = runkitContainer.cloneNode(true);


var anchorNode = container.querySelector('a');
var pageHref = chrome.extension.getURL("index.html") + '?packageName=' + packageName;
anchorNode.setAttribute('href', pageHref);
anchorNode.setAttribute('target', '_blank');
anchorNode.innerText = 'Test ' + packageName + ' on repl.it';

runkitContainer.parentElement.insertBefore(container, runkitContainer);

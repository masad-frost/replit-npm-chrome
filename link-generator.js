var packageName = document.title;

var runkitLinkNode = document.querySelector('[href*=runkit]');
runkitLinkNode.innerText = 'Test ' + packageName + ' on runkit';

var replitLinkListNode = document.createElement('li');
replitLinkListNode.className = 'replit';
var replitLinkNode = document.createElement('a');
var pageHref = chrome.extension.getURL("index.html") + '?packageName=' + packageName;
replitLinkNode.setAttribute('href', pageHref);
replitLinkNode.setAttribute('target', '_blank');
replitLinkNode.innerText = 'Test ' + packageName + ' on repl.it';
replitLinkListNode.append(replitLinkNode);

var tryItBoxNode = runkitLinkNode.parentElement.parentElement;
tryItBoxNode.insertBefore(replitLinkListNode, tryItBoxNode.childNodes[0]);

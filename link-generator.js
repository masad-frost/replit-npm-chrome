var packageName = document.title;

var runkitLinkNode = document.querySelector('[href*=runkit]');
runkitLinkNode.innerText = 'Test ' + packageName + ' on 2runkit';

var replitLinkListNode = document.createElement('li');
replitLinkListNode.className = 'replit';
var replitLinkNode = document.createElement('a');
var pageUrl = chrome.extension.getURL("index.html");
var requireCode = 'const ' + packageName + " = require('" + packageName + "');";
var href = pageUrl;
replitLinkNode.setAttribute('href', href);
replitLinkNode.innerText = 'Test ' + packageName + ' on repl.it';
replitLinkListNode.append(replitLinkNode);

var tryItBoxNode = runkitLinkNode.parentElement.parentElement;
tryItBoxNode.insertBefore(replitLinkListNode, tryItBoxNode.childNodes[0]);

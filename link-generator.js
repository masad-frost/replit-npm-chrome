var packageName = document.title;

var runkitLinkNode = document.querySelector('[href*=runkit]');
runkitLinkNode.innerText = 'Test ' + packageName + ' on runkit';

var replitLinkListNode = document.createElement('li');
replitLinkListNode.className = 'replit';
var replitLinkNode = document.createElement('a');
var requireCode = 'const ' + packageName + " = require('" + packageName + "');";
var encodedRequireCode = encodeURIComponent(requireCode);
var href =
  'https://repl.it/languages/babel/?lite=true&code=' + encodedRequireCode;
replitLinkNode.setAttribute('href', href);
replitLinkNode.innerText = 'Test ' + packageName + ' on repl.it';
replitLinkListNode.append(replitLinkNode);

var tryItBoxNode = runkitLinkNode.parentElement.parentElement;
tryItBoxNode.insertBefore(replitLinkListNode, tryItBoxNode.childNodes[0]);

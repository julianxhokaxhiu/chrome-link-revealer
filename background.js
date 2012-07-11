$.each(DefaultOptions,function(i,v){if(!window.localStorage.getItem(v.label))window.localStorage.setItem(v.label,v.value)});
chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
	var r = {
		istooltip:(window.localStorage.getItem(DefaultOptions.istooltip.label)==='true'),
		time:parseInt(window.localStorage.getItem(DefaultOptions.timeout.label)),
		position:window.localStorage.getItem(DefaultOptions.position.label),
		domaincolor:window.localStorage.getItem(DefaultOptions.domaincolor.label)
	};
	sendResponse(r);
});
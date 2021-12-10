
	chrome.contextMenus.create({
	  title               : '窗口页面切换',
	  contexts            : [ 'all' ],
	  documentUrlPatterns : [ 'http://*/*', 'https://*/*' ],
	  onclick             : showValidImages
	});
	var _gaq = _gaq || [];
	function showValidImages(data){
	  	chrome.tabs.query({}, function(tabs) {
	    	var tab = tabs[0];
	    	// console.log(evenX);
	    	sendMessageToContentScript({cmd:tabs, value:'Collection'}, function(response){
			    console.log('来自cont的回复：'+response);
			});
	  	});
	}
	// 向content主动发送消息
    function sendMessageToContentScript(message, callback){
	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	        chrome.tabs.sendMessage(tabs[0].id, message, function(response){
	            if(callback) callback(response);
	        });
	    });
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	    chrome.tabs.query({}, function(tabs) {
	    	var wId = request.wId*1;
	    	var dat = request.tabId*1;
            // windowId 区分多屏幕的
            chrome.tabs.highlight({windowId: wId, tabs: dat});
            chrome.windows.update(wId, {focused: true});

		});
	    sendResponse();
	});
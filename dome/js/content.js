
// 内容处理
$(function(){
	var evenY = '';
	var evenX = '';
	document.onmousemove = function (ev) {
        evenY = ev.clientY;
        evenX = (ev.clientX - $(document).scrollLeft());
    }

	// 与popup通信
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		var data = request.cmd;
		//Collection  收藏
		if(request.value == 'Collection'){
			if($('.WDX-common-fixed').length == 0){
				var html = '';
				var domeHe = $(window).height();
				var topY = (domeHe - evenY);
				html += '<div class="WDX-margin-nul WDX-common-fixed" style="left:'+(evenX-30)+'px;'+(topY > 450 ? 'top:'+evenY+'' : 'top:'+(evenY/2)+'' )+'px"><div class="div-common">';
				for (var i = 0; i < data.length; i++) {
					
					html += '<p class="WDX-Tab-list '+(data[i].active == true ? 'hover-active' : '')+'" data-href="'+data[i].index+'" data-wId="'+data[i].windowId+'">'+data[i].title+'</p>';
				}
					    html += '</div></div>';
				$('body').append(html);
			}
		}
	    sendResponse(''+request.value);
	    return true;

	});
	
	$('body').on('mouseleave','.WDX-common-fixed', function (e) {
		$('.WDX-common-fixed').remove();
	})
	$('body').on('click','.WDX-Tab-list',function(){
    	// console.log(leftX);
		var dat = $(this).attr('data-href');
		var winId = $(this).attr('data-wId');
		chrome.runtime.sendMessage({tabId: dat,wId:winId}, function(response) {
		    // console.log('：' + response);
		});
	})
});

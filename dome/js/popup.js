'use strict';

(function() {
    chrome.tabs.query({}, function(tabs) {
        fnContent(tabs);
    });
    function fnContent(data){
        var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<p class="Tab-list" data-href="'+data[i].index+'" data-wId="'+data[i].windowId+'"><i class="JS_tab_off">X</i><span class="JS_table">'+data[i].title+'</span></p>';
            }
        $('#WDX_tab_cont').html(html);
    }
    // 切换对应页面
    $('#WDX_tab_cont').on('click','.JS_table',function(){
        var dat = $(this).parent('.Tab-list').attr('data-href')*1;
        var wId = $(this).parent('.Tab-list').attr('data-wId')*1;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            // windowId 区分多屏幕的
            chrome.tabs.highlight({windowId: wId, tabs: dat})
        });
    });
    // 关闭对应页面 多屏幕的不可用
    $('#WDX_tab_cont').on('click','.JS_tab_off',function(){
        var dat = $(this).parent('.Tab-list').attr('data-href')*1;
        var wId = $(this).parent('.Tab-list').attr('data-wId')*1;
        chrome.tabs.query({}, function(tabs){
            // windowId 区分多屏幕的
            chrome.tabs.remove([wId,dat]);
            // chrome.tabs.remove({tabs: dat})
            // $(this).parent('.Tab-list').remove();
        });
    });
}());

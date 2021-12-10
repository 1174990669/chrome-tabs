# chrome-tabs
chrome插件开发 - tab选项卡管理器（谷歌浏览器页面快速切换插件）
相比于打开右上角的菜单唤起切换页面，我还是更喜欢直接右键唤起切换，话不多说，直接上图

![image](https://user-images.githubusercontent.com/30229036/145511636-437631c6-4b30-4561-8f00-6345df79a13b.png)
![image](https://user-images.githubusercontent.com/30229036/145511652-1544eb9b-0263-4068-b3da-09bb1f855958.png)

第一步
首先通过通信获取到当前打开的所有页面的数据，并进行渲染
![image](https://user-images.githubusercontent.com/30229036/145512409-28e89a8d-d068-4b61-9754-006f24f70dfa.png)
因为右键唤起的页面不能直接调用chrome的api,所以此处启用了与background.js通信来实现该功能；
![image](https://user-images.githubusercontent.com/30229036/145512482-d2c7f72c-44a8-4fd1-85cf-19fc9a6d1ab1.png)
最后在background.js进行处理
![image](https://user-images.githubusercontent.com/30229036/145512533-441cbd02-965f-46e0-ad3b-48a98cdde5bc.png)

chrome.tabs.highlight({windowId: wId, tabs: dat});
第一个参数是用来区分多屏幕的，第二个是需要切换的屏幕id；
chrome.windows.update(wId, {focused: true});
当前屏幕可以直接切换，多屏幕的需要调用该方法实现聚焦

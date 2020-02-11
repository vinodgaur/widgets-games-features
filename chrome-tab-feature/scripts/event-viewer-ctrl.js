lh.eventViewer={
	activeTabId:'et1',
	originallWidth:null
};

lh.eventViewer.makeCurrentSelectionActive=function (tabId) {
	//remove active class from previous selection
	if(lh.eventViewer.activeTabId){
		let tab=document.getElementById(lh.eventViewer.activeTabId);
		let tabContent=document.getElementById(lh.eventViewer.activeTabId+'-content');
		tab && tab.classList.remove('active');
		tabContent && tabContent.classList.remove('active');
	}

	//set active tab
	lh.eventViewer.activeTabId=tabId;

	//update active tab in dom
	document.getElementById(tabId).classList.add('active');
	document.getElementById(tabId+'-content').classList.add('active');
};

lh.eventViewer.addTab=function(tabId) {
	document.getElementsByClassName('tabs')[0].appendChild(lh.eventViewer.getTabHtml(tabId));
	document.getElementsByClassName('tabs-content')[0].appendChild(lh.eventViewer.getTabContentHtml(tabId));

	lh.eventViewer.tabSqueeze();
};

lh.eventViewer.removeTab=function(tabId) {
	let t=document.getElementById(tabId);
	t.parentNode.removeChild(t);

	let tc=document.getElementById(tabId+'-content');
	tc.parentNode.removeChild(tc);

	lh.eventViewer.tabUnSqueeze();
};

lh.eventViewer.getTabHtml=function(tabId){
	let sp= document.createElement('span');
	sp.id=tabId;
	sp.classList.add('tab');
	sp.innerHTML='<a href="#">event type '+tabId+'</a> <button class="close">X</button>';
	//adding listener
	lh.eventViewer.addEventListenerOnTab(sp);
	return sp;
}

lh.eventViewer.getTabContentHtml=function(tabId){
	let sp= document.createElement('div');
	sp.id=tabId+'-content';
	sp.classList.add('tab-content');
	sp.innerHTML='<div class="content"> <div class="timestamp"> <p>timestamp</p> <p>324345346345</p> </div> <div class="desc"> <p>content</p> <p>'+tabId+' ---:This is about structure of html and css. It looks nice. It is based on html5</p> </div> </div>';
	return sp;
}

lh.eventViewer.addEventListenerOnTab=function(t){
	t.addEventListener('click', function(e) {
		let ele=e.target;
		if(ele.classList.contains('close')){
			//case of close tab
			lh.eventViewer.removeTab(ele.parentNode.id);
		} else {
			//tab is clicked
			lh.eventViewer.makeCurrentSelectionActive(ele.parentNode.id);
		}
	});
};

lh.eventViewer.tabSqueeze=function(){
	//if total tab count*width > width of tab container then squeeze
	let t=document.getElementsByClassName('tab');
	let tabs=document.getElementsByClassName('tabs')[0];

	//keep the original width for unsqueeze
	if(!lh.eventViewer.originallWidth && t && t[0]){
		lh.eventViewer.originallWidth=t[0].offsetWidth;
	}

	let diffWidth = t[0].offsetWidth*t.length - tabs.offsetWidth;

	if(t && t.length && diffWidth>0){
		for (var i = t.length - 1; i >= 0; i--) {
			t[i].style.width= Math.floor(tabs.offsetWidth/t.length)-1 + 'px';
		}
	}
}

lh.eventViewer.tabUnSqueeze=function(){
	//if total tab count*width > width of tab container then squeeze
	let t=document.getElementsByClassName('tab');
	let tabs=document.getElementsByClassName('tabs')[0];

	let diffWidth = t[0].offsetWidth*t.length - tabs.offsetWidth;

	if(t && t.length && diffWidth<0){
		for (var i = t.length - 1; i >= 0; i--) {
			let tabWidth=Math.floor(tabs.offsetWidth/t.length)-1;
			t[i].style.width=(tabWidth>lh.eventViewer.originallWidth?lh.eventViewer.originallWidth:tabWidth) + 'px';
		}
	}
}

/*to add tab*/
document.querySelector('.event-list').addEventListener('click', function(e) {
	let ele=e.target;
	let tabId=ele.dataset.id;
	lh.eventViewer.addTab(tabId);
	lh.eventViewer.makeCurrentSelectionActive(tabId);
});

/*event listener to close tab*/
Array.prototype.slice.call(document.getElementsByClassName('tab')).forEach(t=>{
	lh.eventViewer.addEventListenerOnTab(t);
});


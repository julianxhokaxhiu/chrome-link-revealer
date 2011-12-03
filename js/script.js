var LR_ShowTO;
$('a').live({
	mouseover:function(){
		var o = this;
		if(o.href!='#'){
			chrome.extension.sendRequest('show',function(r){
				LR_ShowTO = setTimeout(function(){
					var uri = $.url.parse(o.href);
					if(r.istooltip)$(o).qtip({content:{text:uri.source.replace(uri.host,'<span style="color:#'+r.domaincolor+'">'+uri.host+'</span>')},show:{solo:true},position:{target:'mouse',adjust:{y:+25}},style:{classes:'ui-tooltip-dark',tip:{corner:false}}}).qtip('show')
					else $(o).qtip({content:{text:uri.source.replace(uri.host,'<span style="color:#'+r.domaincolor+'">'+uri.host+'</span>')},show:{solo:true},position:{my:r.position,at:r.position,target:$('body'),adjust:{y:((r.position==='left bottom')?-12:0)}},style:{classes:'ui-tooltip-dark',tip:{corner:false}}}).qtip('show')
				},r.time)
			})
		}
	},
	mouseout:function(){
		clearTimeout(LR_ShowTO);
		$(this).qtip('destroy')		
	}
});
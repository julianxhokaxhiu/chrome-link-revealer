jQuery(function($){
	var loadConfig = function(r){
		if(window.localStorage.getItem(DefaultOptions.timeout.label))$('#timeoutms').val((r?DefaultOptions.timeout.value:window.localStorage.getItem(DefaultOptions.timeout.label)));
		if(window.localStorage.getItem(DefaultOptions.istooltip.label))$('#astooltip').attr('checked',(r?DefaultOptions.istooltip.value:((window.localStorage.getItem(DefaultOptions.istooltip.label)==='true')?true:false)));
		if(window.localStorage.getItem(DefaultOptions.position.label))$('input[name="position"][value="'+(r?DefaultOptions.position.value:window.localStorage.getItem(DefaultOptions.position.label))+'"]').attr('checked',true);
		if(window.localStorage.getItem(DefaultOptions.domaincolor.label))$('#domaincolor').val((r?DefaultOptions.domaincolor.value:window.localStorage.getItem(DefaultOptions.domaincolor.label)));
	};
	var saveConfig = function(){
		window.localStorage.setItem(DefaultOptions.timeout.label,$('#timeoutms').val());
		window.localStorage.setItem(DefaultOptions.istooltip.label,$('#astooltip').is(':checked'));
		window.localStorage.setItem(DefaultOptions.position.label,$('input[name="position"]:checked').val());
		window.localStorage.setItem(DefaultOptions.domaincolor.label,$('#domaincolor').val());
	};
	var viewAlert = function(s){
		$.jGrowl('Operation complete!',{header:s+' settings',position:'bottom-right'});
	};
	var colpkrop = {
		color:$('#domaincolor').val().toLowerCase(),
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange:function(hab,hex,rgb,el){
			$('#domaincolor').val(hex)
		}
	};
	$('#domaincolor').ColorPicker(colpkrop);
	$('#save').click(function(){saveConfig();viewAlert('Save')});
	$('#load').click(function(){loadConfig();viewAlert('Load')});
	$('#reset').click(function(){loadConfig(true);viewAlert('Reset')});
	loadConfig();
});
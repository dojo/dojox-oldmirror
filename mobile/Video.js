define([
	"dojo/_base/declare",
	"dojo/_base/sniff",
	"./Audio"
], function(declare, has, Audio){
	// module:
	//		dojox/mobile/Video
	// summary:
	//		A thin wrapper around the html5 <video> element.

	return declare("dojox.mobile.Video", Audio, {
		width: "200px",
		height: "150px",
		_tag: "video",

		_getEmbedRegExp: function(){
			return has('ff') ? /video\/mp4/i :
				   has.isIE >= 9 ? /video\/webm/i :
				   //has("safari") ? /video\/webm/i : //Google is gooing to provide webm plugin for safari
				   null;
		}
	});
});

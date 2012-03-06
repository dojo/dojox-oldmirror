define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/dom-geometry",
	"dojo/dom-style",
	"dijit/_Contained",
	"dijit/_WidgetBase"
], function(declare, domConstruct, domGeometry, domStyle, Contained, WidgetBase, iconUtils){

/*=====
	var CarouselItem = dojox.mobile.CarouselItem
=====*/

	// module:
	//		dojox/mobile/CarouselItem
	// summary:
	//		An internal widget used from Carousel.

	return declare("dojox.mobile.CarouselItem", [WidgetBase, Contained], {
		alt: "",
		src: "",
		headerText: "",
		footerText: "",

		baseClass: "mblCarouselItem",

		buildRendering: function(){
			this.inherited(arguments);
			this.domNode.tabIndex = "0";
			this.headerTextNode = domConstruct.create("div", { className: "mblCarouselItemHeaderText" }, this.domNode);
			this.imageNode = domConstruct.create("img", { className: "mblCarouselItemImage" }, this.domNode);
			this.footerTextNode = domConstruct.create("div", { className: "mblCarouselItemFooterText" }, this.domNode);
		},

		startup: function(){
			if(this._started){ return; }
			this.inherited(arguments);
			this.resize();
		},

		resize: function(size){
			var box = domGeometry.getMarginBox(this.domNode);
			if(box.h === 0){ return; }
			var h1 = domGeometry.getMarginBox(this.headerTextNode).h;
			var h2 = domGeometry.getMarginBox(this.footerTextNode).h;
			domGeometry.setMarginBox(this.imageNode, {h:box.h - h1 - h2});
		},

		select: function(){
			var img = this.imageNode
			domStyle.set(img, "opacity", 0.4);
			setTimeout(function(){
				domStyle.set(img, "opacity", 1);
			}, 1000);
		},

		_setAltAttr: function(/*String*/alt){
			this._set("alt", alt);
			this.imageNode.alt = alt;
		},

		_setSrcAttr: function(/*String*/src){
			this._set("src", src);
			this.imageNode.src = src;
		},

		_setHeaderTextAttr: function(/*String*/text){
			this._set("headerText", text);
			this.headerTextNode.innerHTML = this._cv ? this._cv(text) : text;
		},

		_setFooterTextAttr: function(/*String*/text){
			this._set("footerText", text);
			this.footerTextNode.innerHTML = this._cv ? this._cv(text) : text;
		}
	});
});

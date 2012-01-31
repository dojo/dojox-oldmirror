define([
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"./iconUtils",
	"./sniff",
	"./_ItemBase"
], function(declare, win, domClass, domConstruct, domStyle, iconUtils, has, ItemBase){
/*=====
	var ItemBase = dojox.mobile._ItemBase;
=====*/

	// module:
	//		dojox/mobile/ToolBarButton
	// summary:
	//		A button widget that is placed in the Heading widget.

	return declare("dojox.mobile.ToolBarButton", ItemBase, {
		// summary:
		//		A button widget that is placed in the Heading widget.
		// description:
		//		ToolBarButton is a button that is placed in the Heading
		//		widget. It is a subclass of dojox.mobile._ItemBase just like
		//		ListItem or IconItem. So, unlike Button, it has basically the
		//		same capability as ListItem or IconItem, such as icon support,
		//		transition, etc.

		// selected: Boolean
		//		If true, the button is in the selected status.
		selected: false,

		// arrow: String
		//		Specifies "right" or "left" to be an arrow button.
		arrow: "",

		// light: Boolean
		//		If true, this widget produces only a single <span> node when it
		// 		has no icon nor arrow.  In that case, you cannot have icon or
		// 		arrow even with setters.
		light: true,

		baseClass: "mblToolBarButton",

		defaultColor: "mblColorDefault",
		selColor: "mblColorDefaultSel",

		_selStartMethod: "touch",
		_selEndMethod: "touch",

		buildRendering: function(){
			if(!this.label && this.srcNodeRef){
				this.label = this.srcNodeRef.innerHTML;
			}
			if(this.light && !this.icon && !this.arrow){
				this.domNode = this.labelNode = this.tableNode = this.bodyNode =
					domConstruct.create("span", {className:this.defaultColor+" mblToolBarButtonBody"});
				this.inherited(arguments);
				return;
			}
			this.domNode = domConstruct.create("table", {cellPadding:"0",cellSpacing:"0",border:"0"});
			var cell = this.domNode.insertRow(-1).insertCell(-1);
			cell.className = "mblToolBarButtonCell";
			this.inherited(arguments);

			if(this.arrow === "left" || this.arrow === "right"){
				this.arrowNode = domConstruct.create("div", {
					className: "mblToolBarButtonArrow mblToolBarButton" +
					(this.arrow === "left" ? "Left" : "Right") + "Arrow"
				}, cell);
				domClass.add(this.domNode, "mblToolBarButtonHas" +
					(this.arrow === "left" ? "Left" : "Right") + "Arrow");
			}
			this.bodyNode = domConstruct.create("div", {className:"mblToolBarButtonBody"}, cell);
			this.tableNode = domConstruct.create("table", {cellPadding:"0",cellSpacing:"0",border:"0"}, this.bodyNode);

			var row = this.tableNode.insertRow(-1);
			this.iconParentNode = row.insertCell(-1);
			this.labelNode = row.insertCell(-1);
			this.iconParentNode.className = "mblToolBarButtonIcon";
			this.labelNode.className = "mblToolBarButtonLabel";

			if(this.icon && this.icon !== "none" && this.label){
				domClass.add(this.bodyNode, "mblToolBarButtonLabeledIcon");
			}

			domClass.add(this.bodyNode, this.defaultColor);
			var _this = this;
			setTimeout(function(){ // for programmatic instantiation
				_this._updateArrowColor();
			}, 0);
			if(!has("webkit")){
				var cntr = 0;
				this._timer = setInterval(function(){ // compat mode browsers need this
					if(_this._updateArrowColor() || cntr++ > 3){
						clearInterval(_this._timer);
					}
				}, 500);
			}
		},

		startup: function(){
			if(this._started){ return; }

			this._keydownHandle = this.connect(this.domNode, "onkeydown", "_onClick"); // for desktop browsers

			this.inherited(arguments);
			if(!this._isOnLine){
				this._isOnLine = true;
				this.set("icon", this.icon); // retry applying the attribute
			}
		},

		_updateArrowColor: function(){
			if(this.arrowNode && !has("ie")){
				domStyle.set(this.arrowNode, "backgroundColor", domStyle.get(this.bodyNode, "backgroundColor"));
				var s = domStyle.get(this.bodyNode, "backgroundImage");
				if(s === "none"){ return false; }					
				domStyle.set(this.arrowNode, "backgroundImage",
							 s.replace(/\(top,/, "(top left,") // webkit new
							 .replace(/0% 0%, 0% 100%/, "0% 0%, 100% 100%") // webkit old
							 .replace(/50% 0%/, "0% 0%") // moz
							 .replace(/0\.5/, "0.45")); // adjust color-stop
			}
			return true;
		},

		_onClick: function(e){
			// summary:
			//		Internal handler for click events.
			// tags:
			//		private
			if(e && e.type === "keydown" && e.keyCode !== 13){ return; }
			if(this.onClick(e) === false){ return; } // user's click action
			this.defaultClickAction(e);
		},

		onClick: function(/*Event*/ /*===== e =====*/){
			// summary:
			//		User defined function to handle clicks
			// tags:
			//		callback
		},

		_setLabelAttr: function(/*String*/text){
			this.inherited(arguments);
			domClass.toggle(this.tableNode, "mblToolBarButtonText", text);
		},

		_setSelectedAttr: function(/*Boolean*/selected){
			// summary:
			//		Makes this widget in the selected or unselected state.
			this.inherited(arguments);
			if(selected){
				domClass.replace(this.bodyNode, this.selColor, this.defaultColor);
			}else{
				domClass.replace(this.bodyNode, this.defaultColor, this.selColor);
			}
			domClass.toggle(this.domNode, "mblToolBarButtonSelected", selected);
			this._updateArrowColor();
		}
	});
});

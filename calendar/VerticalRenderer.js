define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
	"dojox/calendar/_RendererMixin", "dojo/text!./templates/VerticalRenderer.html"],
	
	function(declare, _WidgetBase, _TemplatedMixin, _RendererMixin, template){
	
	//	module:
	//		dojox/calendar/VerticalRenderer
	//	summary:
	//		dojox.calendar.VerticalRenderer widget
	
	/*=====
	var _WidgetBase = dijit._WidgetBase;
	var _TemplatedMixin = dijit._TemplatedMixin;
	var _RendererMixin = dojox.calendar._RendererMixin;
	=====*/ 

	return declare("dojox.calendar.VerticalRenderer", [_WidgetBase, _TemplatedMixin, _RendererMixin], {
		
		templateString: template,
		
		postCreate: function() {
			this.inherited(arguments);
			this._applyAttributes();
		},
	
		_isElementVisible: function(elt, startHidden, endHidden, size){
			var d;
			
			switch(elt){
				case "startTimeLabel":
					d = this.item.startTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
				case "endTimeLabel":
					d = this.item.endTime;
					if(this.item.allDay || this.owner.isStartOfDay(d)){
						return false;
					}
					break;
			}
			return this.inherited(arguments);
		}
		
	});
});

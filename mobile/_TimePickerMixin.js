define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/date/locale"
], function(declare, domClass, datelocale){

	// module:
	//		dojox/mobile/_TimePickerMixin
	// summary:
	//		A mixin for time picker widget.

	return declare("dojox.mobile._TimePickerMixin", null, {
		// summary:
		//		A mixin for time picker widget.

		reset: function(){
			// summary:
			//		Goes to now.
			var now = new Date(),
				h = now.getHours() + "",
				m = now.getMinutes();
			m = (m < 10 ? "0" : "") + m;
			this.set("values", [h, m]);
			this.set("colors", [h, m]);
		},

		_getDateAttr: function(){
			// summary:
			//		Returns a Date object for the current values
			var v = this.get("values"); // [hour24, minute]
			return datelocale.parse(v[0] + ":" + v[1], {timePattern:"H:m", selector:"time"});
		}
	});
});

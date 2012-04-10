define([
	"dojo/_base/declare",
	"dojox/widget/_CalendarBase",
	"dojox/widget/_CalendarDay"
], function(declare, _CalendarBase, _CalendarDay){
	return declare("dojox.widget.DailyCalendar", [_CalendarBase, _CalendarDay], {
		// summary:
		//	A calendar with only a daily view.
		_makeDate: function(value){
			var now = new Date();
			now.setDate(value);
			return now;
		}
	});
});


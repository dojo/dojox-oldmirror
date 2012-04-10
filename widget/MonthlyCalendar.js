define([
	"dojo/_base/declare",
	"dojox/widget/_CalendarBase",
	"dojox/widget/_CalendarMonth"
], function(declare, _CalendarBase, _CalendarMonth){
	return declare("dojox.widget.MonthlyCalendar", [_CalendarBase, _CalendarMonth], {
		// summary:
		//	A calendar with only a month view.
		_makeDate: function(value){
			var now = new Date();
			now.setMonth(value);
			return now;
		}
	});
});


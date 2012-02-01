define(["dojo/_base/declare", "dojox/widget/_CalendarBase", "dojox/widget/_CalendarDay", "dojox/widget/_CalendarMonth", "dojox/widget/_CalendarYear"
], function(declare, _CalendarBase, _CalendarDay, _CalendarMonth, _CalendarYear){
	return declare("dojox.widget.Calendar3Pane", [_CalendarBase, _CalendarDay, _CalendarMonth, _CalendarYear], {
		// summary: The Calendar includes day, month and year views.
		//	No visual effects are included.
	});
});

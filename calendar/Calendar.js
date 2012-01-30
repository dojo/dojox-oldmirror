define(["dojo/_base/declare", "dojo/_base/lang", "./CalendarBase", "./ColumnView", "./ColumnViewSecondarySheet", 
				"./VerticalRenderer", "./MatrixView",	"./HorizontalRenderer", "./LabelRenderer", 
				"./ExpandRenderer", "./Keyboard", "./Mouse", "dojo/text!./templates/Calendar.html", 
				"dijit/form/Button", "dijit/Toolbar", "dijit/ToolbarSeparator"],
	
	function(declare, lang, CalendarBase, ColumnView, ColumnViewSecondarySheet, VerticalRenderer, 
					 MatrixView, HorizontalRenderer, LabelRenderer, ExpandRenderer, Keyboard, Mouse, template){
	
	/*=====
		var CalendarBase = dojox.calendar.CalendarBase;
		var ColumnView = dojox.calendar.ColumnView;
		var ColumnViewSecondarySheet = dojox.calendar.ColumnViewSecondarySheet;
		var MatrixView = dojox.calendar.MatrixView;
		var VerticalRenderer = dojox.calendar.VerticalRenderer;
		var HorizontalRenderer = dojox.calendar.HorizontalRenderer;
		var LabelRenderer = dojox.calendar.LabelRenderer;
		var ExpandRenderer = dojox.calendar.ExpandRenderer;
		var Keyboard = dojox.calendar.Keyboard;
		var Mouse = dojox.calendar.Mouse;
	=====*/ 
	
	return declare("dojox.calendar.Calendar", CalendarBase, {
		
		templateString: template,
		
		// module:
		//		dojox/calendar/Calendar
		// summary:
		//		dojox.calendar.Calendar widget
		//		This class defines a calendar widget that display events in time.
		
		_createDefaultViews: function(){
			//	summary:
			//		Creates the default views:
			//		|	A ColumnView instance used to display one day to seven days time intervals,
			//		| A MatrixView instance used to display the other time intervals.
			//		The views are mixed with Mouse and Keyboard to allow editing items using mouse and keyboard.

			var secondarySheetClass = declare([ColumnViewSecondarySheet, Keyboard, Mouse]);
			
			var colView = declare([ColumnView, Keyboard, Mouse])(lang.mixin({
				secondarySheetClass: secondarySheetClass,
				verticalRenderer: VerticalRenderer,
				horizontalRenderer: HorizontalRenderer,
				expandRenderer: ExpandRenderer
			}, this.columnViewProps));
			
			var matrixView = declare([MatrixView, Keyboard, Mouse])(lang.mixin({							
				horizontalRenderer: HorizontalRenderer,
				labelRenderer: LabelRenderer,
				expandRenderer: ExpandRenderer
			}, this.matrixViewProps));
								
			this.columnView = colView;
			this.matrixView = matrixView;
			
			var views = [colView, matrixView];
			
			this.installDefaultViewsActions(views);
			
			return views;
		},
		
		installDefaultViewsActions: function(views){
			//	summary:
			//		Installs the default actions on newly created default views.
			//		By default this action is registering:
			//		| the matrixViewRowHeaderClick method	on the rowHeaderClick event of the matrix view.
			//		| the columnViewColumnHeaderClick method	on the columnHeaderClick event of the column view.
			this.matrixView.on("rowHeaderClick", lang.hitch(this, this.matrixViewRowHeaderClick));
			this.columnView.on("columnHeaderClick", lang.hitch(this, this.columnViewColumnHeaderClick));			
		}
		
	}) 
});

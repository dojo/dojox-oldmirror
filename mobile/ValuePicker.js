define([
	"dojo/_base/declare",
	"./_PickerBase",
	"./ValuePickerSlot" // to load ValuePickerSlot for you (no direct references)
], function(declare, PickerBase){

	// module:
	//		dojox/mobile/ValuePicker
	// summary:
	//		A value picker that has stepper.

	return declare("dojox.mobile.ValuePicker", PickerBase, {
		// summary:
		//		A value picker that has stepper.
		// description:
		//		ValuePicker is a widget for selecting some values. The values
		//		can be selected by the Plus button, the Minus button, or the
		//		input field

		/* internal properties */	
		baseClass: "mblValuePicker",

		onValueChanged: function(/*Widget*/slot){
		}
	});
});

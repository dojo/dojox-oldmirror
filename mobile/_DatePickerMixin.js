define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/date",
	"dojo/date/locale",
	"dojo/date/stamp"
], function(array, declare, lang, ddate, datelocale, datestamp){

	// module:
	//		dojox/mobile/_DatePickerMixin
	// summary:
	//		A mixin for date picker widget.

	var slotMixin = {
		format: function(/*Date*/d){
			return datelocale.format(d, {datePattern:this.pattern, selector:"date"});
		}
	};

	var yearSlotMixin = lang.mixin({
		initLabels: function(){
			this.labels = [];
			if(this.labelFrom !== this.labelTo){
				var d = new Date(this.labelFrom, 0, 1);
				var i, idx;
				for(i = this.labelFrom, idx = 0; i <= this.labelTo; i++, idx++){
					d.setFullYear(i);
					this.labels.push(this.format(d));
				}
			}
		}
	}, slotMixin);

	var monthSlotMixin = lang.mixin({
		initLabels: function(){
			this.labels = [];
			var d = new Date(2000, 0, 1);
			for(var i = 0; i < 12; i++){
				d.setMonth(i);
				this.labels.push(this.format(d));
			}
		}
	}, slotMixin);

	var daySlotMixin = lang.mixin({
		initLabels: function(){
			this.labels = [];
			var d = new Date(2000, 0, 1);
			for(var i = 1; i <= 31; i++){
				d.setDate(i);
				this.labels.push(this.format(d));
			}
		}
	}, slotMixin);

	return declare("dojox.mobile._DatePickerMixin", null, {
		// summary:
		//		A mixin for date picker widget.

		// yearPattern: String
		//		A pattern to be used to format year.
		yearPattern: "yyyy",

		// monthPattern: String
		//		A pattern to be used to format month.
		monthPattern: "MMM",

		// dayPattern: String
		//		A pattern to be used to format day.
		dayPattern: "d",

		initSlots: function(){
			var c = this.slotClasses, p = this.slotProps;
			c[0] = declare(c[0], yearSlotMixin);
			c[1] = declare(c[1], monthSlotMixin);
			c[2] = declare(c[2], daySlotMixin);
			p[0].pattern = this.yearPattern;
			p[1].pattern = this.monthPattern;
			p[2].pattern = this.dayPattern;
			this.reorderSlots();
		},

		reorderSlots: function(){
			if(this.slotOrder.length){ return; }
			var a = datelocale._parseInfo().bundle["dateFormat-short"].toLowerCase().split(/[^ymd]+/, 3);
			this.slotOrder = array.map(a, function(pat){
				return {y:0, m:1, d:2}[pat.charAt(0)];
			});
		},

		reset: function(){
			// summary:
			//		Goes to today.
			var now = new Date();
			var v = array.map(this.slots, function(w){ return w.format(now); });
			this.set("values", v);
			this.set("colors", v);
			this.disableValues(this.onDaySet());
		},

		onYearSet: function(){
			// summary:
			//		A handler called when the year value is changed.
			this.disableValues(this.onDaySet());
		},

		onMonthSet: function(){
			// summary:
			//		A handler called when the month value is changed.
			this.disableValues(this.onDaySet());
		},

		onDaySet: function(){
			// summary:
			//		A handler called when the day value is changed.
			var v = this.get("values"), // [year, month, day]
				pat = this.slots[0].pattern + "/" + this.slots[1].pattern,
				date = datelocale.parse(v[0] + "/" + v[1], {datePattern:pat, selector:"date"}),
				daysInMonth = ddate.getDaysInMonth(date);
			if(daysInMonth < v[2]){
				this.slots[2].set("value", daysInMonth);
			}
			return daysInMonth;
		},

		_getDateAttr: function(){
			// summary:
			//		Returns a Date object for the current values
			var v = this.get("values"), // [year, month, day]
				s = this.slots,
				pat = s[0].pattern + "/" + s[1].pattern + "/" + s[2].pattern;
				return datelocale.parse(v[0] + "/" + v[1] + "/" + v[2], {datePattern:pat, selector:"date"});
		},

		_setValuesAttr: function(/*Array*/a){
			// summary:
			//		Sets the slot values.
			array.forEach(this.getSlots(), function(w, i){
				var v = a[i];
				if(!isNaN(v)){
					var arr = [1970, 1, 1];
					arr.splice(i, 1, v - 0);
					v = w.format(new Date(arr));
				}
				w.set("value", v);
			});
		},
		
		_setValueAttr: function(/*String*/value){
			// summary:
			//		Sets the current date as an String formatted according to a subset of the ISO-8601 standard.
			// description:
			//		This method first converts the value argument by calling the fromISOString method of
			//		the dojo/date/stamp module, then sets the values of the picker according to the resulting
			//		Date object. If the string cannot be parsed by fromISOString, the method does nothing.
			// value:
			//		A string formatted as described in the dojo/date/stamp module.
			var date = datestamp.fromISOString(value);
			this.set("values", array.map(this.slots, function(w){ return w.format(date); }));
		},
		
		_getValueAttr: function(){
			// summary:
			//		Gets the current date as a String formatted according to a subset of the ISO-8601 standard.
			// returns:
			//		A string formatted as described in the dojo/date/stamp module.
			return datestamp.toISOString(this.get("date"), { selector: "date" });
		}		
	});
});

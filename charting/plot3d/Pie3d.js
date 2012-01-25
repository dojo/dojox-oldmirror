define(["dojo", "dojox/gfx", "dojox/gfx3d", "dojox/charting/Series"], function(dojo) {

	//	summary:
	//		Extension of the Viewport to allow it to create Pie sectors.
	dojo.extend(dojox.gfx3d.Viewport, {
		createSector: function(sector) {
			return this.create3DObject(dojox.gfx3d.Sector, sector);
		}
	});

	dojo.declare("dojox.gfx3d.Sector", dojox.gfx3d.Object, {
		//	summary:
		//		A 3D pie 'Sector' object for rendering a fragment of the whole chart.
		constructor: function() {

			//depth is the clylinder
			//normal is the fill and you can use a gradient to mak a different type of look
			this.object = dojo.clone({
				type: "sector",
				rx: 100,
				ry: 50,
				depth: 30,
				normal: null,
				begin: 0,
				end: Math.PI / 3,
				shade: false
			});
		},
		render: function(camera) {
			//	summary:
			//		Function to set the 'render' positions of the Sector.
			var diff = this.object.end - this.object.begin;
			var marks = dojo.map([this.object.begin, this.object.end], function(item) {
				return {
					x: this.rx * Math.cos(item),
					y: this.ry * Math.sin(-item),
					z: 0
				};
			}, this.object);
			this.cache = {
				begin: marks[0],
				end: marks[1]
			};
		},
		inView: function(begin, end) {
			if(end > Math.PI) {//Bottom half of Pie chart radians begin right and counterclockwise 2Pie in a circle
				var s = begin;
				//so we are dealing with the bottom half
				var e = end;
				if(begin <= Math.PI) {
					s = Math.PI;
					//its fine to this point
				}
				if(end > Math.PI * 2) {
					e = Math.PI * 2;
					//cut to the end of the circle do not call around again
				}
				return [s, e];
			} else {//otherwise you do not see this area so return null
				return null;
			}
		},
		draw: function(lighting) {
			//	summary:
			//		Function to draw the particular sector instance on the surface.
			var c = this.cache;
			var work = this.toStdFill(lighting, this.object.normal);
			var darker = new dojo.Color([work.r * 70 / 100 | 0, work.g * 70 / 100 | 0, work.b * 70 / 100 | 0]);
			var body = new dojo.Color([work.r * 80 / 100 | 0, work.g * 80 / 100 | 0, work.b * 80 / 100 | 0]);

			if(this.shape) {
				this.shape.clear();
			} else {
				this.shape = this.renderer.createGroup();
			}

			var gradient = {
				'type': 'linear',
				'x1': 0,
				'x2': 0,
				'y2': 0,
				'y1': 100,
				'colors': [{
					offset: 0,
					color: work
				}, {
					offset: 1,
					color: body
				}]
			};

			//You know arcTo cannot take a range greater than Math.PI and there are 2Pi radians in a circle
			//So if if you have ti split it.
			var diff = this.object.end - this.object.begin;

			if(diff >= Math.PI) {
				var half = dojo.map([this.object.begin, this.object.begin + diff / 2.0 + 0.03], function(item) {
					return {
						x: this.rx * Math.cos(item),
						y: this.ry * Math.sin(-item),
						z: 0
					};
				}, this.object);
				var A = {
					begin: half[0],
					end: half[1]
				};

				var other = dojo.map([this.object.begin + diff / 2.0, this.object.end], function(item) {
					return {
						x: this.rx * Math.cos(item),
						y: this.ry * Math.sin(-item),
						z: 0
					};
				}, this.object);
				var B = {
					begin: other[0],
					end: other[1]
				};

				//fill
				this.shape.createPath("").moveTo(0, 0).lineTo(A.begin.x, A.begin.y).arcTo(this.object.rx, this.object.ry, 0, false, false, A.end).lineTo(0, 0).setStroke(null)//this.strokeStyle)
				.setFill((this.object.shade === true) ? gradient : this.toStdFill(lighting, this.object.normal));

				//Arc line
				this.shape.createPath("").moveTo(0, 0).moveTo(A.begin.x, A.begin.y).arcTo(this.object.rx, this.object.ry, 0, false, false, A.end).setStroke(this.strokeStyle);

				this.shape.createPath("").moveTo(0, 0).lineTo(B.begin.x, B.begin.y).arcTo(this.object.rx, this.object.ry, 0, false, false, B.end).setStroke(null).setFill((this.object.shade === true) ? gradient : this.toStdFill(lighting, this.object.normal));

				//arc line
				this.shape.createPath("").moveTo(0, 0).moveTo(B.begin.x, B.begin.y).arcTo(this.object.rx, this.object.ry, 0, false, false, B.end).setStroke(this.strokeStyle);
			} else {
				this.shape.createPath("").moveTo(0, 0).lineTo(c.begin.x, c.begin.y).arcTo(this.object.rx, this.object.ry, 0, false, false, c.end).setStroke(this.strokeStyle).setFill((this.object.shade === true) ? gradient : this.toStdFill(lighting, this.object.normal));
			}

			var p = this.inView(this.object.begin, this.object.end);
			if(!p) {
				return;
				//if its not visible the cylinder part is not drawn
			}

			var q = dojo.map(p, function(item) {
				return {
					x: this.rx * Math.cos(item),
					y: this.ry * Math.sin(-item),
					z: 0
				};
			}, this.object);

			//front part to be drawn
			//
			var s = q[0];
			var e = q[1];
			var surf = this.shape.createPath("").moveTo(s.x, s.y).arcTo(this.object.rx, this.object.ry, 0, false, false, e).lineTo(e.x, e.y + this.object.depth).arcTo(this.object.rx, this.object.ry, 0, false, true, {
				x: s.x,
				y: s.y + this.object.depth
			}).lineTo(s.x, s.y).setFill(darker).setStroke(this.strokeStyle);
		}
	});

	return dojo.declare("dojox.charting.Pie3d", null, {

		colorIndex: 0,

		//default colors when use the 'default' word
		colors: ['#FF9090', '#90FF90', '#9090FF', '#B9D3EE', '#FFD39B', '#70DB93', '#F4A460', '#8B7355', '#FFF68F', '#BA55D3', '#FFFF00', '#236B8E', '#EEA9B8', '#FF2400', '#F0FFF0'],

		//
		//idname is the div id
		//width
		//   dictates the size of the pie chart Ellipse
		//height
		//   you must have area available for the legend.
		//depth
		//   is the cylinder size.
		//title
		//   default is empty string
		//shade
		//  If true the graient will be used
		//
		//beginAngle
		//  angle to rotate pie around
		//
		//Overall the pie will be from the topmargin (20 pels) and centered
		//
		//eg:
		//   new dojox.charting.plot3d.Pie("idname", {width:300, height:300, depth:15, title:"Chart Test", shade: false, beginAngle: 0});
		//
		constructor: function(inid, opt) {
			//	Summary:
			//		Constructor.
			//	inid:
			//		The ID to use for the chart.
			//	opt:
			//		Object containing all constructor options.
			//		{
			//			width: Number, // The size of the ellipse of the Pie chart.
			//			height: Number, // The height of the legend.
			//			title: String, // The title of the chart, if any.  Default is ""
			//			shade: Boolean, // Whether or not to use a gradient fill.
			//			beginAngle: Number, // The angle to rotate the Pie to.
			//		}
			var lcolor = "lcolor" in opt ? opt.lcolor : "black";
			var label = "label" in opt ? opt.label : null;
			var width = "width" in opt ? opt.width : 200;
			var pwidth = "pwidth" in opt ? opt.pwidth : width;
			var height = "height" in opt ? opt.height : 250;
			var depth = "depth" in opt ? opt.depth : 15;
			var title = "title" in opt ? opt.title : "";
			var shade = "shade" in opt ? opt.shade : false;
			var beginAngle = "beginAngle" in opt ? opt.beginAngle : 0;
			
			//display legend
			this.legend = "legend" in opt ? opt.legend : false;
			//display labels
			this.labels = "labels" in opt ? opt.labels : true;
			//display tootlip
			this.tooltip = "tooltip" in opt ? opt.tooltip : true;
			
			
			this.label = label;
			
			this.lcolor = lcolor;

			this.prevx = 0;
			this.prevy = 0;

			this.div = dojo.doc.createElement("div");
			try {
				dojo.style(this.div, {
					position: "absolute",
					visibility: "hidden",
					background: "white",
					border: "#7EABCD solid 1px",
					padding: "1px 5px 1px 5px"
				});
			} catch (e) {
				console.debug("Error trying to set up tooltip: " + e);
			}
			this.dividDom = (dojo.query(inid).length == 1) ? inid : dojo.query("#" + inid)[0];
			this.dividDom.appendChild(this.div);
			this.divid = inid;

			this.surface = dojox.gfx.createSurface(inid, width, height);
			this.view = this.surface.createViewport();
			this.title = title;
			this.series = [];
			this.dimensions = {
				width: width,
				height: height
			};

			//beginAngle max is 2PI (radians)
			//This controls the size of the pie which is an ELLIPSE
			//and the THICKNESS and beginANGLE of the pie piece
			//These values are really replaced
			this.spec = dojo.clone({
				rx: 100,
				ry: 50,
				depth: depth,
				beginAngle: beginAngle,
				shade: shade
			});
			this.spec.rx = pwidth / (Math.PI / 1.5);
			this.spec.ry = pwidth / (Math.PI * 1);
		},
		// events
		plotEvent: function(o) {
			//	summary:
			//		A function to handle events on the pie chart.
			//	description:
			//		A function to handle events on the pie chart.
			//		This mainly handles the rendering or hiding of a value tooltip.
			dojo.style(this.div, {
				position: "absolute",
				zIndex: 2,
				background: "white"
			});

			var left = o.x + this.dividDom.offsetLeft;
			dojo.style(this.div, "left", left + "px");

			dojo.style(this.div, "top", o.y + this.dividDom.offsetTop + "px");
			this.div.innerHTML = o.tooltip;
			if(o.type === "onmouseover") {
				dojo.style(this.div, "visibility", "visible");
			} else {
				dojo.style(this.div, "visibility", "hidden");
			}
		},
		_connectEvents: function(shape, o) {
			//	summary:
			//		Internal function to handle connecting to events that occur
			//		on the plot we care about.
			shape.connect("onmouseover", this, function(e) {
				o.type = "onmouseover";
				o.event = e;
				this.plotEvent(o);
			});
			shape.connect("onmouseout", this, function(e) {
				o.type = "onmouseout";
				o.event = e;
				this.plotEvent(o);
			});
			shape.connect("onclick", this, function(e) {
				o.type = "onclick";
				o.event = e;
				this.plotEvent(o);
			});
		},
		addSeries: function(series) {
			//	summary:
			//		Function to add a series to the chart.
			//	series:
			//		A dojox.charting.Series object of the form:
			//		{null, <percentage>, {title: "someTitle" fillStyle: {/*Fill information */}}
			if(series.fillStyle.color === "default") {
				series.fillStyle.color = this.colors[this.colorIndex]; ++this.colorIndex;
				if(this.colorIndex >= this.colors.length) {
					this.colorIndex = 0;
				}

			}
			this.series.push(series);
			return this;
		},
		//good to know code
		//dojox.gfx._base._getTextBox(label, {font: taFont}).w;
		//"normal normal normal 7pt Tahoma",
		render: function() {
			//	summary:
			//		Function to render the 3D pie chart.
			//	description:
			//		Function to render the 3D pie chart.
			// it is much easier to calculate the ellipse since it is just misaligned.
			var theta = Math.acos(this.spec.ry / this.spec.rx);
			var normal = {
				x: Math.sin(theta),
				y: 0,
				z: Math.cos(theta)
			};

			var sum = 0;
			dojo.forEach(this.series, function(item) {
				item.data = item.source;
				sum += item.data;
				//total data values
			});
			var beginAngle = this.spec.beginAngle;
			dojo.forEach(this.series, function(item) {
				var angle = item.data / sum * Math.PI * 2;
				var sector = dojo.clone(this.spec);

				sector.begin = beginAngle;
				item.cangle = beginAngle + angle / 2.0;
				//center angle
				beginAngle += angle;
				sector.end = beginAngle;
				sector.normal = normal;

				//you could make stroke an option
				item.sector = this.view.create3DObject(dojox.gfx3d.Sector, sector).setFill(item.fillStyle).setStroke('#505050');
				//save sectors
			}, this);

			this.view.render();
				
			
			var self = this;
			var topmargin = 20;

			var hh = this.spec.ry * Math.cos(Math.PI / 8) + this.spec.depth + topmargin;
			//actual bottom of Pie from center
			var tx = this.dimensions.width / 2;
			var ty = hh;
			//this.dimensions.width/2;

			if(this.labels == true){
				dojo.forEach(this.series, function(item) {
					var x = self.spec.rx * Math.cos(item.cangle) + tx - 10;
					//the -10 is a nice shift for label placement
					var y = self.spec.ry * Math.sin(-item.cangle) + ty - 10;
					self.surface.createText({
						x: x,
						y: y,
						text: item.title
					}).setFont({
						weight: "bold",
						family: "arial",
						size: "8pt"
					}).setFill("black");
	
					
					if(self.tooltip == true){
						//This is where you do the tooltips
						//use the shape for the connection of mousein/out and the x,y from the absolute area.
						//using the cangle just like labels are done but use half the radius location.
						//
						x = ((self.spec.rx / 2) * Math.cos(item.cangle) + tx) | 0;
						y = ((self.spec.ry / 2) * Math.sin(-item.cangle) + ty) | 0;
		
						var tip = item.tooltip !== undefined ? item.tooltip : item.data;
		
						if("tooltip" in item.fillStyle) {
							tip = item.fillStyle.tooltip;
						}
		
						var o = {
							element: "sector",
							plot: this,
							x: x,
							y: y,
							tooltip: tip,
							shape: item.sector.shape
						};
						self._connectEvents(item.sector.shape, o);
					}
				});
			}
			var modulo = ((this.series.length / 2) + 1) | 0;
			//two columns only
			var fontH;
			try {
				fontH = dojox.gfx._base._getTextBox("Mj").h;
			} catch (e) {
				fontH = 20;
			}
			var y = hh * 2 - topmargin + fontH;
			var leftmargin = 10;
			var boxwidth = 10;
			var x = leftmargin + boxwidth;
			var i = 0;

			//the legend is two times the fontH
			//from the bottom of the Pie chart
			
			if(this.label !== null) {
				this.surface.createText({
					x: tx,
					y: y,
					align: 'middle',
					text: this.label
				}).setFont({
					weight: "bold",
					family: "arial",
					size: "8pt"
				}).setFill(this.lcolor);
			}
			
			if(this.legend == true){
				dojo.forEach(this.series, function(item) {
					if(i == modulo) {
						x += 100;
						y = hh * 2 - topmargin + fontH + fontH;
					} else {
						y += fontH;
					}++i;
					
					self.surface.createText({
						x: x + 5,
						y: y,
						text: item.title
					}).setFont({
						weight: "normal",
						family: "arial",
						size: "8pt"
					}).setFill("black");
	
					self.surface.createRect({
						x: x - boxwidth,
						y: y - fontH / 2,
						width: 10,
						height: fontH / 2
					}).setFill(item.fillStyle.color).setStroke('#000000');
				});
			}
			this.view.setTransform(dojox.gfx.matrix.translate(tx, hh));
		},
		clear: function() {
			//	summary:
			//		Function to clear the chart view completely.
			//	description:
			//		Function to clear the chart view completely.
			this.surface.clear();
			this.view = this.surface.createViewport();
			this.colorIndex = 0;
			this.series = [];
		},
		setLights: function(lights, ambient, specular) {
			//	summary:
			//		Function to set the ligts to illuminate the pie chart.
			//	description:
			//		Function to set the ligts to illuminate the pie chart.
			//	lights:
			//		An array of light declarations for illuninatig the chart.
			//		example: [{direction: {x: -1, y: 1, z: -5}, color: "white"}]
			//	ambient:
			//		The ambient (diffused) lighting of the surface.
			//		example: {color:"white", intensity: 2}
			//	specular:
			//
			this.view.setLights(lights, ambient, specular);
			return this;
		},
		setStroke: function(style) {
			//	summary:
			//		Function to set the stroke style on the chart.
			this.strokeStyle = style;
		}
	});
});

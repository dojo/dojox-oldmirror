define(["dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/window", "dojo/dom-geometry", "dojo/on", "dojo/_base/event", "dojo/keys"],
	function(arr, lang, declare, win, domGeometry, on, event, keys){
			
	return declare("dojox.calendar.Mouse", null, {
		// module:
		//		dojox/calendar/Mouse
		// summary:
		//		This plugin is managing the mouse interactions on item renderers displayed by a calendar view.
		
				
		//	triggerExtent: Number 
		//		The distance in pixels along the vertical or horizontal axis to cover with the 
		//		mouse button down before triggering the editing gesture.
		triggerExtent: 3,
					
		postMixInProperties: function(){
			this.inherited(arguments);
			
			this.on("rendererCreated", lang.hitch(this, function(ir){
				
				var renderer = ir.renderer;
				
				var h;
				if(!renderer.__handles){
					renderer.__handles = [];
				}
															
				h = on(renderer.domNode, "click", lang.hitch(this, function(e){
					event.stop(e);
					this._onItemClick({
						triggerEvent: e,
						renderer: renderer,
						item: this.renderItemToItem(renderer.item, this.get("store"))
					});
				}));
				renderer.__handles.push(h);
				
				h = on(renderer.domNode, "dblclick", lang.hitch(this, function(e){
					event.stop(e);
					this._onItemDoubleClick({
						triggerEvent: e,
						renderer: renderer,
						item: this.renderItemToItem(renderer.item, this.get("store"))
					});
				}));
				renderer.__handles.push(h);
				
				if(renderer.resizeStartHandle){
					h = on(renderer.resizeStartHandle, "mousedown", lang.hitch(this, function(e){
						// allow user selection so NOT stopEvent
						this._onRendererHandleMouseDown(e, renderer, "resizeStart");
					}));
					renderer.__handles.push(h);
				}
				
				if(renderer.moveHandle){
					h = on(renderer.moveHandle, "mousedown", lang.hitch(this, function(e){
						// allow user selection so NOT stopEvent
						this._onRendererHandleMouseDown(e, renderer, "move");
					}));
					renderer.__handles.push(h);
				}
				
				if(renderer.resizeEndHandle){
					h = on(renderer.resizeEndHandle, "mousedown", lang.hitch(this, function(e){
						// allow user selection so NOT stopEvent
						this._onRendererHandleMouseDown(e, renderer, "resizeEnd");
					}));
					renderer.__handles.push(h);
				}				
				
				h = on(renderer.domNode, "mousedown", lang.hitch(this, function(e){
					this._rendererMouseDownHandler(e, renderer);
				}));
				renderer.__handles.push(h);
				
				h = on(ir.container, "mouseover", lang.hitch(this, function(e){
					if(!renderer.item) return;
					if(!this._isCursorInRenderer){
						this._isCursorInRenderer = true;
						if(!this._editingGesture){
							this._setHoveredItem(renderer.item.item, ir.renderer);
							this._onItemRollOver(this.__fixEvt({
								item: this.renderItemToItem(renderer.item, this.get("store")),
								renderer: renderer,
								triggerEvent: e
							}));
						}
					}
				}));
				renderer.__handles.push(h);
				
				h = on(renderer.domNode, "mouseout", lang.hitch(this, function(e){
					if(!renderer.item) return;
					if(this._isCursorInRenderer && !this._editingGesture){
						// mouseout is called in every sub node, let's determine if we really gone out of the renderer.
						var node = e.relatedTarget;
						while(node != e.currentTarget && node != win.doc.body && node != null){
							node = node.parentNode;
						}
						if(node == e.currentTarget){
							return;
						}						
						delete this._isCursorInRenderer;
						
						this._setHoveredItem(null);
						
						this._onItemRollOut(this.__fixEvt({
							item: this.renderItemToItem(renderer.item, this.get("store")),
							renderer: renderer,
							triggerEvent: e
						}));
					}
				}));				
				renderer.__handles.push(h);
				
			}));			
		},
		
		_onItemRollOver: function(e){
			this._dispatchCalendarEvt(e, "onItemRollOver");
		},
		
		onItemRollOver: function(e){
			//	Summary:
			//		Event dispatched when the mouse cursor in going over an item renderer. 
		},
		
		_onItemRollOut: function(e){
			this._dispatchCalendarEvt(e, "onItemRollOut");
		},
		onItemRollOut: function(e){
			//	Summary:
			//		Event dispatched when the mouse cursor in leaving an item renderer.
		},
		
		_rendererMouseDownHandler: function(e, renderer){
			
			event.stop(e);				
			
			var item = this.renderItemToItem(renderer.item, this.get("store"));
			
			this.selectFromEvent(e, item, renderer, true);
			
			if(this._setTabIndexAttr){
				this[this._setTabIndexAttr].focus();
			}
		},
		
		_onRendererHandleMouseDown: function(e, renderer, editKind){
			
			this.showFocus = false;
			
			// save item here as calling endItemEditing may call a relayout and changes the item.
			var ritem = renderer.item;
			var item = ritem.item;
			
			if(!this.isItemBeingEdited(item)){
						
				if(this._isEditing){								
					this._endItemEditing("mouse", false);								
				}
				
				this.selectFromEvent(e, this.renderItemToItem(renderer.item, this.get("store")), renderer, true);
				
				this._edProps = {
					editKind: editKind,
					editedItem: item,
					rendererKind: renderer.rendererKind,
					tempEditedItem: item,					
					liveLayout: this.liveLayout				
				};
							
				this.set("focusedItem", this._edProps.editedItem);	
			}
																						
			var handles = [];
			handles.push(on(win.doc, "mouseup", lang.hitch(this, this._editingMouseUpHandler)));
			handles.push(on(win.doc, "mousemove", lang.hitch(this, this._editingMouseMoveHandler)));
			
			var p = this._edProps;
			p.handles = handles;
			p.eventSource = "mouse";
			p.editKind = editKind;
			
			this._startPoint = {x: e.screenX, y: e.screenY};												
		},
		
		_editingMouseMoveHandler: function(e){
			var p = this._edProps;
					
			if(this._editingGesture){
				
				if(!this._autoScroll(e.pageX, e.pageY, true)){
					this._moveOrResizeItemGesture([this.getTime(e)], "mouse", e);	
				}
											
			}else if(Math.abs(this._startPoint.x - e.screenX) >= this.triggerExtent || // moved enough to trigger editing
							 Math.abs(this._startPoint.y - e.screenY) >= this.triggerExtent){
							 	
				if(!this._isEditing){
					this._startItemEditing(p.editedItem, "mouse");	
				}
				
				p = this._edProps;
								
				this._startItemEditingGesture([this.getTime(e)], p.editKind, "mouse", e);
			}
		},		
		
		_editingMouseUpHandler: function(e){
			
			var p = this._edProps;
			
			this._stopAutoScroll();
									
			if(this._isEditing){			
				
				if(this._editingGesture){ // a gesture is ongoing.					
					this._endItemEditingGesture("mouse", e);					
				}
				
				this._endItemEditing("mouse", false);
								
			}else{ // handlers were not removed by endItemEditing
				arr.forEach(p.handles, function(handle){
					handle.remove();
				});
			}
		},
		
		_autoScroll: function(globalX, globalY, isVertical){
			
			if (!this.scrollable || !this.autoScroll) {
				return false;
			}
								
			var scrollerPos = domGeometry.position(this.scrollContainer, true);
			
			var p = isVertical ? globalY - scrollerPos.y : globalX - scrollerPos.x;
			var max = isVertical ? scrollerPos.h : scrollerPos.w;
			
			if (p < 0 || p > max) {
				
				step = Math.floor((p < 0	? p : p - max)/2)/3;
				
				this._startAutoScroll(step);
						
				return true;
				
			} else {
				
				this._stopAutoScroll();				
			}
			return false;
		}							
	});

});
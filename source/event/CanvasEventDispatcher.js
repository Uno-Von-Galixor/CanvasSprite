var CanvasEventDispatcher = {
	registeredEvents: {},
	addEventListener: function(localEventType, localFunctionToCall, localTarget){
		if(!this.registeredEvents[localEventType]){
			this.registeredEvents[localEventType] = new Array();
		}
		this.registeredEvents[localEventType].push({target:localTarget, eventToDispatch:localFunctionToCall});
	},
	mouseDown: function(){
		if(this.registeredEvents["mouse-down"] != undefined){
			for(var i=0; i<this.registeredEvents["mouse-down"].length; i++){
				var target = this.registeredEvents["mouse-down"][i].target;
				if(target.mouseOver == true){
					eval(this.registeredEvents["mouse-down"][i].eventToDispatch);
				}
			}
		}
	},
	mouseUp: function(){
		if(this.registeredEvents["mouse-up"] != undefined){
			for(var i=0; i<this.registeredEvents["mouse-up"].length; i++){
				eval(this.registeredEvents["mouse-up"][i].eventToDispatch);
			}
		}
	},
	mouseMove:function(event){
		CanvasStage.canvasMouseX = event.clientX - CanvasStage.canvasPos.x;
		CanvasStage.canvasMouseY = event.clientY - CanvasStage.canvasPos.y;
	},
	enterFrame: function(){
		if(this.registeredEvents["enterframe"] != undefined){
			for(var i=0; i<this.registeredEvents["enterframe"].length; i++){
				eval(this.registeredEvents["enterframe"][i].eventToDispatch);
			}
		}
		
		if(this.registeredEvents["mouse-over"] != undefined){
			for(var i=0; i<this.registeredEvents["mouse-over"].length; i++){
				if(this.registeredEvents["mouse-over"][i].target.mouseOver == true && this.registeredEvents["mouse-over"][i].target.mouseOverState == false){
					this.registeredEvents["mouse-over"][i].target.mouseOverState = true;
						eval(this.registeredEvents["mouse-over"][i].eventToDispatch);
				}
			}
		}
		if(this.registeredEvents["mouse-out"] != undefined){
			for(var i=0; i<this.registeredEvents["mouse-out"].length; i++){
				if(this.registeredEvents["mouse-out"][i].target.mouseOver == false && this.registeredEvents["mouse-out"][i].target.mouseOverState == true){
					this.registeredEvents["mouse-out"][i].target.mouseOverState = false;
						eval(this.registeredEvents["mouse-out"][i].eventToDispatch);
				}
			}
		}
	}
};
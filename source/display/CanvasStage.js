

// class definition
var CanvasStage = {};
function newCanvasStage(localCanvasID, localFPS){
	CanvasStage = {
		canvasID: localCanvasID,
		canvasRef: document.getElementById(localCanvasID),
		traceWindowRef: document.getElementById("CSTraceWindow"),
		children: new Array(),
		fps: localFPS,
		canvasPos:{x:0,y:0},
		canvasMouseX:0,
		canvasMouseY:0,
		canvasWidth:0,
		canvasHeight:0,
		alteredNewBounds:[],
		alteredOldBounds:[],
		alteredSprites:[],
		debugMode:false,
		init: function(){
			window.setInterval("CanvasStage.drawChildren()", CanvasStage.fps);
			document.captureEvents(Event.MOUSEMOVE);
			document.onmousemove = CanvasEventDispatcher.mouseMove;
			this.canvasPos = CanvasStage.findCanvasPos();
			this.canvasWidth = CanvasStage.canvasRef.width;
			this.canvasHeight = CanvasStage.canvasRef.height;
			this.watch("debugMode", this.setDebugMode);
		},
		getCanvas: function(){
			return CanvasStage.canvasRef;
		},
		setDebugMode: function(localProp, localOldVal, localNewVal){
			this.debugMode = localNewVal;
			if(this.debugMode == true){
				this.traceWindowRef.style.height = "100px";
				this.traceWindowRef.style.display = "block";
			} else {
				this.traceWindowRef.style.height = "0px";
				this.traceWindowRef.style.display = "none";
			}
			return localNewVal;
		},
		getContext: function(){
			return this.getCanvas().getContext('2d');
		},
		addChild: function(localNewChild){
			CanvasStage.children.push(localNewChild);
		},
		drawChildren: function(){
			if(this.children.length > 0){
				// clear the frame
				this.getContext().clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				// loop through the child objects
				var cursorState = false;
				for(var i=0; i<this.children.length; i++){
					this.children[i].drawFullRect();
					this.children[i].detectMouseOver();
				}
				CanvasEventDispatcher.enterFrame();
			}
			this.alteredNewBounds = [];
			this.alteredOldBounds = [];
			this.alteredSprites = [];
		},
		reportAlteredBounds: function(localOldBounds, localNewBounds, localSprite){
			this.alteredSprites.push(localSprite);
			this.alteredNewBounds.push(localNewBounds);
			this.alteredOldBounds.push(localOldBounds);
		},
	 	findCanvasPos: function() {
			if(CanvasStage.canvasRef != null){
		   		var obj = CanvasStage.canvasRef;
		   		var curleft = curtop = 0;
		   		if(obj.offsetParent) {
		   			do {curleft += obj.offsetLeft;curtop += obj.offsetTop;} while (obj = obj.offsetParent);
		   			return {x:curleft,y:curtop};
		   		}
			} else {
				return {x:0, y:0};
			}
		}
	}
	CanvasStage.init();
}


// class definition
var CanvasStage = {};
function newCanvasStage(localCanvasRef, localFPS){
	CanvasStage = {
		canvasRef: localCanvasRef,
		children: new Array(),
		fps: localFPS,
		canvasPos:{x:0,y:0},
		canvasMouseX:0,
		canvasMouseY:0,
		canvasWidth:0,
		canvasHeight:0,
		init: function(){
			window.setInterval("CanvasStage.drawChildren()", CanvasStage.fps);
			document.captureEvents(Event.MOUSEMOVE);
			document.onmousemove = CanvasEventDispatcher.mouseMove;
			this.canvasPos = CanvasStage.findCanvasPos();
			this.canvasWidth = document.getElementById(CanvasStage.canvasRef).width;
			this.canvasHeight = document.getElementById(CanvasStage.canvasRef).height;
		},
		getCanvas: function(){
			var localCanvas = document.getElementById(CanvasStage.canvasRef);
			return localCanvas
		},
		getContext: function(){
			return this.getCanvas().getContext('2d');
		},
		addChild: function(localNewChild){
			CanvasStage.children.push(localNewChild);
		},
		drawChildren: function(){
			if(CanvasStage.children.length > 0){
				// clear the frame
				this.getContext().clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				// loop through the child objects
				var cursorState = false;
				for(var i=0; i<CanvasStage.children.length; i++){
					CanvasStage.children[i].drawMe();
					CanvasStage.children[i].detectMouseOver();
				}
				CanvasEventDispatcher.enterFrame();
			}
		},
	 	findCanvasPos: function() {
			obj = document.getElementById(CanvasStage.canvasRef);
			var curleft = curtop = 0;
			if (obj.offsetParent) {
				do {curleft += obj.offsetLeft;curtop += obj.offsetTop;} while (obj = obj.offsetParent);
				return {x:curleft,y:curtop};
			}
		}
	}
	CanvasStage.init();
}
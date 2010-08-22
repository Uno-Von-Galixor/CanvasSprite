/*
CanvasStage CanvasEventDispatcher & CanvasSprite are the creations of simon doerksen
*/

function newCanvasSprite(localID){
	var NewSprite = {
	    x: 0,
	    y: 0,
		width: 0,
		height: 0,
		alpha: 1,
		rotation: 0,
		regPoint:{x:0, y:0},
		id: localID,
		bitmapSRC: null,
		bitmap:null,
		bitmapRequested: false,
		bitmapLoaded: false,
		canvasRef: CanvasStage.getCanvas(),
		mouseOver:false,
		mouseOverState:false,
		events:{},
		drawBorder:false,
		stateChanged:true,
		boundingBox:{"lefttop":{x:0,y:0}, "righttop":{x:0,y:0}, "rightbottom":{x:0,y:0}, "leftbottom":{x:0,y:0}},
		init: function(){
			// watch for drawing changes
			this.watch("x", this.stateChanged);
			this.watch("y", this.stateChanged);
			this.watch("width", this.stateChanged);
			this.watch("height", this.stateChanged);
			this.watch("rotation", this.stateChanged);
			this.watch("alpha", this.stateChanged);
			CanvasStage.addChild(this);
		},
		addEventListener: function(eventType, eventFunction){
			CanvasEventDispatcher.addEventListener(eventType, eventFunction, this);
			this.events[eventType] = true;
		},
		stateChanged: function(localProp, localOldVal, localNewVal){
			this.stateChanged = true;
			return localNewVal;
		},
		drawMe: function(){
			CanvasStage.getContext().save();
			CanvasStage.getContext().globalAlpha = this.alpha;
			if(this.bitmapLoaded == true){
				CanvasStage.getContext().translate(this.x+(this.regPoint.x*2), this.y+(this.regPoint.y*2));
				if(this.rotation != 0){
					CanvasStage.getContext().rotate(this.rotation * Math.PI / 180);
				}
				CanvasStage.getContext().drawImage(this.bitmap, 0-(this.regPoint.x), 0-(this.regPoint.y));
			}
			var x = 0-(this.regPoint.x);
			var y = 0-(this.regPoint.y);
			this.boundingBox.lefttop.x = x*Math.cos(this.rotation * Math.PI / 180) - y*Math.sin(this.rotation * Math.PI / 180);
			this.boundingBox.lefttop.y = x*Math.sin(this.rotation * Math.PI / 180) + y*Math.cos(this.rotation * Math.PI / 180);
			this.boundingBox.righttop.x = (x+this.width)*Math.cos(this.rotation * Math.PI / 180) - y*Math.sin(this.rotation * Math.PI / 180);
			this.boundingBox.righttop.y = (x+this.width)*Math.sin(this.rotation * Math.PI / 180) + y*Math.cos(this.rotation * Math.PI / 180);
			this.boundingBox.rightbottom.x = (x+this.width)*Math.cos(this.rotation * Math.PI / 180) - (y+this.height)*Math.sin(this.rotation * Math.PI / 180);
			this.boundingBox.rightbottom.y = (x+this.width)*Math.sin(this.rotation * Math.PI / 180) + (y+this.height)*Math.cos(this.rotation * Math.PI / 180);
			this.boundingBox.leftbottom.x = x*Math.cos(this.rotation * Math.PI / 180) - (y+this.height)*Math.sin(this.rotation * Math.PI / 180);
			this.boundingBox.leftbottom.y = x*Math.sin(this.rotation * Math.PI / 180) + (y+this.height)*Math.cos(this.rotation * Math.PI / 180);
			
			CanvasStage.getContext().restore();
			
			x = this.x+(this.regPoint.x*2);
			y = this.y+(this.regPoint.y*2);
			if(this.drawBorder == true){
				CanvasStage.getContext().beginPath();
				CanvasStage.getContext().moveTo(this.boundingBox.lefttop.x+x,this.boundingBox.lefttop.y+y); 
				CanvasStage.getContext().lineTo(this.boundingBox.righttop.x+x,this.boundingBox.righttop.y+y);
				CanvasStage.getContext().lineTo(this.boundingBox.rightbottom.x+x,this.boundingBox.rightbottom.y+y);
				CanvasStage.getContext().lineTo(this.boundingBox.leftbottom.x+x,this.boundingBox.leftbottom.y+y);
				CanvasStage.getContext().lineTo(this.boundingBox.lefttop.x+x,this.boundingBox.lefttop.y+y);
				CanvasStage.getContext().stroke();
			}
			this.stateChanged = false;
		},
		detectMouseOver: function(){
			this.mouseOver = false;
			if(this.events["mouse-down"] == true){
				var points = new Array();
				var x = this.x+(this.regPoint.x*2);
				var y = this.y+(this.regPoint.y*2);
				points.push({x:this.boundingBox.lefttop.x+x, y:this.boundingBox.lefttop.y+y});
				points.push({x:this.boundingBox.righttop.x+x, y:this.boundingBox.righttop.y+y});
				points.push({x:this.boundingBox.rightbottom.x+x, y:this.boundingBox.rightbottom.y+y});
				points.push({x:this.boundingBox.leftbottom.x+x, y:this.boundingBox.leftbottom.y+y});
				
				if(point.isPointInPoly(points, {x:CanvasStage.canvasMouseX, y:CanvasStage.canvasMouseY}) == true){
					this.mouseOver = true;
				}
			}
			return(this.mouseOver);
		},
		getBitmap: function(localSource){
		   	this.bitmap = new Image();   // Create new Image object  
			this.bitmap.parent = this;
		   	this.bitmap.onload = function(){
		     	this.parent.bitmapLoaded = true;
		   	}  
		   	this.bitmap.src = localSource; // Set source path
		}
	}
	NewSprite.init();
	return NewSprite;
}

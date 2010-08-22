// CanvasStage math object
var math = {
	equalize:function(localX, localY){
		// returns length of vector with x + y values
		return Math.sqrt((localX*localX) + (localY+localY));
	},
	hookesLaw:function(localSpringConstant, localDisplacement){
		// returns spring force
		return -(localSpringConstant*localSpringConstant);
	}
}
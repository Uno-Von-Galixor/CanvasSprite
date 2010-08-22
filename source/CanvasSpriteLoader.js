var ScriptLoader = {
	includesComplete:function(){},
	loadComplete:function(){
		ScriptLoader.loadedScripts++;
		if(ScriptLoader.loadedScripts == ScriptLoader.requestedScripts){
			ScriptLoader.includesComplete();
		}
	},
	callback:function(){},
	requestedScripts:0,
	loadedScripts:0
}

function include(localFileURL){
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = sourcePath+"/"+localFileURL;
	ScriptLoader.requestedScripts++;
	newScript.onload = ScriptLoader.loadComplete;
	newScript.onreadystatechange = function() {
		if (this.readyState == 'complete') {
			ScriptLoader.loadComplete();
		}
	}
	if(document.getElementById("CanvasSpriteScriptImporter") == null){
		document.getElementById("CanvasSprite").innerHTML += "<div id='CanvasSpriteScriptImporter></div>";	
	}
	document.getElementById("CanvasSpriteScriptImporter").appendChild(newScript);
}

function initializeCanvasSprite(localCanvasTag, localWidth, localHeight, localFPS, localCallback){
	var canvas = document.getElementById("CanvasSprite");
	canvas.innerHTML += '<canvas id="'+localCanvasTag+'" width="'+localWidth+'" height="'+localHeight+'" onMouseUp="CanvasEventDispatcher.mouseUp();" onMouseDown="CanvasEventDispatcher.mouseDown();"></canvas>';
	include("util/point.js");
	include("display/CanvasStage.js");
	include("event/CanvasEventDispatcher.js");
	ScriptLoader.callback = localCallback;
	ScriptLoader.includesComplete = function(){
		newCanvasStage(localCanvasTag, localFPS);
		ScriptLoader.callback();
	}
}
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

var Tracer = {
	traceLog:""
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
	if(document.getElementById("CSScriptImporter") == null){
		document.getElementById("CanvasSprite").innerHTML += "<div id='CSScriptImporter></div>";
	}
	document.getElementById("CSScriptImporter").appendChild(newScript);
}

function trace(localTraceMessage){
	if(CanvasStage.debugMode == true){
		CanvasStage.traceWindowRef.value += "-- "+localTraceMessage+"\n";
		CanvasStage.traceWindowRef.scrollTop = CanvasStage.traceWindowRef.scrollHeight;
	}
}

function initializeCanvasSprite(localCanvasTag, localWidth, localHeight, localFPS, localCallback){
	var canvas = document.getElementById("CanvasSprite");
	canvas.innerHTML += '<canvas id="'+localCanvasTag+'" width="'+localWidth+'" height="'+localHeight+'" onMouseUp="CanvasEventDispatcher.mouseUp();" onMouseDown="CanvasEventDispatcher.mouseDown();"></canvas>';
	canvas.innerHTML += '<div style="width:'+(localWidth-2)+'px"><textarea id="CSTraceWindow" style="display:none;border:1px black solid;overflow-y:scroll; margin:0;padding:0; width:'+(localWidth-2)+'px; height:0px;"></textarea></div>';
	include("util/point.js");
	include("display/CanvasStage.js");
	include("event/CanvasEventDispatcher.js");
	ScriptLoader.callback = localCallback;
	ScriptLoader.includesComplete = function(){
		newCanvasStage(localCanvasTag, localFPS);
		ScriptLoader.callback();
	}
}
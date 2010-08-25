var ScriptLoader = {
	loadComplete:function(){
		ScriptLoader.loadedScripts++;
		if(ScriptLoader.loadedScripts == ScriptLoader.requestedScripts){
			Preloader.beginPreload();
		}
	},
	requestedScripts:0,
	loadedScripts:0
}

var Preloader = {
	requestedFiles: 0,
	loadedFiles: 0,
	files:{},
	beginPreload:function(){
		for (var i in Preloader.files){
			var ext = i.substr(i.lastIndexOf('.') + 1);
			
			if(ext == "png" || ext == "bmp" || ext == "jpg" || ext == "gif"){
				Preloader.files[i] = new Image();   // Create new Image object  
				Preloader.files[i].parent = this;
		   		Preloader.files[i].onload = function(){
		     		this.parent.fileLoaded();
		   		}  
		   		Preloader.files[i].src = i; // Set source path
			}
		}
	},
	fileLoaded:function(){
		Preloader.loadedFiles++;
		if(Preloader.loadedFiles == Preloader.requestedFiles){
			Preloader.filesComplete();
		}
	},
	filesComplete:function(){},
	callback:function(){}
}

var Tracer = {
	traceLog:""
}

function preload(localURL){
	Preloader.requestedFiles++;
	Preloader.files[localURL] = null;
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
	if(document.getElementById("ScriptImporter") == null){
		document.getElementById("CanvasSprite").innerHTML += "<div id='ScriptImporter></div>";
	}
	document.getElementById("ScriptImporter").appendChild(newScript);
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
	Preloader.callback = localCallback;
	Preloader.filesComplete = function(){
		newCanvasStage(localCanvasTag, localFPS);
		Preloader.callback();
	}
}
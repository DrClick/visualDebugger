define(function(require, exports, module) {

	var Entity = require("famous/core/Entity");



	function RenderTreeVisualizer(renderTree){
		this.renderTree = [].concat(renderTree);
		this.outputTree = "";
	}

	RenderTreeVisualizer.prototype.getTree = function(){
		var html = "<ul class='debugger'>"
		for (var i = 0; i < this.renderTree.length; i++) {
			html += "<li>" + _getNodeHTML(this.renderTree[i]) + "</li>";
		}
		html += "</ul>";

		return html;
	}//end function

	function _getNodeHTML(node){
		var html = "";
		if(node instanceof Array){
			if(node.name){
				html += "<span class='namedNode'>" + node.name + "</span>";
			}
			html += "<ul>";
			for (var i = 0; i < node.length; i++) {
				html += "<li>" + _getNodeHTML(node[i])+ "</li>";
			};
			html += "</ul>";
		}


		else if (typeof(node.target) == "number"){
			var surface = Entity.get(node.target);
			var surfaceJSON = JSON.stringify(surface, function(key, value){
				if(key=="eventForwarder" || key=="eventHandler"){
					return "";
				}
				return value;
			});


			html += "<span class='size'>Size: " + _prettifyArray(node.size) + "</span>";
			html += "<span class='opacity'>Opacity: " + node.opacity + "</span>";
			html += "<span class='origin'>Origin: " + _prettifyArray(node.origin) + "</span>";
			html += "<span class='modifier'>Modifier: " + _prettifyTansform(node.transform) + "</span>";
			html += "<ul><li>";
			html += "<code class='surface'>" + surfaceJSON + "</code></li></ul>";
		}



		else{
			html = "";
			html += "<span class='size'>Size: " + _prettifyArray(node.size) + "</span>";
			html += "<span class='opacity'>Opacity: " + node.opacity + "</span>";
			html += "<span class='origin'>Origin: " + _prettifyArray(node.origin) + "</span>";
			html += "<span class='modifier'>Modifier: " + _prettifyTansform(node.transform) + "</span>";
			html += "<ul><li>";
			html += _getNodeHTML(node.target)+ "</li>";
			html += "</ul>";
		}

		return _getCSS() + html;
	}


	function _getCSS(){
		return "<style type='text/css'>"+
			"ul.debugger{"+
			"	font-family: 'sans-serif';"+
			"	font-size:16px;"+
			"	color:white;"+
			"	height:" + window.innerWidth + "px;" +
			"	overflow:scroll;"+
			"}"+
			"table{"+
			"	display:inline-block;"+
			"	background-color: rgba(255,255,255,.5);"+
			"	border-radius: 10px;"+
			"	padding: 10px;"+
			"	margin: 10px;"+
			"	font-size: 14px;"+
			"	color: black;"+
			"	border: 1px solid gainsboro;"+
			"}"+

			"ul li{"+
			"	list-style: none;"+
			"	margin-left: 0px;"+
			"	padding-left: 5px;"+
			"}"+

			"li{"+
			"	border: 1px solid silver;"+
			"	border-radius: 10px 0px 0px 10px;"+
			"	padding: 10px 0px 10px 10px;"+
			"	margin: 5px 0px 0px 0px;"+
			"	background-color: rgba(200,200,200,.2);"+
			"	box-shadow: 3px 3px 3px rgba(0,0,0,.5);"+
			"}"+

			".modifier, .origin, .size, .opacity{"+
			"	display:block;"+
			"}"+

			".modifier{"+
			"	font-size: 16px;"+
			"}"+
			".surface{"+
			"	color: blue;"+
			"}"+
			".namedNode{"+
			"	background-color: rgba(0,0,0,.1);"+
			"	border-radius: 10px 0px 0px 10px;"+
			"	width: 100%;"+
			"	display:inline-block;"+
			"	padding:5px;"+
			"}"+

			"table td{"+
			"	width:100px;"+
			"}"+
		"</style>";
	}

	function getEngineControls(){
		var html =  "<ul><li><a>Pause Engine</a>"
	}

	function _prettifyTansform(transformMatrix){
		var transform =  [].concat(transformMatrix);//make a copy
		var html = "<table>";
		for (var i = 0; i < 4; i++) {
			var row = "<tr><td>@0</td><td>@1</td><td>@2</td><td>@3</td></tr>";
			for (var j = 0; j < 4; j++) {
				 row = row.replace("@"+j, Math.round(transform.shift() * 1000)/1000);
			};
			html += row;
		}
		html += "</table>"
		return html;
	}

	function _prettifyArray(array){
		var html = "<code>";
		html += JSON.stringify(array);
		html += "</code>"
		return html;
	}

	module.exports = RenderTreeVisualizer;
});
define(function(require, exports, module) {

	function RenderTreeVisualizer(renderTree){
		this.renderTree = renderTree;
		this.outputTree = "";
	}

	RenderTreeVisualizer.prototype.getTree = function(){
		var html = "<ul>"
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
				html += "<h3>" + node.name + "</h2>";
			}
			html += "<ul>";
			for (var i = 0; i < node.length; i++) {
				html += "<li>" + _getNodeHTML(node[i])+ "</li>";
			};
			html += "</ul>";
		}


		else if (typeof(node.target) == "number"){
			html = "<h1>Modifier: <code>" + JSON.stringify(node.transform) + "</code></h1>";
			html += "<ul><li>";
			html += "<h3>Surface: " + node.target + "</h3></li></ul>";
		}



		else{
			html = "";
			html += "<h1>Modifier: <code>" + JSON.stringify(node.transform) + "</code></h1>";
			html += "<ul><li>";
			html += _getNodeHTML(node.target)+ "</li>";
			html += "</ul>";
		}

		return html;
	}

	module.exports = RenderTreeVisualizer;
});
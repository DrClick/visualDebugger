define(function(require, exports, module) {

	function RenderTreeVisualizer(renderTree){
		this.renderTree = [].concat(renderTree);
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
				html += "<span class='namedNode'>" + node.name + "</span>";
			}
			html += "<ul>";
			for (var i = 0; i < node.length; i++) {
				html += "<li>" + _getNodeHTML(node[i])+ "</li>";
			};
			html += "</ul>";
		}


		else if (typeof(node.target) == "number"){
			html += "<span class='size'>Size: " + _prettifyArray(node.size) + "</span>";
			html += "<span class='opacity'>Opacity: " + node.opacity + "</span>";
			html += "<span class='origin'>Origin: " + _prettifyArray(node.origin) + "</span>";
			html += "<span class='modifier'>Modifier: " + _prettifyTansform(node.transform) + "</span>";
			html += "<ul><li>";
			html += "<span class='surface'>Surface: " + node.target + "</span></li></ul>";
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

		return html;
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
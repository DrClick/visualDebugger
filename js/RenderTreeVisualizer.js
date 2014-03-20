define(function(require, exports, module) {



	function RenderTreeVisualizer(renderTree){
		this.renderTree = [].concat(renderTree);
		this.surfaceCount = 0;
	}

	RenderTreeVisualizer.prototype.getTree = function(){
		var html = "<ul class='debugger'>"
		for (var i = 0; i < this.renderTree.length; i++) {
			html += "<li>" + _getNodeHTML.call(this, this.renderTree[i]) + "</li>";
		}
		html += "</ul>";

		return html;
	}//end function

	RenderTreeVisualizer.prototype.visibleSurfaceCount = function(){
		return this.surfaceCount;
	}

	function _getNodeHTML(node){
		var html = "";

		if(node.name){
			html += "<span class='namedNode'>" + node.name + "</span>";
		}

		if(node.children && node.children.length > 1){
			html += "<ul>";
			for (var i = 0; i < node.children.length; i++) {
				html += "<li>" + _getNodeHTML.call(this, node.children[i])+ "</li>";
			}

			html += "</ul>";
		}


		else if (node.surface){
			this.surfaceCount++;
			node.surface.content = node.surface.content.replace(/</g, "&lt;");
			var surfaceJSON = JSON.stringify(node.surface, null, 4);

			html += "<span class='modifier'>Modifier:</span>"
			html += "<div class='leftCol'>"
			html += _prettifyTransform(node.modifier);
			html += "</div>"
			html += "<div class='rightCol'>"
			html += _prettifyTansformMatrix(node.modifier.transform);
			html += "</div>";
			html += "<ul class='clear'><li>";
			html += "<span class='surface'>Surface: </span>";
			html += "<pre class='prettyprint lang-js'>" + surfaceJSON + "</pre></li></ul>";
		}



		else{
			html += "<span class='modifier'>Modifier:</span>"
			html += "<div class='leftCol'>"
			html += _prettifyTransform(node.modifier);
			html += "</div>"
			html += "<div class='rightCol'>"
			html += _prettifyTansformMatrix(node.modifier.transform);
			html += "</div>";
			html += "<ul class='clear'><li>";
			html += _getNodeHTML.call(this, node.children[0])+ "</li>";
			html += "</ul>";
		}

		return html;
	}//end function

	function _prettifyTransform(transform){
		var html = "<label class='size'>Size: </label>" + _prettifyArray(transform.size) + "<br/>";
		html += "<label class='opacity'>Opacity:  </label><code>" + transform.opacity + "</code>"+ "<br/>";
		html += "<label class='origin'>Origin:  </label>" + _prettifyArray(transform.origin)+ "<br/>";
		html += "<label class='position'>Position:  </label>" + _prettifyArray(transform.position)+ "<br/>";
		html += "<label class='rotation'>Rotation:  </label>" + _prettifyArray(transform.rotation)+ "<br/>";
		html += "<label class='rotation'>Skew:  </label>" + _prettifyArray(transform.skew)+ "<br/>";
		return html;
	}

	function _prettifyTansformMatrix(transformMatrix){
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
		var a = [].concat(array);
		a = a.map(function(val){return Math.round(val * 1000)/1000});

		var html = "<code>";
		html += JSON.stringify(a);
		html += "</code>"
		return html;
	}

	module.exports = RenderTreeVisualizer;
});
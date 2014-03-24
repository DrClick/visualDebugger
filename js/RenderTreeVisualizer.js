define(function(require, exports, module) {



	function RenderTreeVisualizer(renderTree){
		this.renderTree = [].concat(renderTree);
		this.surfaceCount = 0;
	}

	RenderTreeVisualizer.prototype.getTree = function(){
		var html = "<ul class='debugger'>"
		modifierIdCounter = 0;
		for (var i = 0; i < this.renderTree.length; i++) {
			html += "<li>" + _getNodeHTML.call(this, this.renderTree[i], undefined, 0) + "</li>";
		}
		html += "</ul>";

		return html;
	}//end function

	RenderTreeVisualizer.prototype.visibleSurfaceCount = function(){
		return this.surfaceCount;
	}



	function _getNodeHTML(node, parentModifierId, modifierIdCounter){
		var html = "";
		var modifierId = undefined;


		if(node.name){
			html += "<span class='namedNode'>" + node.name + "</span>";
		}

		//display the modifier if there is one
		if(node.modifier) {
			modifierId = "node_" + modifierIdCounter;
			modifierIdCounter++;
			html += _getModifierHTML(modifierId, parentModifierId, node.modifier)
		}//end if modifier
		else{
			modifierId = parentModifierId;
		}
		


		if(node.children && node.children.length > 1){
			html += "<ul>";
			for (var i = 0; i < node.children.length; i++) {
				html += "<li>" + _getNodeHTML.call(this, node.children[i], modifierId, modifierIdCounter)+ "</li>";
			}

			html += "</ul>";
		}

		//this could be a render node with only 1 child
		if(node.children && node.children.length == 1 && node.children[0]){
			html += "<div class='clear singleItem'>";
			html += _getNodeHTML.call(this, node.children[0], modifierId, modifierIdCounter);
			html += "</div>";
		}

		//show the surface if it is one
		if (node.surface){
			this.surfaceCount++;
			node.surface.content = node.surface.content.replace(/</g, "&lt;");
			var surfaceJSON = JSON.stringify(node.surface, null, 4);

			html += "<div class='clear'></div>";
			html += "<span class='surface' id='surface_" + node.surface.id + "'>Surface: ";
			if(!node.modifier && parentModifierId){html += _getParentModifierLink(parentModifierId)};
			html += "</span>";
			html += "<pre class='prettyprint lang-js'>" + surfaceJSON + "</pre>";
		}

		return html;
	}//end function

	function _getModifierHTML(modifierId, parentModifierId, modifier){
		var html = "";
		html += "<span class='modifier'>Modifier: <a id='" + modifierId + "'></a>";
		html += _getParentModifierLink(parentModifierId);
		html += "</span>";
		html += "<div class='leftCol'>";
		
		html += _prettifyTransform(modifier);
		html += "</div>";
		html += "<div class='rightCol'>";
		html += _prettifyTansformMatrix(modifier.transform);
		html += "</div>";

		return html;
	}

	function _getParentModifierLink(parentModifierId){
		var html = "";
		if(parentModifierId){
			html += "<a id='parent_@parentId' class='parent' href='#@parentId'>&uarr;</a>"
				.replace(/@parentId/g, parentModifierId);
		}
		return html;
	}


	function _prettifyTransform(transform){
		var html = "<div class='transform'><label class='size'>Size: </label>" + _prettifyArray(transform.size) + "<br/>";
		html += "<label class='opacity'>Opacity:  </label><code>" + transform.opacity + "</code>"+ "<br/>";
		html += "<label class='origin'>Origin:  </label>" + _prettifyArray(transform.origin)+ "<br/>";
		html += "<label class='position'>Position:  </label>" + _prettifyArray(transform.position)+ "<br/>";
		html += "<label class='rotation'>Rotation:  </label>" + _prettifyArray(transform.rotation)+ "<br/>";
		html += "<label class='rotation'>Skew:  </label>" + _prettifyArray(transform.skew)+ "</div>";
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
		if(!array) {return ""}
			
		var a = [].concat(array);
		a = a.map(function(val){return Math.round(val * 1000)/1000});

		var html = "<code>";
		html += JSON.stringify(a);
		html += "</code>"
		return html;
	}

	module.exports = RenderTreeVisualizer;
});
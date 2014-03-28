define(function(require, exports, module) {
    var ChromeExtensions        = require("famous/debug/ChromeExtensions");
    var RenderTreeVisualizer    = require("famous/debug/RenderTreeVisualizer");
    var EventGraphVisualizer    = require("famous/debug/EventGraphVisualizer");
    var fDom                    = require("famous/debug/famousDom");


    var chrome = chrome || require("famous/debug/ChromeMock");

    //state
    var _lastSelectedSurface = null;
    var _currentView = "renderTree";


    // Create a connection to the background page
    var backgroundPageConnection = chrome.runtime.connect({
        name: "devtools-page"
    });



    function _handleMessagesFromInspectedPage(msg){
        if(msg["debug.updateRenderTree"]){
            _loadRenderTree(JSON.parse(msg["debug.updateRenderTree"]));
        }
        if(msg["debug.FPS"]){
            _updateFPS(msg["debug.FPS"]);
        }
        if(msg["selectedElement"]){
             _updateSelectedElement(msg["selectedElement"]);
        }
        if(msg["request.modifier"]){
            _bindInterctiveModifier(msg["request.modifier"]);
        }
        if(msg["debug.eventGraph"]){
            _generateEventGraph(JSON.parse(msg["debug.eventGraph"]));
        }
        if(msg["debug.event"]){
            _showEventInGraph(JSON.parse(msg["debug.event"]));
        }
    }//end function



 function getCurrentFamousRenderTree(){
        //execute a function in the context of the inspected page
        ChromeExtensions.eval(inspectedWindow_getPanelContents, null, 
        function(data){ 
            _loadRenderTree(data.renderTree);
        }.bind(this));
  }

  function resumeEngineExecution(){
        //execute a function in the context of the inspected page
      ChromeExtensions.eval(inspectedWindow_resumeEngine);
  }

  function stepEngineExecution(stepSize){
        //execute a function in the context of the inspected page
      ChromeExtensions.eval(
       inspectedWindow_stepEngine, 
       {stepSize: stepSize}, 
       function(data){ 
        loadHTMLIntoPanel(data);
    }.bind(this)
    );
  }

    //NOTE: This section of scripts executes in the context of the page being dubugged
    //so window is the pages window not the debuggers window
    var inspectedWindow_getPanelContents = function(){
        window.FamousDebugger.Engine.pause();
        return window.FamousDebugger;
 }

 var inspectedWindow_pauseEngine = function(){
  window.FamousDebugger.Engine.pause();
  return window.FamousDebugger;
}

var inspectedWindow_resumeEngine = function(){
  window.FamousDebugger.Engine.resume();
  return window.FamousDebugger;
}

var inspectedWindow_stepEngine = function(windows, args){
  window.FamousDebugger.Engine.pause();
  window.FamousDebugger.Engine.debugStep(args.stepSize);

  return window.FamousDebugger;
}


    //Note: this call back executes in the devTool Panel context
    function _loadRenderTree(renderTree){
        if(_currentView != "renderTree") return;


        var rtv = new RenderTreeVisualizer(renderTree);
        var treeHTML = rtv.getTree();

        document.getElementById("visibleSurfaceCounter").innerHTML 
        = "<label>Surfaces: </label><b>" + rtv.visibleSurfaceCount() + "</b>";

        document.getElementById("panelContainer").innerHTML = treeHTML;

        _handlePageInteraction();

    }


    function _updateFPS(fps){
        document.getElementById("engine_fps").innerHTML = fps;
    }




    function _updateSelectedElement(surfaceId){
        var selectedElement = document.getElementById("surface_" + surfaceId);
        
        if(_lastSelectedSurface != surfaceId){
            _lastSelectedSurface = surfaceId;

            var surfacePos = fDom.findPos(selectedElement);

            //set the classes
            fDom.forEach(fDom(".selected"), function(el){
                el.classList.remove("selected");
            })

            fDom.animateScrollTo(surfacePos -300);
            //window.scroll(0,surfacePos -300)//not all the way to the top;
        }


        selectedElement.parentNode.classList.add("selected");
    }

    




    function _handlePageInteraction(){

        //wire up modifier navigation
        fDom.forEach(fDom(".parent"), function(el){

            el.onmouseover = function(){
              var targetNode = el.getAttribute("href").replace("#","");
              document.getElementById(targetNode).parentNode.parentNode.classList.add("highlight");
            };

            el.onmouseout = function(){
              var targetNode = el.getAttribute("href").replace("#","");
              document.getElementById(targetNode).parentNode.parentNode.classList.remove("highlight");
            };

            el.onclick = function(event){
                event.preventDefault();
                var targetId = this.hash.slice(1);
                var target = document.getElementById(targetId);

                //highlight the inspected modifier
                fDom.forEach(fDom(".inspected"), function(el){
                    el.classList.remove("inspected");
                });

                target.parentNode.parentNode.classList.add("inspected");

                //remove other back links
                fDom.remove(".back");

                //add a back link
                var backLink = fDom.createFragment("<a href='#parent_" + targetId + "' class='back'>&darr;</a>")[0];
                target.parentNode.appendChild(backLink);

                //handle backlink animation back
                backLink.onclick = function(event){
                  event.preventDefault();
                  fDom.remove(".back");
                  fDom.animateScrollTo(fDom.findPos(el) -200 );
                };

                //scroll to the link
                var targetPos = fDom.findPos(target);
                fDom.animateScrollTo(targetPos -200 );
                
            }.bind(el);
        });

        //wire up inspection link
        fDom.forEach(fDom(".surface"), function(el){

            //handle backlink animation back
            el.onclick = function(event){
                var id = this.id.replace("surface_", "");
                _insepectSurfaceInDom(id);
            }.bind(el);        
        });


        //wire up the interactiveInspector
        fDom.forEach(fDom(".modifier"), function(el){

            //handle backlink animation back
            el.children[0].onclick = function(event){
                var id = this.parentNode.id.replace("modifier_", "");
                var modifier = document.querySelector(".interactiveModifier");

                resetInteractiveModifier();

                //load the data in
                requestModifier(id);

            }.bind(el.children[0]);        
        });

        //wire up the hide button
        document.querySelector(".interactiveModifier .close").addEventListener("click", function(event){
          var modifier = document.querySelector(".interactiveModifier");
          modifier.dataset["modifierId"] = null;
          modifier.style.display = "none";
        });


        //TODO: Read in the values from the exisiting modifier, 
        //fire change event an value change
        fDom.forEach(fDom(".interactiveModifier input[type='number']"), function(num){
           num.onchange = _modifierChanged.bind(num);  
        });


    }//end function


    function _modifierChanged(){
        //NOTE: the number element needs to be bound to this function

        var modifier = document.querySelector(".interactiveModifier");
        var modId = modifier.dataset["modifierId"];

        if(!modId) return;

        
        var inputs = this.parentElement.querySelectorAll("input[type='number']")
        var values = [].map.call(inputs, function(i){return i.value});
        var type = this.parentNode.parentNode.dataset["type"];

        //console.log(modId, type, values);


        //send the edit data back to the inspected page to update
        ChromeExtensions.eval(function(windows, args){
                return window.FamousDebugger.Modifiers.editModifier(args);
            }, {id: modId, type: type, values: values});


    }



    function resetInteractiveModifier(){
      var inputs = fDom(".interactiveModifier input[type='number']");
      fDom.forEach(inputs, function(i){
        i.value = "";
      });
    }

    function requestModifier(id){
        ChromeExtensions.eval(function(windows, args){
                return window.FamousDebugger.Modifiers.getModifier(args["id"]);
            }, {id:id}, 
            function(data){ 
                _bindInterctiveModifier(data);
        }.bind(this));
    }

    function _bindInterctiveModifier(modifier){

      //the the modifier id, note the order of operations is important
      //because of the onchange handler
      var interactiveMod = document.querySelector(".interactiveModifier");
      interactiveMod.dataset["modifierId"] = modifier.id;
      interactiveMod.style.display = "block";
      
      bindData("[data-type='opacity']", [modifier.opacity] );
      bindData("[data-type='size']", modifier.size );
      bindData("[data-type='origin']", modifier.origin );
      bindData("[data-type='position']", modifier.translate );
      bindData("[data-type='rotation']", modifier.rotate );
      bindData("[data-type='scale']", modifier.scale );
      bindData("[data-type='skew']", modifier.skew );

    }


    function bindData(selector, values){
      if(!values) return;

      var interactiveMod = document.querySelector(".interactiveModifier");

      [].forEach.call(interactiveMod.querySelector(selector).querySelectorAll("input"), function(item, index){
        item.value = values[index];
      });

    }



    function _insepectSurfaceInDom(id){
        var cmd = "inspect(document.querySelector(\"[data-id='" + id + "']\"))";
        chrome.devtools.inspectedWindow.eval(
            cmd,
            { useContentScriptContext: true });
    }



    function _generateEventGraph(graph){
        this.egv = new EventGraphVisualizer(graph, {container: "#graphContainer"});
        egv.render();
    }

    function _showEventInGraph(eventStack){
        this.egv.replayEventStack(eventStack);
    }

    

    function _displayViewPane(){
        if(_currentView == "renderTree"){
            _currentView = "eventGraph";

            document.getElementById("graphContainer").style.display = "block"

            //hide the render tree
            document.getElementById("panelContainer").style.display = "none";
            
            _showEngineControl("eventGraph");
        }
        else if(_currentView == "eventGraph"){
            _currentView = "renderTree";

            _showEngineControl("renderTree");

            document.getElementById("graphContainer").style.display = "none"
            document.getElementById("panelContainer").style.display = "block"

        }
    }


    function _showEngineControl(type){
        fDom.forEach(fDom(".engineControls button"), function(button){
                button.style.display = "none";
        });

        fDom.forEach(fDom(".engineControls ." + type), function(button){
            button.style.display = "inline-block";
        });
    }




    //initizlie the page
    backgroundPageConnection.postMessage({
        name: 'init',
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    
    backgroundPageConnection.onMessage.addListener(function(msg) {
       _handleMessagesFromInspectedPage.call(this,msg);
    });




    //display the correct view
    _currentView = "eventGraph"
    _displayViewPane();


    //execute a function in the context of the inspected page
    ChromeExtensions.eval(function(){
        return window.FamousDebugger;
    }, null, 
    function(data){
        alert("here1");
        _loadRenderTree(data.renderTree);
        alert("here2");
        _generateEventGraph(data.Events.eventGraph);
        alert("here3");
    }.bind(this));


    //wire up the hamburger
    fDom(".hamburger")[0].addEventListener("click", _displayViewPane);

    document.getElementById("engineControls_reload").onclick = getCurrentFamousRenderTree;
    document.getElementById("engineControls_resume").onclick = resumeEngineExecution;
    document.getElementById("engineControls_step").onclick = function(){
        var stepSize = 1;
        if(stepSize == "") {stepSize = 1;}
        stepEngineExecution(stepSize);
    }

    //poll for a new selected element (this could be hacky)
    setInterval(function(){
        chrome.devtools.inspectedWindow.eval(
            "setSelectedElement($0)",
            { useContentScriptContext: true });
    },100)




    module.exports = {};
});
define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Clock = require("famous/utilities/Clock");

        var TestView = require("app/views/TestView");
        var RenderTreeVisualizer = require("app/RenderTreeVisualizer");


        var mainContext = Engine.createContext({debug:true});


        var isPaused = false;
        var isLoggedRenderTree = false;

        //slow things down
        Clock.setClockSpeed(1);


        mainContext.on("debug.renderTree", function(renderTree){
                //Here we can monitor the render tree
                //debugger
                if(!isLoggedRenderTree){
                        isLoggedRenderTree = true;
                        var renderTreeVisualizer = new RenderTreeVisualizer(renderTree);
                        var renderTreeHTML = renderTreeVisualizer.getTree();

                        var sideBar = document.createElement("div");
                        sideBar.style.position = "absolute";
                        sideBar.style.zPos = 1000;
                        sideBar.style.width = "40%";
                        sideBar.style.height = window.innerHeight;
                        sideBar.style.boxShadow = "3px 3px 3px rgba(0,0,0,.3)";
                        sideBar.style.backgroundColor = "rgba(0,0,0,.5)";
                        sideBar.style.overflow = "scroll";

                        sideBar.innerHTML = renderTreeHTML;
                        document.getElementsByTagName("body")[0].appendChild(sideBar); 

                }
                
        });


        var modifier = new Modifier({
        	origin:[.5,.5],
        	transform: Transform.rotate(.6,.2,.2)
        });


        var testView = new TestView();

        
        mainContext.setPerspective(3000);
        mainContext.add(modifier).add(testView);
        


        //animate the entire scene
        modifier.setTransform(Transform.rotate(0,0,0), {duration: 3000});



        Engine.on("click", function(){
                isPaused = !isPaused;
                if(!isPaused) {Engine.unpause()}
                else {Engine.pause()}

                
        });

        window.Famous = mainContext;
});

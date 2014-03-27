define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Clock = require("famous/utilities/Clock");

        

        //required for debugging
        require("famous/debug/Debugger");


        var ExampleView = require("app/views/ExampleView3");


        var mainContext = Engine.createContext({debug:true});
        mainContext.setPerspective(3000);
        FamousDebugger.registerContext(mainContext);

        var modifier = new Modifier({
        	origin:[.5,.5]
        });

        var view = new ExampleView();
        mainContext.add(modifier).add(view);

        
});

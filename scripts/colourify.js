;(function(undefined) {
    'use strict';

    var Colourify = function() {
        console.log( "Colourify runnin'" )
    };

	Colourify.prototype.version = "v1.00";

	//default stuff
	Colourify.prototype.merge_options = function(a, b) {
        var m = {};
        for (var attrname in a) m[attrname] = a[attrname];
        for (attrname in b) m[attrname] = b[attrname];
        return m;
    };
	
	Colourify.prototype.defaults = {n: 2
					};
	
	Colourify.prototype.options = function( opt ){
		if( opt !== undefined ){
			this.options = this.merge_options(this.defaults, opt);
			console.log( opt );
			}
		else {	this.options = this.defaults; console.log( 'options not defined') }

	}

	Colourify.prototype.func = function(x, y){
		return x + y
	}
	Colourify.prototype.setup = function(){
		this.n = this.options.n
		this.dimensions = 100 / this.n + "%"
		this.step = 255/(this.n - 1);		
	}
	
	//build grid
	Colourify.prototype.tabler = function(x,y){ //why do i need x,y?
		for (y = 0; y < this.options.n; y++) { 
			for (x = 0; x < this.options.n; x++) {
			console.log("(" + x +","+ y + ")");
			this.tiler( x, y )
			}
		}
	}
	
	//build colour block
	Colourify.prototype.tiler = function( x , y ){
		var div = document.createElement("div");
		var node = document.createTextNode(this.color_finder.r(x,y));
		div.className = "tile";
		div.style.width =  this.dimensions;
		div.style.height = this.dimensions;
		div.appendChild(node); //optionally adds text
		
		var element = document.getElementById("container");
		element.appendChild(div);
	}
	
	Colourify.prototype.color_finder = {
		r: function(g, b){
			var value = "(" + g +","+ b + "," g + b + ")";
			return this.value;
		},
		g: function(r, b){
			return "green";
		},
		b: function(r, g){
			return "blue";
		}
	}
	
	Colourify.prototype.build = function(){
		this.setup();
		this.tabler();
	}
	
	
	// Attach to window
    if (this.Colourify)
        throw 'noob';

    this.Colourify = Colourify;
	
}).call(this);


;(function(undefined) {
    'use strict';

    var Colourify = function() {

    };

	//default stuff
	Colourify.prototype.merge_options = function(a, b) {
        var m = {};
        for (var attrname in a) m[attrname] = a[attrname];
        for (attrname in b) m[attrname] = b[attrname];
        return m;
    };
	
	Colourify.prototype.defaults = {
		n: 4,
		f: 0,
		color: "r"
	};
	
	Colourify.prototype.option = function( opt ){
		this.options = this.merge_options(this.defaults, opt);
	}
	
	//makes useful variables available.
	//i have no idea if this is a bad way to do this
	Colourify.prototype.setup = function( f ){
		this.n = this.options.n 
		this.dimensions = 100 / this.n + "%"
		this.step = 255/(this.n - 1);
		this.f = f;
		this.color = this.options.color;
	}
	
		
	//build grid
	Colourify.prototype.tabler = function(x,y){ //why do i need x,y?
		for (y = 0; y < this.n; y++) { 
			for (x = 0; x < this.n; x++) {
			//console.log("(" + x +","+ y + ")");
			this.tiler( Math.round(x * this.step), Math.round(y * this.step))
			}
		}
	}
	
	//build colour block
	Colourify.prototype.tiler = function( x , y){
		var div = document.createElement("div");
		var c = this.color;
		var color_finder = this.color_finder
		var f = this.f
		
		var color = function( ){
			if( c == "r"){return color_finder.r(x,y, f);}
			else if( c == "g"){return color_finder.g(x,y,f);}
			else if( c == "b"){return color_finder.b(x,y, f);}
		}
			
		var node = document.createTextNode( color() );
			div.className = "tile";
		div.style.background = color();
		div.style.width =  this.dimensions;
		div.style.height = this.dimensions;
		//div.appendChild(node); //optionally adds text
		
		var element = document.getElementById("container");
		element.appendChild(div);
	}
	
	Colourify.prototype.color_finder = {
		r: function(g, b, f){
			var r = Math.round(Math.max(Math.min(
						eval( f )  
					,255),0));
			return "rgb(" + r +","+ g +","+ b + ")"
		},
		g: function(r, b, f){
			var g = Math.round(Math.max(Math.min(
						eval( f )  
					,255),0));
			return "rgb(" + r +","+ g +","+ b + ")";
		},
		b: function(r, g, f){
			var b = Math.round(Math.max(Math.min(
						eval( f )  
					,255),0));
			return "rgb(" + r +","+ g +","+ b + ")";
		}
	}
	
	Colourify.prototype.clear = function(){
		var node = document.getElementById("container")
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
	
	Colourify.prototype.build = function( opt ){ 
		
		this.option( opt );
		this.clear();
		this.setup( opt.f );
		this.tabler();
	}
	
	
	// Attach to window
    if (this.Colourify)
        throw 'noob';

    this.Colourify = Colourify;
	
}).call(this);


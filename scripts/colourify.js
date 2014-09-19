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
	
	Colourify.prototype.defaults = {n: 2
					};
	
	Colourify.prototype.options = function( opt ){
		if( opt !== undefined ){
			this.options = this.merge_options(this.defaults, opt);
			console.log( opt );
			}
		else {	this.options = this.defaults; console.log( 'options not defined') }

	}

	var func = function(x, y, f_in){ // why can't i get this to work outside of this. how do I use f_in?
		return Math.round(Math.max(Math.min(
			0.5*(x+y) //how do i take this from the other place???
		, 255),0));
	}
	
	// I want to replace the above function with this. I don't know how to convert the string 'f' 
	// to an expression which I can evaluate
	// I also can't figure out how to run f_in (from color_finder.r() ) for some reason.
	Colourify.prototype.f_in = function( f ){ 
		console.log( f ); 
	}
	
	//makes useful variables available.
	//i have no idea if this is a bad way to do this
	Colourify.prototype.setup = function(){
		this.n = this.options.n
		this.dimensions = 100 / this.n + "%"
		this.step = 255/(this.n - 1);		
	}
	
	//build grid
	Colourify.prototype.tabler = function(x,y){ //why do i need x,y?
		for (y = 0; y < this.options.n; y++) { 
			for (x = 0; x < this.options.n; x++) {
			//console.log("(" + x +","+ y + ")");
			this.tiler( Math.round(x * this.step), Math.round(y * this.step) )
			}
		}
	}
	
	//build colour block
	Colourify.prototype.tiler = function( x , y ){
		var div = document.createElement("div");
		var color = this.color_finder.r(x,y) //need this to be more easily selectable. we can use conditionals based of a value in setup
		var node = document.createTextNode(color);
		div.className = "tile";
		div.style.background = color;
		div.style.width =  this.dimensions;
		div.style.height = this.dimensions;
		div.appendChild(node); //optionally adds text
		
		var element = document.getElementById("container");
		element.appendChild(div);
	}
	
	Colourify.prototype.color_finder = {
		r: function(g, b){
			var r = func(g, b);
			return "rgb(" + r +","+ g +","+ b + ")"
		},
		g: function(r, b){
			var g = func(r, b);
			return "rgb(" + r +","+ g +","+ b + ")";
		},
		b: function(r, g){
			var b = func(r, g);
			return "rgb(" + r +","+ g +","+ b + ")";
		}
	}
	
	Colourify.prototype.build = function( f ){
		this.f_in( f );
		this.setup();
		this.tabler();
	}
	
	
	// Attach to window
    if (this.Colourify)
        throw 'noob';

    this.Colourify = Colourify;
	
}).call(this);


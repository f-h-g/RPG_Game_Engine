/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};


window.onload = function(){
    app.main.myKeys = app.myKeys;
    app.main.draw = app.draw;
    app.main.items = app.items;
    app.main.world = app.world;
    app.main.dialogue = app.dialogue;
    app.main.magic = app.magic;
    app.main.animation = app.animation;
	app.main.init();
}
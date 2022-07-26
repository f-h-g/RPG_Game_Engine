// All of these functions are in the global scope
		
"use strict";

// returns mouse position in local coordinate system of element
function getMouse(e){
	var mouse = {} // make an object
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
}

function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}


function makeColor(red, green, blue, alpha){
	var color='rgba('+red+','+green+','+blue+', '+alpha+')';
	return color;
}

// Function Name: getRandomColor()
// returns a random color of alpha 1.0
// http://paulirish.com/2009/random-hex-color-code-snippets/
function getRandomColor(){
	var red = Math.round(Math.random()*200+55);
	var green = Math.round(Math.random()*200+55);
	var blue=Math.round(Math.random()*200+55);
	var color='rgb('+red+','+green+','+blue+')';
	// OR	if you want to change alpha
	// var color='rgba('+red+','+green+','+blue+',0.50)'; // 0.50
	return color;
}

function getRandomUnitVector(){
	var x = getRandom(-1,1);
	var y = getRandom(-1,1);
	var length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else{
		x /= length;
		y /= length;
	}
	
	return {x:x, y:y};
}

function simplePreload(imageArray){
	// loads images all at once
	for (var i = 0; i < imageArray.length; i++) {
		var img = new Image();
		img.src = imageArray[i];
	}
}


function loadImagesWithCallback(sources, callback) {
	var imageObjects = [];
	var numImages = sources.length;
	var numLoadedImages = 0;
	
	for (var i = 0; i < numImages; i++) {
	  imageObjects[i] = new Image();
	  imageObjects[i].onload = function() {
	  	numLoadedImages++;
	  	console.log("loaded image at '" + this.src + "'")
		if(numLoadedImages >= numImages) {
		  callback(imageObjects); // send the images back
		}
	  };
	  
	  imageObjects[i].src = sources[i];
	}
  }


/*
Function Name: clamp(val, min, max)
Author: Web - various sources
Return Value: the constrained value
Description: returns a value that is
constrained between min and max (inclusive) 
*/
function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}


 // FULL SCREEN MODE
function requestFullscreen(element) {
	if (element.requestFullscreen) {
	  element.requestFullscreen();
	} else if (element.mozRequestFullscreen) {
	  element.mozRequestFullscreen();
	} else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
	  element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
	  element.webkitRequestFullscreen();
	}
	// .. and do nothing if the method is not supported
};


// This gives Array a randomElement() method
Array.prototype.randomElement = function(){
	return this[Math.floor(Math.random() * this.length)];
}

function pointInsideCircle(x,y,I){ // I stands for "Instance"
    var dx = x - I.x;
    var dy = y - I.y;
    return dx * dx + dy * dy <= I.radius * I.radius;
}

function circlesIntersect(c1,c2){
    var dx = c2.x - c1.x;
    var dy = c2.y - c1.y;
    var distance = Math.sqrt(dx*dx+dy*dy);
    return distance < c1.radius + c2.radius;
}

function rectangleContainsPoint(rect, point){
    // example
    // rect = {x:0,y:0,width:10,height:10}
    // point = {x:5,y:5}
    // would return true
    if(rect.width <= 0 || rect.height <= 0){
        return false;
    }
    return (point.x >= rect.x && point.x <= rect.x + rect.width &&
           point.y >= rect.y && point.y <= rect.y + rect.height);
}

function rectanglesIntersect(rect1, rect2){ 
    if(rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y){
        if(rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x){
            return true;
        }
    }
    return false;
}

function rectCircleColliding(rect,circle){
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

function playerRectangleCollision(circle, rect, keys){
	var top, bottom, left, right = false;
	//top
	if(keys.keydown[keys.KEYBOARD.KEY_DOWN] && rectanglesIntersect(
		{x: rect.x, y: rect.y, width: rect.width, height: rect.height / 512}, 
		{x: circle.x - circle.radius, y: circle.y - circle.radius, width: circle.radius * 2, height: circle.radius * 2}
	)){
		top = true;
	}
	//bottom
	if(keys.keydown[keys.KEYBOARD.KEY_UP] && rectanglesIntersect(
		{x: rect.x, y: rect.y + rect.height / 512 * 511, width: rect.width, height: rect.height / 512}, 
		{x: circle.x - circle.radius, y: circle.y - circle.radius, width: circle.radius * 2, height: circle.radius * 2}
	)){
		bottom = true;
	}
	//left
	if(keys.keydown[keys.KEYBOARD.KEY_RIGHT] && rectanglesIntersect(
		{x: rect.x, y: rect.y, width: rect.width / 512, height: rect.height}, 
		{x: circle.x - circle.radius, y: circle.y - circle.radius, width: circle.radius * 2, height: circle.radius * 2}
	)){
		left = true;
	}
	//right
	if(keys.keydown[keys.KEYBOARD.KEY_LEFT] && rectanglesIntersect(
		{x: rect.x + rect.width / 512 * 511, y: rect.y, width: rect.width / 512, height: rect.height}, 
		{x: circle.x - circle.radius, y: circle.y - circle.radius, width: circle.radius * 2, height: circle.radius * 2}
	)){
		right = true;
	}

	if(top){
		circle.y = rect.y - circle.radius;
	} 
	else if(bottom){
		circle.y = rect.y + rect.height + circle.radius;
	} 
	else if(left){
		circle.x = rect.x - circle.radius;
	} 
	else if(right){
		circle.x = rect.x + rect.width + circle.radius;
	}

	return circle;
}

function findNextSpace(text){
	for(var i = 80; i > 0; i--){
		if(text[i] == ' ') return i;
	}
	return -1;
}

function containsObj(arr, obj){
	for(var i = 0; i < arr.length; i++){
		var o = arr[i];
		if(o.x == obj.x && o.y == obj.y && o.item.name == obj.item.name) return true;
	}
	return false;
}

function deg2Rad(angle, offset){
	return angle * Math.PI / 180 + offset;
}

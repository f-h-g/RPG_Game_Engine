// The myKeys object will be in the global scope - it makes this script 
// really easy to reuse between projects

"use strict";

var app = app || {};

// start IIFE
app.myKeys = function(){
    var myKeys = {};

    myKeys.KEYBOARD = Object.freeze({
        "KEY_LEFT": 'KeyA',   
        "KEY_UP": 'KeyW',      
        "KEY_RIGHT": 'KeyD', 
        "KEY_DOWN": 'KeyS',   
        "KEY_SPACE": 'Space',  
        "KEY_SHIFT": 'ShiftLeft', 
		"KEY_INTERACT": 'KeyE', // interact
		"KEY_INVENTORY": 'KeyR', 
		"KEY_AUDIO_UNUSED": 'KeyO',
        "KEY_ONE": 'Digit1',
        "KEY_TWO": 'Digit2',
        "KEY_THREE": 'Digit3',
        "KEY_FOUR": 'Digit4',
        "KEY_FIVE": 'Digit5'
    });

    // myKeys.keydown array to keep track of which keys are down
    // this is called a "key daemon"
    // main.js will "poll" this array every frame
    // this works because JS has "sparse arrays" - not every language does
    myKeys.keydown = [];


    // event listeners
    window.addEventListener("keydown",function(e){
        myKeys.keydown[e.code] = true;
    });

    window.addEventListener("keyup",function(e){
        myKeys.keydown[e.code] = false;

        // pausing and resuming
        var char = String.fromCharCode(e.code);
        // if (char == "p" || char == "P"){
        //     if (app.main.paused){
        //         app.main.resumeGame();
        //     } else {
        //         app.main.pauseGame();
        //     }
        // }
    });
	
	window.addEventListener("keypress",function(e){
        if(app.main.gameState == app.main.GAME_STATE.INVENTORY){
            if(e.code == myKeys.KEYBOARD.KEY_SPACE){
                app.main.checkInventoryPress();
            }
            if(e.code == myKeys.KEYBOARD.KEY_UP || e.code == myKeys.KEYBOARD.KEY_DOWN || 
                e.code == myKeys.KEYBOARD.KEY_LEFT || e.code == myKeys.KEYBOARD.KEY_RIGHT){
                    app.main.inventoryMove(app.main.MENU_GRID.MENU_ROWS, app.main.MENU_GRID.MENU_COLS);
            }
            
        }
        else if(app.main.gameState == app.main.GAME_STATE.SHOP){
            if(e.code == myKeys.KEYBOARD.KEY_SPACE){
                app.main.checkShopPress();
            }
            if(e.code == myKeys.KEYBOARD.KEY_UP || e.code == myKeys.KEYBOARD.KEY_DOWN || 
                e.code == myKeys.KEYBOARD.KEY_LEFT || e.code == myKeys.KEYBOARD.KEY_RIGHT){
                    app.main.inventoryMove(app.main.MENU_GRID.SHOP_ROWS, app.main.MENU_GRID.SHOP_COLS);
            }
        }
        else if(app.main.gameState == app.main.GAME_STATE.GAME){
            if(e.code == myKeys.KEYBOARD.KEY_INVENTORY || e.code == myKeys.KEYBOARD.KEY_INTERACT){
                app.main.checkGamePress();
            }
            if(e.code == myKeys.KEYBOARD.KEY_SPACE){
                app.main.checkDialoguePress();
            }
            if(e.code == myKeys.KEYBOARD.KEY_AUDIO_UNUSED){
                app.main.saveGame();
            }
        }
        else if(app.main.gameState == app.main.GAME_STATE.COMBAT){
            if(e.code == myKeys.KEYBOARD.KEY_SPACE){
                app.main.checkCombatPress();
            }
        }
	});
    return myKeys;
}() // end IIFE
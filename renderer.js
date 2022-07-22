"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// window.onload = function() {
	//var canvas = document.getElementById('canvas');
	// console.log("loaded");
	// canvas.addEventListener('mousemove', e => {
	// 	app.main.checkButtonsHovered(e);
	// });

	// canvas.addEventListener('mousedown', e => {
	// 	app.main.checkButtonsClicked(e);
	// });
// };

app.main = {
	paused: false,
	animationID: 0,
	game: Object.freeze({
		WIDTH: 1100,
		HEIGHT: 800,
		BACKGROUND_COLOR: 'white',
		OUTLINE_COLOR: 'black'
	}),
	canvas: undefined,
	ctx: undefined,
	lastTime: 0, // used by calculateDeltaTime()
	GAME_STATE: Object.freeze({
		MENU: 0,
		GAME: 1,
		PAUSE: 2,
		INVENTORY: 3,
		COMBAT: 4,
		SHOP: 5
	}),
	gameState: undefined,

	saveData: {
		currGameRow: undefined,
		currGameCol: undefined,
		world: undefined,
		playerStats: undefined,
	},

	currGameRow: 0,
	currGameCol: 0,

	inventoryTab: 'consumables',
	selected: 0,
	// BACK< [c w a m j v
	//       [0 1 2 3 4 5
	// [   ] [6 7 8 9 10 11
	// [   ] [12 13 14 15 16 17
	// [   ] [18 19 20 21 22 23
	// ITEM^ [24 25 26 27 28 29
	MENU_GRID: Object.freeze({
		MENU_ROWS: [
			['b','c','w','a','m','j','v'],
			['helm','body','legs',0,1,2,3,4,5],
			['gloves','boots','magic1',6,7,8,9,10,11],
			['weapon','shield','magic2',12,13,14,15,16,17],
			['magic1',18,19,20,21,22,23],
			['magic2',24,25,26,27,28,29]
		],
		MENU_COLS: [
			['b','helm','gloves','weapon'],
			['b','body','boots','shield'],
			['b','legs','magic1','magic2'],
			['c',0,6,12,18,24],
			['w',1,7,13,19,25],
			['a',2,8,14,20,26],
			['m',3,9,15,21,27],
			['j',4,10,16,22,28],
			['v',5,11,17,23,29]
		],
		SHOP_ROWS: [
			['b','s','c','w','a','m','j','v'],
			['b',0,1,2,3,4,5],
			['b',6,7,8,9,10,11],
			['b',12,13,14,15,16,17],
			['b',18,19,20,21,22,23],
			['b',24,25,26,27,28,29]
		],
		SHOP_COLS: [
			['b','s'],
			['c',0,6,12,18,24],
			['w',1,7,13,19,25],
			['a',2,8,14,20,26],
			['m',3,9,15,21,27],
			['j',4,10,16,22,28],
			['v',5,11,17,23,29]
		],
		MENU_SIZE: {
			x: 50,
			y: 50,
			itemOffset: 450,
			width: 1000,
			height: 700,
			boxSize: 100, 
			backgroundColor: '#e8ffd6',
			backgroundColorTabs: '#c1d6b0',
			outlineColor: 'black',
			shopColor: '#ff9999'
		},
		MENU_COLORS: {
			back: 'black',
			s: '#3aa1a1',
			consumables: 'green',
			weapons: 'red',
			armor: 'orange',
			magicItems: 'blue',
			junk: 'brown',
			valuables: 'purple'
		}
	}),

	COMBAT_STATE: {
		IDLE: 0,
		ATTACKING: 1, //animation that ends at attacking enemy
		DAMAGE: 5, //calculate damage enemy takes here
		RETURN_P: 7, //player return animation from attacking to idle
		RETURN_E: 8, //same for enemy
		DEFENDING: 2, //calculate player getting hit
		INVENTORY: 3,
		END: 4 //reward / exit page, similar to aq
	},
	combatState: undefined,
	COMBAT_DAMAGE: {
		WEAPON: 1.5
	},

	COMBAT_LAYOUT: {
		bgHeight: 500,
		bgColor: '#cfb0ab',
		floorColor: 'black',
		floorWidth: 5,
		floorFill: '#d4c79b',
		statColor: 'black',
		hpBar: {
			width: 200,
			height: 45
		},
		playerStats: {
			name: {x: 50, y: 710},
			hp: {x: 50, y: 730}
		},
		enemyStats: {
			name: {x: 850, y: 710},
			hp: {x: 850, y: 730}
		},
		player: {
			frame: 0,
			timer: 0,
			color: 'black',
			torsoLength: 130,
			armLength: 70,
			legLength: 70,
			headRadius: 30,
			bodyWidth: 8,
			x: 0,
			y: 0,
			head: {x: 0, y: 0}, 
			neck: {x: 0, y: 0},
			shoulders: {x: 0, y: 0},
			pelvis: {x: 0, y: 0}, 
			leftElbow: {x: 0, y: 0}, //all below pelvis are defined as angles and calculated in game
			rightElbow: {x: 0, y: 0},
			leftHand: {x: 0, y: 0},
			rightHand: {x: 0, y: 0},
			leftKnee: {x: 0, y: 0},
			rightKnee: {x: 0, y: 0},
			leftFoot: {x: 0, y: 0},
			rightFoot: {x: 0, y: 0}
		}
	},
	currentAnimation: undefined,
	currentEnemy: undefined,

	WORLD_TYPES: {
		SHOP: 'shop',
		ITEM: 'item',
		NPC: 'npc'
	},

	NPC_TYPES: {
		FRIENDLY: 'safe',
		HOSTILE: 'notSafe'
	},

	NPC_COLORS: {
		FRIENDLY: 'green',
		HOSTILE: 'red',
		NEUTRAL: 'blue'
	},

	SHOP: {
		buildingColor: 'green',
		entranceColor: 'grey'
	},

	DIALOGUE: {
		x_offset: 50,
		y_offset: 50,
		headSize: 120,
		y: 500,
		bg: '#d4c79b',
		text: 'black',
		selected: 'green'
	},

	GROUND_ITEM: {
		radius: 7
	},

	SAVE_TYPES: {
		STATIC: 'static',
		DYNAMIC: 'dynamic'
	},

	canMove: true,
	inDialogue: false,
	currentDialogue: undefined,
	currentDialogueList: [],
	currentDialogueChoice: 0,
	currentDialogueNpcColor: undefined,

	player: {
		x: 50,
		y: 50,
		radius: 15,
		speed: 300,
		color: 'black',
		outline: 'yellow'
	},
	
	playerStats: {
		name: 'Talrand',
		level: 0,
		xp: 0,
		money: 0,
		hitpoints: 10,
		mana: 0,
		strength: 1,
		dexterity: 1,
		defense: 5,
		resistance: 1,
		magicDefense: 0,
		physicalDefense: 0,
		//heavy physical magic: crystal, metal, glass, ice goes through both defenses, physical defense absorbs more
		//physical magic: fire, water, earth, wind, mud, lava, sand goes through both defenses, magic defense absorbs more
		//effect magic: light, shadow, smoke, frost ignore physical defense, weakened by magic defense, slightly weakened by resistance
		//heavy effect magic: poison, void, lightning slightly weakened by magic defense, weakened by resistance
		//control magic: blood and zombie can't be used on other magical beings, does respectively work on non-magical enemies, anything dead cuz duh zombies
		magics: [
			{n:"fire", l: 0, x: 0},
			{n:"water", l: 0, x: 0},
			{n:"earth", l: 0, x: 0},
			{n:"wind", l: 0, x: 0},
			{n:"lightning", l: 0, x: 0},
			{n:"light", l: 0, x: 0},
			{n:"shadow", l: 0, x: 0},
			{n:"crystal", l: 0, x: 0},
			{n:"smoke", l: 0, x: 0},
			{n:"sand", l: 0, x: 0},
			{n:"mud", l: 0, x: 0},
			{n:"ice", l: 0, x: 0},
			{n:"void", l: 0, x: 0},
			{n:"lava", l: 0, x: 0},
			{n:"frost", l: 0, x: 0},
			{n:"glass", l: 0, x: 0},
			{n:"metal", l: 0, x: 0},
			{n:"poison", l: 0, x: 0},
			{n:"blood", l: 0, x: 0},
			{n:"zombie", l: 0, x: 0},
		],
		combatStats: {
			hitpoints: 0,
			mana: 0,
			strength: 0,
			dexterity: 0,
			defense: 0,
			resistance: 0,
			magicDefense: 0,
			physicalDefense: 0,
		},
		inventory: {
			consumables: [],
			weapons: [],
			armor: [],
			magicItems: [],
			junk: [],
			valuables: [],
			s: []
		},
		equipped: {
			weapon: {name: "empty"},
			shield: {name: "empty"},
			helm: {name: "empty"},
			body: {name: "empty"},
			legs: {name: "empty"},
			boots: {name: "empty"},
			gloves: {name: "empty"},
			magic1: {name: "empty"},
			magic2: {name: "empty"},
		}
	},
	MAGIC_TARGET_STAT: {
		HP: 'hitpoints',
		MN: 'mana',
		ST: 'strength',
		DX: 'dexterity',
		DF: 'defense',
		RS: 'resistance',
		MD: 'magicDefense',
		PD: 'physicalDefense'
	},
	maxInventSize: 30, //only increment in 30's? 30 is only used for draw so not necessary but would look nicer
	printOrder: {
		weapon: ["name", "attribute", "damage", "value"],
		shield: ["name", "attribute", "defense", "value"],
		helm: ["name", "attribute", "defense", "value"],
		body: ["name", "attribute", "defense", "value"],
		legs: ["name", "attribute", "defense", "value"],
		gloves: ["name", "attribute", "defense", "value"],
		boots: ["name", "attribute", "defense", "value"],
		necklace: ["name", "attribute", "defense", "value"],
		ring: ["name", "attribute", "defense", "value"],
		junk: ["name", "value"],
		valuables: ["name", "value"]
	},

	NULL_ITEM: {
		name: "empty"
	},

	//might have to up numbers a massive amount or have a ton of levels to allow more massive amount of content
	XP_CHART: {
		1: 10,
		2: 50,
		3: 130,
		4: 240,
		5: 390,
		6: 600,
		7: 890,
		8: 1340,
		9: 2180,
		10: 3600
	},

	WORLD: undefined,

	BUTTON_DATA: Object.freeze({
		width: 200,
		height: 75,
		fillColor: 'white',
		strokeColor: 'black',
		pressedFill: 'light grey',
		pressedStroke: 'black',
		textColor: 'black',
		textColorPressed: 'white',
		font: '32px arial'
	}),
	selectedButton: 0,

	buttons: [
		{
			text: 'Start',
			x: 0,
			y: 0
		},
		{
			text: 'Settings',
			x: 0,
			y: 0
		}
	],

	init: function () {
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.game.WIDTH;
		this.canvas.height = this.game.HEIGHT;
		this.ctx = this.canvas.getContext('2d');

		this.gameState = this.GAME_STATE.MENU;
		this.WORLD = this.world();
		this.buttons[0].x = this.game.WIDTH/2-this.BUTTON_DATA.width/2;
		this.buttons[0].y = this.game.HEIGHT/2-this.BUTTON_DATA.height*2;
		this.buttons[1].x = this.game.WIDTH/2-this.BUTTON_DATA.width/2;
		this.buttons[1].y = this.game.HEIGHT/2+this.BUTTON_DATA.height*2;

		// this.playerStats.equipped.helm = this.NULL_ITEM;
		// this.playerStats.equipped.body = this.NULL_ITEM;
		// this.playerStats.equipped.legs = this.NULL_ITEM;
		// this.playerStats.equipped.gloves = this.NULL_ITEM;
		// this.playerStats.equipped.boots = this.NULL_ITEM;
		// this.playerStats.equipped.magic1 = this.NULL_ITEM;
		// this.playerStats.equipped.weapon = this.NULL_ITEM;
		// this.playerStats.equipped.shield = this.NULL_ITEM;
		// this.playerStats.equipped.magic2 = this.NULL_ITEM;

		// //!temp adding items for testing -> load these into global vars at init???
		// this.playerStats.inventory.consumables.push(this.items.consumables().hp_add_small);
		// this.playerStats.inventory.consumables.push(this.items.consumables().hp_sub_small);
		// this.playerStats.inventory.consumables.push(this.items.consumables().buff_item);
		// this.playerStats.inventory.consumables.push(this.items.consumables().drain_item);
		// this.playerStats.inventory.weapons.push(this.items.weapons().dagger);
		// this.playerStats.inventory.armor.push(this.items.armor().helmet);
		// this.playerStats.inventory.magicItems.push(this.items.magicItems().magicPendant);
		// this.playerStats.inventory.magicItems.push(this.items.magicItems().magicRing);
		// this.playerStats.inventory.junk.push(this.items.junk().string);
		// this.playerStats.inventory.valuables.push(this.items.valuables().amethyst);

		// this.playerStats.equipped.weapon = this.items.weapons().sword;
		// this.playerStats.equipped.shield = this.items.weapons().shield;

		this.loadSave();
		this.update();
	},

	update: function () {
		this.animationID = requestAnimationFrame(this.update.bind(this));

		var dt = this.calculateDeltaTime();
		if(this.gameState == this.GAME_STATE.GAME) {
			this.playerMove(dt);
			this.checkCollision();
			this.checkHostileNpcProximity();
			this.dialogueMove();
			this.checkGamePress();
		}
		else if(this.gameState == this.GAME_STATE.MENU){
			this.menuMove();
			this.checkMenuPress();
		}
		if(this.gameState == this.GAME_STATE.INVENTORY){
			//called as press events from keys.js
		}
		if(this.gameState == this.GAME_STATE.SHOP){
			//!same as draw for invent, different press event in keys, located here
		}
		if(this.gameState == this.GAME_STATE.COMBAT){
			if(this.combatState == this.COMBAT_STATE.ATTACKING){
				this.playAnimation(this.currentAnimation, app.animation.combat.idlePlayer[0]);
			}
			if(this.combatState == this.COMBAT_STATE.DAMAGE){
				this.assignEnemyDamage();
			}
		}

		// draw everything that will be on the canvas
		this.drawAll(dt);
	},

	calculateDeltaTime: function () {
		var now, fps;
		now = performance.now();
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now;
		return 1 / fps;
	},

	loadSave: function () {
		window.api.send("loadSave");
		window.api.receive("saveLoaded", (data) => {
			this.currGameRow = data.currGameRow;
			this.currGameCol = data.currGameCol;
			this.playerStats = data.playerStats;
			for(var item in this.playerStats.equipped){
				if(this.playerStats.equipped[item].name == "empty") this.playerStats.equipped[item] = this.NULL_ITEM;
			}

			for(var i = 0; i < data.world.length; i++){
				var row = data.world[i];
				for(var j = 0; j < row.length; j++){
					var objs = row[j];
					for(var k = 0; k < this.WORLD[i][j].length; k++){
						if(this.WORLD[i][j][k].saveType == this.SAVE_TYPES.DYNAMIC && !containsObj(objs, this.WORLD[i][j][k])){
							this.WORLD[i][j].splice(k,1);
							k--;
						}
					}
					for(var k = 0; k < objs.length; k++){
						if(!containsObj(this.WORLD[i][j], objs[k])) this.WORLD[i][j].push(objs[k]);
					}
				}
			}
		});
	},

	saveGame: function () {
		this.saveData.currGameRow = this.currGameRow;
		this.saveData.currGameCol = this.currGameCol;
		this.saveData.playerStats = this.playerStats;
		
		var w = [[],[],[],[],[],[],[],[],[],[]];
		for(var i = 0; i < w.length; i++){
			w[i].push([]);
		}
		for(var i = 0; i < this.WORLD.length; i++){
			var row = this.WORLD[i];
			for(var j = 0; j < row.length; j++){
				var objs = row[j];
				for(var k = 0; k < objs.length; k++){
					if(objs[k].saveType == this.SAVE_TYPES.DYNAMIC){
						w[i][j].push(objs[k]);
					}
				}
			}
		}
		this.saveData.world = w;
		window.api.send("saveGame", this.saveData);
	},

	// Start update functions

	menuMove: function(){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN]){
			if(this.selectedButton < this.buttons.length-1){
				this.selectedButton++;
			}
		}
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP]){
			if(this.selectedButton > 0){
				this.selectedButton--;
			}
		}
	},

	invMoveAssist: function(dir, gridRows, gridCols) {
		if(dir == 0){
			for(var i = 0; i < gridCols.length; i++){
				for(var j = 0; j < gridCols[i].length; j++){
					if(gridCols[i][j] == this.selected){
						if(j != 0) return gridCols[i][j-1];
						else return this.selected;
					}
				}
			}
		}
		else if(dir == 1){
			for(var i = 0; i < gridCols.length; i++){
				for(var j = 0; j < gridCols[i].length; j++){
					if(gridCols[i][j] == this.selected){
						if(j < gridCols[i].length-1) return gridCols[i][j+1];
						else return this.selected;
					}
				}
			}
		}
		else if(dir == 2){
			for(var i = 0; i < gridRows.length; i++){
				for(var j = 0; j < gridRows[i].length; j++){
					if(gridRows[i][j] == this.selected){
						if(j != 0) return gridRows[i][j-1];
						else return this.selected;
					}
				}
			}
		}
		else if(dir == 3){
			for(var i = 0; i < gridRows.length; i++){
				for(var j = 0; j < gridRows[i].length; j++){
					if(gridRows[i][j] == this.selected){
						if(j < gridRows[i].length-1) return gridRows[i][j+1];
						else return this.selected;
					}
				}
			}
		}
		else return this.selected;
	},

	// BACK< [c w a m j v
	//       [0 1 2 3 4 5
	// [   ] [6 7 8 9 10 11
	// [   ] [12 13 14 15 16 17
	// [   ] [18 19 20 21 22 23
	// ITEM^ [24 25 26 27 28 29 helm body legs gloves boots weapon shield magic1 magic2
	inventoryMove: function(gridRows, gridCols){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP]){
			this.selected = this.invMoveAssist(0, gridRows, gridCols);
		}
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN]){
			this.selected = this.invMoveAssist(1, gridRows, gridCols);
		}
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT]){
			this.selected = this.invMoveAssist(2, gridRows, gridCols);
		}
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT]){
			this.selected = this.invMoveAssist(3, gridRows, gridCols);
		}
	},

	checkShopPress: function(){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SPACE]){
			if(this.selected == 'b') this.gameState = this.GAME_STATE.GAME;
			else if(this.selected == 'c' && this.inventoryTab != 'consumables') this.inventoryTab = 'consumables';
			else if(this.selected == 'w' && this.inventoryTab != 'weapons') this.inventoryTab = 'weapons';
			else if(this.selected == 'a' && this.inventoryTab != 'armor') this.inventoryTab = 'armor';
			else if(this.selected == 'm' && this.inventoryTab != 'magicItems') this.inventoryTab = 'magicItems';
			else if(this.selected == 'j' && this.inventoryTab != 'junk') this.inventoryTab = 'junk';
			else if(this.selected == 'v' && this.inventoryTab != 'valuables') this.inventoryTab = 'valuables';
			else if(this.selected == 's' && this.inventoryTab != 's') this.inventoryTab = 's';
			else if(!isNaN(this.selected) && this.playerStats.inventory[this.inventoryTab][this.selected] != undefined){
				var item = this.playerStats.inventory[this.inventoryTab][this.selected];
				if(this.inventoryTab == 's'){
					if(this.playerStats.inventory[item.tab].length < this.maxInventSize &&
						this.playerStats.money >= item.value){
							this.playerStats.money -= item.value;
							this.playerStats.inventory[item.tab].push(item);
					}
				}
				else{
					this.playerStats.money += item.value;
					this.playerStats.inventory[this.inventoryTab].splice(this.selected, 1);
				}

			}
		}
	},

	checkInventoryPress: function(){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SPACE]){
			if(this.selected == 'b') this.gameState = this.GAME_STATE.GAME;
			else if(this.selected == 'c' && this.inventoryTab != 'consumables') this.inventoryTab = 'consumables';
			else if(this.selected == 'w' && this.inventoryTab != 'weapons') this.inventoryTab = 'weapons';
			else if(this.selected == 'a' && this.inventoryTab != 'armor') this.inventoryTab = 'armor';
			else if(this.selected == 'm' && this.inventoryTab != 'magicItems') this.inventoryTab = 'magicItems';
			else if(this.selected == 'j' && this.inventoryTab != 'junk') this.inventoryTab = 'junk';
			else if(this.selected == 'v' && this.inventoryTab != 'valuables') this.inventoryTab = 'valuables';
			else if(this.selected == 'helm' && this.playerStats.equipped.helm != this.NULL_ITEM && this.playerStats.inventory.armor.length < this.maxInventSize){
				this.playerStats.inventory.armor.push(this.playerStats.equipped.helm);
				this.playerStats.equipped.helm = this.NULL_ITEM;
			}
			else if(this.selected == 'body' && this.playerStats.equipped.body != this.NULL_ITEM && this.playerStats.inventory.armor.length < this.maxInventSize){
				this.playerStats.inventory.armor.push(this.playerStats.equipped.body);
				this.playerStats.equipped.body = this.NULL_ITEM;
			}
			else if(this.selected == 'legs' && this.playerStats.equipped.legs != this.NULL_ITEM && this.playerStats.inventory.legs.length < this.maxInventSize){
				this.playerStats.inventory.armor.push(this.playerStats.equipped.legs);
				this.playerStats.equipped.legs = this.NULL_ITEM;
			}
			else if(this.selected == 'gloves' && this.playerStats.equipped.gloves != this.NULL_ITEM && this.playerStats.inventory.armor.length < this.maxInventSize){
				this.playerStats.inventory.armor.push(this.playerStats.equipped.gloves);
				this.playerStats.equipped.gloves = this.NULL_ITEM;
			}
			else if(this.selected == 'boots' && this.playerStats.equipped.boots != this.NULL_ITEM && this.playerStats.inventory.armor.length < this.maxInventSize){
				this.playerStats.inventory.armor.push(this.playerStats.equipped.boots);
				this.playerStats.equipped.boots = this.NULL_ITEM;
			}
			else if(this.selected == 'weapon' && this.playerStats.equipped.weapon != this.NULL_ITEM && this.playerStats.inventory.weapons.length < this.maxInventSize){
				this.playerStats.inventory.weapons.push(this.playerStats.equipped.weapon);
				this.playerStats.equipped.weapon = this.NULL_ITEM;
			}
			else if(this.selected == 'shield' && this.playerStats.equipped.shield != this.NULL_ITEM && this.playerStats.inventory.weapons.length < this.maxInventSize){
				this.playerStats.inventory.weapons.push(this.playerStats.equipped.shield);
				this.playerStats.equipped.shield = this.NULL_ITEM;
			}
			else if(this.selected == 'magic1' && this.playerStats.equipped.magic1 != this.NULL_ITEM && this.playerStats.inventory.magicItems.length < this.maxInventSize){
				this.playerStats.inventory.magicItems.push(this.playerStats.equipped.magic1);
				this.playerStats.equipped.magic1 = this.NULL_ITEM;
			}
			else if(this.selected == 'magic2' && this.playerStats.equipped.magic2 != this.NULL_ITEM && this.playerStats.inventory.magicItems.length < this.maxInventSize){
				this.playerStats.inventory.magicItems.push(this.playerStats.equipped.magic2);
				this.playerStats.equipped.magic2 = this.NULL_ITEM;
			}
			else if(!isNaN(this.selected) && this.playerStats.inventory[this.inventoryTab][this.selected] != undefined){
				if(this.inventoryTab == 'consumables'){
					var consumedItem = this.playerStats.inventory[this.inventoryTab][this.selected];
					for(var i = 0; i < consumedItem.effects.length; i++){
						this.playerStats[consumedItem.effects[i].stat] += consumedItem.effects[i].value;
					}
					this.playerStats.inventory[this.inventoryTab].splice(this.selected, 1);
				}
				else if(this.inventoryTab == 'junk'){

				}
				else if(this.inventoryTab == 'valuables'){

				}
				else if(this.inventoryTab == 'magicItems'){
					var selectedItem = this.playerStats.inventory[this.inventoryTab][this.selected];
					if(selectedItem.type == 'necklace'){
						var temp = this.playerStats.equipped.magic1;
						this.playerStats.equipped.magic1 = selectedItem;
						if(temp != this.NULL_ITEM) this.playerStats.inventory[this.inventoryTab][this.selected] = temp;
						else this.playerStats.inventory[this.inventoryTab].splice(this.selected, 1);
					}
					else if(selectedItem.type == 'ring'){
						var temp = this.playerStats.equipped.magic2;
						this.playerStats.equipped.magic2 = selectedItem;
						if(temp != this.NULL_ITEM) this.playerStats.inventory[this.inventoryTab][this.selected] = temp;
						else this.playerStats.inventory[this.inventoryTab].splice(this.selected, 1);
					}
				}
				else{ //equippable items
					var selectedItem = this.playerStats.inventory[this.inventoryTab][this.selected];
					var temp = this.playerStats.equipped[selectedItem.type];
					this.playerStats.equipped[selectedItem.type] = selectedItem;
					if(temp != this.NULL_ITEM) this.playerStats.inventory[this.inventoryTab][this.selected] = temp;
					else this.playerStats.inventory[this.inventoryTab].splice(this.selected, 1);
				}
			}
		}
	},

	checkMenuPress: function(){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SPACE]){
			if(this.selectedButton == 0){
				this.gameState = this.GAME_STATE.GAME;
			}
			else if(this.selectedButton == 1){
				console.log("Settings don't exist yet :(");
			}
		}
	},

	checkGamePress: function(){
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_INVENTORY]){
			this.selected = 'c';
			this.inventoryTab = 'consumables';
			this.gameState = this.GAME_STATE.INVENTORY;
		}
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_INTERACT]){
			var world = this.WORLD[this.currGameRow][this.currGameCol];
			for(var i = 0; i < world.length; i++){
				if(world[i].type == this.WORLD_TYPES.SHOP){
					var entered = false;
					if(world[i].door == 'top' && rectangleContainsPoint({x: world[i].x, y: world[i].y - this.player.radius * 2,
						width: world[i].width / 3, height: this.player.radius * 2}, {x: this.player.x, y: this.player.y})){
							entered = true;
					}
					else if(world[i].door == 'bottom' && rectangleContainsPoint({x: world[i].x, y: world[i].y + world[i].height,
						width: world[i].width / 3, height: this.player.radius * 2}, {x: this.player.x, y: this.player.y})){
							entered = true;
					}
					if(entered){
						this.playerStats.inventory.s = world[i].inventory;
						this.selected = 'c';
						this.inventoryTab = 'consumables';
						this.gameState = this.GAME_STATE.SHOP;
					}
				}
				else if(world[i].type == this.WORLD_TYPES.ITEM){
					if(rectanglesIntersect({x: world[i].x - world[i].radius, y: world[i].y - world[i].radius, width: world[i].radius * 2, height: world[i].radius * 2},
						{x: this.player.x - this.player.radius, y: this.player.y - this.player.radius, width: this.player.radius * 2, height: this.player.radius * 2})){
							if(this.playerStats.inventory[world[i].item.tab].length < this.maxInventSize){
								this.playerStats.inventory[world[i].item.tab].push(world[i].item);
								world.splice(i,1);
								i--;
							}
						}
				}
				else if(world[i].type == this.WORLD_TYPES.NPC){
					if(world[i].status == this.NPC_TYPES.FRIENDLY && rectanglesIntersect(
						{x: world[i].x - world[i].radius * 1.5, y: world[i].y - world[i].radius * 1.5, width: world[i].radius * 3, height: world[i].radius * 3},
						{x: this.player.x - this.player.radius, y: this.player.y - this.player.radius, width: this.player.radius * 2, height: this.player.radius * 2})){
						this.canMove = false;
						this.inDialogue = true;
						this.currentDialogue = world[i].dialogue;
						this.currentDialogueNpcColor = world[i].color;
					}
				}
			}
		}
	},

	checkHostileNpcProximity: function () {
		var world = this.WORLD[this.currGameRow][this.currGameCol];
		for(var i = 0; i < world.length; i++){
			if(world[i].type == this.WORLD_TYPES.NPC && world[i].status == this.NPC_TYPES.HOSTILE && rectanglesIntersect(
				{x: world[i].x - world[i].aggroRadius, y: world[i].y - world[i].aggroRadius, width: world[i].aggroRadius * 2, height: world[i].aggroRadius * 2},
				{x: this.player.x - this.player.radius, y: this.player.y - this.player.radius, width: this.player.radius * 2, height: this.player.radius * 2}
			)){
				this.playerStats.combatStats.hitpoints = this.playerStats.hitpoints;
				this.playerStats.combatStats.mana = this.playerStats.mana;
				this.playerStats.combatStats.strength = this.playerStats.strength;
				this.playerStats.combatStats.dexterity = this.playerStats.dexterity;
				this.playerStats.combatStats.defense = this.playerStats.defense;
				this.playerStats.combatStats.resistance = this.playerStats.resistance;
				this.playerStats.combatStats.magicDefense = this.playerStats.magicDefense;
				this.playerStats.combatStats.physicalDefense = this.playerStats.physicalDefense;
				this.combatState = this.COMBAT_STATE.IDLE;
				this.currentEnemy = world[i];
				this.calculateAnimationPoints(app.animation.combat.idlePlayer[0]);
				this.gameState = this.GAME_STATE.COMBAT;
				//!need to set the enemy for combat before switching game state
			}
		}
	},

	checkCombatPress: function () {
		//!also check which combat option is selected, similar to inventory navigation -> can be a grid of magic or special attacks?
		if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SPACE] && this.combatState == this.COMBAT_STATE.IDLE){
			this.combatState = this.COMBAT_STATE.ATTACKING;
			this.COMBAT_LAYOUT.player.timer = 0;
			this.COMBAT_LAYOUT.player.frame = 0;
			this.currentAnimation = app.animation.combat.player;
		}
	},

	playAnimation: function (a, idle) {
		this.COMBAT_LAYOUT.player.timer += 1;
		if(this.COMBAT_LAYOUT.player.timer >= 10){
			this.COMBAT_LAYOUT.player.timer = 0;
			if(this.COMBAT_LAYOUT.player.frame < a.length - 1){
				this.COMBAT_LAYOUT.player.frame++;
				this.calculateAnimationPoints(a[this.COMBAT_LAYOUT.player.frame]);
			}
			else {
				this.currentAnimation = idle;
				this.calculateAnimationPoints(this.currentAnimation);
				this.combatState = this.COMBAT_STATE.IDLE; //!would normally be damage, set to idle in order to test animation 
			}
		}
	},

	assignEnemyDamage: function () {
		var damage = 0;
		var enemyDef = 0;
		//!damage roll on enemy, then go to return_p combat state -> for player return animation, before returning to idle (separate function)
		if(this.playerStats.equipped.weapon == this.NULL_ITEM){
			damage = 0;
		}
	},

	checkEnemyEquipment: function (dir) {
		//!check enemy equipment with param for attack / def -> will grab item stats to determine combat damage
		if(dir == 0){ //attacking enemy
			if(this.currentEnemy.equipped.shield.name != "empty"){
				enemyDef += this.currentEnemy.equipped.shield.defense;
			}
		}
	},

	//!could have arms and legs be params and if not present, the npc wouldn't have them? have to handle in enemy draw function (ex: slimes)
	//?can set length to 0 to not have them?
	calculateAnimationPoints: function (frame) {
		var pl = this.COMBAT_LAYOUT.player;
		pl.head.x = frame.head.x;
		pl.head.y = frame.head.y;
		pl.neck.x = frame.neck.x;
		pl.neck.y = frame.neck.y;
		pl.shoulders.x = frame.shoulders.x;
		pl.shoulders.y = frame.shoulders.y;
		pl.pelvis.x = frame.pelvis.x;
		pl.pelvis.y = frame.pelvis.y;
		pl.leftElbow.x = frame.shoulders.x + pl.armLength * Math.cos(deg2Rad(frame.leftElbow.a, -270 * Math.PI / 180));
		pl.leftElbow.y = frame.shoulders.y + pl.armLength * Math.sin(deg2Rad(frame.leftElbow.a, -270 * Math.PI / 180));
		pl.rightElbow.x = frame.shoulders.x + pl.armLength * Math.cos(deg2Rad(frame.rightElbow.a, -270 * Math.PI / 180));
		pl.rightElbow.y = frame.shoulders.y + pl.armLength * Math.sin(deg2Rad(frame.rightElbow.a, -270 * Math.PI / 180));
		pl.leftHand.x = pl.leftElbow.x + pl.armLength * Math.cos(deg2Rad(frame.leftHand.a, -270 * Math.PI / 180));
		pl.leftHand.y = pl.leftElbow.y + pl.armLength * Math.sin(deg2Rad(frame.leftHand.a, -270 * Math.PI / 180));
		pl.rightHand.x = pl.rightElbow.x + pl.armLength * Math.cos(deg2Rad(frame.rightHand.a, -270 * Math.PI / 180));
		pl.rightHand.y = pl.rightElbow.y + pl.armLength * Math.sin(deg2Rad(frame.rightHand.a, -270 * Math.PI / 180));
		pl.leftKnee.x = frame.pelvis.x + pl.legLength * Math.cos(deg2Rad(frame.leftKnee.a, -270 * Math.PI / 180));
		pl.leftKnee.y = frame.pelvis.y + pl.legLength * Math.sin(deg2Rad(frame.leftKnee.a, -270 * Math.PI / 180));
		pl.rightKnee.x = frame.pelvis.x + pl.legLength * Math.cos(deg2Rad(frame.rightKnee.a, -270 * Math.PI / 180));
		pl.rightKnee.y = frame.pelvis.y + pl.legLength * Math.sin(deg2Rad(frame.rightKnee.a, -270 * Math.PI / 180));
		pl.leftFoot.x = pl.leftKnee.x + pl.legLength * Math.cos(deg2Rad(frame.leftFoot.a, -270 * Math.PI / 180));
		pl.leftFoot.y = pl.leftKnee.y + pl.legLength * Math.sin(deg2Rad(frame.leftFoot.a, -270 * Math.PI / 180));
		pl.rightFoot.x = pl.rightKnee.x + pl.legLength * Math.cos(deg2Rad(frame.rightFoot.a, -270 * Math.PI / 180));
		pl.rightFoot.y = pl.rightKnee.y + pl.legLength * Math.sin(deg2Rad(frame.rightFoot.a, -270 * Math.PI / 180));
	},

	checkDialoguePress: function () {
		if(this.inDialogue){
			if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SPACE]){
				this.currentDialogue = this.currentDialogue[this.currentDialogueList[this.currentDialogueChoice].split("%%%")[0]];
				this.currentDialogueChoice = 0;
				if(this.currentDialogue.a == undefined){
					this.inDialogue = false;
					this.canMove = true;
				}
			}
		}
	},

	//!only allowing 5 dialogue options max for now -> could do what osrs does with a "more" option for additional dialogue choices
	//!might want to move to keys.keypressed so that w and s can be used instead
	dialogueMove: function () {
		if(this.inDialogue){
			this.currentDialogueList = [];
			for(var d in this.currentDialogue){
				if(d != 'message' && d != 'directedAt') this.currentDialogueList.push(d + "%%%" + this.currentDialogue[d].message + "%%%" + this.currentDialogue[d].directedAt);
			}
			if(this.currentDialogueList.length > 0){
				if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_ONE] && this.currentDialogueList[0] != undefined && this.currentDialogueChoice != 0){
					this.currentDialogueChoice = 0;
				}
				else if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_TWO] && this.currentDialogueList[1] != undefined && this.currentDialogueChoice != 1){
					this.currentDialogueChoice = 1;
				}
				else if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_THREE] && this.currentDialogueList[2] != undefined && this.currentDialogueChoice != 2){
					this.currentDialogueChoice = 2;
				}
				else if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_FOUR] && this.currentDialogueList[3] != undefined && this.currentDialogueChoice != 3){
					this.currentDialogueChoice = 3;
				}
				else if(this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_FIVE] && this.currentDialogueList[4] != undefined && this.currentDialogueChoice != 4){
					this.currentDialogueChoice = 4;
				}
			}
			else{
				this.inDialogue = false;
				this.canMove = true;
			}
		}
	},

	playerMove: function (dt) {
		if(this.canMove){
			if (this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_LEFT] && this.player.x > this.player.radius) {
				this.player.x -= this.player.speed * dt;
			}
			if (this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_RIGHT] && this.player.x < this.game.WIDTH - this.player.radius) {
				this.player.x += this.player.speed * dt;
			}
			if (this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_UP] && this.player.y > this.player.radius) {
				this.player.y -= this.player.speed * dt;
			}
			if (this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_DOWN] && this.player.y < this.game.HEIGHT - this.player.radius) {
				this.player.y += this.player.speed * dt;
			}

			if (this.player.x < this.player.radius) this.player.x = this.player.radius;
			if (this.player.x > this.game.WIDTH - this.player.radius) this.player.x = this.game.WIDTH - this.player.radius;
			if (this.player.y < this.player.radius) this.player.y = this.player.radius;
			if (this.player.y > this.game.HEIGHT - this.player.radius) this.player.y = this.game.HEIGHT - this.player.radius;
		}
	},

	checkCollision: function () {
		var world = this.world()[this.currGameRow][this.currGameCol];
		for(var i = 0; i < world.length; i++){
			if(world[i].type == this.WORLD_TYPES.SHOP){
				var newPos = playerRectangleCollision(this.player, world[i], this.myKeys);
				this.player.x = newPos.x;
				this.player.y = newPos.y;
			}
			else if(world[i].type == this.WORLD_TYPES.NPC){
				var newPos = playerRectangleCollision(this.player, {x: world[i].x - world[i].radius, y: world[i].y - world[i].radius, 
					width: world[i].radius * 2, height: world[i].radius * 2}, this.myKeys);
				this.player.x = newPos.x;
				this.player.y = newPos.y;
			}
		}
	},

	drawAll: function (dt) {
		//background
		this.draw.rect(0, 0, this.game.WIDTH, this.game.HEIGHT, this.game.BACKGROUND_COLOR, this.game.OUTLINE_COLOR, 5);

		//menu items
		if(this.gameState == this.GAME_STATE.MENU){
			for(var i = 0; i < this.buttons.length; i++){
				if(i == this.selectedButton){
					this.draw.rect(this.buttons[i].x, this.buttons[i].y, this.BUTTON_DATA.width, this.BUTTON_DATA.height,
						this.BUTTON_DATA.pressedFill, this.BUTTON_DATA.pressedStroke, 3);
					this.draw.fillStyledText(this.BUTTON_DATA.textColorPressed, this.BUTTON_DATA.font, this.buttons[i].text, 
						this.buttons[i].x + this.BUTTON_DATA.width/2, this.buttons[i].y + this.BUTTON_DATA.height/2);
				}
				else{
					this.draw.rect(this.buttons[i].x, this.buttons[i].y, this.BUTTON_DATA.width, this.BUTTON_DATA.height,
						this.BUTTON_DATA.fillColor, this.BUTTON_DATA.strokeColor, 3);
					this.draw.fillStyledText(this.BUTTON_DATA.textColor, this.BUTTON_DATA.font, this.buttons[i].text, 
						this.buttons[i].x + this.BUTTON_DATA.width/2, this.buttons[i].y + this.BUTTON_DATA.height/2);
				}
			}
		}

		//game items
		else if(this.gameState == this.GAME_STATE.GAME){
			var world = this.WORLD[this.currGameRow][this.currGameCol]
			for(var i = 0; i < world.length; i++){
				if(world[i].shape == 'rect'){
					this.draw.rect(world[i].x, world[i].y, world[i].width, world[i].height, world[i].color);
					if(world[i].type == this.WORLD_TYPES.SHOP){
						if(world[i].door == 'top'){
							this.draw.rect(world[i].x, world[i].y - this.player.radius * 2, world[i].width / 3, this.player.radius * 2, this.SHOP.entranceColor);
						}
						else if(world[i].door == 'bottom'){
							this.draw.rect(world[i].x, world[i].y + world[i].height, world[i].width / 3, this.player.radius * 2, this.SHOP.entranceColor)
						}
					}
				}
				else if(world[i].shape == 'circle'){
					if(world[i].type == this.WORLD_TYPES.ITEM) this.draw.circle(world[i].x, world[i].y, world[i].radius, world[i].color);
					else if(world[i].type == this.WORLD_TYPES.NPC) this.draw.circle(world[i].x, world[i].y, world[i].radius, world[i].color, this.player.outline);
				}
			}
			this.draw.player();

			if(this.inDialogue){
				this.draw.dialogue();
			}
		}

		//inventory items
		else if(this.gameState == this.GAME_STATE.INVENTORY){
			this.draw.inventory();
		}

		else if(this.gameState == this.GAME_STATE.SHOP){
			this.draw.inventory();
		}

		else if(this.gameState == this.GAME_STATE.COMBAT){
			this.draw.combat.background();
			this.draw.combat.floor();
			this.draw.combat.player();
			this.draw.combat.stats();
		}
	},
}
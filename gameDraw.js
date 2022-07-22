
"use strict";

var app = app || {};

app.draw = function(){
    var draw = {};
    draw.circle = function (x, y, radius, fillStyle, strokeStyle) {
		app.main.ctx.save();
		app.main.ctx.beginPath();
		app.main.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		app.main.ctx.closePath();
		app.main.ctx.fillStyle = fillStyle;
		app.main.ctx.strokeStyle = strokeStyle == undefined ? fillStyle : strokeStyle;
		app.main.ctx.fill();
		app.main.ctx.stroke();
		app.main.ctx.restore();
	};

	draw.rect = function (x, y, width, height, fillStyle, strokeStyle, lineWidth) {
		app.main.ctx.save();
		app.main.ctx.fillStyle = fillStyle;
		app.main.ctx.strokeStyle = strokeStyle == undefined ? fillStyle : strokeStyle;
		app.main.ctx.lineWidth = lineWidth == undefined ? 1 : lineWidth;
		app.main.ctx.fillRect(x, y, width, height);
		app.main.ctx.strokeRect(x, y, width, height);
		app.main.ctx.restore();
	};

	draw.line = function(x, y, x2, y2, strokeStyle, lineWidth, cap) {
		app.main.ctx.save();
		app.main.ctx.strokeStyle = strokeStyle;
		app.main.ctx.lineWidth = lineWidth;
		app.main.ctx.lineCap = cap ? cap : 'butt';
		app.main.ctx.beginPath();
		app.main.ctx.moveTo(x, y);
		app.main.ctx.lineTo(x2, y2);
		app.main.ctx.stroke();
		app.main.ctx.restore();
	}

	draw.fillStyledText = function (fillStyle, font, text, x, y, alignment) {
		app.main.ctx.save();
		app.main.ctx.font = font;
		app.main.ctx.fillStyle = fillStyle;
		app.main.ctx.textAlign = alignment ? alignment : 'center';
		app.main.ctx.textBaseline = 'middle';
		app.main.ctx.fillText(text, x, y);
		app.main.ctx.restore();
	};

	draw.player = function () {
		draw.circle(app.main.player.x, app.main.player.y, app.main.player.radius, app.main.player.color, app.main.player.outline);
	};

	draw.selectedItem = function (x, y, color, type) {
		app.main.ctx.save();
		app.main.ctx.strokeStyle = color;
		app.main.ctx.lineWidth = 10;
		app.main.ctx.strokeRect(x + 10, y + 10, app.main.MENU_GRID.MENU_SIZE.boxSize - 20, app.main.MENU_GRID.MENU_SIZE.boxSize - 20);
		var t = type == 0 ? app.main.MENU_GRID.MENU_SIZE.backgroundColor : type == 1 ? app.main.MENU_GRID.MENU_SIZE.backgroundColorTabs : app.main.MENU_GRID.MENU_SIZE.shopColor;
		app.draw.rect(x + 5, y + 10 + app.main.MENU_GRID.MENU_SIZE.boxSize / 8, app.main.MENU_GRID.MENU_SIZE.boxSize - 10, app.main.MENU_GRID.MENU_SIZE.boxSize / 8 * 4.35, t, t);
		app.draw.rect(x + 10 + app.main.MENU_GRID.MENU_SIZE.boxSize / 8, y + 5,  + app.main.MENU_GRID.MENU_SIZE.boxSize / 8 * 4.35, app.main.MENU_GRID.MENU_SIZE.boxSize - 10, t, t);
		app.main.ctx.restore();
	}

	draw.dialogue = function () {
		var isPlayer = false;

		//background
		draw.rect(0, app.main.DIALOGUE.y, app.main.game.WIDTH, app.main.game.HEIGHT - app.main.DIALOGUE.y, app.main.DIALOGUE.bg, 'black', 5);
		
		if(app.main.currentDialogueList[0] != undefined){
			if(app.main.currentDialogueList[0].split('%%%')[2] == '1'){ //directed at npc
				draw.circle(app.main.game.WIDTH / 6 * 5, app.main.DIALOGUE.y + (app.main.game.HEIGHT - app.main.DIALOGUE.y) / 2, app.main.DIALOGUE.headSize, 
					app.main.player.color, app.main.player.outline);
				isPlayer = true;
			}
			else{ //directed at player
				draw.circle(app.main.game.WIDTH / 6 * 5, app.main.DIALOGUE.y + (app.main.game.HEIGHT - app.main.DIALOGUE.y) / 2, app.main.DIALOGUE.headSize, 
					app.main.currentDialogueNpcColor, app.main.player.outline);
			}
		}

		//dialogue options
		for(var i = 0; i < app.main.currentDialogueList.length; i++){
			var arrowY = app.main.DIALOGUE.y + app.main.DIALOGUE.y_offset + i * app.main.DIALOGUE.y_offset;
			var text = app.main.currentDialogueList[i].split('%%%')[1];
			var sliceNum = (text.length > 80 && text[80] != '') ? findNextSpace(text) != -1 ? findNextSpace(text) : 80 : 80;
			draw.fillStyledText(app.main.DIALOGUE.text, '20px arial', text.slice(0, sliceNum), app.main.DIALOGUE.x_offset, arrowY, 'left');
			if(text.length > 80) draw.fillStyledText(app.main.DIALOGUE.text, '20px arial', text.slice(sliceNum+1), app.main.DIALOGUE.x_offset, arrowY + 21, 'left');

			//selected option
			if(isPlayer && i == app.main.currentDialogueChoice){
				draw.line(20, arrowY, 40, arrowY, app.main.DIALOGUE.selected, 3);
				draw.line(40, arrowY, 35, arrowY - 5, app.main.DIALOGUE.selected, 3);
				draw.line(40, arrowY, 35, arrowY + 5, app.main.DIALOGUE.selected, 3);
			}
		}
	}

	draw.equipment = function (mg) {
		for(var i = 0; i <= 4; i++){
			draw.line(mg.x + 30 - 2.5, mg.y + i * mg.boxSize, mg.x + 30 + mg.boxSize * 3 + 2.5, mg.y + i * mg.boxSize, mg.outlineColor, 5);
			if(i != 4) draw.line(mg.x + 30 + i * mg.boxSize, mg.y + mg.boxSize, mg.x + 30 + i * mg.boxSize, mg.y + mg.boxSize * 4 + 2.5, mg.outlineColor, 5);
		}
	}

	draw.equipmentNames = function (mg, stats) {
		draw.fillStyledText('black', '16px arial', stats.equipped.helm.name, mg.x + 30 + mg.boxSize / 2, mg.y + mg.boxSize * 1.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.body.name, mg.x + 30 + mg.boxSize * 1.5, mg.y + mg.boxSize * 1.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.legs.name, mg.x + 30 + mg.boxSize * 2.5,mg.y + mg.boxSize * 1.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.gloves.name, mg.x + 30 + mg.boxSize / 2, mg.y + mg.boxSize * 2.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.boots.name, mg.x + 30 + mg.boxSize * 1.5, mg.y + mg.boxSize * 2.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.magic1.name, mg.x + 30 + mg.boxSize * 2.5, mg.y + mg.boxSize * 2.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.weapon.name, mg.x + 30 + mg.boxSize / 2, mg.y + mg.boxSize * 3.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.shield.name, mg.x + 30 + mg.boxSize * 1.5, mg.y + mg.boxSize * 3.5);
		draw.fillStyledText('black', '16px arial', stats.equipped.magic2.name, mg.x + 30 + mg.boxSize * 2.5, mg.y + mg.boxSize * 3.5);
	}

	draw.shop = function (mg) {
		draw.rect(mg.itemOffset - mg.boxSize, mg.y, mg.boxSize, mg.boxSize, mg.shopColor, mg.outlineColor, 5);
	}

	draw.inventory = function(){
		var mg = app.main.MENU_GRID.MENU_SIZE;

		//border
		draw.rect(mg.x, mg.y, mg.width, mg.height, mg.backgroundColor, mg.outlineColor, 5);

		//item grid
		for(var i = 1; i < 7; i++){
			draw.line(mg.itemOffset - 2.5, mg.y + i * mg.boxSize, mg.x + mg.width, mg.y + i * mg.boxSize, mg.outlineColor, 5);
		}
		for(var i = 0; i < 6; i++){
			draw.line(mg.itemOffset + i * mg.boxSize, mg.y, mg.itemOffset + i * mg.boxSize, mg.y + mg.height - mg.boxSize, mg.outlineColor, 5);
			draw.rect(mg.itemOffset + i * mg.boxSize + 3.5, mg.y + 3.5, mg.boxSize - 7, mg.boxSize - 7, mg.backgroundColorTabs);
		}

		//equipment
		if(app.main.gameState == app.main.GAME_STATE.INVENTORY) draw.equipment(mg);
		if(app.main.gameState == app.main.GAME_STATE.SHOP) draw.shop(mg);

		//selected item
		var sel = app.main.selected;
		var stats = app.main.playerStats;
		if(isNaN(sel)){
			if(sel == 'b') app.draw.selectedItem(mg.x, mg.y, app.main.MENU_GRID.MENU_COLORS.back, 0);
			if(sel == 's') app.draw.selectedItem(mg.itemOffset - mg.boxSize, mg.y, app.main.MENU_GRID.MENU_COLORS.s, 2);
			if(sel == 'c') app.draw.selectedItem(mg.itemOffset, mg.y, app.main.MENU_GRID.MENU_COLORS.consumables, 1);
			if(sel == 'w') app.draw.selectedItem(mg.itemOffset + mg.boxSize, mg.y, app.main.MENU_GRID.MENU_COLORS.weapons, 1);
			if(sel == 'a') app.draw.selectedItem(mg.itemOffset + mg.boxSize * 2, mg.y, app.main.MENU_GRID.MENU_COLORS.armor, 1);
			if(sel == 'm') app.draw.selectedItem(mg.itemOffset + mg.boxSize * 3, mg.y, app.main.MENU_GRID.MENU_COLORS.magicItems, 1);
			if(sel == 'j') app.draw.selectedItem(mg.itemOffset + mg.boxSize * 4, mg.y, app.main.MENU_GRID.MENU_COLORS.junk, 1);
			if(sel == 'v') app.draw.selectedItem(mg.itemOffset + mg.boxSize * 5, mg.y, app.main.MENU_GRID.MENU_COLORS.valuables, 1);
			if(sel == 'helm') app.draw.selectedItem(mg.x + 30, mg.y + mg.boxSize, app.main.MENU_GRID.MENU_COLORS.armor, 0);
			if(sel == 'body') app.draw.selectedItem(mg.x + 30 + mg.boxSize, mg.y + mg.boxSize, app.main.MENU_GRID.MENU_COLORS.armor, 0);
			if(sel == 'legs') app.draw.selectedItem(mg.x + 30 + mg.boxSize * 2, mg.y + mg.boxSize, app.main.MENU_GRID.MENU_COLORS.armor, 0);
			if(sel == 'gloves') app.draw.selectedItem(mg.x + 30, mg.y + mg.boxSize * 2, app.main.MENU_GRID.MENU_COLORS.armor, 0);
			if(sel == 'boots') app.draw.selectedItem(mg.x + 30 + mg.boxSize, mg.y + mg.boxSize * 2, app.main.MENU_GRID.MENU_COLORS.armor, 0);
			if(sel == 'magic1') app.draw.selectedItem(mg.x + 30 + mg.boxSize * 2, mg.y + mg.boxSize * 2, app.main.MENU_GRID.MENU_COLORS.magicItems, 0);
			if(sel == 'weapon') app.draw.selectedItem(mg.x + 30, mg.y + mg.boxSize * 3, app.main.MENU_GRID.MENU_COLORS.weapons, 0);
			if(sel == 'shield') app.draw.selectedItem(mg.x + 30 + mg.boxSize, mg.y + mg.boxSize * 3, app.main.MENU_GRID.MENU_COLORS.weapons, 0);
			if(sel == 'magic2') app.draw.selectedItem(mg.x + 30 + mg.boxSize * 2, mg.y + mg.boxSize * 3, app.main.MENU_GRID.MENU_COLORS.magicItems, 0);
		}
		else{
			var selectColor = app.main.MENU_GRID.MENU_COLORS[app.main.inventoryTab];
			app.draw.selectedItem(mg.itemOffset + mg.boxSize * (app.main.selected % 6), mg.y + Math.floor(app.main.selected / 6 + 1) * mg.boxSize, selectColor, 0);
		}

		//x for back button
		app.draw.line(mg.x + 30, mg.y + 30, mg.x + 70, mg.y + 70, 'red', 20);
		app.draw.line(mg.x + 30, mg.y + 70, mg.x + 70, mg.y + 30, 'red', 20);

		//temp draw item names
		for(var i = 0; i < stats.inventory[app.main.inventoryTab].length; i++){
			var itemName = stats.inventory[app.main.inventoryTab][i].name;
			draw.fillStyledText('black', '16px arial', itemName == undefined ? '' : itemName, mg.itemOffset + (i % 6) * mg.boxSize + mg.boxSize / 2, 
				mg.y + Math.floor(i / 6) * mg.boxSize + mg.boxSize + mg.boxSize / 2);
		}

		//temp draw equipped names
		if(app.main.gameState == app.main.GAME_STATE.INVENTORY) draw.equipmentNames(mg, stats);
		//!add shop button labels? or only one button

		//player stats
		draw.fillStyledText('black', '32px arial', 'Lv: ' + stats.level, mg.itemOffset + 40, mg.y + mg.height - mg.boxSize / 4);
		draw.fillStyledText('black', '32px arial', 'Xp: ' + stats.xp, mg.itemOffset + 160, mg.y + mg.height - mg.boxSize / 4);
		draw.fillStyledText('black', '32px arial', '$: ' + stats.money, mg.itemOffset + 280, mg.y + mg.height - mg.boxSize / 4);
		draw.fillStyledText('black', '32px arial', 'Hp: ' + stats.hitpoints, mg.itemOffset + 390, mg.y + mg.height - mg.boxSize / 4);
		draw.fillStyledText('black', '32px arial', 'Mn: ' + stats.mana, mg.itemOffset + 40, mg.y + mg.height - mg.boxSize / 4 * 3);
		draw.fillStyledText('black', '32px arial', 'Str: ' + stats.strength, mg.itemOffset + 160, mg.y + mg.height - mg.boxSize / 4 * 3);
		draw.fillStyledText('black', '32px arial', 'Dex: ' + stats.dexterity, mg.itemOffset + 280, mg.y + mg.height - mg.boxSize / 4 * 3);
		draw.fillStyledText('black', '32px arial', 'Def: ' + stats.defense, mg.itemOffset + 390, mg.y + mg.height - mg.boxSize / 4 * 3);
		draw.fillStyledText('black', '32px arial', 'Res: ' + stats.resistance, mg.itemOffset + 510, mg.y + mg.height - mg.boxSize / 4 * 3);

		//selected item stats
		if((!isNaN(app.main.selected) || app.main.selected.length > 1)){
			if(isNaN(app.main.selected) && stats.equipped[app.main.selected] != app.main.NULL_ITEM){
				for(var i = 0; i < app.main.printOrder[stats.equipped[app.main.selected].type].length; i++){
					var itemProp = app.main.printOrder[stats.equipped[app.main.selected].type][i];
					if(itemProp != "name"){
						draw.fillStyledText('black', '32px arial', stats.equipped[app.main.selected][itemProp], mg.x + 220, 
							mg.y + mg.boxSize * (4.5 + i * .5), 'left');
						draw.fillStyledText('black', '32px arial', itemProp + ":", mg.x + 30, mg.y + mg.boxSize * (4.5 + i * .5), 'left');
					}
					else{
						draw.fillStyledText('black', '32px arial bold', stats.equipped[app.main.selected][itemProp], mg.x + 30, 
							mg.y + mg.boxSize * (4.5 + i * .5), 'left');
					}
				}
			}
			else if(stats.inventory[app.main.inventoryTab][app.main.selected] != undefined){
				if(stats.inventory[app.main.inventoryTab][app.main.selected].tab == 'consumables'){
					draw.fillStyledText('black', '32px arial bold', stats.inventory[app.main.inventoryTab][app.main.selected].name, mg.x + 30, mg.y + mg.boxSize * 4.5, 'left');
					for(var i = 0; i < stats.inventory[app.main.inventoryTab][app.main.selected].effects.length; i++){
						draw.fillStyledText('black', '32px arial', "effect:", mg.x + 30, mg.y + mg.boxSize * (5 + i * .5), 'left');
						draw.fillStyledText('black', '32px arial', stats.inventory[app.main.inventoryTab][app.main.selected].effects[i].value + " " +
							stats.inventory[app.main.inventoryTab][app.main.selected].effects[i].stat, mg.x + 220, mg.y + mg.boxSize * (5 + i * .5), 'left');
					}
					draw.fillStyledText('black', '32px arial', stats.inventory[app.main.inventoryTab][app.main.selected].value, mg.x + 220, 
						mg.y + mg.boxSize * (4.5 + stats.inventory[app.main.inventoryTab][app.main.selected].effects.length * .5 + .5), 'left');
					draw.fillStyledText('black', '32px arial', "value:", mg.x + 30,
						mg.y + mg.boxSize * (4.5 + stats.inventory[app.main.inventoryTab][app.main.selected].effects.length * .5 + .5), 'left');
				}
				else{
					for(var i = 0; i < app.main.printOrder[stats.inventory[app.main.inventoryTab][app.main.selected].type].length; i++){
						var itemProp = app.main.printOrder[stats.inventory[app.main.inventoryTab][app.main.selected].type][i];
						if(itemProp != "name"){
							draw.fillStyledText('black', '32px arial', stats.inventory[app.main.inventoryTab][app.main.selected][itemProp], mg.x + 220, 
								mg.y + mg.boxSize * (4.5 + i * .5), 'left');
							draw.fillStyledText('black', '32px arial', itemProp + ":", mg.x + 30, mg.y + mg.boxSize * (4.5 + i * .5), 'left');
						}
						else{
							draw.fillStyledText('black', '32px arial bold', stats.inventory[app.main.inventoryTab][app.main.selected][itemProp], mg.x + 30, 
								mg.y + mg.boxSize * (4.5 + i * .5), 'left');
						}
					}
				}
			}
		}
	};

	draw.combat = {
		cl: app.main.COMBAT_LAYOUT,
		background: function(){
			draw.rect(0, 0, app.main.game.WIDTH, this.cl.bgHeight, this.cl.bgColor, this.cl.floorColor, this.cl.floorWidth);
		},

		floor: function(){
			draw.rect(0, this.cl.bgHeight, app.main.game.WIDTH, app.main.game.HEIGHT - this.cl.bgHeight, this.cl.floorFill, this.cl.floorColor, this.cl.floorWidth);
		},

		stats: function(){
			//player
			draw.fillStyledText('black', '32px arial bold', app.main.playerStats.name, this.cl.playerStats.name.x, this.cl.playerStats.name.y, 'left');
			draw.rect(this.cl.playerStats.hp.x, this.cl.playerStats.hp.y, this.cl.hpBar.width, this.cl.hpBar.height, 'red', 'black', 4);
			draw.rect(this.cl.playerStats.hp.x, this.cl.playerStats.hp.y, this.cl.hpBar.width * app.main.playerStats.combatStats.hitpoints / app.main.playerStats.hitpoints, 
				this.cl.hpBar.height, 'green', 'black', 4);

			//enemy
			draw.fillStyledText('black', '32px arial bold', app.main.currentEnemy.name, this.cl.enemyStats.name.x, this.cl.enemyStats.name.y, 'left');
			draw.rect(this.cl.enemyStats.hp.x, this.cl.enemyStats.hp.y, this.cl.hpBar.width, this.cl.hpBar.height, 'red', 'black', 4);
			draw.rect(this.cl.enemyStats.hp.x, this.cl.enemyStats.hp.y, this.cl.hpBar.width * app.main.currentEnemy.hitpoints / app.main.currentEnemy.maxHitpoints, 
				this.cl.hpBar.height, 'green', 'black', 4);
		},

		player: function(){
			var frame = this.cl.player;
			draw.circle(frame.head.x, frame.head.y, frame.headRadius, frame.color, frame.color);
			draw.line(frame.neck.x, frame.neck.y, frame.shoulders.x, frame.shoulders.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.shoulders.x, frame.shoulders.y, frame.pelvis.x, frame.pelvis.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.shoulders.x, frame.shoulders.y, frame.leftElbow.x, frame.leftElbow.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.shoulders.x, frame.shoulders.y, frame.rightElbow.x, frame.rightElbow.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.leftElbow.x, frame.leftElbow.y, frame.leftHand.x, frame.leftHand.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.rightElbow.x, frame.rightElbow.y, frame.rightHand.x, frame.rightHand.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.pelvis.x, frame.pelvis.y, frame.leftKnee.x, frame.leftKnee.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.pelvis.x, frame.pelvis.y, frame.rightKnee.x, frame.rightKnee.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.leftKnee.x, frame.leftKnee.y, frame.leftFoot.x, frame.leftFoot.y, frame.color, frame.bodyWidth, 'round');
			draw.line(frame.rightKnee.x, frame.rightKnee.y, frame.rightFoot.x, frame.rightFoot.y, frame.color, frame.bodyWidth, 'round');
		},

		enemy: function(){

		}
	};

    return draw;
}()
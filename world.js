
"use strict";

var app = app || {};

//!this will need to be saved and loaded from a save game file, including player stats -> loaded in during init (use ipcMain)
app.world = function () {
    var world = [[],[],[],[],[],[],[],[],[],[]];
    for(var i = 0; i < world.length; i++){
        world[i].push([]);
    }

    var shop1 = {
        x: 300,
        y: 300,
        width: 400,
        height: 250,
        door: 'top',
        type: app.main.WORLD_TYPES.SHOP,
        color: app.main.SHOP.buildingColor,
        shape: 'rect',
        inventory: [
            app.items.consumables().hp_add_small,
            app.items.junk().nails,
            app.items.weapons().dagger,
            app.items.valuables().amethyst
        ],
        saveType: app.main.SAVE_TYPES.STATIC
    }
    var shop2 = {
        x: 200,
        y: 600,
        width: 250,
        height: 100,
        door: 'bottom',
        type: app.main.WORLD_TYPES.SHOP,
        color: app.main.SHOP.buildingColor,
        shape: 'rect',
        inventory: [
            app.items.armor().chestplate,
            app.items.weapons().sword,
            app.items.armor().boots
        ],
        saveType: app.main.SAVE_TYPES.STATIC
    }

    var pendant = app.items.magicItems().magicPendant;
    var item1 = {
        x: 700,
        y: 175,
        radius: app.main.GROUND_ITEM.radius,
        type: app.main.WORLD_TYPES.ITEM,
        item: pendant,
        color: app.main.MENU_GRID.MENU_COLORS[pendant.tab],
        shape: 'circle',
        saveType: app.main.SAVE_TYPES.DYNAMIC
    }

    var leggings = app.items.armor().leggings;
    var item2 = {
        x: 135,
        y: 90,
        radius: app.main.GROUND_ITEM.radius,
        type: app.main.WORLD_TYPES.ITEM,
        item: leggings,
        color: app.main.MENU_GRID.MENU_COLORS[leggings.tab],
        shape: 'circle',
        saveType: app.main.SAVE_TYPES.DYNAMIC
    }

    var npc1 = {
        x: 300,
        y: 80,
        radius: app.main.player.radius,
        type: app.main.WORLD_TYPES.NPC,
        status: app.main.NPC_TYPES.FRIENDLY,
        color: app.main.NPC_COLORS.FRIENDLY,
        shape: 'circle',
        dialogue: app.dialogue.create([
            "a%%%Hey, stranger! You must be new around here. Name's Zeye. I'm the leader of this town. What's yours?%%%0",
            "aa%%%Hey, don't mind me. I'm just passing through.%%%1",
            "ab%%%Hi Zeye! I'm " + app.main.playerStats.name + ". Nice town you've got. What's there to do around here?%%%1",
            "aaa%%%Ok friend. Stay safe out there!%%%0",
            "aba%%%Isn't it? We've got a general store and a blacksmith. Got no inn, but you'll find one less than a day's travel south.%%%0",
            "abaa%%%You're welcome to rest here and enjoy the town as long as you want before you head out.%%%0",
            "abaaa%%%Thanks, Zeye!%%%1"
        ]),
        saveType: app.main.SAVE_TYPES.STATIC
    }

    var npc2 = {
        x: 800,
        y: 200,
        radius: app.main.player.radius,
        type: app.main.WORLD_TYPES.NPC,
        status: app.main.NPC_TYPES.FRIENDLY,
        color: app.main.NPC_COLORS.FRIENDLY,
        shape: 'circle',
        dialogue: app.dialogue.create([
            "a%%%Don't bother me unless you've got skill in battle. I don't talk to weaklings.%%%0",
            "aa%%%And a good day to you too.%%%1",
            "ab%%%Big talk from a bunch of pixels on a screen.%%%1",
            "aba%%%Look who's talking! If you're gonna be blatantly breaking the fourth wall, do it somewhere else.%%%0",
            "abaa%%%It's bad enough I gotta listen to Zeye introduce himself to strangers all day. Now I've got this guy completely tearing down everything I thought was real!%%%0",
            "abaaa%%%Alright, alright. Sorry...%%%1",
            "abaaaa%%%Oh he's sorry he says! That's just great. Ya know what? I've completely forgotten my entire reality is fabricated.%%%0",
            "abaaaaa%%%You must have magical apologies! Thanks sooo much, mighty wizard. I'm compleeeetely fine now! THANK YOU SOOOO MUCH!%%%0",
            "abaaaaaa%%%Right...I'm gonna go...%%%1"
        ]),
        saveType: app.main.SAVE_TYPES.STATIC
    }
    
    var npc3 = {
        x: 100,
        y: 250,
        radius: app.main.player.radius,
        aggroRadius: app.main.player.radius * 3,
        type: app.main.WORLD_TYPES.NPC,
        status: app.main.NPC_TYPES.HOSTILE,
        color: app.main.NPC_COLORS.HOSTILE,
        name: 'Odric',
        shape: 'circle',
        inventory: {
			consumables: [],
			weapons: [],
			armor: [],
			magicItems: [],
			junk: [app.items.junk().nails],
			valuables: [app.items.valuables().ruby, app.items.valuables().amethyst]
		},
		equipped: {
			weapon: {name: app.items.weapons().sword},
			shield: {name: app.items.weapons().shield},
			helm: {name: "empty"},
			body: {name: "empty"},
			legs: {name: "empty"},
			boots: {name: "empty"},
			gloves: {name: "empty"},
			magic1: {name: "empty"},
			magic2: {name: "empty"},
		},
        level: 1,
		xp: 17,
		money: 9,
		hitpoints: 18,
        maxHitpoints: 18,
		mana: 0,
		strength: 1,
		dexterity: 1,
		defense: 2,
		resistance: 1,
		magicDefense: 0,
		physicalDefense: 0,
		magics: [
			{n:"fire", l: 0},
			{n:"water", l: 0},
			{n:"earth", l: 0},
			{n:"wind", l: 0},
			{n:"lightning", l: 0},
			{n:"light", l: 0},
			{n:"shadow", l: 0},
			{n:"crystal", l: 0},
			{n:"smoke", l: 0},
			{n:"sand", l: 0},
			{n:"mud", l: 0},
			{n:"ice", l: 0},
			{n:"void", l: 0},
			{n:"lava", l: 0},
			{n:"frost", l: 0},
			{n:"glass", l: 0},
			{n:"metal", l: 0},
			{n:"poison", l: 0},
			{n:"blood", l: 0},
			{n:"zombie", l: 0},
		],
        defeated: false,
        saveType: app.main.SAVE_TYPES.STATIC
    }

    world[0][0].push(shop1);
    world[0][0].push(shop2);
    world[0][0].push(item1);
    world[0][0].push(item2);
    world[0][0].push(npc1);
    world[0][0].push(npc2);
    world[0][0].push(npc3);

    return world; 
}
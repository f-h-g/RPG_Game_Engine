
"use strict";

var app = app || {};

app.items = function(){
    var items = {};

    items.consumables = function () {
        var c = {
            hp_add_small: {effects: [items.STAT_EFFECTS().HP_ADD_SMALL], name: "HP Add", value: 1, type: 'consumable'},
            hp_sub_small: {effects: [items.STAT_EFFECTS().HP_SUB_SMALL], name: "HP Sub", value: 1, type: 'consumable'},
            buff_item: {effects: [items.STAT_EFFECTS().STR_ADD_LARGE, items.STAT_EFFECTS().DEX_ADD_LARGER], name: "Combat Buff", value: 1, type: 'consumable'},
            drain_item: {effects: [items.STAT_EFFECTS().STR_SUB_LARGEST, items.STAT_EFFECTS().DEX_SUB_SMALL], name: "Combat Drain", value: 1, type: 'consumable'}
        };
        for(var item in c){
            c[item].tab = "consumables";
        }
        return c;
    }

    items.weapons = function () {
        var w = {
            sword: {attribute: "physical", damage: 2, name: "sword", value: 1, type: 'weapon'},
            dagger: {attribute: "physical", damage: 1, name: "dagger", value: 1, type: 'weapon'},
            shield: {attribute: 'physical', defense: 1, name: "shield", value: 1, type: 'shield'}
        };
        for(var item in w){
            w[item].tab = "weapons";
        }
        return w;
    }

    items.armor = function () {
        var a = {
            helmet: {attribute: "physical", defense: 1, name: "helmet", value: 1, type: 'helm'},
            chestplate: {attribute: "physical", defense: 1, name: "chestplate", value: 1, type: 'body'},
            leggings: {attribute: "physical", defense: 1, name: "leggings", value: 1, type: 'legs'},
            boots: {attribute: "physical", defense: 1, name: "boots", value: 1, type: 'boots'},
            gloves: {attribute: "physical", defense: 1, name: "gloves", value: 1, type: 'gloves'}
        };
        for(var item in a){
            a[item].tab = "armor";
        }
        return a;
    }

    items.magicItems = function () {
        var m = {
            magicPendant: {attribute: "water", defense: 4, name: "magic pendant", value: 1, type: 'necklace'},
            magicRing: {attribute: "fire", defense: 2, name: "magic ring", value: 1, type: 'ring'}
        };
        for(var item in m){
            m[item].tab = "magicItems";
        }
        return m;
    }

    items.junk = function () {
        var j = {
            string: {name: "string", value: 1},
            nails: {name: "nails", value: 1}
        };

        for(var item in j){
            j[item].tab = "junk";
            j[item].type = "junk";
        }
        return j;
    }

    items.valuables = function () {
        var v = {
            amethyst: {name: "amethyst", value: 10},
            ruby: {name: "ruby", value: 10}
        };
        for(var item in v){
            v[item].tab = "valuables";
            v[item].type = "valuables";
        }
        return v;
    }
    

    items.STAT_EFFECTS = function () {
        return {
            HP_ADD_SMALL: {stat: 'hitpoints', value: 5},
            HP_ADD_MEDIUM: {stat: 'hitpoints', value: 15},
            HP_ADD_LARGE: {stat: 'hitpoints', value: 35},
            HP_ADD_LARGER: {stat: 'hitpoints', value: 65},
            HP_ADD_LARGEST: {stat: 'hitpoints', value: 95},
            HP_ADD_JK_ACTUAL_LARGEST: {stat: 'hitpoints', value: 145},
            HP_SUB_SMALL: {stat: 'hitpoints', value: -2},
            HP_SUB_MEDIUM: {stat: 'hitpoints', value: -6},
            HP_SUB_LARGE: {stat: 'hitpoints', value: -12},
            HP_SUB_LARGER: {stat: 'hitpoints', value: -18},
            HP_SUB_LARGEST: {stat: 'hitpoints', value: -26},
            HP_SUB_JK_ACTUAL_LARGEST: {stat: 'hitpoints', value: -38},
            MANA_ADD_SMALL: {stat: 'mana', value: 15},
            MANA_ADD_MEDIUM: {stat: 'mana', value: 35},
            MANA_ADD_LARGE: {stat: 'mana', value: 65},
            MANA_ADD_LARGER: {stat: 'mana', value: 95},
            MANA_ADD_LARGEST: {stat: 'mana', value: 125},
            MANA_ADD_JK_ACTUAL_LARGEST: {stat: 'mana', value: 185},
            MANA_SUB_SMALL: {stat: 'mana', value: -5},
            MANA_SUB_MEDIUM: {stat: 'mana', value: -15},
            MANA_SUB_LARGE: {stat: 'mana', value: -35},
            MANA_SUB_LARGER: {stat: 'mana', value: -55},
            MANA_SUB_LARGEST: {stat: 'mana', value: -85},
            MANA_SUB_JK_ACTUAL_LARGEST: {stat: 'mana', value: -115},
            STR_ADD_SMALL: {stat: 'strength', value: 1},
            STR_ADD_MEDIUM: {stat: 'strength', value: 3},
            STR_ADD_LARGE: {stat: 'strength', value: 5},
            STR_ADD_LARGER: {stat: 'strength', value: 8},
            STR_ADD_LARGEST: {stat: 'strength', value: 11},
            STR_ADD_JK_ACTUAL_LARGEST: {stat: 'strength', value: 15},
            STR_SUB_SMALL: {stat: 'strength', value: -1},
            STR_SUB_MEDIUM: {stat: 'strength', value: -2},
            STR_SUB_LARGE: {stat: 'strength', value: -4},
            STR_SUB_LARGER: {stat: 'strength', value: -5},
            STR_SUB_LARGEST: {stat: 'strength', value: -7},
            STR_SUB_JK_ACTUAL_LARGEST: {stat: 'strength', value: -10},
            DEX_ADD_SMALL: {stat: 'dexterity', value: 1},
            DEX_ADD_MEDIUM: {stat: 'dexterity',value: 3},
            DEX_ADD_LARGE: {stat: 'dexterity', value: 5},
            DEX_ADD_LARGER: {stat: 'dexterity',value: 8},
            DEX_ADD_LARGEST: {stat: 'dexterity', value: 11},
            DEX_ADD_JK_ACTUAL_LARGEST: {stat: 'dexterity',value: 15},
            DEX_SUB_SMALL: {stat: 'dexterity', value: -1},
            DEX_SUB_MEDIUM: {stat: 'dexterity', value: -2},
            DEX_SUB_LARGE: {stat: 'dexterity', value: -4},
            DEX_SUB_LARGER: {stat: 'dexterity',  value: -5},
            DEX_SUB_LARGEST: {stat: 'dexterity', value: -7},
            DEX_SUB_JK_ACTUAL_LARGEST: {stat: 'dexterity', value: -10}
        };
	}
    
    return items;
}()
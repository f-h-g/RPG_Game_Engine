"use strict";

var app = app || {};

//!player is target 0, npc is 1, any others can be defined later (multi target fights / attacks?)
//!turns defines the number of turns the effect is on the combat stack (in case of multi-turn paralyze / poison effects and the like)
app.magic = function(){
    var magic = {};

    magic.fire = function(){
        return {
            0: {
                name: "weak healing flames",
                target: 0,
                stat: app.main.MAGIC_TARGET_STAT.HP,
                value: 4,
                turns: 1,
                cost: 0
            },
            1: {
                name: "small fireball",
                target: 1,
                stat: app.main.MAGIC_TARGET_STAT.HP,
                value: 3,
                turns: 1,
                cost: 1
            },
            2: {
                name: "weak flame wall",
                target: 0,
                stat: app.main.MAGIC_TARGET_STAT.MD,
                value: 2,
                turns: 2,
                cost: 2
            }
        }
    }

    return magic;
}()
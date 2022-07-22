"use strict";

var app = app || {};

app.animation = function(){
    var animations = {};

    animations.combat = {
        idlePlayer: [
            {
                x: 100, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -20}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 15}, rightKnee: {a: -20}, leftFoot: {a: 25}, rightFoot: {a: -5},
            }
        ],
        player: [
            {
                x: 100, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -20}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 15}, rightKnee: {a: -20}, leftFoot: {a: 25}, rightFoot: {a: -115},
            },
            {
                x: 150, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 5}, rightKnee: {a: -20}, leftFoot: {a: 15}, rightFoot: {a: -5},
            },
            {
                x: 200, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 5}, rightKnee: {a: -10}, leftFoot: {a: 15}, rightFoot: {a: -5},
            },
            {
                x: 250, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -5}, rightKnee: {a: 0}, leftFoot: {a: 10}, rightFoot: {a: -10},
            },
            {
                x: 300, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -15}, rightKnee: {a: 10}, leftFoot: {a: 5}, rightFoot: {a: -15},
            },
            {
                x: 350, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -25}, rightKnee: {a: 20}, leftFoot: {a: 0}, rightFoot: {a: -20},
            },
            {
                x: 400, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -20}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 15}, rightKnee: {a: -20}, leftFoot: {a: 25}, rightFoot: {a: -115},
            },
            {
                x: 450, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 5}, rightKnee: {a: -20}, leftFoot: {a: 15}, rightFoot: {a: -5},
            },
            {
                x: 500, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: 5}, rightKnee: {a: -10}, leftFoot: {a: 15}, rightFoot: {a: -5},
            },
            {
                x: 550, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -5}, rightKnee: {a: 0}, leftFoot: {a: 10}, rightFoot: {a: -10},
            },
            {
                x: 600, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -15}, rightKnee: {a: 10}, leftFoot: {a: 5}, rightFoot: {a: -15},
            },
            {
                x: 650, y: 200, color: 'black',
                get head(){ return {x: this.x + 50, y: this.y + 50}; },
                get neck(){ return {x: this.x + 50, y: this.y + 50 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get shoulders(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.headRadius}; },
                get pelvis(){ return {x: this.x + 50, y: this.y + 60 + app.main.COMBAT_LAYOUT.player.torsoLength}; },
                leftElbow: {a: -30}, rightElbow: {a: 20}, leftHand: {a: -110}, rightHand: {a: -5},
                leftKnee: {a: -25}, rightKnee: {a: 20}, leftFoot: {a: 0}, rightFoot: {a: -20},
            }
        ]
    }

    return animations;
}()
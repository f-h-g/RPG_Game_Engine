
"use strict";

var app = app || {};

app.dialogue = function(){
    var dialogue = {};

    //unique id (a-z) -> one letter for each level / terminator (%%%) / message / terminator (%%%), directedAt (0 for player, 1 for npc)
    dialogue.create = function(d){
        //https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path -> courtesy of Adriano Spadoni
        const setPath = (object, path, value) => path.split('.').reduce((o,p,i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object);

        const resolvePath = (object, path, defaultValue) => path.split('.').reduce((o, p) => o ? o[p] : defaultValue, object);

        var tree = {};
        for(var i = 0; i < d.length; i++){
            var split = d[i].split('%%%');
            var id = split[0].split('').join('.');
            var message = split[1];
            var directedAt = split[2];

            if(!resolvePath(tree, id)) setPath(tree, id, {message: message, directedAt: directedAt});
        }
        return tree;
    }

    return dialogue;
}()

// console.log(app.dialogue().create(["a%%%Hi%%%0", "aa%%%Yo%%%1", "b%%%Sup%%%0", "ba%%%Hey%%%1", "ab%%%Howdy%%%0", "aba%%%Hola%%%1"]));
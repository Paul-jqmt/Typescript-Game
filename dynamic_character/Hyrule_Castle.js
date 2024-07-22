"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
var c = require('ansi-colors');
function main() {
    (0, function_1.resetJson)();
    (0, function_1.getRandomEnemy)();
    var character_choosed = (0, function_1.classChoosing)();
    var hero_alive = (0, function_1.checkHeroLife)(character_choosed);
    var character_max_hp = (0, function_1.maximumHealth)(character_choosed);
    console.log("Now time to save the Princess !!");
    console.log("\"You entered the donjon\"");
    console.log(c.red("================= ") + "floor : " + (function_1.floorStage + 1) + c.red(" ================="));
    (0, function_1.displayStat)(character_choosed);
    var goodInput = 1;
    while (hero_alive === true && function_1.floorStage < 10) {
        for (var i = 0; i < 1;) {
            var answer = (0, function_1.questionForPlayer)("Attack or Heal ?\n").toLowerCase();
            if (answer === "attack") {
                (0, function_1.playerAttack)(character_choosed);
                i = 1;
            }
            else if (answer === "heal") {
                (0, function_1.playerHeal)(character_choosed, character_max_hp);
                i = 1;
            }
            else {
                console.log("Dont waste time the princess need to be save...");
            }
        }
        (0, function_1.enemiesAttack)(character_choosed);
        hero_alive = (0, function_1.checkHeroLife)(character_choosed);
        if (function_1.floorStage < 10) {
            (0, function_1.displayStat)(character_choosed);
        }
        if (hero_alive === false) {
            console.log("Sadly our beloved hero lost his life trying to save the princess...");
        }
    }
}
main();

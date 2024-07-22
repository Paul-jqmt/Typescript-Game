"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = exports.baseLink = exports.getRandomEnemy = exports.classChoosing = exports.displayStat = exports.maximumHealth = exports.playerHeal = exports.nextFloor = exports.checkHeroLife = exports.playerAttack = exports.enemiesAttack = exports.questionForPlayer = exports.resetJson = exports.character_hp = exports.floorStage = void 0;
var fs = require("fs");
var rl = require("readline-sync");
var c = require('ansi-colors');
exports.floorStage = 0;
exports.character_hp = 0;
function resetJson() {
    var base_data_player = jsonParse("playercopy.json");
    fs.writeFileSync("player.json", JSON.stringify(base_data_player, null, 2));
}
exports.resetJson = resetJson;
function questionForPlayer(question) {
    var answer = rl.question(question + "\n");
    return answer;
}
exports.questionForPlayer = questionForPlayer;
function enemiesAttack(character) {
    var data_player = jsonParse("player.json");
    var data_monster = jsonParse("enemiesrandom.json");
    var monster_str = 0;
    if (checkIfMonsterDead() === false) {
        nextFloor();
        return;
    }
    monster_str = data_monster[exports.floorStage].str;
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === (character)) {
            data_player[i].hp -= monster_str;
        }
    }
    if (exports.floorStage < 8) {
        console.log("The weird looking enemie just hit you, be carefull don't underestimate him... Even though he look ugly...");
    }
    else {
        console.log("Be carefull the is super powerfull... Check your life often if you dont want to die...");
    }
    fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2));
}
exports.enemiesAttack = enemiesAttack;
function playerAttack(character) {
    var data_player = jsonParse("player.json");
    var data_monster = jsonParse("enemiesrandom.json");
    var character_str = 0;
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === (character)) {
            character_str = data_player[i].str;
        }
    }
    console.log("You smash down your sword into the enemy!!");
    data_monster[exports.floorStage].hp = data_monster[exports.floorStage].hp - character_str;
    fs.writeFileSync(("enemiesrandom.json"), JSON.stringify(data_monster, null, 2));
}
exports.playerAttack = playerAttack;
function checkHeroLife(character) {
    var data_player = jsonParse("player.json");
    var true_false = true;
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === (character)) {
            if (data_player[i].hp <= 0) {
                true_false = false;
            }
        }
    }
    return true_false;
}
exports.checkHeroLife = checkHeroLife;
function checkIfMonsterDead() {
    var data_monster = jsonParse("enemiesrandom.json");
    var true_false = true;
    if (data_monster[exports.floorStage].hp <= 0 && exports.floorStage < 9) {
        exports.floorStage++;
        console.log("Wooow impressive you just killed him with so much elegance !!");
        true_false = false;
    }
    else if (data_monster[exports.floorStage].hp <= 0 && exports.floorStage < 10) {
        exports.floorStage++;
        console.log("YOU DID IT !!!! You killed Ganon and save the princess ! Thank you very much hero !");
        console.log(c.yellow("Congratulation you won !!"));
        true_false = false;
    }
    return true_false;
}
function nextFloor() {
    if (exports.floorStage < 10) {
        if (exports.floorStage < 9) {
            console.log(c.red("================= ") + "floor : " + (exports.floorStage + 1) + c.red(" ================="));
        }
        else {
            console.log(c.red("================= ") + "floor : " + (exports.floorStage + 1) + c.red(" ================="));
            console.log("\"You have entered the boss floor\"\nBe carefull he is really powerfull... Good luck bring back the princess!");
        }
    }
}
exports.nextFloor = nextFloor;
function playerHeal(character, maxHealth) {
    var data_player = jsonParse("player.json");
    var character_hp_now = 0;
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === (character)) {
            character_hp_now = data_player[i].hp;
            if (character_hp_now + (maxHealth / 2) > maxHealth) {
                character_hp_now = maxHealth;
                data_player[i].hp = character_hp_now;
                fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2));
            }
            else {
                character_hp_now += (maxHealth / 2);
                data_player[i].hp = character_hp_now;
                fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2));
            }
        }
    }
}
exports.playerHeal = playerHeal;
function maximumHealth(character) {
    var data_player = jsonParse("player.json");
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === character) {
            exports.character_hp = data_player[i].hp;
        }
    }
    console.log("You start with " + exports.character_hp + ". Be carefull the monster inside are dangerous...");
    return exports.character_hp;
}
exports.maximumHealth = maximumHealth;
function displayStat(character) {
    var data_player = jsonParse("player.json");
    var data_monster = jsonParse("enemiesrandom.json");
    var monster_hp = 0;
    var character_health_bar = "";
    var monster_health_bar = "";
    var monster = "";
    for (var i = 0; i < data_player.length; i++) {
        if (data_player[i].name === character) {
            exports.character_hp = data_player[i].hp;
        }
    }
    // for(let j = 0; j < data_monster.length; j++){
    //   if(data_monster[j].id === floorStage + 1){
    //     monster_hp = data_monster[j].hp
    //     monster += data_monster[j].name
    //   }
    // }
    monster_hp = data_monster[exports.floorStage].hp;
    monster += data_monster[exports.floorStage].name;
    for (var k = 0; k < exports.character_hp; k++) {
        character_health_bar += "-";
    }
    for (var l = 0; l < monster_hp; l++) {
        monster_health_bar += "-";
    }
    console.log(character + " health: " + character_health_bar + " " + c.green(exports.character_hp + " hp"));
    console.log(monster + " health: " + monster_health_bar + " " + c.red(monster_hp + " hp"));
    return exports.character_hp;
}
exports.displayStat = displayStat;
function classChoosing() {
    var character_choosed = "";
    var random_number = Math.floor(Math.random() * 100);
    if (random_number < 50) {
        character_choosed = "Link";
    }
    else if (random_number < 80 && random_number >= 50) {
        character_choosed = "Young Link";
    }
    else if (random_number < 95 && random_number >= 80) {
        character_choosed = "Sheik";
    }
    else if (random_number < 99 && random_number >= 95) {
        character_choosed = "Impa";
    }
    else if (random_number < 100 && random_number >= 99) {
        character_choosed = "Hylia";
    }
    console.log("Your character for this try has been choosed !!!\nIt is... " + c.yellow(character_choosed));
    return character_choosed;
}
exports.classChoosing = classChoosing;
function raretyGen() {
    var rarety = 0;
    var random_number = Math.floor(Math.random() * 100);
    if (random_number < 50) {
        rarety = 1;
    }
    else if (random_number < 80 && random_number >= 50) {
        rarety = 2;
    }
    else if (random_number < 95 && random_number >= 80) {
        rarety = 3;
    }
    else if (random_number < 99 && random_number >= 95) {
        rarety = 4;
    }
    else if (random_number < 100 && random_number >= 99) {
        rarety = 5;
    }
    return rarety;
}
function getRandomEnemy() {
    var data_enemy = jsonParse("enemies.json");
    var data_bosses = jsonParse("bosses.json");
    var rarety_now = 0;
    var rarety_enemy = [];
    var boss_enemy = [];
    var final_enemy = [];
    for (var i = 0; i < 9; i++) {
        rarety_now = raretyGen();
        for (var j = 0; j < data_enemy.length; j++) {
            if (data_enemy[j].rarity === rarety_now) {
                rarety_enemy.push(data_enemy[j]);
            }
        }
        final_enemy.push(rarety_enemy[Math.floor(Math.random() * rarety_enemy.length)]);
    }
    for (var k = 0; k < 1; k++) {
        rarety_now = raretyGen();
        for (var l = 0; l < data_bosses.length; l++) {
            if (data_bosses[l].rarity === rarety_now) {
                boss_enemy.push(data_bosses[l]);
            }
        }
        final_enemy.push(boss_enemy[Math.floor(Math.random() * boss_enemy.length)]);
    }
    fs.writeFileSync(("enemiesrandom.json"), JSON.stringify(final_enemy, null, 2));
}
exports.getRandomEnemy = getRandomEnemy;
function baseLink() {
    var character_choosed = "Link";
    console.log("Your character for this try has been choosed !!!\nIt is... " + c.yellow(character_choosed));
    return character_choosed;
}
exports.baseLink = baseLink;
function jsonParse(path) {
    var json_file = fs.readFileSync(path);
    var data_json = JSON.parse(json_file);
    return data_json;
}
exports.jsonParse = jsonParse;
getRandomEnemy();

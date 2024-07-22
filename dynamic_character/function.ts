import * as fs from "fs";

import * as rl from "readline-sync"

const c = require('ansi-colors');

export let floorStage: number = 0;
export let character_hp: number = 0;

export function resetJson()
{
  let base_data_player = jsonParse("playercopy.json")

  fs.writeFileSync("player.json" , JSON.stringify(base_data_player, null, 2))
}

export function questionForPlayer(question: string)
{
  let answer = rl.question(question + "\n")
  return answer;
}

export function enemiesAttack(character: string)
{
  let data_player = jsonParse("player.json")
  let data_monster = jsonParse("enemiesrandom.json")
  let monster_str: number = 0;

  if(checkIfMonsterDead() === false){
    nextFloor()
    return; 
  }

  monster_str = data_monster[floorStage].str

  for(let i = 0; i < data_player.length; i ++){
    if(data_player[i].name === (character)){
      data_player[i].hp -= monster_str;
    }
  }
  if(floorStage < 8){
    console.log("The weird looking enemie just hit you, be carefull don't underestimate him... Even though he look ugly...")
  } else {
    console.log("Be carefull the is super powerfull... Check your life often if you dont want to die...")
  }
  fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2))

}

export function playerAttack(character: string)
{
  let data_player = jsonParse("player.json")
  let data_monster = jsonParse("enemiesrandom.json")
  let character_str: number = 0;

  for(let i = 0; i < data_player.length; i++){
    if(data_player[i].name === (character)){
      character_str = data_player[i].str
    }
  }
  console.log("You smash down your sword into the enemy!!")
  
  data_monster[floorStage].hp = data_monster[floorStage].hp - character_str
    
  fs.writeFileSync(("enemiesrandom.json"), JSON.stringify(data_monster, null, 2));

}

export function checkHeroLife(character: string)
{
  let data_player = jsonParse("player.json")
  let true_false: boolean = true;

  for(let i = 0; i < data_player.length; i++){
    if(data_player[i].name === (character)){
      if(data_player[i].hp <=0){
        true_false = false;
      }
    }
  }
  return true_false;
}

function checkIfMonsterDead()
{
  let data_monster = jsonParse("enemiesrandom.json")
  let true_false: boolean = true;

  if(data_monster[floorStage].hp <= 0 && floorStage < 9){
    floorStage++
    console.log("Wooow impressive you just killed him with so much elegance !!")
    true_false = false;

  } else if(data_monster[floorStage].hp <= 0 && floorStage < 10){
    floorStage++
    console.log("YOU DID IT !!!! You killed Ganon and save the princess ! Thank you very much hero !")
    console.log(c.yellow("Congratulation you won !!"))
    true_false = false;
  }
  return true_false;
}

export function nextFloor()
{
 if(floorStage < 10){
  if(floorStage < 9){
    console.log(c.red("================= ") + "floor : " + (floorStage + 1) + c.red(" ================="))
  } else {
    console.log(c.red("================= ") + "floor : " + (floorStage + 1) + c.red(" ================="))
    console.log("\"You have entered the boss floor\"\nBe carefull he is really powerfull... Good luck bring back the princess!")
  }
 }
  
}

export function playerHeal(character: string, maxHealth: number)
{
  let data_player = jsonParse("player.json")
  let character_hp_now: number = 0;

  for(let i = 0; i < data_player.length; i++){
    if(data_player[i].name === (character)){
      character_hp_now = data_player[i].hp
      if(character_hp_now + (maxHealth / 2) > maxHealth){
        character_hp_now = maxHealth;
        data_player[i].hp = character_hp_now;
        fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2))

      } else {
        character_hp_now += (maxHealth / 2)
        data_player[i].hp = character_hp_now;
        fs.writeFileSync(("player.json"), JSON.stringify(data_player, null, 2))
      }
    }
  }
}

export function maximumHealth(character: string)
{
  let data_player = jsonParse("player.json")
  
  for(let i = 0; i < data_player.length; i ++){
    if(data_player[i].name === character){
      character_hp = data_player[i].hp      
    }
  }
  console.log("You start with " + character_hp + ". Be carefull the monster inside are dangerous...")
  return character_hp
}

export function displayStat(character: string)
{
  let data_player = jsonParse("player.json")
  let data_monster = jsonParse("enemiesrandom.json")
  
  let monster_hp: number = 0;
  let character_health_bar: string = "";
  let monster_health_bar: string = "";
  let monster: string = "";
  
  for(let i = 0; i < data_player.length; i ++){
    if(data_player[i].name === character){
      character_hp = data_player[i].hp      
    }
  }

  // for(let j = 0; j < data_monster.length; j++){
  //   if(data_monster[j].id === floorStage + 1){
  //     monster_hp = data_monster[j].hp
  //     monster += data_monster[j].name
  //   }
  // }
  monster_hp = data_monster[floorStage].hp
  monster += data_monster[floorStage].name

  for(let k = 0; k < character_hp; k++){
    character_health_bar += "-";
  }

  for(let l = 0; l < monster_hp; l++){
    monster_health_bar += "-";
  }

  console.log(character + " health: " +  character_health_bar + " " + c.green(character_hp + " hp"))
  console.log(monster + " health: " + monster_health_bar + " " + c.red(monster_hp + " hp"))
  return character_hp 
}

export function classChoosing()
{
  let character_choosed: string = "";

  const random_number: number = Math.floor(Math.random()* 100) 

  if(random_number < 50){
    character_choosed = "Link"
  } else if(random_number < 80 && random_number >= 50){
    character_choosed = "Young Link"
  } else if(random_number < 95 && random_number >= 80){
    character_choosed = "Sheik"
  } else if(random_number < 99 && random_number >= 95){
    character_choosed = "Impa"
  } else if(random_number < 100 && random_number >= 99){
    character_choosed = "Hylia"
  }
  console.log("Your character for this try has been choosed !!!\nIt is... " + c.yellow(character_choosed))
  return character_choosed;
}

function raretyGen()
{
  let rarety: number = 0;

  const random_number: number = Math.floor(Math.random()* 100) 

  if(random_number < 50){
    rarety = 1
  } else if(random_number < 80 && random_number >= 50){
    rarety = 2
  } else if(random_number < 95 && random_number >= 80){
    rarety = 3
  } else if(random_number < 99 && random_number >= 95){
    rarety = 4
  } else if(random_number < 100 && random_number >= 99){
    rarety = 5
  }
  return rarety;
}

export function getRandomEnemy()
{
  let data_enemy = jsonParse("enemies.json")
  let data_bosses = jsonParse("bosses.json")

  let rarety_now: number = 0;
  
  let rarety_enemy: any [] = [];

  let boss_enemy: any [] = [];

  let final_enemy: any [] = [];

 
  for(let i = 0; i < 9; i++){
    rarety_now = raretyGen()
    for(let j = 0; j < data_enemy.length; j++){
      if(data_enemy[j].rarity === rarety_now){
        rarety_enemy.push(data_enemy[j])
      }
    }
    final_enemy.push(rarety_enemy[Math.floor(Math.random() * rarety_enemy.length)])
  }

  for(let k = 0; k < 1; k++){
    rarety_now = raretyGen()
    for(let l = 0; l < data_bosses.length; l++){
      if(data_bosses[l].rarity === rarety_now){
        boss_enemy.push(data_bosses[l])
    }
  }
    final_enemy.push(boss_enemy[Math.floor(Math.random() * boss_enemy.length)])
  }
  fs.writeFileSync(("enemiesrandom.json"), JSON.stringify(final_enemy, null ,2))

}

export function baseLink()
{
  let character_choosed = "Link"
  console.log("Your character for this try has been choosed !!!\nIt is... " + c.yellow(character_choosed))
  return character_choosed
}

export function jsonParse(path: string)
{
  let json_file: any = fs.readFileSync(path);
  let data_json = JSON.parse(json_file)
  return data_json;
}

getRandomEnemy()
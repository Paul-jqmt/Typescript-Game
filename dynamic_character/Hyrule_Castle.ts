import { checkHeroLife, displayStat, maximumHealth, playerAttack, playerHeal, classChoosing, questionForPlayer, floorStage, enemiesAttack, baseLink, resetJson, getRandomEnemy} from "./function"

const c = require('ansi-colors');

function main()
{
    resetJson()
    getRandomEnemy()
    let character_choosed = classChoosing()
    let hero_alive: boolean = checkHeroLife(character_choosed)
    const character_max_hp = maximumHealth(character_choosed)

    console.log("Now time to save the Princess !!")
    console.log("\"You entered the donjon\"")
    console.log(c.red("================= ") + "floor : " + (floorStage + 1) + c.red(" ================="))
    displayStat(character_choosed)

    let goodInput: number = 1;

    while(hero_alive === true && floorStage < 10){  
        
        for(let i = 0; i < 1;){
            let answer = questionForPlayer("Attack or Heal ?\n").toLowerCase()
            if(answer === "attack"){
                playerAttack(character_choosed)
                i = 1
            } else if(answer === "heal"){
                playerHeal(character_choosed, character_max_hp)
                i = 1
            } else {
                console.log("Dont waste time the princess need to be save...")
            }
        }
        enemiesAttack(character_choosed)
        hero_alive = checkHeroLife(character_choosed)

        if(floorStage < 10){
            displayStat(character_choosed)
        }     
        
           
        

    if(hero_alive === false){
        console.log("Sadly our beloved hero lost his life trying to save the princess...")
    }
   
}
}

main()
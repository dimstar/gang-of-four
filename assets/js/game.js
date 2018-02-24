/*
notes: use arrow functions! (if possible)

The game object and scafolded files for the Gang of Four Fighting Game (based on Star Wars RPG)

Game: "this is our main game object, contains and scopes everything",
    fightpit: "this contains who is attacker, defender",
        attacker: ,
        defender: ,
        terrain: "gives modifiers, size effects range, etc.",
    player: "this is the, you guessed, the player. the player is playing as a mech pilot",
    mechs:  "these are mechs with all different properties like Health, Attack Power, Counter Attack Power",
        slugtosser
        gobstomper
        atomsmasher
        fornicator
    actions: "not sure what to call this but it 'does things'"
        attack:
        defend: "maybe I don't need this?"
        takeDamage:

*/

var game = {
    fightpit: {
        playerMech: "",
        defender: "",
        attackPhase: function(attacker, defender){

        },
        setDefender: function(who){

        }
    },
    player: {
        health: 0,
        attackPwr: 0,
        counterPwr: 0,
        increasePwr: function(){

        }
    },
    defender: {
        health: 0,
        arrackPwr: 0,
        counterPwr: 0
    },
    mechs: ["slugtosser", "gobstomper", "atomsmasher", "pwnicator"],
    restart: function(){},
    startGame: function(chosenMech){
        this.moveMech("#"+chosenMech, "#yourmech");
        
    },
    printMssg: function(mssg){
        $("#message").html(mssg);
    },
    moveMech: function(what, where){
        $(where).append($(what))
    },
    takeDamage: function(who, howMuch){

    },
    attack: function(player, defender){

    }
}

$(".mech").on("click", function(){
    game.startGame($(this).attr("id"));
});
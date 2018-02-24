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
    player: {
        mech: "",
        health: 0,
        attackPwr: 0,
        counterPwr: 0,
        increasePwr: function(){

        }
    },
    defender: {
        mech: "",
        health: 0,
        arrackPwr: 0,
        counterPwr: 0
    },
    mechs: ["slugtosser", "gobstomper", "atomsmasher", "pwnicator"],
    enemies: [],
    startGame: function(chosenMech){
        this.unbindElement(".mech"); //clear mech click bindings

        this.moveMech( chosenMech, "#yourmech");
        this.makeEnemies(chosenMech);
        this.moveEnemies(this.enemies);
        this.setMech(chosenMech, this.player);
        this.printMssg("Select a mech to be your enemy!");
        
        $("#enemies .mech").on("click", function(){
            game.startEncounter( $(this).attr("id") );
        });
    },
    startEncounter: function(defender){
        this.moveMech(defender, "#defender");
        this.setMech(defender, this.defender);
        this.printMssg("Attack the defender to start!")
        
        $("#attack").show();
        // bind click to attack button
        $("#attack").on("click", function(){
            // player attacks
            game.attack( game.player.mech, game.defender.mech );
            // defender counter attacks
            game.attack( game.player.mech, game.defender.mech );
        });
    },
    printMssg: function(mssg){
        $("#message").html(mssg);
    },
    moveMech: function(what, where){
        $(where).append($("#"+what));
    },
    takeDamage: function(who, howMuch){

    },
    attack: function(attacker, defender){
        
    },
    setMech: function(mechName, entity){
        var $mech = $("#" + mechName);
        console.log(mechName);
        entity.mech = mechName;
        entity.health = parseInt($mech.find(".health").html())
        entity.attackPwr = parseInt($mech.find(".attackpwr").html())
        entity.counterPwr = parseInt($mech.find(".attackpwr").html())
        this.unbindElement("#" + mechName);
    },
    die: function(who){
        
    },
    makeEnemies: function(playerMech){
        var i = this.mechs.indexOf(playerMech);
        this.enemies = this.mechs; // copy the main mechs and set enemies
        this.enemies.splice(i, 1); // make enemies, grr
    },
    moveEnemies: function(enemies){
        enemies.forEach(function(element){
            $("#enemies").append($("#"+element));
        })
    },
    restart: function(){
        //reset everything
    },
    unbindElement: function(element){
        $(element).unbind("click")
    }
}

// Call to action!
game.printMssg("Select a mech!")
$("#attack").hide();
$("#restart").hide();

$(".mech").on("click", function(){
    game.startGame($(this).attr("id"));
});
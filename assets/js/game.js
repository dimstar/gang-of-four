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
        basePwr: 0,
        attackPwr: 0,
        counterPwr: 0,
        increasePwr: function(){
            this.basePwr = (this.basePwr === 0) ? this.attackPwr : this.basePwr ;
            this.attackPwr = this.attackPwr + this.basePwr;
        }
    },
    defender: {
        mech: "",
        health: 0,
        attackPwr: 0,
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
        if($("#defender .mech").length !== 0) return;

        this.moveMech(defender, "#defender");
        this.setMech(defender, this.defender);
        this.printMssg("Attack the defender to start!")
        
        $("#attack").show();
        // bind click to attack button
        $("#attack").on("click", function(){
            // player attacks
            var hitmssg1 = game.attack( game.player, game.defender );
            // increase attack power
            game.player.increasePwr();
            // defender counter attacks
            var hitmssg2 = game.attack( game.defender, game.player );
            
            // check who died?
            var died = game.whoDied( game.defender, game.player );

            switch(died){
                case game.player.mech:
                    game.printMssg(`Your mech, ${game.player.mech} has been destroyed! \n Restart to lose again!`);
                    game.unbindElement("#attack");
                    $("#" + game.player.mech).remove();
                    game.allowRestart()
                    break;
                case game.defender.mech:
                    game.printMssg(`${game.defender.mech} has been destroyed! \n select another oponent, boss!`);
                    game.winState();
                    break;
                default: 
                    game.printMssg(hitmssg1 +" "+ hitmssg2);
                    game.updateFront()
            }
        });
    },
    printMssg: function(mssg){
        $("#message").html(mssg);
    },
    moveMech: function(what, where){
        $(where).append($("#"+what));
    },
    attack: function(attacker, defender){
        defender.health = defender.health - attacker.attackPwr;
        return `${attacker.mech} hit ${defender.mech} for ${attacker.attackPwr} damage!`;
    },
    setMech: function(mechName, entity){
        var $mech = $("#" + mechName);
        // console.log(mechName);
        entity.mech = mechName;
        entity.health = parseInt($mech.find(".health").html())
        entity.attackPwr = parseInt($mech.find(".attackpwr").html())
        entity.counterPwr = (parseInt($mech.find(".attackpwr").html())*2)

        if(this.player.mech !== mechName){
            entity.attackPwr = entity.counterPwr
        }

        this.unbindElement("#" + mechName);
    },
    whoDied: function(player, defender){
        if(player.health <= 0){
            return player.mech;
        }else if(defender.health <= 0 ){
            return defender.mech;
        }else{
            return false;
        }
    },
    winState: function(){
        if($("#enemies .mech").length > 0){
            $("#" + game.defender.mech).remove();
        }else{
            $("#" + game.defender.mech).remove();
            this.printMssg("You won boss!!");
            this.allowRestart()
        }
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
    allowRestart: function(){
        //reset everything
        $("#restart").show();
        $("#restart").on("click", function(){
            location.reload();
        })
    },
    unbindElement: function(element){
        $(element).unbind("click")
    },
    updateFront: function(){
        var uiDefender = $("#defender .mech")
        var uiPlayer = $("#yourmech .mech")
        
        uiPlayer.find(".health").html(this.player.health);
        uiPlayer.find(".attackpwr").html(this.player.attackPwr);

        uiDefender.find(".health").html(this.defender.health)
        uiDefender.find(".attackpwr").html(this.defender.attackPwr)
    }
}

// Call to action!
game.printMssg("Select a mech!")
$("#attack").hide();
$("#restart").hide();

$(".mech").on("click", function(){
    game.startGame($(this).attr("id"));
});

  function Game(firstPlayer, secondPlayer) {
    this._firstPlayer = firstPlayer;
    this._secondPlayer = secondPlayer;
    this._winner = null;
    this._loser = null;
  }
  
  Game.prototype.getFirst = function() {
    return this._firstPlayer;
  }
  
  Game.prototype.getSecond = function() {
    return this._secondPlayer;
  }
  
  Game.prototype.getWinner = function(){
      return this._winner;
  }
  Game.prototype.getLoser = function(){
    return this._loser;
}
  Game.prototype.fight = function (firstPlayer, secondPlayer) {
    while (firstPlayer.isAlive() && secondPlayer.isAlive()) {
      firstPlayer.attack(secondPlayer);
      //console.log('Хп игрока 1: ' + firstPlayer.getLife());
      secondPlayer.attack(firstPlayer);
      //console.log('Хп игрока 2: ' +secondPlayer.getLife());
    }
    if (firstPlayer.isAlive() && !secondPlayer.isAlive()){
        this._winner = Game.FIRST_PLAYER_ID;
        this._loser = Game.SECOND_PLAYER_ID;
    }
    else if (!firstPlayer.isAlive() && secondPlayer.isAlive()){
        this._winner = Game.SECOND_PLAYER_ID;
        this._loser = Game.FIRST_PLAYER_ID;
    }
    else if(!firstPlayer.isAlive() && !secondPlayer.isAlive()){
        this._winner = Game.DRAW_ID;
        this._loser =  Game.DRAW_ID;
    }

  }

  Game.DRAW_ID = 0;
  Game.FIRST_PLAYER_ID = 1;
  Game.SECOND_PLAYER_ID = 2;
  


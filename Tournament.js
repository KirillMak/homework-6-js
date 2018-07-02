function Tournament(participantsNumber){
    this._maxParticipantsNumber = participantsNumber;
    this._participants = [];
}

Tournament.prototype.getParticipants = function(){
  return this._participants;
}

Tournament.prototype.getMaxParticipantsNumber = function(){
   return this._maxParticipantsNumber;
}

Tournament.prototype.getCurrentParticipantsNumber = function(){
  return this._participants.length;
}


Tournament.prototype.tryAdd = function(participant){
  if ((participant instanceof  Hero && Hero.NAMES_DICTIONARY.indexOf(participant.name)) || ( participant instanceof Monster && Hero.NAMES_DICTIONARY.indexOf(participant.name))){
     if(this._participants.length < this._maxParticipantsNumber){
         this._participants.push(participant);
         return "Участник успешно добавлен!";
     }
     else {
         throw new overflowParticipantsException(participant);
     }
  }

  else {
    throw new characterTypeException(participant);
    //console.log(participant);
  }
}

Tournament.prototype.getPair = function(playerFirstID,playerSecondID){
  if (this._participants[playerFirstID] !== undefined && playerFirstID <= this._participants.length - 1 && playerFirstID >= 0) {
      var playerFirst = this._participants[playerFirstID];
  }
  else {
      throw "участник не найден!";
  }
  if (this._participants[playerSecondID] !== undefined && playerSecondID <= this._participants.length - 1 && playerSecondID >= 0 && playerFirstID != playerSecondID) {
    var playerSecond = this._participants[playerSecondID];
  }
  else {
      throw "участник не найден!";
  }

  var Pair = {
                firstPlayer: playerFirst,
                secondPlayer: playerSecond
            }
  return Pair;
}

Tournament.prototype.removeLosers = function(){
for(var i = 0; i < this._participants.length;i++){
    if (this._participants[i] === undefined){
       this._participants.splice(i,1);
    }
}
}

Tournament.prototype.playRound = function(){
  var participants = this._participants.length;
  for(let i = 0; i < participants - 1; i+=2){

      var Pair = this.getPair(i,i+1);
      var curGame = new Game(Pair.firstPlayer,Pair.secondPlayer);
      curGame.fight(Pair.firstPlayer,Pair.secondPlayer);
    
      if(curGame.getWinner() == Game.FIRST_PLAYER_ID){
          console.log(this._participants[i]);
          this._participants[i].refreshCharacter();
          delete this._participants[i+1];
      }
      else if(curGame.getWinner() == Game.SECOND_PLAYER_ID) {
          this._participants[i+1].refreshCharacter();
          delete this._participants[i];
      }
  } 
this.removeLosers();  
}

Tournament.prototype.getResult = function(){
  if(this._participants.length == 1){
      return this._participants[0];
  }
  return "Победитель не определен!";
}

Tournament.prototype.start = function(){
   var roundNumber = 1;
   while(this._participants.length >1){
        console.log("Раунд " + roundNumber);
        this.playRound();
        roundNumber++;
   }
}

Tournament.STANDARD_PARTICIPANTS_NUMBER = 5;

tournamentFactory = function(){
  return new Tournament(Tournament.STANDARD_PARTICIPANTS_NUMBER);
}


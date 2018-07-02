
function Exception(object){
    this._message = "Пользовательское исключение!";
    this.toString = function(){
        return this.object + this.message;
    }
}

Exception.prototype.getExceptionMessage = function(){
  return this._message;
}

overflowParticipantsException.prototype = Object.create(Exception.prototype);
overflowParticipantsException.prototype.constructor = overflowParticipantsException;

function overflowParticipantsException(object){
   Exception.apply(this,arguments);
   this._message = "Невозможно добавить нового участника.Количество участников турнира достигло максимального числа!";
}

overflowParticipantsException.prototype = Object.create(Exception.prototype);
overflowParticipantsException.prototype.constructor = overflowParticipantsException;

function characterTypeException(object){
  Exception.apply(this,arguments);
  this._message = "Не является героем или монстром  или имя участника отсутствует в справочнике!";
}

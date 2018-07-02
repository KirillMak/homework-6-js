function Character(name,characterClass,life,damage){
    this._name = name;
    this._characterClass = characterClass;
    this.life = life;
    this.damage = damage;
    this.hasDrunkPotion = false;
    this.maxLife = life;
    this.counter = 2;
    this.maxCounter = this.counter;
  }
  
  Character.prototype.getCharacterClass = function(){
      return this._characterClass;
  }
  Character.prototype.setLife = function(dmg) {
    this.life -= dmg;
  }
  
  Character.prototype.getDamage = function() {
    return this.damage;
  }
  
  Character.prototype.attack = function(obj) {
    obj.setLife(this.getDamage());
  }
  
  Character.prototype.isAlive = function() {
    return this.life > 0;
  }
  
  Character.prototype.getLife = function() {
    return this.life;
  }
  
  Character.prototype.shouldUseSkill = function() {
    return (this.life < this.maxLife/2); 
  }
  
  Character.prototype.refreshCharacter = function(){
    this.life = this.maxLife;
    this.counter = this.maxCounter;
 } 
 Character.prototype.drinkPotion = function(){
     this.hasDrunkPotion = Character.HAS_DRUNK_POTION;
     if(this instanceof Monster){
         console.log(this);
         this.setLife = Hero.prototype.setLife;
     }
     else if(this instanceof Hero){
        console.log(this);
        this.getDamage = Monster.prototype.getDamage;
     }
 }
 Character.HAS_DRUNK_POTION = true;
 Character.HAS_NO_DRUNK_POTION = false;
  
  function Hero() {
    Character.apply(this, arguments);
  }
  
  
  Hero.prototype = Object.create(Character.prototype);
  Hero.prototype.constructor = Hero;
  
  
  Hero.prototype.setLife = function(dmg) {
    var counter =  this.counter,
        self = this;

    this.setLife = function(dmg){
        if (self.shouldUseSkill() && (counter > 0) ) {
            counter--;   
        } else {
            self.life -= dmg;
        } 
    }

    this.setLife(dmg);
  }
  Hero._getRandomName = function(){
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      };

    return Hero.NAMES_DICTIONARY[(getRandomInt(0,Hero.NAMES_DICTIONARY.length - 1))];
    
  }
  
  
  function Monster() {
    Character.apply(this, arguments);
  }
  
  Monster.prototype = Object.create(Character.prototype);
  Monster.prototype.constructor = Monster;
  
  
  Monster.prototype.getDamage = function() {
      var counter =  this.counter,
          self = this;
          this.getDamage = function(){
            if ( self.shouldUseSkill() && (counter > 0) ) {
            counter--;
            return self.damage*2;
            }
        
            return self.damage;
    }

    return this.getDamage();
  }

  Monster._getRandomName = function(){
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      };

    return Monster.NAMES_DICTIONARY[(getRandomInt(0,Monster.NAMES_DICTIONARY.length - 1))];
    
  }

  Monster.NAMES_DICTIONARY = ['Zidar','Ksiron','Axis','Kalid','Olema','Kalf'];

  Monster.VAMPIRE_LIFE = 400;
  Monster.VAMPIRE_DAMAGE = 10;

  Monster.ORKS_CROWD_LIFE = 600;
  Monster.ORKS_CROWD_DAMAGE = 7;
  
  Monster.GOBLIN_LIFE = 200;
  Monster.GOBLIN_DAMAGE = 5;

  Hero.NAMES_DICTIONARY = ['Rion','Inham','Katbert','Adel','Roland','Valeska'];

  Hero.WARRIOR_LIFE = 450;
  Hero.WARRIOR_DAMAGE = 8;

  Hero.WIZARD_LIFE = 300;
  Hero.WIZARD_DAMAGE = 6;

  Hero.THIEF_LIFE = 350;
  Hero.THIEF_DAMAGE = 7;
  
  Monster.CLASS_VAMPIRE = {
      class_name: "vampire",
      life: Monster.VAMPIRE_LIFE,
      damage: Monster.VAMPIRE_DAMAGE
  }

  Monster.CLASS_ORKS_CROWD = {
     class_name: "orks_crowd",
     life: Monster.ORKS_CROWD_LIFE,
     damage: Monster.ORKS_CROWD_DAMAGE
  }

  Monster.CLASS_GOBLIN = {
    class_name: "goblin",
    life: Monster.GOBLIN_LIFE,
    damage: Monster.GOBLIN_DAMAGE
 }

 Hero.CLASS_WARRIOR = {
    class_name: "warrior",
    life: Hero.WARRIOR_LIFE,
    damage: Hero.WARRIOR_DAMAGE
 }

 //Hero.CLASS_WARRIOR.bind(Hero);
 Hero.CLASS_WIZARD = {
    class_name: "wizard",
    life: Hero.WIZARD_LIFE,
    damage: Hero.WIZARD_DAMAGE
 }

 Hero.CLASS_THIEF = {
    class_name: "thief",
    life: Hero.THIEF_LIFE,
    damage: Hero.THIEF_DAMAGE
 }


 function goblinFactory() {
    return new Monster(Monster._getRandomName(),Monster.CLASS_GOBLIN.class_name, Monster.CLASS_GOBLIN.life, Monster.CLASS_GOBLIN.damage);
  }
  function orkscrowdFactory() {
    return new Monster(Monster._getRandomName(),Monster.CLASS_ORKS_CROWD.class_name,Monster.CLASS_ORKS_CROWD.life, Monster.CLASS_ORKS_CROWD.damage);
  }
  function vampireFactory(){
    return new Monster(Monster._getRandomName(),Monster.CLASS_VAMPIRE.class_name, Monster.CLASS_VAMPIRE.life, Monster.CLASS_VAMPIRE.damage);
  }
  
  function warriorFactory() {
    return new Hero(Hero._getRandomName(),Hero.CLASS_WARRIOR.class_name, Hero.CLASS_WARRIOR.life, Hero.CLASS_WARRIOR.damage);
  }
  function wizardFactory() {
    return new Hero(Hero._getRandomName(),Hero.CLASS_WIZARD.class_name,Hero.CLASS_WIZARD.life, Hero.CLASS_WIZARD.damage);
  }
  function thiefFactory(){
    return new Hero(Hero._getRandomName(),Hero.CLASS_THIEF.class_name, Hero.CLASS_THIEF.life, Hero.CLASS_THIEF.damage);
  }
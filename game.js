function Character(life,damage){
    this.life = life;
    this.damage = damage;
    this.maxLife = life;
    this.counter = 2;
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
    return (this.life < this.maxLife/2 && this.counter > 0); 
  }
  
  
  
  function Hero () {
    Character.apply(this, arguments);
  }
  
  
  Hero.prototype = Object.create(Character.prototype);
  Hero.prototype.constructor = Hero;
  
  
  Hero.prototype.setLife = function(dmg) {
  
    if ( this.shouldUseSkill() ) {
      this.counter--;   
    } else {
        this.life -= dmg;
      } 
  
  }
  
  
  
  function Monster () {
    Character.apply(this, arguments);
  }
  
  Monster.prototype = Object.create(Character.prototype);
  Monster.prototype.constructor = Monster;
  
  
  Monster.prototype.getDamage = function() {
  
    if ( this.shouldUseSkill() ) {
      this.counter--;
      return this.damage*2;
    }
  
    return this.damage;
  }
  
  
  function monsterFactory() {
    return new Monster(220, 50);
  }
  
  function heroFactory() {
    return new Hero(300, 75);
  }
  
  function Game(monster, hero) {
    this.hero = hero;
    this.monster = monster;
  }
  
  Game.prototype.getHero = function() {
    return this.hero;
  }
  
  Game.prototype.getMonster = function() {
    return this.monster;
  }
  
  Game.prototype.fight = function (hero, monster) {
    while (hero.isAlive() && monster.isAlive()) {
      hero.attack(monster);
      console.log('Хп монстра: ' + monster.getLife());
      monster.attack(hero);
      console.log('Хп героя: ' +hero.getLife());
    }
  }
  
  var myGame = new Game(monsterFactory(), heroFactory());
  
  myGame.fight(myGame.getHero(), myGame.getMonster());
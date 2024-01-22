// Game settings object
let gameParameters = null;
let displayPlayerHero = null;
let playerHero = null;

const radioInputs = document.querySelectorAll('.radio__input');
const additionalStatInput = document.getElementById('additionalStat');





// Base class for a hero
class Hero {
  // Constructor of the base class
  constructor(name, level, healthPoints, stats) {
    this.name = name;
    this.level = level;
    this.healthPoints = healthPoints;
    this.stats = stats;
  }

  // Method for displaying hero information in the console
  displayHero() {
    const { name, level, healthPoints, stats } = this;
    const { str, int, agi } = stats;

    console.log(`
      Имя героя: ${name}
      Уровень: ${level}
      Очки HP: ${healthPoints}
      Сила: ${str}
      Интеллект: ${int}
      Проворство: ${agi}
    `);
  }
}

// Mage subclass
class Mage extends Hero {
  // Constructor of the subclass
  constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
    super(name, level, healthPoints, stats);
    this.hasTectonicPotion = hasTectonicPotion;
    this.mana = mana;
  }

  // Method extending the method of the base class
  displayHero() {
    super.displayHero();

    console.log(`Мана: ${this.mana}`);

    if (this.hasTectonicPotion === 'true') {
      console.log('Обладает тектоническим зельем');
    }
  }

  // Healing method for the Mage class
  healHero(hero) {
    const { mana, level } = this;

    if (mana > gameParameters.MIN_STAT) {
      const healAmount = level * 10;

      hero.healthPoints += healAmount;
      console.log(`${this.name} продолжает танец ${hero.name} с помощью ${healAmount} очков.`);

      this.mana -= healAmount * (10 / level) - level;
    } else {
      alert('Не хватает маны...');
    }
  }
}

// Knight subclass
class Knight extends Hero {
  // Constructor of the subclass
  constructor(name, level, healthPoints, stats, isHorseTango, energy) {
    super(name, level, healthPoints, stats);
    this.isHorseTango = isHorseTango;
    this.energy = energy;
  }

  // Method extending the method of the base class
  displayHero() {
    super.displayHero();

    console.log(`Энергия: ${this.energy}`);

    if (this.isHorseTango === 'true') {
      console.log('Этот герой может танцевать танго верхом на лошади');
    }
  }

  // Method to increase hero's agility for the Knight class
  gainAgility(hero) {
    const { energy, level } = this;

    if (energy > gameParameters.MIN_STAT) {
      const gainAmount = (level * energy) / 30;

      if (hero.stats.agi + gainAmount < gameParameters.MAX_STAT) {
        hero.stats.agi += gainAmount;
        console.log(`${this.name} усиливает гибкость ${hero.name} с помощью ${gainAmount} очков.`);
      } else {
        hero.stats.agi = gameParameters.MAX_STAT;
      }

      const energyAmount = (gainAmount * 10) / level;
      this.energy = Math.max(energy - energyAmount, gameParameters.MIN_STAT);

      displayPlayerHero(playerHero);
    } else {
      alert('Не хватает энергии...');
    }
  }
}

const setGameParameters = (parameters) => {
  if (!parameters || typeof parameters !== 'object') {
    console.error('Недопустимые параметры. Пожалуйста, укажите правильные.');
    return;
  }
  gameParameters = parameters;
};

function setPlayerHero(hero, displayHeroFunction) {
  playerHero = hero;
  displayPlayerHero = displayHeroFunction;
}

export { Hero, Mage, Knight, setGameParameters, setPlayerHero };

/*jshint esversion: 6 */
const HexMover = require(__lib + "/game/world_objects/hexmover.js");

class Tank extends HexMover {
  constructor(map, x, y, size, color, addons, username) {
    super(map, x, y, size);
    this.color = color;
    this.addons = addons;
    this.username = username;
  }

  printHealth() {
    console.log(this.health);
  }

  setAddons(dataInput) {
    this.dataInput = dataInput;
    for (i = 0; i < this.addons.length; i++) {
      if (dataInput.Controller.addons[i] !== null) {
        this.addons[i] = dataInput.Controller.addons[i];
      }
    }
    console.log(this.addons);
  }

  addTankHealth(toAddHealth) {
    this.tank.health = this.tank.health + toAddHealth;
  }
  addTankMovement(toAddMovement) {
    this.tank.tankMovementRange = toAddMovement;
  }
  addTankArmor(toAddArmor) {
    this.tank.armor = this.tank.armor + toAddArmor;
  }

  addWeapon(name, damage, range) {
    this.tank.weapons.weaponName.push(name);
    this.tank.weapons.weaponDamage.push(damage);
    this.tank.weapons.weaponRange.push(range);
  }
  getCurrentTank(receivedMessage, allTanks) {
    var dataInput = receivedMessage;
    for (let index = 0; index < allTanks.length; index++) {
      const element = allTanks[index];
      if (dataInput.Player.username == element.username) {
        return element;
      }
    }
  }
  tankAction(receivedMessage, allTanks) {
    let dataInput = receivedMessage;
    let damageDealer = this.getCurrentTank(dataInput, allTanks);
    switch (dataInput.Player.action) {
      case "A":
        this.dealDamage(damageDealer, "gatling gun", allTanks);
        console.log("A");
        break;
      case "B":
        i = 1;
        this.addonList = this.dataInput.Controller.addons;
        this.tank.useAddon(this.addonList[i], i);
        this.tank.addonUses[i]++;
        break;
      case "X":
        i = 2;
        this.addonList = this.dataInput.Controller.addons;
        this.tank.useAddon(this.addonList[i], i);
        this.tank.addonUses[i]++;
        break;
      case "Y":
        i = 3;
        this.addonList = this.dataInput.Controller.addons;
        this.tank.useAddon(this.addonList[i], i);
        this.tank.addonUses[i]++;
        break;
      default:
        //console.log("no key pressed");
        break;
    }
  }

  useAddon(name, use, i) {
    this.name = name;
    this.use = use;

    switch (name) {
      case "rocketEngine":
        if (use && tank.addonUses[i] < 1) {
          addTankMovement(3);
        }
        break;
      case "amphibious":
        tank.canEnterWater = true;
        break;
      case "harrier":
        if (use && tank.addonUses[i] < 1) {
          addTankMovement(6);
        }
        break;
      case "adamantium":
        if (use && tank.addonUses[i] < 1) {
          addTankArmor(6);
          addTankMovement(-1);
        }
        break;
      case "gravyShield":
        if (use && tank.addonUses[i] < 2) {
          addTankArmor(1); // moet per turn
        }
        break;
      case "nanobots":
        if (use && tank.addonUses[i] < 3) {
          addTankHealth(2);
        }
        console.log("hp = " + tank.health);

        break;
      case "structuralStrengthening":
        if (use && tank.addonUses[i] < 1) {
          addTankHealth(5);
        }
        console.log("hp = " + tank.health);

        break;
      case "Flammenwerpfer":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("Flammenwerpfer", 8, 3);
        }
        break;
      case "laser":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("laser", 3, 99);
        }
        break;
      case "mines":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("mines", 10, 0);
        }
        break;
      case "plasmaGun":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("plasmaGun", 6, 90);
        }
        break;
      case "empBomb":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("empBomb", 0, 0);
        }
        break;
      case "ram":
        if (use && tank.addonUses[i] < 1) {
          addWeapon("ram", 3, 0);
        }
        break;
      default:
        console.log("Contains addon that doesn't have any function.");
        break;
    }
  }
  dealDamage(damageDealer, firedWeapon, allTanks) {
    this.firedWeapon = firedWeapon;
    this.allTanks = allTanks;
    //console.log(damageDealer);
    //console.log(firedWeapon);
    //console.log(allTanks);
    for (let index = 0; index < allTanks.length; index++) {
      let damageTaker = allTanks[index];
      let attLocation = damageDealer.currentTile.cubePosition;
      let defLocation = damageTaker.currentTile.cubePosition;
      let wepRange = damageDealer.weapons.weaponRange[0];
      switch (damageDealer.currentRotation) {
        case 1:
          if (
            attLocation.y == defLocation.y &&
            attLocation.x < defLocation.x &&
            attLocation.x + wepRange + 1 > defLocation.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 2:
          if (
            attLocation.z == defLocation.z &&
            attLocation.x < defLocation.x &&
            attLocation.x + wepRange + 1 > defLocation.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 3:
          if (
            attLocation.x == defLocation.x &&
            attLocation.y > defLocation.y &&
            attLocation.y + wepRange + 1 < defLocation.y
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 4:
          if (
            attLocation.y == defLocation.y &&
            attLocation.x > defLocation.x &&
            attLocation.x + wepRange + 1 < defLocation.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 5:
          if (
            attLocation.z == defLocation.z &&
            attLocation.x > defLocation.x &&
            attLocation.x + wepRange + 1 < defLocation.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 6:
          if (
            attLocation.x == defLocation.x &&
            attLocation.y < defLocation.y &&
            attLocation.y + wepRange + 1 > defLocation.y
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;

        default:
          console.log(
            "unknown rotation value: " + damageDealer.currentRotation
          );
          break;
      }
    }
  }
  takeDamage(damageDealer, firedWeapon, damageTaker) {
    this.damageDealer = damageDealer;
    var weapon = firedWeapon;
    this.damageTaker = damageTaker;

    for (let i = 0; i < damageDealer.weapons.weaponName.length; i++) {
      //console.log(damageDealer.addonUses[0]);
      if (
        weapon == damageDealer.weapons.weaponName[i] &&
        damageDealer.addonUses[i] < 1
      ) {
        console.log("yeet");
        damageTaker.health =
          damageTaker.health - damageDealer.weapons.weaponDamage[i];
        console.log(damageTaker.health);
        if (damageDealer.weapons.weaponName[i] != "gatling gun") {
          damageDealer.addonUses[i]++;
        }
      }
      if (damageTaker.health <= 0) {
        console.log(damageTaker.username + " tank died");

        if (damageTaker.isAlive) {
          //   this.add
          //     .sprite(
          //       damageTaker.currentTile.position.x,
          //       damageTaker.currentTile.position.y,
          //       "explosion"
          //     )
          //     .play("explode");
        }
        // damageTaker.sprite.setTexture("destroyedTank");
        damageTaker.isAlive = false;
        damageTaker = null;
      }
    }
  }
  //gets replicated to the client
  json() {
    return {
      color: this.color,
      addons: this.addons,
      rotation: this.currentRotation,
      position: { x: this.currentPosition.x, y: this.currentPosition.y }
    };
  }
}

module.exports = Tank;

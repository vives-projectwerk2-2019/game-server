/*jshint esversion: 6 */
const HexMover = require(__lib + '/game/world_objects/hexmover.js');

class Tank extends HexMover {
  constructor(map, x, y, size, color, addons) {
    super(map, x, y, size);
    this.color = color;
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

  //gets replicated to the client
  json() {
    return {
      "color": this.color,
      "addons": this.addons,
      "rotation": this.currentRotation,
      "position" : {x: this.currentPosition.x, y: this.currentPosition.y}
    };
  }
}

module.exports = Tank;
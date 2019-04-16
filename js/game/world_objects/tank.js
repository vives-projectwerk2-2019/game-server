/*jshint esversion: 6 */
const HexMover = require(__lib + "/game/world_objects/hexmover.js");

class Tank extends HexMover {
  constructor(map, x, y, size, color, addons, username) {
    super(map, x, y, size);
    this.color = color;
    this.addons = {
      addonName: ["gatling gun"]
    };
    this.setAddons(addons);
    this.username = username;
    this.allWeapons = {
      // base weapon always equiped
      weaponName: ["gatling gun"],
      weaponDamage: [4],
      weaponRange: [20],
      weaponUses: [0]
    };
    this.initWeapons();
  }

  addTankHealth(toAddHealth) {
    this.health = this.health + toAddHealth;
  }

  addTankMovement(toAddMovement) {
    this.tankMovementRange = toAddMovement;
  }

  addTankArmor(toAddArmor) {
    this.armor = this.armor + toAddArmor;
  }
  setAddons(addons) {
    for (let index = 0; index < addons.length; index++) {
      const name = addons[index];
      this.addons.addonName.push(name);
    }
  }
  addWeapon(name, damage, range, uses) {
    this.allWeapons.weaponName.push(name);
    this.allWeapons.weaponDamage.push(damage);
    this.allWeapons.weaponRange.push(range);
    this.allWeapons.weaponUses.push(uses);
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
    let i;
    switch (dataInput.Player.action) {
      case "A":
        this.dealDamage(damageDealer, "gatling gun", allTanks);
        console.log("A");
        break;
      case "B":
        i = 1;
        console.log("B");

        this.useAddon(this.addons.addonName[i], i, damageDealer, allTanks);
        break;
      case "X":
        i = 2;
        console.log("X");

        this.useAddon(this.addons.addonName[i], i, damageDealer, allTanks);
        break;
      case "Y":
        i = 3;
        console.log("Y");
        this.useAddon(this.addons.addonName[i], i, damageDealer, allTanks);
        break;
      default:
        //console.log("no key pressed");
        break;
    }
  }

  useConsumable(name, i) {
    this.name = name;

    switch (name) {
      case "rocketEngine":
        if (this.addonUses[i] < 1) {
          this.addTankMovement(3);
          this.addonUses[i]++;
        }
        break;
      case "amphibious":
        this.canEnterWater = true;
        this.addonUses[i]++;
        break;
      case "harrier":
        if (this.addonUses[i] < 1) {
          this.addTankMovement(6);
          this.addonUses[i]++;
        }
        break;
      case "adamantium":
        if (this.addonUses[i] < 1) {
          this.addTankArmor(6);
          this.addTankMovement(-1);
          this.addonUses[i]++;
        }
        break;
      case "gravyShield":
        if (this.addonUses[i] < 2) {
          this.addTankArmor(1);
          this.addonUses[i]++; // moet per turn
        }
        break;
      case "nanobots":
        if (this.addonUses[i] < 3) {
          this.addTankHealth(2);
          this.addonUses[i]++;
        }
        break;
      case "structuralStrengthening":
        if (this.addonUses[i] < 1) {
          this.addTankHealth(5);
          this.addonUses[i]++;
        }
        break;
      default:
        break;
    }
  }

  useAddon(addonName, i, damageDealer, allTanks) {
    for (let x = 0; x < this.allWeapons.weaponName.length; x++) {
      const wepName = this.allWeapons.weaponName[x];
      const wepUses = this.allWeapons.weaponUses[x];

      if (wepName == addonName && this.addonUses[i] < wepUses) {
        this.dealDamage(damageDealer, addonName, allTanks, i);
        this.addonUses[i]++;
      } else {
        this.useConsumable(addonName, i);
      }
    }
  }

  initWeapons() {
    this.addWeapon("Flammenwerpfer", 8, 3, 1);
    this.addWeapon("laser", 3, 99, 1);
    this.addWeapon("mines", 10, 0, 1);
    this.addWeapon("plasmaGun", 6, 90, 1);
    this.addWeapon("empBomb", 0, 0, 1);
  }

  dealDamage(damageDealer, firedWeapon, allTanks, i) {
    this.firedWeapon = firedWeapon;
    this.allTanks = allTanks;
    let wepRange;
    let wepDamage;
    // 1 , 2, 6 work others don't
    for (let x = 0; x < this.allWeapons.weaponName.length; x++) {
      const element = this.allWeapons.weaponName[x];
      if (firedWeapon == element) {
        wepRange = this.allWeapons.weaponRange[x];
        wepDamage = this.allWeapons.weaponDamage[x];
      }
    }
    for (let index = 0; index < allTanks.length; index++) {
      let damageTaker = allTanks[index];
      let attLocation = damageDealer.currentTile.cubePosition;
      let defLocation = damageTaker.currentTile.cubePosition;

      switch (damageDealer.currentRotation) {
        case 1:
          if (
            attLocation.y == defLocation.y &&
            attLocation.x < defLocation.x &&
            attLocation.x + wepRange + 1 > defLocation.x
          ) {
            console.log("1");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
          }
          break;
        case 2:
          if (
            attLocation.z == defLocation.z &&
            attLocation.x < defLocation.x &&
            attLocation.x + wepRange + 1 > defLocation.x
          ) {
            console.log("2");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
          }
          break;
        case 3:
          if (
            attLocation.x == defLocation.x &&
            attLocation.y > defLocation.y &&
            attLocation.y + wepRange + 1 < defLocation.y
          ) {
            console.log("3");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
          }
          break;
        case 4:
          if (
            attLocation.y == defLocation.y &&
            attLocation.x > defLocation.x &&
            attLocation.x + wepRange + 1 < defLocation.x
          ) {
            console.log("4");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
          }
          break;
        case 5:
          if (
            attLocation.z == defLocation.z &&
            attLocation.x > defLocation.x &&
            attLocation.x + wepRange + 1 < defLocation.x
          ) {
            console.log("5");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
          }
          break;
        case 6:
          if (
            attLocation.x == defLocation.x &&
            attLocation.y < defLocation.y &&
            attLocation.y + wepRange + 1 > defLocation.y
          ) {
            console.log("6");
            this.takeDamage(damageDealer, wepDamage, damageTaker);
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
  takeDamage(damageDealer, wepDamage, damageTaker) {
    this.damageDealer = damageDealer;
    var wepDamage = wepDamage;
    this.damageTaker = damageTaker;

    damageTaker.health = damageTaker.health - wepDamage;
    console.log(damageTaker.health);

    // for (let i = 0; i < damageDealer.weapons.weaponName.length; i++) {
    //   console.log(damageDealer.weapons.weaponName);
    //   if (
    //     weapon == damageDealer.weapons.weaponName[i] &&
    //     damageDealer.addonUses[i] < 1
    //   ) {
    //     damageTaker.health =
    //       damageTaker.health - damageDealer.weapons.weaponDamage[i];
    //     console.log(damageTaker.health);
    //     if (damageDealer.weapons.weaponName[i] != "gatling gun") {
    //       damageDealer.addonUses[i]++;
    //     }
    //   }
    if (damageTaker.health <= 0) {
      console.log(damageTaker.username + " tank died");
      damageTaker = null;
    }
    // }
  }
  //gets replicated to the client
  json() {
    return {
      color: this.color,
      addons: this.addons,
      rotation: this.currentRotation,
      position: { x: this.currentPosition.x, y: this.currentPosition.y },
      health: this.health
    };
  }
}

module.exports = Tank;

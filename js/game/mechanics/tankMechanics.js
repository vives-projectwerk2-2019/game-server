class tankMechanics {
  addon(i) {
    this.i = i;
    this.addonList = this.tankblack.addons;
    var firedWeapon = "";
    firedWeapon = this.tankblack.useAddon(this.addonList[i], i);
    //console.log(firedWeapon);
    if (firedWeapon != null) {
      this.dealDamage(this.tankblack, firedWeapon, allTanks);
    }
    this.tankblack.addonUses[i]++;
  }
  moveTank(receivedMessage) {
    var dataInput = receivedMessage;

    //console.log(this);
    switch (dataInput.Player.movement) {
      case "left":
        //console.log("move left");
        this.tankblack.turnLeft();
        break;
      case "right":
        //console.log("move right");
        this.tankblack.turnRight();
        break;
      case "forward":
        //console.log("move forward");
        this.tankblack.forward();
        break;
      case "backward":
        //console.log("move backward");
        this.tankblack.backward();
        break;
      default:
        //console.log("idle");
        break;
    }
  }
  tankAction(receivedMessage) {
    var dataInput = receivedMessage;

    switch (dataInput.Player.action) {
      case "A":
        this.dealDamage(this.tankblack, "gatling gun", allTanks);
        break;
      case "B":
        i = 1;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      case "X":
        i = 2;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      case "Y":
        i = 3;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      default:
        //console.log("no key pressed");
        break;
    }
  }
  dealDamage(damageDealer, firedWeapon, allTanks) {
    this.firedWeapon = firedWeapon;
    this.allTanks = allTanks;

    for (let index = 0; index < allTanks.length; index++) {
      var damageTaker = allTanks[index];
      switch (damageDealer.currentRotation) {
        case 1:
          if (
            damageDealer.currentTile.cubePosition.y ==
              damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.x <
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
              damageDealer.weapons.weaponRange[0] +
              1 >
              damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 2:
          if (
            damageDealer.currentTile.cubePosition.z ==
              damageTaker.currentTile.cubePosition.z &&
            damageDealer.currentTile.cubePosition.x <
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
              damageDealer.weapons.weaponRange[0] +
              1 >
              damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 3:
          if (
            damageDealer.currentTile.cubePosition.x ==
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.y >
              damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.y +
              damageDealer.weapons.weaponRange[0] +
              1 <
              damageTaker.currentTile.cubePosition.y
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 4:
          if (
            damageDealer.currentTile.cubePosition.y ==
              damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.x >
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
              damageDealer.weapons.weaponRange[0] +
              1 <
              damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 5:
          if (
            damageDealer.currentTile.cubePosition.z ==
              damageTaker.currentTile.cubePosition.z &&
            damageDealer.currentTile.cubePosition.x >
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
              damageDealer.weapons.weaponRange[0] +
              1 <
              damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 6:
          if (
            damageDealer.currentTile.cubePosition.x ==
              damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.y <
              damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.y +
              damageDealer.weapons.weaponRange[0] +
              1 >
              damageTaker.currentTile.cubePosition.y
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
    var weapon = firedWeapon;
    this.damageTaker = damageTaker;

    for (let i = 0; i < damageDealer.weapons.weaponName.length; i++) {
      console.log(damageDealer.addonUses[0]);
      if (
        weapon == damageDealer.weapons.weaponName[i] &&
        damageDealer.addonUses[i] < 1
      ) {
        console.log("yeeet");

        damageTaker.health =
          damageTaker.health - damageDealer.weapons.weaponDamage[i];
        if (damageDealer.weapons.weaponName[i] != "gatling gun") {
          damageDealer.addonUses[i]++;
        }
      }
      if (damageTaker.health <= 0) {
        console.log(damageTaker.username + " tank died");

        if (damageTaker.isAlive) {
          this.add
            .sprite(
              damageTaker.currentTile.position.x,
              damageTaker.currentTile.position.y,
              "explosion"
            )
            .play("explode");
        }
        damageTaker.sprite.setTexture("destroyedTank");
        damageTaker.isAlive = false;
        damageTaker = null;
      }
    }
  }
}

// global variables to control game
let turningLeft = false;
let turningRight = false;
let thrusting = false;
let fire = false;

function inputInit(lasers, ship) {
  document.body.addEventListener("keydown", function (event) {

    switch (event.keyCode) {
      case 38: // Up
      case 87: // W
        if (thrusting) return;
        thrusting = true;
        break;

      case 37: // Left
      case 65: // A
        if (turningLeft) return;
        turningLeft = true;
        break;

      case 39: // Right
      case 68: // D
        if (turningRight) return;
        turningRight = true
        break;

      case 32: // Space
      case 17: // Ctrl
        if (fire) return;
        fire = true;
        if (ship.alive) {
          lasers.push(new Laser(ship.getLocation(), ship.getHeading()));
        }
        break;

      default:
        break;
    }
  }, false);

  document.body.addEventListener("keyup", function (event) {

    switch (event.keyCode) {
      case 38: // Up
      case 87: // W
        thrusting = false;
        break;

      case 37: // Left
      case 65: // A
        turningLeft = false;
        break;

      case 39: // Right
      case 68: // D
        turningRight = false;
        break;

      case 32: // Space
      case 17: // Ctrl
        fire = false;
        break;

      default:
        break;
    }
  }, false);

}

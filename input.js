// global variables to control game
let turningLeft = false;
let turningRight = false;
let thrusting = false;
let down = false;

function inputInit(lasers, ship) {
  document.body.addEventListener("keydown", function (event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
      case 38: // Up
        thrusting = true;
        break;

      case 37: // Left
        turningLeft = true;
        break;

      case 39: // Right
        turningRight = true
        break;

      case 32: // Space
      case 90: // Z
        if (down) return;
        down = true;
        lasers.push(new Laser(ship.getLocation(), ship.getHeading()));
        break;

      default:
        break;
    }
  }, false);

  document.body.addEventListener("keyup", function (event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
      case 38: // Up
        thrusting = false;
        break;

      case 37: // Left
        turningLeft = false;
        break;

      case 39: // Right
        turningRight = false;
        break;

      case 90:
      case 32: // Space
        down = false;
        break;

      default:
        break;
    }
  }, false);

}

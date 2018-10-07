// global variables to control game
let turningLeft = false;
let turningRight = false;
let thrusting = false;
let fire = false;

function inputInit() {
  document.body.addEventListener("keydown", function (event) {

    switch (event.keyCode) {
      case 38: // Up
      case 87: // W
        thrusting = true;
        break;

      case 37: // Left
      case 65: // A
        turningLeft = true;
        break;

      case 39: // Right
      case 68: // D
        turningRight = true
        break;

      case 32: // Space
      case 17: // Ctrl
        fire = true;
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

      // case 32: // Space
      // case 17: // Ctrl
      //   fire = false;
      //   break;

      default:
        break;
    }
  }, false);

}

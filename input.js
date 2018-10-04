// global variables to control game
let turningLeft = false;
let turningRight = false;
let thrusting = false;

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
        lasers.push(new Laser(ship.getLocation(), ship.getHeading()));
        // console.log(ship.getLocation(), ship.getHeading());
        break;

      default:
        break;
    }
  });

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

      default:
        break;
    }
  });
}

// function keyPressed() {
// 	// 	if (keyCode == RIGHT_ARROW) {
// 	// 		ship.setRotation(0.1);
// 	// 	} else if (keyCode == LEFT_ARROW) {
// 	// 		ship.setRotation(-0.1);
// 	// 	}

// 	if (key == ' ') {
// 		lasers.push(new Laser(ship.pos, ship.heading));
// 	}

// 	// if (keyCode == UP_ARROW) {
// 	// 	ship.boosting(true);
// 	// }
// }
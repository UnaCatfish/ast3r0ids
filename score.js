// Large Asteroids:     20 points
// Medium Asteroids:    50 points
// Small Asteroids:    100 points
// Large Saucer:       200 points
// Small Saucer:      1000 points.

const rock = [100, 50, 20];
const ships = 3;

function Score() {
  this.score = 0;
  this.ships = ships;
  this.draw();
}

Score.prototype.update = function (enemy, size) {
  if (enemy == 'rock') {
    this.score += rock[size];
  }
  if (this.score % 10000 == 0) {
    this.ships += 1;
  }
}

Score.prototype.removeShip = function () {

  if (this.ships > 1) {
    this.ships -= 1;
    this.draw();
  } else {
    this.ships = 0;
    gameOver = true;
    console.log('Game Over');
  }
}


Score.prototype.draw = function () {

  console.log(`ships: ${this.ships}  score: ${this.score}`);
  // context.save();
  // context.translate(this.particle.position.getX(), this.particle.position.getY());
  // context.beginPath();
  // context.strokeStyle = '#eee';
  // context.moveTo(poly[0][0], poly[0][1]);
  // for (let i = 1; i < poly.length; i++) {
  //   context.lineTo(poly[i][0], poly[i][1]);
  // }
  // context.stroke();
  // context.restore()
}
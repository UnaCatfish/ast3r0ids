// Large Asteroids:     20 points
// Medium Asteroids:    50 points
// Small Asteroids:    100 points
// Large Saucer:       200 points
// Small Saucer:      1000 points.

const rock = [100, 50, 20];
const ufo = [1000, 200];

let newShip = 10000;

function Score() {
  this.score = '00';
  this.ships = ships;
  this.newShip = newShip;
  console.log(`ships: ${this.ships}  score: ${this.score}`);
  console.log('next new ship at ' + newShip);
}

Score.prototype.update = function (enemy, size) {
  if (this.score == '00') {
    this.score = 0;
  }
  const points = (enemy == 'rock') ? rock[size] : ufo[size];
  this.score += points;
  this.newShip -= points;

  if (this.newShip <= 0) {
    this.ships += 1;
    this.newShip += newShip;
  }
  // console.log(`ships: ${this.ships}  score: ${this.score}`);
}

Score.prototype.removeShip = function () {

  if (this.ships > 1) {
    this.ships -= 1;
    console.log(`ships: ${this.ships}  score: ${this.score}`);
  } else {
    this.ships = 0;
    gameOver = true;
    console.log('Game Over');
  }
}

Score.prototype.draw = function (context) {
  const spacing = 18;
  const x = 200;
  const y = 24;

  const text = new Text(this.score.toString(), 3.1, spacing, x, y);
  text.drawRight(context);

  let sx = 200;
  let sy = 40;
  const poly = shipData[0];
  for (let i = 0; i < this.ships; i++) {
    context.save();
    context.translate(sx, sy);
    context.rotate(Math.PI / 2 * 3);
    context.beginPath();
    context.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1; i < poly.length; i++) {
      context.lineTo(poly[i][0], poly[i][1]);
    }
    context.stroke();
    sx -= 20;
    context.restore()

  }
}
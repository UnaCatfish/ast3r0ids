// Large Asteroids:     20 points
// Medium Asteroids:    50 points
// Small Asteroids:    100 points
// Large Saucer:       200 points
// Small Saucer:      1000 points.

const rock = [100, 50, 20];
const ships = 3;
let newShip = 10000;

function Score() {
  this.score = 0;
  this.ships = ships;
  this.newShip = newShip;
  console.log(`ships: ${this.ships}  score: ${this.score}`);
}

Score.prototype.update = function (enemy, size) {
  if (enemy == 'rock') {
    this.score += rock[size];
    this.newShip -= rock[size]
  }
  if (this.newShip <= 0) {
    this.ships += 1;
    this.newShip += newShip;
  }
  console.log(`ships: ${this.ships}  score: ${this.score}`);
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
  let sc = this.score
  let loop = sc.toString().length || 1;
  let nx = 200;
  let ny = 14;
  for (i = loop - 1; i >= 0; i--) {
    const digit = digits[sc % 10];
    context.save();
    context.translate(nx, ny);
    for (let seg of digit) {
      context.beginPath();
      context.moveTo(segments[seg][0], segments[seg][1]);
      context.lineTo(segments[seg][2], segments[seg][3]);
      context.stroke();
    }
    context.restore()
    nx -= 18;
    sc = Math.floor(sc / 10);
  }

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
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
  console.log(`ships: ${this.ships}  score: ${this.score}`);
}

Score.prototype.update = function (enemy, size) {
  if (enemy == 'rock') {
    this.score += rock[size];
  }
  if (this.score % 10000 == 0) {
    this.ships += 1;
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
  // let sc = 1
  let loop = sc.toString().length || 1;
  let x = 140;
  let y = 14;

  for (i = loop - 1; i >= 0; i--) {

    const digit = digits[sc % 10];
    // console.log(digit, sc);

    context.save();
    context.translate(x, y);
    for (let seg of digit) {
      context.beginPath();
      context.moveTo(segments[seg][0], segments[seg][1]);
      context.lineTo(segments[seg][2], segments[seg][3]);
      context.stroke();
    }
    context.restore()
    x -= 18;
    sc = Math.floor(sc / 10);

  }




}
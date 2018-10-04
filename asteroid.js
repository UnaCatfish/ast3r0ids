
const defaultScale = 9;
const speed = 0.3;

function Asteroid(x, y, scale) {
  this.x = x || Math.floor(Math.random() * canvas.width);
  this.y = y || Math.floor(Math.random() * canvas.height);
  this.scale = scale || defaultScale;
  this.color = '#eee'

  this.particle = particle.create(this.x, this.y, 0, 0, 0);
  this.particle.velocity.setLength(speed + (defaultScale / this.scale) * 0.1);
  this.particle.velocity.setAngle(Math.random() * Math.PI * 2);
  console.log(this.particle.velocity.getLength(), this.scale);

  this.rockIndex = Math.floor(Math.random() * rockData.length);
  this.shape = this.makeRock(this.rockIndex, this.scale);
}

Asteroid.prototype.makeRock = function (index, scale) {
  const result = [];
  for (let line of rockData[index]) {
    result.push([line[0] * scale, line[1] * scale]);
  }
  return result;
}


Asteroid.prototype.draw = function (context) {
  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  // context.strokeStyle = "#eee";
  context.strokeStyle = this.color;
  context.beginPath();
  context.moveTo(this.shape[0][0], this.shape[0][1]);
  for (let i = 1; i < this.shape.length; i++) {
    context.lineTo(this.shape[i][0], this.shape[i][1]);
  }
  context.fill();
  context.stroke();
  context.restore()
}

Asteroid.prototype.update = function () {
  this.particle.update();
}

Asteroid.prototype.edges = function () {
  if (this.particle.position.getX() > canvas.width) {
    this.particle.position.setX(0);
  }
  if (this.particle.position.getX() < 0) {
    this.particle.position.setX(canvas.width);
  }
  if (this.particle.position.getY() > canvas.height) {
    this.particle.position.setY(0);
  }
  if (this.particle.position.getY() < 0) {
    this.particle.position.setY(canvas.height);
  }
}

Asteroid.prototype.getLocation = function () {
  return [this.particle.position.getX(), this.particle.position.getY()];
}

Asteroid.prototype.getScale = function () {
  return this.scale;
}